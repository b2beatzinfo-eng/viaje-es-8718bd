// Cose da prenotare / biglietti da comprare, estratte dall'itinerario.
// Spuntabile in fondo alla pagina. (warn = da non dimenticare; opt = opzionale/se lo fai)
window.BOOKINGS = {
  groups: [
    {
      key: "biglietti", title: "🎟 Biglietti / ingressi",
      items: [
        { id: "bk-setas", n: "Setas de Sevilla", city: "Siviglia", when: "Mar 16", note: "16€, salita serale" },
        { id: "bk-toros", n: "Plaza de Toros de la Maestranza", city: "Siviglia", when: "Mer 17", note: "biglietti DA PRENDERE — sito ufficiale", warn: true },
        { id: "bk-cuevas", n: "Treasure Cave / Cueva del Tesoro", city: "Rincón de la Victoria", when: "Ven 19", note: "biglietto d'ingresso (a est di Málaga, sulla via per Nerja)" },
        { id: "bk-alcazaba", n: "Alcazaba + Castillo de Gibralfaro", city: "Málaga", when: "Sab 20", note: "biglietto combinato" },
        { id: "bk-oceano", n: "Oceanogràfic", city: "Valencia", when: "Mer 24", note: "biglietto — meglio online" },
        { id: "bk-alcazar", n: "Real Alcázar", city: "Siviglia", when: "Mer 17", note: "biglietto + prenotazione consigliata", opt: true },
        { id: "bk-giralda", n: "Cattedrale + Giralda", city: "Siviglia", when: "Mer 17", note: "biglietto, se la visiti", opt: true },
        { id: "bk-palacioreal", n: "Palacio Real", city: "Madrid", when: "Dom 21", note: "biglietto, se entri dentro", opt: true },
        { id: "bk-cac", n: "Hemisfèric / Museo Ciencias", city: "Valencia", when: "Mer 24", note: "biglietto, se entri (gli esterni sono gratis)", opt: true },
        { id: "bk-caminito", n: "Caminito del Rey", city: "Málaga", when: "—", note: "SOLO se prenotato in anticipo · caminitodelrey.info", opt: true }
      ]
    },
    {
      key: "ristoranti", title: "🍽 Ristoranti — prenotazione",
      items: [
        { id: "bk-casamaria", n: "La Casa de María", city: "Siviglia", when: "Mar 16 · pranzo", note: "vista fiume" },
        { id: "bk-brunilda", n: "La Brunilda", city: "Siviglia", when: "Mar 16 · cena", note: "piccolo e sempre pieno", warn: true },
        { id: "bk-pimpi", n: "El Pimpi", city: "Málaga", when: "Gio 18 · cena", note: "istituzione, prenota se puoi" },
        { id: "bk-riua", n: "La Riuà ⭐", city: "Valencia", when: "Gio 25 · pranzo", note: "LA paella — prenota", warn: true },
        { id: "bk-cenaval", n: "La Finestra / Casa Raíz", city: "Valencia", when: "Lun 22 · cena", note: "prima cena in centro", opt: true },
        { id: "bk-botin", n: "Botín", city: "Madrid", when: "—", note: "il più antico del mondo, se lo scegli", opt: true }
      ]
    },
    {
      key: "trasporti", title: "🚆 Trasporti — biglietti",
      items: [
        { id: "bk-bus-sev-mal", n: "Bus Siviglia → Málaga", city: "", when: "Gio 18 · 15:00", note: "" },
        { id: "bk-alsa-nerja", n: "Bus ALSA Málaga ⇄ Nerja (a/r)", city: "", when: "Ven 19", note: "alsa.com o stazione — controlla orari del RITORNO", warn: true },
        { id: "bk-iryo", n: "Treno Iryo Málaga → Madrid", city: "", when: "Sab 20 · 18:20", note: "" },
        { id: "bk-avlo", n: "Treno Avlo Madrid → Valencia", city: "", when: "Lun 22 · 12:30", note: "" },
        { id: "bk-volo", n: "Volo da Valencia (Manises)", city: "", when: "Ven 26 · 16:45", note: "in aeroporto ~14:45" }
      ]
    }
  ],
  // non serve prenotare/comprare — solo per tranquillità
  info: [
    "Museo Reina Sofía: gratis domenica 12:30-14:30 — niente prenotazione, arriva presto per la coda",
    "Torre del Oro: gratis il lunedì (a donazione)",
    "Giro in barca all'Albufera: si paga in loco all'imbarcadero di El Palmar",
    "Barrio Santa Cruz: ingresso libero — giratelo nel tardo pomeriggio col fresco"
  ]
};
