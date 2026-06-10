// Dati del viaggio in Spagna · 15-26 giugno 2026
// Estratti da "Spagna 2026.docx". Le virgolette nei testi sono tipografiche (“ ”) per comodità.
window.TRIP = {
  title: "Spagna 2026",
  subtitle: "Siviglia · Málaga · Madrid · Valencia",
  start: "2026-06-15",
  end: "2026-06-26",
  cities: [
    {
      id: "sev",
      name: "Siviglia",
      q: "Sevilla",
      dates: "15–18 giugno",
      emoji: "🍊",
      theme: "sev",
      intro: "Itinerario bilanciato con cose chiave + tempo per vagare. Tutti i link aprono Google Maps.",
      lodging: { addr: "Casco Antiguo · zona Macarena/Alameda", q: "Casco Antiguo, Sevilla", move: "Centro e Triana si girano a piedi; per le distanze bici pubbliche Sevici (città piatta)." },
      know: [
        "Caldo: tra il 15 e il 18 si toccano 35-38°C tra le 14 e le 18. Pensato per stare fuori la mattina presto e la sera, e ripararsi nelle ore peggiori. Cappello, acqua, siesta se serve.",
        "Barrio Santa Cruz: ingresso libero, niente biglietto. Giratelo nel tardo pomeriggio quando rinfresca; vicoli ombrosi e patii.",
        "Plaza de Toros mercoledì 17:30: biglietti ancora da prendere sul sito ufficiale.",
        "Torre del Oro gratis il lunedì (a donazione).",
        "Mercato di Triana: chiude alle 15, chiuso la domenica.",
        "Archivo de Indias: chiuso il lunedì → spostato al martedì.",
        "Bar Garlochí: apre alle 21, SOLO CONTANTI. Bancomat girando l'angolo.",
        "Torch Coffee Roasters: risulta chiuso da circa un anno, sostituito con altri caffè.",
        "Alma Chai: non trovato come place affidabile su Maps — controlla tu se hai un riferimento.",
        "Prenotazioni consigliate: La Brunilda (cena martedì), La Casa de María (pranzo martedì)."
      ],
      days: [
        {
          date: "2026-06-15", wd: "Lunedì 15 giugno", title: "Arrivo + Barrio Santa Cruz",
          note: "Arrivo aeroporto ore 15. Transfer in hotel (~30-40 min), check-in veloce, e via. A letto presto: domani si comincia.",
          items: [
            { t: "15:00", n: "Arrivo + check-in alloggio (lascia la valigia)", d: "Transfer (~30-40 min) verso l'alloggio nel Casco Antiguo (zona Alameda). Lascia la valigia ed esci leggero: il centro è a ~15 min a piedi (o bici Sevici)." },
            { t: "17:00", n: "Barrio Santa Cruz", d: "L'antico quartiere ebraico: vicoli stretti, patii fioriti e piazzette ombrose. Perfetto come primo assaggio di Siviglia e ingresso libero (giratelo col fresco del tardo pomeriggio).", map: "Barrio Santa Cruz Sevilla" },
            { t: "18:45", n: "Torre del Oro", d: "Lunedì gratis/donazione. Vista breve ma carina, vicina al fiume. Utile per orientarsi nei giorni dopo.", map: "Torre del Oro" },
            { t: "20:30", n: "Cena: Bar Casa Morales", d: "Tapas in taberna storica (175 anni). Atmosfera autentica, prezzi onesti, perfetta per la prima sera.", map: "Bar Casa Morales" }
          ]
        },
        {
          date: "2026-06-16", wd: "Martedì 16 giugno", title: "Triana + centro + Plaza de España al tramonto",
          items: [
            { t: "09:00", n: "Colazione: La Comissura", d: "Affacciata su Las Setas. Tostadas, mimosa con succo d'arancia di Siviglia a 3,5€.", map: "La Comissura Sevilla" },
            { t: "10:30", n: "Mercato di Triana", d: "Mercato vivo (chiude alle 15). Banchi di pesce, olive, ceramiche. Sopra c'è anche il museo dell'Inquisizione.", map: "Mercado de Triana" },
            { t: "12:00", n: "Passeggiata in Triana", d: "Calle Betis, Capilla del Carmen, vista sul Guadalquivir.", map: "Calle Betis Triana" },
            { t: "13:30", n: "Pranzo paella: La Casa de María", d: "In Calle Betis, vista sul fiume. Prenota se possibile. In alternativa mangia al Mercado de Triana.", map: "La Casa de María Sevilla" },
            { t: "15:00", n: "Siesta o pausa al fresco", d: "15:00-16:00, è l'ora più calda." },
            { t: "16:00", n: "Plaza del Cabildo", d: "Piazzetta semicircolare nascosta dietro la cattedrale.", map: "Plaza del Cabildo Sevilla" },
            { t: "16:30", n: "Archivo de Indias", d: "Sempre gratuito. Martedì aperto 9:30-16:30. Visita rapida (30 min), edificio splendido.", map: "Archivo de Indias" },
            { t: "17:30", n: "Universidad de Sevilla (ex Real Fábrica de Tabacos)", d: "Entri gratis, è un'università attiva. Cerca la “liadora” (macchina per arrotolare sigari) e le scale principali.", map: "Universidad de Sevilla Fábrica de Tabacos" },
            { t: "18:30", n: "Plaza de España — tramonto", d: "Noleggia la barchetta (3€/30 min) — l'ultimo giro è verso le 21. Poi gira tra le alcove delle province.", map: "Plaza de España Sevilla", star: true },
            { t: "20:00", n: "Parco Maria Luisa", d: "Attaccato a Plaza de España. Passeggiata di rientro tra fontane e pavoni.", map: "Parque de María Luisa" },
            { t: "21:00", n: "Cena: La Brunilda", d: "Tapas creative. PRENOTA, è piccolo e sempre pieno. Apre alle 20:30.", map: "La Brunilda Sevilla" },
            { t: "23:00", n: "Setas de Sevilla", d: "16€, fino alle 23:45. Salita serale, le luci la rendono bellissima. Video panoramico ogni 15 min alla fine.", map: "Setas de Sevilla" }
          ]
        },
        {
          date: "2026-06-17", wd: "Mercoledì 17 giugno", title: "Centro storico + Plaza de Toros + drink finale",
          items: [
            { t: "09:00", n: "Colazione: Ofelia Bakery", d: "Pastry buone, opzioni vegane, spremuta fresca.", map: "Ofelia Bakery Sevilla" },
            { t: "10:00", n: "Mattina libera in centro", d: "Cattedrale + Giralda + Real Alcázar se non li hai ancora visti, oppure vagabondaggio nel barrio di Santa Cruz.", map: "Catedral de Sevilla" },
            { t: "12:15", n: "Dolce: La Tarta de la Madre de Cris", d: "Una fetta della famosa cheesecake (classica o pistacchio). Vicinissima alla Cattedrale.", map: "La Tarta de la Madre de Cris" },
            { t: "14:00", n: "Pranzo: Cervecería Giralda", d: "In un'antica hammam araba, a un passo dalla Giralda. Atmosfera unica.", map: "Cervecería Giralda" },
            { t: "15:30", n: "Riposo / passeggio al fresco", d: "15:30-17:00, ore più calde." },
            { t: "17:30", n: "Plaza de Toros de la Real Maestranza", d: "Biglietti da prendere. Tour di circa 1 ora. Da qui sei già sul fiume.", map: "Plaza de Toros de la Maestranza" },
            { t: "18:45", n: "Passeggiata lungo il Guadalquivir verso Triana", d: "" },
            { t: "21:00", n: "Cena: Restaurante La Valiente", d: "A Triana, lato fiume. Tapas e piatti tipici, atmosfera rilassata.", map: "Restaurante La Valiente Sevilla" },
            { t: "23:00", n: "Drink: Bar Garlochí", d: "Bar a tema Semana Santa, decor pazzesco. Cocktail signature “Sangre de Cristo” (whiskey + cava + granatina). SOLO CONTANTI, apre alle 21.", map: "Bar Garlochí Sevilla", star: true }
          ]
        },
        {
          date: "2026-06-18", wd: "Giovedì 18 giugno", title: "Ultima mattina + partenza",
          note: "Mezza giornata. Partenza per Málaga dalla stazione alle 15.",
          items: [
            { t: "09:00", n: "Colazione: Jester Coffee & Juice", d: "Caffè ottimo, dolci, croissant al pistacchio. A Triana.", map: "Jester Coffee Juice Sevilla" },
            { t: "10:30", n: "Ultimi giri tra Triana e centro", d: "" },
            { t: "12:00", n: "Pranzo: Restaurante El Pintón", d: "Patio andaluso bellissimo. Apre a mezzogiorno, comodo prima di partire per Málaga.", map: "El Pintón Sevilla" },
            { t: "15:00", n: "Bus per Málaga", d: "🚌 Partenza dalla stazione." }
          ]
        }
      ],
      directory: {
        "Attrazioni": ["Casa de Pilatos · Pl. de Pilatos, 1", "Torre del Oro · P.º de Cristóbal Colón", "Plaza del Cabildo · Casco Antiguo", "Archivo de Indias · Av. de la Constitución", "Universidad de Sevilla (ex Fábrica de Tabacos) · C. San Fernando, 4", "Plaza de España · Av. Isabel la Católica", "Parco Maria Luisa", "Setas de Sevilla · Pl. de la Encarnación", "Plaza de Toros de la Maestranza · P.º de Cristóbal Colón, 12", "Mercato di Triana · C. San Jorge, 6"],
        "Colazione / caffè": ["La Comissura · C. Santillana, 1", "Ofelia Bakery · C. Huelva, 5", "Caótica · C. José Gestoso, 8", "Jester Coffee & Juice · C. Asunción, 8", "La Tarta de la Madre de Cris · C. Álvarez Quintero, 2"],
        "Pranzo / cena": ["Bar Casa Morales · C. García de Vinuesa, 11", "La Casa de María · C. Betis, 2", "Cervecería Giralda · C. Mateos Gago, 1", "La Brunilda · C. Galera, 5", "La Valiente · C. San Jacinto, 12", "Los Coloniales", "El Pintón · C. Francos, 42"],
        "Drink sera": ["Bar Garlochí · C. Boteros, 26"]
      },
      remember: ["Contanti per Bar Garlochí", "Acqua sempre con te (caldo)", "Cappello + crema solare", "Le tapas si mangiano al bancone — è normale, anzi più autentico", "Cena spagnola = 21-22 in poi"]
    },

    {
      id: "mal",
      name: "Málaga",
      q: "Málaga",
      dates: "18–20 giugno",
      emoji: "🏖️",
      theme: "mal",
      intro: "Itinerario flessibile: 1 sera in città + 1 gita a Nerja/Maro + 1 mezza giornata finale.",
      lodging: { addr: "Cruz de Humilladero (~2,7 km dal centro)", q: "Cruz de Humilladero, Málaga", move: "Al centro in bus o ~30 min a piedi; spiagge/Pedregalejo in bus; Nerja col bus ALSA (vedi checklist)." },
      know: [
        "Tempo reale: arrivi giovedì 18 alle 17:45 (solo la sera) e riparti sabato 20 col treno Iryo delle 18:20. In pratica: 1 sera + 1 giorno pieno + 1 mezza giornata.",
        "Caldo: 33-36°C nelle ore centrali. Mattina presto e sera fuori, ore calde al fresco o in spiaggia.",
        "Gita a Nerja: bus ALSA Málaga–Nerja dalla Estación de Autobuses (accanto a María Zambrano). Circa 1h-1h15, biglietti su alsa.com o in stazione. Vai presto.",
        "Maro (cascata + cala): ~4 km oltre Nerja. Bus locale o taxi (~10 min). La Cascada Grande è sulla spiaggia di Maro.",
        "Alcazaba + Gibralfaro: biglietto combinato conveniente. Il castello è in salita — meglio mattina presto o tardo pomeriggio.",
        "Caminito del Rey: lasciato fuori — richiede prenotazione a orario fisso e mezza giornata, non compatibile col treno del 20.",
        "Antigua Casa de Guardia: la taberna storica del vino, si beve al bancone e segnano il conto col gesso. Solo vino/sherry.",
        "Casa Aranda: tempio dei churros, dalla mattina. Perfetto per la colazione del sabato."
      ],
      days: [
        {
          date: "2026-06-18", wd: "Giovedì 18 giugno", title: "Arrivo + prima serata in centro",
          note: "Arrivo a Málaga ore 17:45. Vai all'alloggio (zona Cruz de Humilladero), lascia la valigia ed esci leggero (~2,7 km dal centro: bus o ~30 min a piedi).",
          items: [
            { t: "19:30", n: "Calle Marqués de Larios", d: "La via principale, marmo bianco, pedonale. Sbuca su Plaza de la Constitución.", map: "Calle Marqués de Larios Málaga" },
            { t: "19:50", n: "Plaza de la Constitución", d: "Cuore del centro storico, punto di orientamento per i giorni dopo.", map: "Plaza de la Constitución Málaga" },
            { t: "20:15", n: "Aperitivo: Antigua Casa de Guardia", d: "Taberna del vino storica (1840), si beve al bancone e segnano il conto col gesso. Un calice di vino di Málaga come benvenuto.", map: "Antigua Casa de Guardia Málaga" },
            { t: "21:00", n: "Cena: El Pimpi", d: "L'istituzione di Málaga, bodega-ristorante con patio e botti firmate. Atmosfera tipica. Prenota se puoi.", map: "El Pimpi Málaga" },
            { t: "22:30", n: "Drink rooftop: San Telmo o Molina Lario", d: "San Telmo è raccolto e centrale; Molina Lario ha la vista frontale sulla Cattedrale.", map: "Molina Lario rooftop Málaga" }
          ]
        },
        {
          date: "2026-06-19", wd: "Venerdì 19 giugno", title: "Gita a Nerja + Maro",
          note: "Giornata fuori. Sveglia con calma ma non troppo: prendi un bus la mattina per goderti grotte/spiaggia col fresco.",
          items: [
            { t: "08:30", n: "Colazione: Cousin Brunch o Kima Coffee", d: "Due ottimi indirizzi caffè/brunch in centro prima di partire.", map: "Kima Coffee Málaga" },
            { t: "09:30", n: "Bus per Nerja", d: "Dalla Estación de Autobuses (accanto a María Zambrano). ALSA, ~1h-1h15. Biglietto online o in stazione.", map: "Estación de Autobuses Málaga" },
            { t: "11:00", n: "Treasure Cave (Cueva del Tesoro)", d: "A Rincón de la Victoria (~20 min a est di Málaga, sulla strada per Nerja): l'unica grotta di origine marina visitabile d'Europa, fresca dentro. NB: è prima di Nerja — organizza il trasporto di conseguenza.", map: "Cueva del Tesoro Rincón de la Victoria" },
            { t: "12:30", n: "Maro: Cascada Grande + Playa de Maro", d: "Cala con cascatella che cade sulla spiaggia, acqua trasparente. Una delle più belle della costa. Bus locale o taxi da Nerja (~10 min).", map: "Playa de Maro", star: true },
            { t: "14:30", n: "Pranzo a Nerja + Balcón de Europa", d: "Torna nel centro di Nerja. Pranzo con vista e poi il Balcón, terrazza panoramica sul mare.", map: "Balcón de Europa Nerja" },
            { t: "16:00", n: "Nerja Beach (Calahonda / Burriana)", d: "Bagno e relax. Calahonda è sotto il Balcón; Burriana più ampia e attrezzata.", map: "Playa Burriana Nerja" },
            { t: "18:30", n: "Bus di rientro a Málaga", d: "Controlla gli orari ALSA in giornata. Rientro ~1h-1h15." },
            { t: "21:00", n: "Cena: La Tranca o Las Merchanas", d: "Due locali super tipici e vivaci per tapas. La Tranca è piccola e chiassosa (in senso buono).", map: "La Tranca Málaga" }
          ]
        },
        {
          date: "2026-06-20", wd: "Sabato 20 giugno", title: "Málaga città + partenza",
          note: "La mattina e il primo pomeriggio sono tuoi. Verso le 17 rientro/stazione per il treno delle 18:20.",
          items: [
            { t: "08:30", n: "Colazione: Casa Aranda (churros) o Granier", d: "Casa Aranda è il tempio storico dei churros col cioccolato. Granier per il combo veloce.", map: "Casa Aranda Málaga" },
            { t: "09:30", n: "Alcazaba + Castillo de Gibralfaro", d: "Fortezza moresca + castello in collina con vista sul porto. Biglietto combinato. Vai presto: è in salita e fa caldo. ~2 ore.", map: "Alcazaba de Málaga" },
            { t: "11:45", n: "Cattedrale de la Encarnación", d: "La “Manquita” (le manca una torre). Esterno splendido. Centralissima.", map: "Catedral de Málaga" },
            { t: "12:15", n: "Mercado de Atarazanas", d: "Mercato coperto in ex arsenale moresco, vetrata colorata. Magari un tapeo veloce dentro.", map: "Mercado de Atarazanas Málaga" },
            { t: "13:00", n: "Pranzo: Mesón Mariano o La Recova", d: "Mesón Mariano per carne/alcachofas amate dai locali; La Recova per un'opzione casalinga e centrale.", map: "Mesón Mariano Málaga" },
            { t: "14:30", n: "Quartiere Soho + Calle Larios", d: "Soho per i murales di street art (zona Centre Pompidou), poi rientro verso Larios per ultimi acquisti/foto.", map: "Soho Málaga" },
            { t: "15:30", n: "Ultimo caffè: Next Level o Mi Cafecito", d: "Pausa fresca prima di prendere i bagagli.", map: "Next Level Specialty Coffee Málaga" },
            { t: "17:00", n: "Rientro hotel/bagagli → Estación María Zambrano", d: "", map: "Estación María Zambrano Málaga" },
            { t: "18:20", n: "Treno Iryo 06189 per Madrid", d: "🚄 18:20 → 21:23." }
          ]
        }
      ],
      directory: {
        "Attrazioni": ["Alcazaba", "Castillo de Gibralfaro", "Catedral de la Encarnación", "Mercado de Atarazanas", "Calle Marqués de Larios", "Plaza de la Constitución", "Quartiere Soho", "San Juan Rooftop + chiesa"],
        "Spiagge / gite": ["Nerja - Balcón de Europa", "Nerja - Cuevas", "Maro - Cascada + spiaggia", "Nerja - Playa Burriana", "Malagueta Beach (in città)", "Pedregalejo Beach", "Peñón del Cuervo Beach", "Cueva del Tesoro (Rincón de la Victoria)", "Caminito del Rey (solo se prenotato)"],
        "Colazione / caffè": ["Cousin Brunch", "Kima Coffee", "Obi Caffetteria", "Concept 30", "Next Level Specialty Coffee", "Mi Cafecito", "Casa Aranda (churros)", "Granier"],
        "Tapas / pranzo / cena": ["El Pimpi", "La Fontana", "La Tranca", "Las Merchanas", "Pampa Grill", "Mesón Mariano", "Mesón Ibérico", "Los Mellizos", "TKO Málaga", "Los Tacos", "La Recova", "Casa Lola", "Picasso Bar Tapas"],
        "Rooftop": ["Molina Lario", "Rooftop AC Marriott", "La Terraza de San Telmo", "La Terraza de la Alcazaba", "Only YOU Hotel Rooftop"]
      },
      remember: ["Acqua sempre con te (caldo)", "Cappello + crema solare, soprattutto per Nerja/Maro", "Per Nerja: controlla in anticipo gli orari del bus ALSA andata E ritorno", "Costume + telo nello zaino il venerdì", "Cena spagnola = 21-22 in poi", "Sabato: verso le 17 rientro per il treno delle 18:20"]
    },

    {
      id: "mad",
      name: "Madrid",
      q: "Madrid",
      dates: "20–22 giugno",
      emoji: "🐻",
      theme: "mad",
      intro: "Itinerario compatto: 1 sera tarda + 1 giorno pieno + 1 mezza mattina finale.",
      lodging: { addr: "Chueca / Malasaña (centralissimo)", q: "Chueca, Madrid", move: "Quasi tutto a piedi; metro capillare per il resto; BiciMAD (e-bici) per Retiro/centro." },
      know: [
        "Tempo reale: arrivi sabato 20 alle 21:23 (solo la sera) e riparti lunedì 22 col treno Avlo delle 12:30 per Valencia. 1 sera + 1 giorno pieno (domenica) + mezza mattina.",
        "Caldo: a giugno secca e calda, 33-36°C a metà giornata. Mattina e sera fuori, ore centrali al fresco/museo.",
        "Reina Sofía gratis: domenica 12:30-14:30. È l'unico museo del piano. Il Guernica di Picasso è qui. Arriva qualche minuto prima per la coda.",
        "Prado: gratis 18-20 (e domenica 17-19). Lasciato fuori per non sovrapporsi. Se preferisci, scambialo col Reina Sofía.",
        "Domenica = El Rastro: il mercatino delle pulci la domenica mattina nella zona La Latina / Ribera de Curtidores.",
        "Tempio di Debod: tempio egizio su una collinetta. Il tramonto qui è IL momento clou di Madrid — domenica sera.",
        "Domenica chiusure: alcuni ristoranti/locali cambiano orario — controlla su Maps prima di puntarci."
      ],
      days: [
        {
          date: "2026-06-20", wd: "Sabato 20 giugno", title: "Arrivo a sera tarda",
          note: "Arrivo alle 21:23. Alloggio in zona Chueca/Malasaña (centralissimo): molla la valigia ed esci leggero. Serata leggera: cena tarda (Madrid cena tardissimo, sei in orario perfetto).",
          items: [
            { t: "22:00", n: "Cena tarda zona centro / La Latina", d: "Tipico: Juana la Loca (tortilla mitica) o La Maruca. Per qualcosa di rapido, tapas in zona Sol.", map: "Juana la Loca Madrid" },
            { t: "23:30", n: "Dolce notturno: Chocolatería San Ginés", d: "Churros con cioccolata, aperta fino a tardissimo (storica, dal 1894). Primo “benvenuto a Madrid”.", map: "Chocolatería San Ginés" },
            { t: "—", n: "Opzionale · Rooftop: Azotea del Círculo de Bellas Artes", d: "Se hai energia, una delle viste migliori sulla Gran Vía (controlla l'orario di chiusura).", map: "Azotea del Círculo de Bellas Artes" }
          ]
        },
        {
          date: "2026-06-21", wd: "Domenica 21 giugno", title: "Il giorno pieno",
          note: "Giornata chiave. Mattina centro monumentale, mezzogiorno Reina Sofía (gratis 12:30-14:30), pomeriggio Retiro, sera Debod al tramonto.",
          items: [
            { t: "08:30", n: "Colazione: La Mallorquina o Santo Bakehouse", d: "La Mallorquina (Puerta del Sol) è l'istituzione storica delle paste; Santo Bakehouse per qualcosa di più moderno.", map: "La Mallorquina Madrid" },
            { t: "09:15", n: "Puerta del Sol + Plaza Mayor", d: "Il cuore di Madrid presto, prima della folla. Il “Km 0” e la piazza porticata seicentesca.", map: "Plaza Mayor Madrid" },
            { t: "09:45", n: "Mercado de San Miguel", d: "Mercato gastronomico in struttura di ferro e vetro, a due passi da Plaza Mayor.", map: "Mercado de San Miguel Madrid" },
            { t: "10:15", n: "Palacio Real + Cattedrale de la Almudena", d: "Il palazzo reale (esterni e piazza splendidi) e la cattedrale di fronte. Affaccio sui giardini e sul Campo del Moro.", map: "Palacio Real de Madrid" },
            { t: "11:30", n: "El Rastro + La Latina", d: "Scendi verso il mercatino delle pulci e il barrio di La Latina, vivissimo la domenica. Calle de la Ruda è qui.", map: "El Rastro Madrid" },
            { t: "12:30", n: "Museo Reina Sofía", d: "Gratis 12:30-14:30. Il Guernica di Picasso e l'arte del '900. Arriva prima per la coda. ~1h30 dentro.", map: "Museo Reina Sofía", star: true },
            { t: "14:30", n: "Pranzo: Taberna Antonio Sánchez o Arrocería Marina Ventura", d: "Taberna storica per tipico madrileno, oppure paella/arroz se ti va il riso.", map: "Taberna Antonio Sánchez Madrid" },
            { t: "16:00", n: "Parque del Retiro + Palacio de Cristal", d: "Il polmone verde di Madrid. Il Palacio de Cristal (serra ottocentesca) è bellissimo. Barchette sul laghetto se ti va.", map: "Palacio de Cristal Retiro Madrid" },
            { t: "17:30", n: "Puerta de Alcalá + Plaza de Cibeles", d: "Uscendo dal Retiro, due icone a due passi. Cibeles ha anche un rooftop (CentroCentro).", map: "Plaza de Cibeles Madrid" },
            { t: "19:00", n: "Gran Vía + Plaza de España", d: "La passeggiata sul grande viale, insegne e palazzi, fino a Plaza de España.", map: "Gran Vía Madrid" },
            { t: "20:30", n: "Tempio di Debod — tramonto", d: "Tempio egizio sulla collinetta del Parque de la Montaña, il tramonto migliore di Madrid. Arriva con anticipo per prendere posto.", map: "Templo de Debod Madrid", star: true },
            { t: "22:00", n: "Cena: Casa Macareno o Bodega de la Ardosa", d: "Zona Malasaña/Chueca. Tapas e taberna classica per chiudere in bellezza. Vicino c'è anche il Mercado de San Antón.", map: "Casa Macareno Madrid" }
          ]
        },
        {
          date: "2026-06-22", wd: "Lunedì 22 giugno", title: "Mezza mattina + partenza",
          note: "Mattina cortissima. Treno Avlo 05184 per Valencia alle 12:30 → verso le 11:30 in stazione (Puerta de Atocha).",
          items: [
            { t: "08:30", n: "Colazione: PANEM o Santa Gloria", d: "Pasticceria/caffè per iniziare. In alternativa Ciento Treinta Grados per pane/dolci.", map: "PANEM Madrid" },
            { t: "09:15", n: "Ultimo giro", d: "A seconda di dove dormi: Plaza de España / Gran Vía, oppure quello che ti è mancato sabato sera." },
            { t: "10:45", n: "Rientro hotel/bagagli", d: "" },
            { t: "11:30", n: "Estación Puerta de Atocha", d: "Controlla da quale stazione parte l'Avlo (di solito Atocha per Valencia).", map: "Estación Puerta de Atocha Madrid" },
            { t: "12:30", n: "Treno Avlo 05184 per Valencia", d: "🚄 12:30 → 14:30." }
          ]
        }
      ],
      directory: {
        "Attrazioni e zone": ["Museo del Prado (gratis 18-20 / dom 17-19)", "Museo Reina Sofía (gratis dom 12:30-14:30)", "Plaza Mayor", "Puerta del Sol", "Parque del Retiro", "Palacio de Cristal", "Palacio Real", "Giardini Campo del Moro", "Teatro Real", "Mercado de San Miguel", "Cattedrale de la Almudena", "Gran Vía", "Puerta de Alcalá", "Plaza de Cibeles", "La Latina", "Calle de la Ruda", "Chueca + Mercado de San Antón", "Plaza de España", "Tempio di Debod (Parque de la Montaña)", "Parque Warner (fuori città)"],
        "Colazione / dolci": ["Chocolatería San Ginés", "La Mallorquina", "PANEM", "Santo Bakehouse", "Ciento Treinta Grados", "Amazonia", "Santa Gloria", "Bestial by Rosi la Loca"],
        "Ristoranti": ["Botín (il più antico del mondo)", "Alto Bardero", "Taberna Antonio Sánchez", "Casa Rúa", "Arrocería Marina Ventura", "La Campana", "Dani Brasserie", "La Casa Amande", "Gaston", "Cachivache", "Arroz Señoret (paella)", "Tinto de Verano"],
        "Tapas": ["Casa Macareno", "La Maruca", "Varra", "Casa Tabacos", "Hermanos Cotilla", "Juana la Loca", "Pez Tortilla", "Casa del Abuelo", "Casa Toni", "Tapa Tapa", "Bodega de la Ardosa"],
        "Rooftop": ["Sky 44 Rooftop Bar", "Riu Rooftop (Plaza España)", "El Viajero Secret Rooftop", "Azotea del Círculo", "360 Rooftop Bar", "Picos Pardos", "Le Tavernier", "Picalagartos", "The Principal Madrid"]
      },
      remember: ["Reina Sofía: domenica gratis 12:30-14:30, arriva prima per la coda", "Domenica mattina c'è El Rastro a La Latina", "Debod al tramonto: arriva con anticipo", "Acqua + cappello (caldo secco)", "Madrid cena tardi (21-22+)", "Lunedì: verso le 11:30 in stazione (Atocha) per l'Avlo delle 12:30"]
    },

    {
      id: "val",
      name: "Valencia",
      q: "Valencia",
      dates: "22–26 giugno",
      emoji: "🥘",
      theme: "val",
      intro: "Ritmo rilassato (siete stanchi!): mattine mare/fuori porta, pomeriggi-sere in città.",
      lodging: { addr: "Pobles del Sud / La Torre (~4 km a sud)", q: "La Torre, Valencia", move: "Al centro con metro/bus o bici (Valenbisi, città piatta); tram alla Malvarrosa; Albufera bus 25 da Porta de la Mar; aeroporto metro 3/5." },
      know: [
        "Tempo reale: arrivi lunedì 22 alle 14:30 e voli via venerdì 26 alle 16:45 (in aeroporto verso le 14:45). 1 pomeriggio + 3 giorni pieni + 1 mezza mattina. Si può andare piano.",
        "⭐ Nit de Sant Joan (notte 23→24): la festa del solstizio. A Valencia si vive sulla spiaggia della Malvarrosa: falò, fuochi d'artificio, salti sul fuoco e bagno di mezzanotte. Verifica programma/orari in loco. Il 24 (San Juan) alcune cose hanno orari da festivo.",
        "Caldo: giugno 30-34°C, ma c'è la brezza di mare. Il tramonto è tardi (~21:30), sere lunghe e fresche.",
        "Niente auto: Montanejos richiede l'auto, lasciato fuori. Albufera e Porto Saplaya si fanno coi mezzi.",
        "Paella = piatto del pranzo: si mangia a mezzogiorno. La Riuà è perfetta come pranzo. L'Albufera/El Palmar è dove è nata la paella valenciana.",
        "Mercado Central: mattutino, chiude verso le 15, chiuso la domenica.",
        "Muoversi: centro a piedi; spiagge (Malvarrosa) in tram/metro; Albufera col bus 25 da Porta de la Mar (~40 min); aeroporto con metro 3/5 (~25 min)."
      ],
      days: [
        {
          date: "2026-06-22", wd: "Lunedì 22 giugno", title: "Arrivo + centro storico",
          note: "Arrivo alle 14:30. Alloggio in zona Pobles del Sud (~4 km a sud): lascia la valigia ed esci leggero. Per il centro: metro/bus o bici (Valenbisi, città piatta). Poi il casco antiguo si gira a piedi.",
          items: [
            { t: "17:00", n: "Plaza de la Virgen + Cattedrale", d: "Il cuore della città vecchia. Se hai voglia, sali sul campanile Miguelete (207 scalini).", map: "Plaza de la Virgen Valencia" },
            { t: "18:15", n: "La Finca / Casa Más Estrecha", d: "La facciata più stretta d'Europa, in Plaza Lope de Vega. Foto veloce, sei già in zona.", map: "Casa Más Estrecha Valencia" },
            { t: "18:45", n: "Torres de Serranos", d: "L'antica porta gotica della città. Si può salire: vista sul centro e sul Turia.", map: "Torres de Serranos Valencia" },
            { t: "20:00", n: "Aperitivo rooftop: Ateneo Rooftop Bar", d: "Sulla Plaza del Ayuntamiento, vista dall'alto sul centro per il primo brindisi.", map: "Ateneo Rooftop Bar Valencia" },
            { t: "21:00", n: "Cena: La Finestra o Casa Raíz", d: "Prima cena tranquilla in centro.", map: "La Finestra Valencia" }
          ]
        },
        {
          date: "2026-06-23", wd: "Martedì 23 giugno", title: "Mattina mare + Nit de Sant Joan",
          note: "Giornata leggera apposta: vi conservate per la notte di Sant Joan in spiaggia.",
          items: [
            { t: "09:30", n: "Porto Saplaya — la “Venezia spagnola”", d: "Casette colorate sui canali, a nord città (bus/metro ~25-30 min). Giro tranquillo + caffè, c'è anche una spiaggia accanto.", map: "Port Saplaya" },
            { t: "12:30", n: "Rientro + pranzo leggero", d: "Qualcosa di veloce, oggi si tiene il motore basso." },
            { t: "15:00", n: "Riposo / piscina / ozio", d: "15:00-18:00. Stasera si fa tardi, ricaricate le batterie." },
            { t: "19:30", n: "Playa de la Malvarrosa", d: "Andate presto per prendere posto. Cena di pesce/paella sul paseo marittimo (zona Las Arenas/Malvarrosa).", map: "Playa de la Malvarrosa Valencia" },
            { t: "22:30", n: "Nit de Sant Joan sulla spiaggia", d: "Fino a mezzanotte: falò, fuochi, e a mezzanotte il bagno tradizionale. Atmosfera incredibile. Verifica orari/zone consentite in loco.", map: "Playa de la Malvarrosa Valencia", star: true }
          ]
        },
        {
          date: "2026-06-24", wd: "Mercoledì 24 giugno", title: "Recupero + Città delle Arti e delle Scienze",
          note: "Dopo la nottata, sveglia con comodo. Il 24 è San Juan: controlla che Oceanogràfic e simili abbiano orario normale.",
          items: [
            { t: "11:00", n: "Colazione lenta", d: "Vi siete meritati un risveglio pigro." },
            { t: "12:00", n: "Ciudad de las Artes y las Ciencias", d: "Il complesso futurista di Calatrava, spettacolare anche solo da fuori (passerelle e vasche d'acqua gratis da passeggiare).", map: "Ciudad de las Artes y las Ciencias Valencia" },
            { t: "13:00", n: "Oceanogràfic", d: "Il più grande acquario d'Europa. Dentro è fresco, perfetto per le ore calde. ~2-3 ore.", map: "Oceanogràfic Valencia" },
            { t: "16:30", n: "Parc Gulliver", d: "Il gigante Gulliver disteso su cui si cammina/scivola, dentro il letto del Turia. Due passi dalla Città delle Arti.", map: "Parc Gulliver Valencia" },
            { t: "17:30", n: "Jardín del Turia", d: "Il fiume deviato è diventato un parco lungo 9 km. Passeggiata/bici al fresco verso il centro.", map: "Jardín del Turia Valencia" },
            { t: "21:00", n: "Cena: Cañas y Tapas o tapeo a Ruzafa", d: "Ruzafa è il quartiere più vivo la sera.", map: "Ruzafa Valencia" }
          ]
        },
        {
          date: "2026-06-25", wd: "Giovedì 25 giugno", title: "Centro/Botanico + tramonto all'Albufera",
          note: "Mattina mercato e verde, pranzo di paella vera, sera il tramonto top dell'Albufera tra le risaie.",
          items: [
            { t: "09:30", n: "Mercado Central + La Lonja de la Seda", d: "Uno dei mercati coperti più belli d'Europa (modernista) e di fronte la Lonja gotica (UNESCO). Coppia perfetta.", map: "Mercado Central Valencia" },
            { t: "11:00", n: "Jardín Botánico", d: "Giardino storico dell'università, ombroso e tranquillo. Vicino alle Torres de Quart.", map: "Jardín Botánico Universidad de Valencia" },
            { t: "14:00", n: "Pranzo: La Riuà 😜", d: "LA paella che ti eri segnato! Istituzione del centro, prenota se puoi. Qui si pranza, come vuole la tradizione.", map: "La Riuà Valencia", star: true },
            { t: "16:00", n: "Riposo / spiaggia veloce", d: "16:00-18:00. Pausa al fresco prima della gita serale." },
            { t: "19:00", n: "Bus 25 verso Albufera (El Palmar)", d: "La laguna a sud, regno delle risaie. Da Porta de la Mar, ~40 min.", map: "El Palmar Albufera Valencia" },
            { t: "20:30", n: "Giro in barca al tramonto sull'Albufera", d: "Il “supertop” della tua lista. Le barchette partono dall'imbarcadero di El Palmar, il tramonto sull'acqua tra le risaie è la cosa più bella di Valencia.", map: "Embarcadero El Palmar Albufera", star: true },
            { t: "21:30", n: "Cena a El Palmar", d: "I ristoranti del paese fanno la paella delle origini. Se a pranzo hai già fatto La Riuà, qui prendi qualcosa di leggero o un all i pebre (anguilla locale).", map: "El Palmar Valencia restaurantes" }
          ]
        },
        {
          date: "2026-06-26", wd: "Venerdì 26 giugno", title: "Mezza mattina + volo",
          note: "Mattina corta e rilassata, poi aeroporto. Volo alle 16:45 → in aeroporto verso le 14:45 (metro 3/5, ~25 min).",
          items: [
            { t: "09:30", n: "Colazione + ultimo giro", d: "Quello che vi è mancato, o un ultimo caffè in centro / sul Turia." },
            { t: "12:00", n: "Pranzo veloce in centro vicino all'hotel", d: "" },
            { t: "13:45", n: "Rientro hotel/bagagli", d: "" },
            { t: "14:15", n: "Metro per Aeroporto di Valencia (Manises)", d: "Metro linee 3/5, ~25 min.", map: "Aeropuerto de Valencia Manises" },
            { t: "16:45", n: "Volo ✈️", d: "Fine del viaggio. ¡Hasta luego, España!" }
          ]
        }
      ],
      directory: {
        "Città — attrazioni": ["Ciudad de las Artes y las Ciencias", "Oceanogràfic", "Jardín del Turia", "Parc Gulliver", "Jardín Botánico", "Torres de Serranos", "Torres de Quart", "Mercado Central", "La Lonja de la Seda", "Cattedrale + Miguelete", "Plaza de la Virgen", "La Finca / Casa Más Estrecha"],
        "Mare e gite fuori porta": ["Albufera / El Palmar (tramonto in barca ⭐)", "Playa de la Malvarrosa (+ Sant Joan il 23)", "Playa de la Patacona", "Porto Saplaya (Venezia spagnola)", "Catamarano al tramonto (porto)", "Montanejos (difficile senza auto)"],
        "Ristoranti / paella": ["La Riuà (paella ⭐, a pranzo)", "La Finestra", "Casa Raíz", "Cañas y Tapas", "Ristoranti di El Palmar (Albufera)"],
        "Rooftop / bar": ["Ateneo Rooftop Bar"]
      },
      remember: ["⭐ Notte del 23: Sant Joan alla Malvarrosa — il momento dell'anno", "Il 24 (San Juan) controlla gli orari da festivo di acquario/musei", "Paella a pranzo, non a cena (La Riuà → giovedì)", "Mercado Central: solo mattina, chiuso domenica", "Albufera col bus 25 da Porta de la Mar; tramonto ~21:30", "Acqua + cappello + crema (ma c'è brezza di mare)", "Costume sempre nello zaino", "Venerdì: aeroporto con metro 3/5, ~14:45 per il volo delle 16:45"]
    }
  ]
};
