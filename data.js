
// Jeu de données – Book de Voyage (Mexique / Yucatán / Belize)
// Les liens sont activés si fournis et ouvrent l'app correspondante
const TRIP = {
  totalDays: 15,
  days: [
    {
      date: '2026-01-03', j: 'J1', destination: 'Cancún',
      activity: 'Arrivée & récupération voiture',
      lodging: { name: 'Extended Suites Cancun Cumbres', checkin: '15:00', checkout: '12:00' },
      reservation: { provider: 'Booking', cost: '~€74', status: 'debit_prevu', url: null },
      transport: { car: 'HERTZ: 308,28 USD', pickup: '17:30' },
      payment: { onsite: 'Dépôt MXN 250 + Taxes' },
      links: { maps: 'https://maps.google.com/?q=Extended+Suites+Cancun+Cumbres', booking: null },
      contact: { phone: '+52 998 364 4560', whatsapp: null },
      notes: ['Récupération voiture Hertz à 17:30']
    },
    {
      date: '2026-01-04', j: 'J2', destination: 'Bacalar',
      activity: 'Route Cancún -> Bacalar (5h00) / Déjeuner 12:00',
      lodging: { name: 'Logement Bacalar (Casa Tam)', checkin: '15:00', checkout: '11:00' },
      reservation: { provider: 'Airbnb', cost: '152,81 €', status: 'paye', url: 'https://www.airbnb.com/' },
      transport: {},
      links: { maps: 'https://maps.google.com/?q=Bacalar', reservation: 'https://www.airbnb.com/' },
      contact: {},
      notes: ['Repas : Nopalitos Beach ou Cenote Kan Luun', 'Lien Réservation Airbnb']
    },
    {
      date: '2026-01-05', j: 'J3', destination: 'Huay Pix',
      activity: 'Kayak à Bacalar (09:00)',
      lodging: { name: 'Logement Huay-Pix (Gérard)', checkin: '15:00', checkout: '12:00' },
      reservation: { provider: 'Airbnb', cost: '143,35 €', status: 'paye', url: 'https://www.airbnb.com/' },
      links: { maps: 'https://maps.google.com/?q=Laguna+Milagros+Caba%C3%B1a+1%2C+Huay-Pix' },
      contact: {},
      notes: ['Logement inclut Kayaks', 'Adresse : Laguna Milagros Cabaña 1, Huay-Pix']
    },
    {
      date: '2026-01-06', j: 'J4', destination: 'Caye Caulker, Belize',
      activity: 'Ferry international (départ 15:30); Arrivée demandée 17:00-18:00',
      lodging: { name: 'Sea Dreams Hotel', checkin: '15:00-17:00', checkout: '08:00-11:00' },
      reservation: { provider: 'Hotel', cost: '~€904', status: 'prepaye', url: 'https://www.booking.com/' },
      transport: { ferry_outbound: '233,45 € (payé)' },
      links: { booking: 'https://www.booking.com/', maps: 'https://maps.google.com/?q=Sea+Dreams+Hotel+Caye+Caulker' },
      contact: {},
      notes: ['Déposer la voiture à Chetumal']
    },
    { date: '2026-01-07', j: 'J5', destination: 'Caye Caulker', activity: 'Journée Snorkeling', lodging: { name: 'Sea Dreams Hotel' }, reservation: { status: 'inclut_pdj' }, links: {}, contact: {} },
    { date: '2026-01-08', j: 'J6', destination: 'Caye Caulker', activity: 'Journée Plongée', lodging: { name: 'Sea Dreams Hotel' }, reservation: { status: 'inclut_pdj' }, links: {}, contact: {} },
    {
      date: '2026-01-09', j: 'J7', destination: 'Chetumal, Mexique',
      activity: 'Ferry retour départ 12:45 (check-in 2h avant)',
      lodging: { name: 'Fiesta Inn Chetumal', checkin: '15:00', checkout: '12:00' },
      reservation: { provider: 'Hotel', cost: '~€115', status: 'a_payer', url: 'https://www.booking.com/' },
      transport: { ferry_return: '4 320,00 MXN (payé)' },
      taxes: ['Taxe sortie Belize US $20/pers (cash)', 'Taxe entrée Mexique MX $861/pers (carte)'],
      links: { booking: 'https://www.booking.com/' },
      contact: {},
      notes: []
    },
    { date: '2026-01-10', j: 'J8', destination: "Kíichpam K'áax", activity: 'Cenotes – Check-out Chetumal à 12:00', lodging: { name: 'NON RÉSERVÉ' }, reservation: { status: 'non_reserve' }, links: {}, contact: {} },
    { date: '2026-01-11', j: 'J9', destination: "Kíichpam K'áax", activity: 'Centro éco turistico', lodging: { name: 'NON RÉSERVÉ' }, reservation: { status: 'non_reserve' }, links: {}, contact: {} },
    {
      date: '2026-01-12', j: 'J10', destination: 'Mérida',
      activity: 'Arrivée autonome par boîte à clé',
      lodging: { name: 'Logement Centro (CASA ABUELA)', checkin: '14:00', checkout: '13:00' },
      reservation: { provider: 'Airbnb', cost: '242,28 €', status: 'paye', url: 'https://www.airbnb.com/' },
      links: { maps: 'https://maps.google.com/?q=CASA+ABUELA+Merida' },
      notes: ['Déménagement Méline', 'Passage à 2 voyageurs']
    },
    { date: '2026-01-13', j: 'J11', destination: 'Mérida', activity: 'Université Méline, Progreso beach', lodging: { name: 'CASA ABUELA' }, reservation: {}, links: {}, contact: {} },
    {
      date: '2026-01-14', j: 'J12', destination: 'Isla Mujeres',
      activity: 'Check-out Mérida 13:00; Ferry planifié 18:00 (Gran Puerto Ultramar)',
      lodging: { name: 'Nílu Isla Mujeres by Selina', checkin: '15:00-22:30', checkout: '06:00-11:00' },
      reservation: { provider: 'Booking', cost: '~€172,59', status: 'a_payer', url: 'https://www.booking.com/' },
      links: { booking: 'https://www.booking.com/', maps: 'https://maps.google.com/?q=Gran+Puerto+Ultramar' }
    },
    { date: '2026-01-15', j: 'J13', destination: 'Isla Mujeres', activity: 'Journée libre', lodging: { name: 'Nílu Isla Mujeres by Selina' }, reservation: { status: 'inclut_pdj' }, links: {}, contact: {} },
    { date: '2026-01-16', j: 'J14', destination: 'Cancún', activity: 'Retour ferry depuis Isla Mujeres, récupération voiture', lodging: { name: 'NON RÉSERVÉ' }, reservation: { status: 'non_reserve' }, links: {}, contact: {} },
    { date: '2026-01-17', j: 'J15', destination: 'Cancún Aéroport', activity: 'Restitution du véhicule HERTZ à 20:30', lodging: { name: '—' }, reservation: { provider: 'HERTZ', status: 'paye' }, links: { maps: 'https://maps.google.com/?q=Cancun+Airport+    { date: '2026-01-17', j: 'J15', destination: 'Cancún Aéroport', activity: 'Restitution du véhicule HERTZ à 20:30', lodging: { name: '—' }, reservation: { provider: 'HERTZ', status: 'paye' }, links: { maps: 'https://maps.google.com/?q=Cancun+Airport+Car+Return+Hertz' }, contact: {} }
  ]
