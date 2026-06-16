/* ===== Spagna 2026 · app.js ===== */
(function () {
  "use strict";
  const TRIP = window.TRIP, MEDIA = window.MEDIA || {}, ALTS = window.ALTS || {}, GEO = window.GEO || {}, BOOKINGS = window.BOOKINGS || null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

  // ---- data odierna (override con ?date=YYYY-MM-DD per test) ----
  const params = new URLSearchParams(location.search);
  const override = params.get("date");
  const realNow = new Date();
  const NOW = override ? new Date(override + "T" + pad(realNow.getHours()) + ":" + pad(realNow.getMinutes()) + ":00") : realNow;
  function pad(n) { return String(n).padStart(2, "0"); }
  function dstr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  const TODAY = dstr(NOW);
  const NOWMIN = NOW.getHours() * 60 + NOW.getMinutes();

  // ---- persistenza ----
  const LS_DONE = "sp_done", LS_NOTE = "sp_note", LS_REM = "sp_rem", LS_ALT = "sp_alt", LS_BOOK = "sp_book";
  const done = load(LS_DONE), notes = load(LS_NOTE), remChecks = load(LS_REM), altSel = load(LS_ALT), booked = load(LS_BOOK);
  function load(k) { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function save(k, o) { try { localStorage.setItem(k, JSON.stringify(o)); } catch (e) {} }

  // ---- IndexedDB foto utente ----
  const DBN = "spagna2026", ST = "photos";
  function idb() { return new Promise((res, rej) => { const r = indexedDB.open(DBN, 1); r.onupgradeneeded = e => e.target.result.createObjectStore(ST); r.onsuccess = e => res(e.target.result); r.onerror = () => rej(r.error); }); }
  async function photoGet(id) { try { const db = await idb(); return await new Promise(r => { const t = db.transaction(ST).objectStore(ST).get(id); t.onsuccess = () => r(t.result || []); t.onerror = () => r([]); }); } catch (e) { return []; } }
  async function photoSet(id, arr) { try { const db = await idb(); return await new Promise(r => { const t = db.transaction(ST, "readwrite"); t.objectStore(ST).put(arr, id); t.oncomplete = () => r(); t.onerror = () => r(); }); } catch (e) {} }
  async function photoAll() { try { const db = await idb(); return await new Promise(r => { const os = db.transaction(ST).objectStore(ST); const ks = os.getAllKeys(), vs = os.getAll(); const out = {}; ks.onsuccess = () => { vs.onsuccess = () => { ks.result.forEach((k, i) => out[k] = vs.result[i]); r(out); }; }; }); } catch (e) { return {}; } }

  // ---- helpers testo ----
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  // normalizza per la ricerca: minuscolo + senza accenti (così "malaga" trova "Málaga")
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function decorate(s) {
    let t = esc(s);
    t = t.replace(/(\d+(?:[.,]\d+)?\s?€)/g, '<span class="num">$1</span>');
    t = t.replace(/(\d+(?:[-–]\d+)?\s?°C)/g, '<span class="num">$1</span>');
    t = t.replace(/(~?\d+(?:[-–]\d+)?\s?(?:min|km))\b/g, '<span class="num">$1</span>');
    t = t.replace(/\b(\d{1,2}h(?:\d{2})?)\b/g, '<span class="num">$1</span>');
    return t;
  }
  function mapsUrl(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function timeToMin(t) { const m = /^(\d{1,2}):(\d{2})/.exec(t); return m ? (+m[1]) * 60 + (+m[2]) : null; }
  // indicazioni Google Maps (mezzi/piedi/bici). origin null = posizione attuale.
  function dirUrl(origin, dest, mode) {
    let u = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(dest);
    if (origin) u += "&origin=" + encodeURIComponent(origin);
    return u + "&travelmode=" + (mode || "transit");
  }
  const BIKE_CITIES = new Set(["sev", "val"]); // città piatte con bike-share (Sevici / Valenbisi)
  // stima "come arrivare" dall'alloggio: {txt, url, mode}
  function travelHint(lodging, cid, coords, destQ) {
    if (!lodging) return null;
    const lc = GEO[lodging.q]; let mode = "transit", txt = "🚍 mezzi";
    if (lc && coords) {
      const d = haversine(lc.lat, lc.lng, coords.lat, coords.lng) / 1000; // km
      if (d > 12) { mode = "transit"; txt = "🚍 gita (~" + Math.round(d) + " km)"; }
      else if (d <= 1.3) { mode = "walking"; txt = "🚶 ~" + Math.max(1, Math.round(d / 4.8 * 60)) + " min"; }
      else if (BIKE_CITIES.has(cid) && d <= 6) { mode = "bicycling"; txt = "🚴 ~" + Math.round(d / 14 * 60) + " min · 🚶 ~" + Math.round(d / 4.8 * 60) + " min"; }
      else { mode = "transit"; txt = "🚍 mezzi · " + d.toFixed(1).replace(".", ",") + " km"; }
    }
    const dest = destQ || (coords ? coords.lat + "," + coords.lng : (lodging.q));
    return { mode, txt, url: dirUrl(lodging.q, dest, mode) };
  }

  // ---- stato viaggio (header) ----
  function dayDiff(aStr, bStr) { return Math.round((new Date(bStr + "T12:00:00") - new Date(aStr + "T12:00:00")) / 86400000); }
  function renderStatus() {
    const box = $("#tripStatus");
    const toStart = dayDiff(TODAY, TRIP.start);
    const toEnd = dayDiff(TODAY, TRIP.end);
    box.innerHTML = "";
    if (toStart > 0) {
      box.appendChild(el("span", "badge", "⏳ " + toStart + (toStart === 1 ? " giorno" : " giorni")));
      box.appendChild(el("span", null, "alla partenza — buon viaggio in arrivo!"));
    } else if (toEnd >= 0) {
      box.classList.add("live");
      const dayNum = dayDiff(TRIP.start, TODAY) + 1;
      box.appendChild(el("span", "badge", "● OGGI"));
      box.appendChild(el("span", null, "giorno " + dayNum + " del viaggio"));
      const b = el("button", "iconbtn", "↧ Vai a oggi"); b.style.marginLeft = "auto"; b.style.padding = "4px 10px";
      b.onclick = () => { const t = $(".day.today"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); };
      box.appendChild(b);
    } else {
      box.appendChild(el("span", "badge", "🎉 Fatto"));
      box.appendChild(el("span", null, "viaggio completato — ¡hasta la próxima!"));
    }
  }

  // ---- render città nav ----
  function renderCityBar() {
    const bar = $("#cityBar");
    TRIP.cities.forEach(c => {
      const chip = el("button", "citychip");
      chip.dataset.city = c.id;
      chip.innerHTML = '<span class="dot" style="background:' + themeColor(c.theme) + '"></span>' + c.emoji + " " + esc(c.name);
      chip.onclick = () => { const sec = document.getElementById("city-" + c.id); if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" }); };
      bar.appendChild(chip);
    });
    if (BOOKINGS) {
      const bk = el("button", "citychip citychip-book", "✅ Da prenotare");
      bk.onclick = () => { const s = document.getElementById("bookings"); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); };
      bar.appendChild(bk);
    }
  }
  function themeColor(t) { return { sev: "#e0532a", mal: "#0f9aa3", mad: "#b02e6b", val: "#ef8a00" }[t] || "#e0532a"; }

  // ---- render principale ----
  const app = $("#app");
  function render() {
    app.innerHTML = "";
    TRIP.cities.forEach((c, ci) => app.appendChild(renderCity(c, ci)));
    if (BOOKINGS) app.appendChild(renderBookings());
  }

  // ---- sezione "Prenotazioni & biglietti" (in fondo) ----
  function bookKey(id) { return booked[id] != null; }
  function bookChecked(it) { return booked[it.id] != null ? !!booked[it.id] : !!it.done0; }
  function renderBookings() {
    const sec = el("section", "bookings");
    sec.id = "bookings";
    const all = BOOKINGS.groups.reduce((a, g) => a.concat(g.items), []);
    const tot = all.length, dn = all.filter(bookChecked).length;
    sec.appendChild(el("div", "bk-head",
      '<h2>✅ Prenotazioni &amp; biglietti</h2>' +
      '<div class="bk-sub">Tutto ciò che va prenotato o comprato prima/durante il viaggio. <span class="bk-count" id="bkCount">' + dn + "/" + tot + "</span></div>" +
      '<div class="bar bk-bar"><span id="bkBar"></span></div>'));
    BOOKINGS.groups.forEach(g => {
      const gb = el("div", "bk-group");
      gb.appendChild(el("div", "bk-gtitle", esc(g.title)));
      const ul = el("ul", "bk-list");
      g.items.forEach(it => {
        const li = el("li", "bk-item" + (it.warn ? " warn" : "") + (it.opt ? " opt" : ""));
        const cid = "bkc-" + it.id;
        li.innerHTML =
          '<input type="checkbox" id="' + cid + '" data-book="' + it.id + '"' + (bookChecked(it) ? " checked" : "") + ">" +
          '<label for="' + cid + '"><span class="bk-name">' + (it.warn ? "⚠️ " : "") + esc(it.n) +
          (it.opt ? ' <span class="bk-opt">opzionale</span>' : "") + "</span>" +
          '<span class="bk-meta">' + [it.city, it.when].filter(Boolean).map(esc).join(" · ") + (it.note ? ' — <em>' + esc(it.note) + "</em>" : "") + "</span></label>";
        ul.appendChild(li);
      });
      gb.appendChild(ul);
      sec.appendChild(gb);
    });
    if (BOOKINGS.info && BOOKINGS.info.length) {
      const inf = el("div", "bk-info");
      inf.innerHTML = "<strong>ℹ️ Non serve prenotare:</strong><ul>" + BOOKINGS.info.map(x => "<li>" + decorate(x) + "</li>").join("") + "</ul>";
      sec.appendChild(inf);
    }
    return sec;
  }
  function updateBookProgress() {
    if (!BOOKINGS) return;
    const all = BOOKINGS.groups.reduce((a, g) => a.concat(g.items), []);
    const tot = all.length, dn = all.filter(bookChecked).length;
    const cnt = $("#bkCount"), bar = $("#bkBar");
    if (cnt) cnt.textContent = dn + "/" + tot;
    if (bar) bar.style.width = (tot ? Math.round(dn / tot * 100) : 0) + "%";
  }

  function renderCity(c, ci) {
    const sec = el("section", "city");
    sec.id = "city-" + c.id;
    sec.dataset.city = c.id;
    sec.dataset.theme = c.theme;
    sec.setAttribute("data-theme", c.theme);

    // intestazione
    const head = el("div", "city-head");
    let nItems = 0, nStar = 0;
    c.days.forEach(d => d.items.forEach(it => { nItems++; if (it.star) nStar++; }));
    head.innerHTML =
      '<h2>' + c.emoji + " " + esc(c.name) + '</h2>' +
      '<div class="dates">📅 ' + esc(c.dates) + '</div>' +
      '<p class="intro">' + esc(c.intro) + '</p>' +
      '<div class="cstats">' +
        '<span class="stat">' + c.days.length + ' giorni</span>' +
        '<span class="stat">' + nItems + ' tappe</span>' +
        (nStar ? '<span class="stat">⭐ ' + nStar + ' top</span>' : '') +
      '</div>' +
      '<div class="cprogress"><div class="bar"><span data-prog="' + c.id + '"></span></div></div>';
    sec.appendChild(head);

    // alloggio (base della città)
    if (c.lodging) {
      const l = c.lodging;
      const card = el("div", "stay-card");
      card.innerHTML = '<div class="stay-ic">🏠</div><div class="stay-body">' +
        '<div class="stay-t">Alloggio — all\'arrivo lascia la valigia ed esci leggero</div>' +
        '<div class="stay-addr">' + esc(l.addr) + "</div>" +
        (l.move ? '<div class="stay-move">🚇 ' + esc(l.move) + "</div>" : "") + "</div>";
      const acts = el("div", "stay-acts");
      const a1 = el("a", "act maps", "📍 Apri"); a1.href = mapsUrl(l.q); a1.target = "_blank"; a1.rel = "noopener";
      const a2 = el("a", "act", "🧭 Torna all'alloggio"); a2.href = dirUrl(null, l.q, "transit"); a2.target = "_blank"; a2.rel = "noopener"; a2.title = "Indicazioni dalla tua posizione";
      acts.appendChild(a1); acts.appendChild(a2);
      card.appendChild(acts);
      sec.appendChild(card);
    }

    // cose da sapere
    if (c.know && c.know.length) {
      const d = el("details", "box");
      d.innerHTML = '<summary>🔑 Cose da sapere prima di partire <span class="caret">›</span></summary>' +
        '<div class="box-body"><ul class="know-list">' + c.know.map(k => "<li>" + decorate(k) + "</li>").join("") + "</ul></div>";
      sec.appendChild(d);
    }

    // giorni
    c.days.forEach((day, di) => sec.appendChild(renderDay(c, ci, day, di)));

    // indirizzario
    if (c.directory) {
      const d = el("details", "box");
      d.dataset.dir = "1";
      let body = '<div class="box-body">';
      Object.keys(c.directory).forEach(cat => {
        body += '<div class="dir-cat">' + esc(cat) + "</div><ul class=\"dir-list\">";
        c.directory[cat].forEach(entry => {
          const name = entry.split(" · ")[0];
          body += '<li><a data-text="' + esc(norm(entry)) + '" href="' + mapsUrl(name + " " + c.q) + '" target="_blank" rel="noopener"><span class="pin">📍</span><span>' + esc(entry) + "</span></a></li>";
        });
        body += "</ul>";
      });
      body += "</div>";
      d.innerHTML = '<summary>📋 Indirizzario completo <span class="caret">›</span></summary>' + body;
      sec.appendChild(d);
    }

    // da ricordare
    if (c.remember && c.remember.length) {
      const d = el("details", "box");
      let body = '<div class="box-body"><ul class="remember-list">';
      c.remember.forEach((r, ri) => {
        const id = c.id + ".rem." + ri;
        body += '<li><input type="checkbox" data-rem="' + id + '"' + (remChecks[id] ? " checked" : "") + '><span>' + decorate(r) + "</span></li>";
      });
      body += "</ul></div>";
      d.innerHTML = '<summary>🎒 Da ricordare <span class="caret">›</span></summary>' + body;
      sec.appendChild(d);
    }

    return sec;
  }

  function renderDay(c, ci, day, di) {
    const wrap = el("div", "day");
    wrap.dataset.date = day.date;
    if (day.date === TODAY) wrap.classList.add("today");

    // now / next (solo per oggi)
    let nowIdx = -1, nextIdx = -1;
    if (day.date === TODAY) {
      const mins = day.items.map(it => timeToMin(it.t));
      for (let i = 0; i < mins.length; i++) {
        if (mins[i] != null && mins[i] <= NOWMIN) nowIdx = i;
        if (mins[i] != null && mins[i] > NOWMIN && nextIdx === -1) nextIdx = i;
      }
    }

    const head = el("div", "day-head");
    head.innerHTML = '<span class="day-date">' + esc(day.wd) + '</span><span class="day-title">' + esc(day.title) + '</span>' +
      '<span class="day-prog" data-dayprog="' + c.id + "." + di + '"></span>';
    wrap.appendChild(head);

    if (day.note) wrap.appendChild(el("div", "day-note", "ℹ️ " + decorate(day.note)));

    const tl = el("div", "timeline");
    day.items.forEach((it, ii) => tl.appendChild(renderItem(c, di, day, ii, it, ii === nowIdx, ii === nextIdx)));
    wrap.appendChild(tl);
    return wrap;
  }

  function renderItem(c, di, day, ii, it, isNow, isNext) {
    const id = c.id + "." + di + "." + ii;
    const altList = ALTS[id] || [];
    const variant = () => { const s = altSel[id]; return (s != null && altList[s]) ? altList[s] : it; };

    const item = el("div", "item");
    item.dataset.id = id;
    item.dataset.text = norm([it.n, it.d, it.map].concat(altList.flatMap(a => [a.n, a.d, a.map])).filter(Boolean).join(" "));
    item.dataset.star = it.star ? "1" : "0";
    item.dataset.photo = (it.map && MEDIA[it.map] && MEDIA[it.map].photo) ? "1" : "0";
    if (it.star) item.classList.add("star");
    if (done[id]) item.classList.add("done");
    if (isNow) item.classList.add("now");

    const card = el("div", "card" + (it.star ? " is-star" : ""));
    const photoSlot = el("div", "photo-slot");
    card.appendChild(photoSlot);

    const body = el("div", "card-body");
    let top = '<div class="card-top"><span class="time">' + esc(it.t) + "</span>";
    if (isNow) top += '<span class="badge-now">ORA</span>';
    else if (isNext) top += '<span class="badge-next">PROSSIMA</span>';
    top += "</div>";
    const topWrap = el("div"); topWrap.innerHTML = top; body.appendChild(topWrap.firstChild);
    const titleEl = el("p", "card-title"); body.appendChild(titleEl);
    const descEl = el("p", "card-desc"); body.appendChild(descEl);
    const travelEl = el("div", "travel"); body.appendChild(travelEl);

    // azioni
    const actions = el("div", "card-actions");
    // done
    const bDone = el("button", "act done-toggle" + (done[id] ? " on" : ""));
    bDone.innerHTML = done[id] ? "✓ Fatto" : "☐ Segna fatto";
    bDone.onclick = () => {
      if (done[id]) delete done[id]; else done[id] = 1;
      save(LS_DONE, done);
      item.classList.toggle("done", !!done[id]);
      bDone.classList.toggle("on", !!done[id]);
      bDone.innerHTML = done[id] ? "✓ Fatto" : "☐ Segna fatto";
      updateProgress();
      if ($(".chip[data-filter='todo']").classList.contains("on")) applyFilters();
    };
    actions.appendChild(bDone);
    // maps (href aggiornato da refresh in base alla variante)
    const aMaps = el("a", "act maps", "📍 Maps"); aMaps.target = "_blank"; aMaps.rel = "noopener";
    actions.appendChild(aMaps);
    // nota
    const bNote = el("button", "act note-toggle" + (notes[id] ? " has" : ""), "📝 Nota");
    actions.appendChild(bNote);
    // foto utente
    const bPhoto = el("button", "act photo-add", "📷 Foto");
    actions.appendChild(bPhoto);
    // alternative
    let bAlts = null, panel = null;
    if (altList.length) {
      bAlts = el("button", "act alts-toggle", "🔄 Alternative (" + altList.length + ")");
      actions.appendChild(bAlts);
    }
    body.appendChild(actions);

    // pannello alternative
    if (altList.length) {
      panel = el("div", "alts-panel hidden");
      panel.appendChild(el("div", "alts-head", "🔀 Scegli cosa fare alle " + esc(it.t) + ":"));
      const rows = [{ a: it, idx: -1, orig: true }].concat(altList.map((a, k) => ({ a: a, idx: k })));
      rows.forEach(row => {
        const r = el("div", "alt-row");
        r.dataset.idx = String(row.idx);
        r.innerHTML = '<div class="alt-main"><span class="alt-name">' + (row.a.star ? "⭐ " : "") + esc(row.a.n) +
          (row.orig ? ' <span class="alt-tag">in programma</span>' : "") + "</span>" +
          (row.a.d ? '<span class="alt-desc">' + decorate(row.a.d) + "</span>" : "") + "</div>";
        const right = el("div", "alt-actions");
        if (row.a.map) { const am = el("a", "alt-map", "📍"); am.href = mapsUrl(row.a.map); am.target = "_blank"; am.rel = "noopener"; am.title = "Apri in Maps"; am.onclick = e => e.stopPropagation(); right.appendChild(am); }
        const pick = el("button", "alt-pick", "Scegli"); right.appendChild(pick);
        r.appendChild(right);
        const choose = (e) => { if (e) e.stopPropagation(); if (row.idx < 0) delete altSel[id]; else altSel[id] = row.idx; save(LS_ALT, altSel); refresh(); };
        pick.onclick = choose; r.onclick = choose;
        panel.appendChild(r);
      });
      body.appendChild(panel);
      bAlts.onclick = () => panel.classList.toggle("hidden");
    }

    // area nota
    const noteArea = el("div", "note-area hidden");
    const ta = el("textarea");
    ta.placeholder = "Appunti, prenotazioni, ricordi…";
    ta.value = notes[id] || "";
    const saved = el("div", "note-saved", notes[id] ? "Salvata" : "");
    let tmr;
    ta.oninput = () => {
      clearTimeout(tmr);
      tmr = setTimeout(() => {
        if (ta.value.trim()) notes[id] = ta.value; else delete notes[id];
        save(LS_NOTE, notes);
        bNote.classList.toggle("has", !!notes[id]);
        saved.textContent = notes[id] ? "Salvata ✓" : "";
      }, 400);
    };
    noteArea.appendChild(ta); noteArea.appendChild(saved);
    body.appendChild(noteArea);
    bNote.onclick = () => { noteArea.classList.toggle("hidden"); if (!noteArea.classList.contains("hidden")) ta.focus(); };

    // galleria foto utente
    const gallery = el("div", "myphotos");
    body.appendChild(gallery);
    const fileIn = el("input"); fileIn.type = "file"; fileIn.accept = "image/*"; fileIn.multiple = true; fileIn.style.display = "none";
    body.appendChild(fileIn);
    bPhoto.onclick = () => fileIn.click();
    fileIn.onchange = async () => {
      const files = Array.from(fileIn.files || []);
      if (!files.length) return;
      bPhoto.textContent = "⏳ …";
      let arr = await photoGet(id);
      for (const f of files) { try { arr.push(await compress(f)); } catch (e) {} }
      await photoSet(id, arr);
      bPhoto.textContent = "📷 Foto";
      fileIn.value = "";
      drawGallery(gallery, id, arr);
    };
    // riempi gallery se ci sono foto precaricate
    if (PHOTO_CACHE[id] && PHOTO_CACHE[id].length) drawGallery(gallery, id, PHOTO_CACHE[id]);

    // ridisegna foto/titolo/descrizione/maps in base alla variante attiva
    function refresh() {
      const v = variant();
      const isAlt = v !== it;
      photoSlot.innerHTML = "";
      const med = v.map ? MEDIA[v.map] : null;
      const ph = med && med.photo ? med.photo : null;
      if (ph) {
        const img = el("img", "card-photo");
        img.loading = "lazy"; img.decoding = "async"; img.src = ph; img.alt = v.n;
        img.dataset.cap = v.n + (med.credit ? " · " + med.credit : "");
        img.onclick = () => openLightbox([{ src: ph, cap: img.dataset.cap }], 0);
        img.onerror = () => {
          const cur = img.src, mm = /\/(\d+)px-/.exec(cur), tr = +(img.dataset.tries || 0);
          if (mm && +mm[1] > 360 && tr < 2) { img.dataset.tries = String(tr + 1); img.src = cur.replace(/\/(\d+)px-/, "/" + (+mm[1] > 640 ? 640 : 360) + "px-"); }
          else { img.remove(); }
        };
        photoSlot.appendChild(img);
      }
      titleEl.innerHTML = (v.star ? '<span class="star-ic">⭐</span>' : "") + esc(v.n) + (isAlt ? ' <span class="badge-alt">alternativa</span>' : "");
      descEl.innerHTML = v.d ? decorate(v.d) : "";
      descEl.hidden = !v.d;
      // come arrivare dall'alloggio
      const th = (c.lodging && v.map) ? travelHint(c.lodging, c.id, (v.map ? coordsOf(v.map) : null), v.map) : null;
      if (th) {
        travelEl.hidden = false;
        travelEl.innerHTML = '<span class="tr-est">' + th.txt + '</span> <span class="tr-from">dall\'alloggio</span> · <a class="tr-link" target="_blank" rel="noopener" href="' + th.url + '">🧭 Come arrivare</a>';
      } else travelEl.hidden = true;
      if (v.map) { aMaps.hidden = false; aMaps.href = mapsUrl(v.map); } else { aMaps.hidden = true; }
      card.classList.toggle("variant-alt", isAlt);
      if (bAlts) { bAlts.classList.toggle("on", isAlt); bAlts.textContent = isAlt ? "🔄 Alternativa attiva" : "🔄 Alternative (" + altList.length + ")"; }
      if (panel) $$(".alt-row", panel).forEach(r => r.classList.toggle("sel", (+r.dataset.idx) === (altSel[id] == null ? -1 : altSel[id])));
    }
    refresh();

    card.appendChild(body);
    item.appendChild(card);
    return item;
  }

  let PHOTO_CACHE = {};
  function drawGallery(g, id, arr) {
    g.innerHTML = "";
    arr.forEach((src, i) => {
      const w = el("span", "ph-wrap"); w.style.position = "relative"; w.style.display = "inline-block";
      const im = el("img"); im.src = src; im.alt = "Foto " + (i + 1);
      im.onclick = () => openLightbox(arr.map(s => ({ src: s, cap: "La tua foto" })), i);
      const del = el("button", "ph-del", "✕");
      del.title = "Elimina foto";
      Object.assign(del.style, { position: "absolute", top: "-6px", right: "-6px", width: "22px", height: "22px", borderRadius: "50%", border: "0", background: "rgba(0,0,0,.7)", color: "#fff", fontSize: "12px", lineHeight: "22px", padding: 0 });
      del.onclick = async (e) => {
        e.stopPropagation();
        let a = await photoGet(id); a.splice(i, 1); await photoSet(id, a);
        PHOTO_CACHE[id] = a; drawGallery(g, id, a);
      };
      w.appendChild(im); w.appendChild(del); g.appendChild(w);
    });
    PHOTO_CACHE[id] = arr;
  }
  function compress(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1280; let { width: w, height: h } = img;
          if (w > max || h > max) { const k = Math.min(max / w, max / h); w = Math.round(w * k); h = Math.round(h * k); }
          const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
          cv.getContext("2d").drawImage(img, 0, 0, w, h);
          res(cv.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = rej; img.src = r.result;
      };
      r.onerror = rej; r.readAsDataURL(file);
    });
  }

  // ---- progress ----
  function updateProgress() {
    TRIP.cities.forEach(c => {
      let tot = 0, dn = 0;
      c.days.forEach((day, di) => {
        let dt = 0, dd = 0;
        day.items.forEach((it, ii) => { dt++; if (done[c.id + "." + di + "." + ii]) dd++; });
        tot += dt; dn += dd;
        const dp = $('[data-dayprog="' + c.id + "." + di + '"]');
        if (dp) dp.textContent = dd + "/" + dt + (dd === dt && dt ? " ✓" : "");
      });
      const bar = $('[data-prog="' + c.id + '"]');
      if (bar) bar.style.width = (tot ? Math.round((dn / tot) * 100) : 0) + "%";
    });
  }

  // ---- ricerca / filtri ----
  const search = $("#search"), searchClear = $("#searchClear");
  const fStar = $('.chip[data-filter="star"]'), fTodo = $('.chip[data-filter="todo"]'), fPhoto = $('.chip[data-filter="photo"]');
  function applyFilters() {
    const q = norm(search.value.trim());
    const sStar = fStar.classList.contains("on"), sTodo = fTodo.classList.contains("on"), sPhoto = fPhoto.classList.contains("on");
    const filtering = !!q || sStar || sTodo || sPhoto;
    searchClear.hidden = !q;
    const bk = $("#bookings"); if (bk) bk.hidden = filtering;
    let anyCity = false;

    TRIP.cities.forEach(c => {
      const sec = document.getElementById("city-" + c.id);
      let cityVisible = false;
      // giorni / item
      $$(".day", sec).forEach(dayEl => {
        let vis = 0;
        $$(".item", dayEl).forEach(it => {
          const okText = !q || it.dataset.text.includes(q);
          const okStar = !sStar || it.dataset.star === "1";
          const okPhoto = !sPhoto || it.dataset.photo === "1";
          const okTodo = !sTodo || !done[it.dataset.id];
          const show = okText && okStar && okPhoto && okTodo;
          it.hidden = !show; if (show) vis++;
        });
        dayEl.hidden = vis === 0;
        if (vis) cityVisible = true;
      });
      // boxes
      const boxes = $$("details.box", sec);
      let dirMatch = 0;
      boxes.forEach(b => {
        if (b.dataset.dir) {
          if (q) {
            let mm = 0;
            $$(".dir-list li", b).forEach(li => {
              const a = $("a", li); const show = a.dataset.text.includes(q);
              li.hidden = !show; if (show) mm++;
            });
            dirMatch = mm; b.hidden = mm === 0; if (mm) b.open = true;
          } else { b.hidden = filtering; if (!filtering) { $$(".dir-list li", b).forEach(li => li.hidden = false); } }
        } else {
          b.hidden = filtering;
        }
      });
      const shown = cityVisible || (!!q && dirMatch > 0);
      sec.hidden = !shown;
      if (shown) anyCity = true;
    });
    $("#noResults").hidden = anyCity;
  }
  search.oninput = applyFilters;
  searchClear.onclick = () => { search.value = ""; applyFilters(); search.focus(); };
  [fStar, fTodo, fPhoto].forEach(ch => ch.onclick = () => { ch.classList.toggle("on"); applyFilters(); });

  // ---- delega: ricordare checkbox ----
  app.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset && t.dataset.rem) { if (t.checked) remChecks[t.dataset.rem] = 1; else delete remChecks[t.dataset.rem]; save(LS_REM, remChecks); }
    if (t.dataset && t.dataset.book) { booked[t.dataset.book] = t.checked ? 1 : 0; save(LS_BOOK, booked); updateBookProgress(); }
  });

  // ---- lightbox ----
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCaption");
  let lbSet = [], lbIdx = 0;
  function openLightbox(set, idx) { lbSet = set; lbIdx = idx; showLb(); lb.hidden = false; }
  function showLb() { const it = lbSet[lbIdx]; lbImg.src = it.src; lbCap.textContent = it.cap || ""; $(".lb-prev").style.visibility = lbSet.length > 1 ? "visible" : "hidden"; $(".lb-next").style.visibility = lbSet.length > 1 ? "visible" : "hidden"; }
  $(".lb-close").onclick = () => lb.hidden = true;
  $(".lb-prev").onclick = () => { lbIdx = (lbIdx - 1 + lbSet.length) % lbSet.length; showLb(); };
  $(".lb-next").onclick = () => { lbIdx = (lbIdx + 1) % lbSet.length; showLb(); };
  lb.onclick = e => { if (e.target === lb) lb.hidden = true; };
  document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") $(".lb-prev").click(); if (e.key === "ArrowRight") $(".lb-next").click(); });

  // ---- toast ----
  let toastTmr;
  function toast(html, ms = 6000) { const t = $("#toast"); t.innerHTML = html; t.hidden = false; clearTimeout(toastTmr); toastTmr = setTimeout(() => t.hidden = true, ms); }

  // ---- city bar active on scroll ----
  function observeCities() {
    const chips = {}; $$(".citychip").forEach(ch => chips[ch.dataset.city] = ch);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          Object.values(chips).forEach(c => { c.classList.remove("active"); c.style.background = ""; c.style.borderColor = ""; });
          const id = en.target.dataset.city, ch = chips[id];
          if (ch) { ch.classList.add("active"); ch.style.background = themeColor(en.target.dataset.theme); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$(".city").forEach(s => io.observe(s));
  }

  // ---- geofencing / avvisi prossimità ----
  function coordsOf(map) { return GEO[map] || (MEDIA[map] && MEDIA[map].coords) || null; }
  const geoPoints = (() => {
    const seen = new Set(), pts = [];
    TRIP.cities.forEach(c => c.days.forEach((d, di) => d.items.forEach(it => {
      const co = it.map ? coordsOf(it.map) : null;
      if (co && !seen.has(it.map)) { seen.add(it.map); pts.push({ key: it.map, name: it.n, time: it.t, lat: co.lat, lng: co.lng }); }
    })));
    return pts;
  })();
  const firedKeys = new Set();
  let watchId = null;
  function haversine(a, b, c, d) { const R = 6371000, toR = x => x * Math.PI / 180; const dLat = toR(c - a), dLon = toR(d - b); const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a)) * Math.cos(toR(c)) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); }
  const btnGeo = $("#btnGeo");
  btnGeo.onclick = async () => {
    if (watchId != null) { navigator.geolocation.clearWatch(watchId); watchId = null; btnGeo.setAttribute("aria-pressed", "false"); btnGeo.textContent = "📍 Avvisi"; toast("Avvisi di posizione <b>disattivati</b>."); return; }
    if (!("geolocation" in navigator)) { toast("Geolocalizzazione non disponibile su questo dispositivo."); return; }
    try { if ("Notification" in window && Notification.permission === "default") await Notification.requestPermission(); } catch (e) {}
    toast("📍 Avvisi attivi. Funzionano mentre l'app è <b>aperta</b>: ti avviso quando sei a meno di 150&nbsp;m da una tappa.", 7000);
    btnGeo.setAttribute("aria-pressed", "true"); btnGeo.textContent = "📍 Attivo";
    watchId = navigator.geolocation.watchPosition(onPos, onGeoErr, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  };
  function onGeoErr(e) { toast("Posizione non disponibile (" + (e.message || "permesso negato") + ")."); btnGeo.setAttribute("aria-pressed", "false"); btnGeo.textContent = "📍 Avvisi"; if (watchId != null) { navigator.geolocation.clearWatch(watchId); watchId = null; } }
  function onPos(p) {
    const { latitude: la, longitude: lo } = p.coords;
    let best = null;
    geoPoints.forEach(pt => { const dist = haversine(la, lo, pt.lat, pt.lng); if (!best || dist < best.dist) best = { pt, dist }; });
    if (best && best.dist <= 150 && !firedKeys.has(best.pt.key)) {
      firedKeys.add(best.pt.key);
      notify("Sei vicino a " + best.pt.name, "La tua tappa delle " + best.pt.time + " · ~" + Math.round(best.dist) + " m");
      toast('📍 Sei vicino a <b>' + esc(best.pt.name) + "</b> — tappa delle " + esc(best.pt.time) + " (~" + Math.round(best.dist) + " m)", 8000);
    }
  }
  async function notify(title, body) {
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          const reg = await navigator.serviceWorker.ready;
          reg.showNotification(title, { body, icon: "icon-192.png", badge: "icon-192.png" }); return;
        }
        new Notification(title, { body, icon: "icon-192.png" });
      }
    } catch (e) {}
  }

  // ---- promemoria a orario ----
  const LS_REMIND = "sp_remind", LEAD = 10; // minuti prima della tappa
  let remindOn = localStorage.getItem(LS_REMIND) === "1";
  let fgTimers = [];
  const triggersOK = ("Notification" in window) && Notification.prototype && ("showTrigger" in Notification.prototype) && ("TimestampTrigger" in window);
  const btnRemind = $("#btnRemind");

  function reminderList() {
    const out = [];
    TRIP.cities.forEach(c => c.days.forEach((d, di) => d.items.forEach((it, ii) => {
      const mm = timeToMin(it.t); if (mm == null) return;
      const at = new Date(d.date + "T" + pad(Math.floor(mm / 60)) + ":" + pad(mm % 60) + ":00");
      out.push({ id: c.id + "." + di + "." + ii, when: at.getTime() - LEAD * 60000, at: it.t, n: it.n, city: c.name });
    })));
    return out;
  }
  function clearFgTimers() { fgTimers.forEach(clearTimeout); fgTimers = []; }
  async function clearScheduled() {
    clearFgTimers();
    try { if (navigator.serviceWorker) { const reg = await navigator.serviceWorker.ready; if (reg.getNotifications) (await reg.getNotifications({ includeTriggered: true })).forEach(n => { if (n.tag && n.tag.indexOf("sprem-") === 0) n.close(); }); } } catch (e) {}
  }
  async function scheduleReminders() {
    await clearScheduled();
    if (!remindOn) return { mode: "off", count: 0 };
    const now = Date.now();
    const future = reminderList().filter(r => r.when > now);
    if (triggersOK && navigator.serviceWorker) {
      try {
        const reg = await navigator.serviceWorker.ready;
        for (const r of future) {
          await reg.showNotification("🔔 Tra " + LEAD + " min: " + r.n, {
            tag: "sprem-" + r.id, body: r.at + " · " + r.city, icon: "icon-192.png", badge: "icon-192.png",
            showTrigger: new window.TimestampTrigger(r.when), data: { gotoId: r.id }
          });
        }
        return { mode: "background", count: future.length };
      } catch (e) { /* cade nel foreground */ }
    }
    // fallback: timer in primo piano per le prossime 24h
    const horizon = now + 24 * 3600 * 1000;
    future.filter(r => r.when < horizon).forEach(r => {
      fgTimers.push(setTimeout(() => notify("🔔 Tra " + LEAD + " min: " + r.n, r.at + " · " + r.city), r.when - now));
    });
    return { mode: "foreground", count: fgTimers.length };
  }
  function setRemindUI() { btnRemind.setAttribute("aria-pressed", remindOn ? "true" : "false"); btnRemind.textContent = remindOn ? "🔔 Promemoria ON" : "🔔 Promemoria"; }
  btnRemind.onclick = async () => {
    if (remindOn) { remindOn = false; localStorage.setItem(LS_REMIND, "0"); await clearScheduled(); setRemindUI(); toast("Promemoria <b>disattivati</b>."); return; }
    let perm = "Notification" in window ? Notification.permission : "denied";
    if (perm === "default") { try { perm = await Notification.requestPermission(); } catch (e) {} }
    if (perm !== "granted") { toast("Per i promemoria servono le notifiche (permesso negato dal dispositivo)."); return; }
    remindOn = true; localStorage.setItem(LS_REMIND, "1"); setRemindUI();
    const res = await scheduleReminders();
    if (res.mode === "background") toast("🔔 " + res.count + " promemoria programmati (10 min prima di ogni tappa) — anche ad app chiusa.", 7000);
    else if (res.count) toast("🔔 Promemoria attivi (10 min prima di ogni tappa). Su questo dispositivo arrivano <b>mentre l'app è aperta</b>.", 8000);
    else toast("🔔 Promemoria attivati. Scatteranno durante i giorni del viaggio (app aperta).", 7000);
  };
  setRemindUI();
  if (remindOn) scheduleReminders();
  document.addEventListener("visibilitychange", () => { if (remindOn && !document.hidden) scheduleReminders(); });

  // ---- vai alla tappa (dalla mappa alla timeline) ----
  function gotoItem(id) {
    closeMap();
    // azzera ricerca/filtri così la tappa è visibile
    search.value = ""; [fStar, fTodo, fPhoto].forEach(ch => ch.classList.remove("on")); applyFilters();
    const it = $('.item[data-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]');
    if (it) {
      const d = it.closest(".day"); if (d) d.hidden = false;
      const c = it.closest(".city"); if (c) c.hidden = false;
      it.scrollIntoView({ behavior: "smooth", block: "center" });
      it.classList.remove("flash"); void it.offsetWidth; it.classList.add("flash");
    }
  }

  // ---- mappa interattiva (Leaflet) ----
  const CITY_COLOR = { sev: "#e0532a", mal: "#0f9aa3", mad: "#b02e6b", val: "#ef8a00" };
  const mapModal = $("#mapModal");
  let LMAP = null, layersByCity = {}, routesByCity = {}, altLayer = null;
  let posWatch = null, posMarker = null, posCircle = null, posCentered = false;
  const activeCities = new Set(TRIP.cities.map(c => c.id));

  function pinIcon(color, label, star) {
    return L.divIcon({
      className: "", iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24],
      html: '<div class="mk' + (star ? " star" : "") + '" style="background:' + color + '"><span>' + label + "</span></div>"
    });
  }
  function altIcon(color) {
    return L.divIcon({ className: "", iconSize: [15, 15], iconAnchor: [7, 7], popupAnchor: [0, -8], html: '<div class="mk-alt" style="background:' + color + '"></div>' });
  }
  function homeIcon(color) {
    return L.divIcon({ className: "", iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -15], html: '<div class="mk-home" style="border-color:' + color + '">🏠</div>' });
  }
  function popupNode(o) {
    const n = el("div", "pop");
    let html = "";
    if (o.alt) html += '<span class="pop-alt-tag">alternativa · ' + esc(o.t) + "</span>";
    else if (o.wd || o.t) html += '<div class="pop-time">' + esc(o.wd || "") + (o.t ? (o.wd ? " · " : "") + esc(o.t) : "") + "</div>";
    html += '<div class="pop-name">' + (o.star ? "⭐ " : "") + esc(o.n) + "</div>";
    if (o.photo) html += '<img loading="lazy" src="' + o.photo + '" alt="">';
    if (o.d) html += '<div class="pop-desc">' + decorate(o.d) + "</div>";
    n.innerHTML = html;
    const acts = el("div", "pop-actions");
    if (o.map) { const a = el("a", "pop-btn", "📍 Maps"); a.href = mapsUrl(o.map); a.target = "_blank"; a.rel = "noopener"; acts.appendChild(a); }
    if (o.id) { const b = el("button", "pop-btn go", "↧ Vai alla tappa"); b.onclick = () => gotoItem(o.id); acts.appendChild(b); }
    n.appendChild(acts);
    return n;
  }

  function buildMapLayers() {
    TRIP.cities.forEach(c => {
      const color = CITY_COLOR[c.id] || "#e0532a";
      const grp = L.layerGroup(), routes = L.layerGroup();
      c.days.forEach((d, di) => {
        const linePts = [];
        d.items.forEach((it, ii) => {
          if (!it.map) return; const co = coordsOf(it.map); if (!co) return;
          const ll = [co.lat, co.lng]; linePts.push(ll);
          const photo = MEDIA[it.map] && MEDIA[it.map].photo ? MEDIA[it.map].photo : null;
          L.marker(ll, { icon: pinIcon(color, String(ii + 1), it.star) })
            .bindPopup(popupNode({ id: c.id + "." + di + "." + ii, n: it.n, d: it.d, t: it.t, wd: d.wd, map: it.map, star: it.star, photo }))
            .addTo(grp);
        });
        if (linePts.length > 1) L.polyline(linePts, { color, weight: 3, opacity: .55, dashArray: "4,8" }).addTo(routes);
      });
      // alloggio
      if (c.lodging && GEO[c.lodging.q]) {
        const lc = GEO[c.lodging.q];
        L.marker([lc.lat, lc.lng], { icon: homeIcon(color), zIndexOffset: 1000 })
          .bindPopup(popupNode({ n: "🏠 Alloggio — " + c.name, d: c.lodging.addr, map: c.lodging.q }))
          .addTo(grp);
      }
      layersByCity[c.id] = grp; routesByCity[c.id] = routes;
    });
    // alternative
    altLayer = L.layerGroup();
    Object.entries(ALTS).forEach(([key, opts]) => {
      const cid = key.split(".")[0], color = CITY_COLOR[cid] || "#888";
      const parts = key.split("."), di = +parts[1], ii = +parts[2];
      const day = TRIP.cities.find(c => c.id === cid).days[di];
      const t = day && day.items[ii] ? day.items[ii].t : "";
      opts.forEach(o => {
        if (!o.map) return; const co = coordsOf(o.map); if (!co) return;
        L.marker([co.lat, co.lng], { icon: altIcon(color) })
          .bindPopup(popupNode({ n: o.n, d: o.d, t: t, map: o.map, alt: true, star: o.star }))
          .addTo(altLayer);
      });
    });
  }

  function refreshMapLayers() {
    if (!LMAP) return;
    const showRoutes = $("#optRoutes").checked, showAlts = $("#optAlts").checked;
    const bounds = [];
    TRIP.cities.forEach(c => {
      const on = activeCities.has(c.id);
      if (on) { layersByCity[c.id].addTo(LMAP); if (showRoutes) routesByCity[c.id].addTo(LMAP); else LMAP.removeLayer(routesByCity[c.id]); }
      else { LMAP.removeLayer(layersByCity[c.id]); LMAP.removeLayer(routesByCity[c.id]); }
    });
    if (showAlts) altLayer.addTo(LMAP); else LMAP.removeLayer(altLayer);
    // fit bounds sui marker visibili
    TRIP.cities.forEach(c => { if (!activeCities.has(c.id)) return; layersByCity[c.id].eachLayer(l => { if (l.getLatLng) bounds.push(l.getLatLng()); }); });
    if (bounds.length) LMAP.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  }

  function renderMapChips() {
    const box = $("#mapCities"); box.innerHTML = "";
    TRIP.cities.forEach(c => {
      const ch = el("button", "mapchip");
      ch.innerHTML = '<span class="dot" style="background:' + CITY_COLOR[c.id] + '"></span>' + esc(c.name);
      ch.onclick = () => {
        // se è l'unica attiva -> riattiva tutte; altrimenti isola questa
        if (activeCities.size === 1 && activeCities.has(c.id)) TRIP.cities.forEach(x => activeCities.add(x.id));
        else { activeCities.clear(); activeCities.add(c.id); }
        updateMapChips(); refreshMapLayers();
      };
      box.appendChild(ch);
    });
    updateMapChips();
  }
  function updateMapChips() { $$("#mapCities .mapchip").forEach((ch, i) => ch.classList.toggle("off", !activeCities.has(TRIP.cities[i].id))); }

  function openMap() {
    mapModal.hidden = false;
    if (!LMAP) {
      LMAP = L.map("map", { zoomControl: true, attributionControl: true });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(LMAP);
      buildMapLayers();
      renderMapChips();
      $("#optRoutes").onchange = refreshMapLayers;
      $("#optAlts").onchange = refreshMapLayers;
      $("#btnLocate").onclick = toggleLocate;
    }
    setTimeout(() => { LMAP.invalidateSize(); refreshMapLayers(); }, 60);
  }
  function closeMap() { mapModal.hidden = true; stopLocate(); }
  if (window.L) { $("#btnMap").onclick = openMap; $("#mapClose").onclick = closeMap; }
  else { $("#btnMap").onclick = () => toast("Mappa non disponibile (libreria non caricata, serve connessione)."); }
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !mapModal.hidden) closeMap(); });

  // ---- la mia posizione in tempo reale sulla mappa ----
  function toggleLocate() { if (posWatch != null) stopLocate(); else startLocate(); }
  function stopLocate() {
    if (posWatch != null) { try { navigator.geolocation.clearWatch(posWatch); } catch (e) {} posWatch = null; }
    if (posMarker && LMAP) { LMAP.removeLayer(posMarker); } posMarker = null;
    if (posCircle && LMAP) { LMAP.removeLayer(posCircle); } posCircle = null;
    posCentered = false;
    const b = $("#btnLocate"); if (b) { b.setAttribute("aria-pressed", "false"); b.textContent = "📍 La mia posizione"; }
  }
  function startLocate() {
    if (!("geolocation" in navigator)) { toast("Geolocalizzazione non disponibile su questo dispositivo."); return; }
    const b = $("#btnLocate"); b.setAttribute("aria-pressed", "true"); b.textContent = "📍 Localizzazione…";
    posWatch = navigator.geolocation.watchPosition(p => {
      const la = p.coords.latitude, lo = p.coords.longitude, acc = p.coords.accuracy || 0;
      const ll = [la, lo];
      if (!posMarker) {
        posMarker = L.marker(ll, { icon: L.divIcon({ className: "", iconSize: [20, 20], iconAnchor: [10, 10], html: '<div class="mk-me"></div>' }), zIndexOffset: 2000, interactive: false }).addTo(LMAP);
        posCircle = L.circle(ll, { radius: acc, color: "#1a73e8", weight: 1, fillColor: "#1a73e8", fillOpacity: .12 }).addTo(LMAP);
      } else { posMarker.setLatLng(ll); posCircle.setLatLng(ll).setRadius(acc); }
      b.textContent = "📍 Posizione attiva";
      if (!posCentered) { posCentered = true; LMAP.setView(ll, Math.max(LMAP.getZoom(), 15)); }
    }, e => {
      if (e && e.code === 1) { toast("Permesso posizione negato: attivalo per vederti sulla mappa."); stopLocate(); }
      else { toast("📍 Cerco il segnale GPS…", 3000); if (posWatch != null && b) b.textContent = posMarker ? "📍 Posizione attiva" : "📍 Cerco segnale…"; }
    }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 25000 });
  }

  // ---- PWA ----
  if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {})); }
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; $("#btnInstall").hidden = false; });
  $("#btnInstall").onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; $("#btnInstall").hidden = true; };

  // ---- avvio ----
  (async function init() {
    renderStatus();
    renderCityBar();
    render();
    PHOTO_CACHE = await photoAll();
    // ridisegna gallerie ora che la cache è pronta
    Object.keys(PHOTO_CACHE).forEach(id => {
      const item = $('.item[data-id="' + CSS.escape(id) + '"]');
      if (item) { const g = $(".myphotos", item); if (g) drawGallery(g, id, PHOTO_CACHE[id]); }
    });
    updateProgress();
    updateBookProgress();
    observeCities();
    applyFilters();
    // scroll a oggi se in viaggio
    if (dayDiff(TODAY, TRIP.start) <= 0 && dayDiff(TODAY, TRIP.end) >= 0) {
      setTimeout(() => { const t = $(".day.today"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 350);
    } else {
      const jump = params.get("city"); if (jump) { const s = document.getElementById("city-" + jump); if (s) s.scrollIntoView(); }
    }
  })();
})();
