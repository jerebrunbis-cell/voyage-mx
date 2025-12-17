
/* Logique de l’application : rendu jour-par-jour, statut visuel, hyperliens, progression */
const $ = sel => document.querySelector(sel);
const daySelector = $('#daySelector');
const dayContent = $('#dayContent');
const progressText = $('#progressText');
const progressCircle = $('#progressCircle');

// États de paiement -> style + libellé
const STATUS_MAP = {
  paye: { cls: 'status-paid', label: '✅ PAYÉ' },
  prepaye: { cls: 'status-paid', label: '✅ PRÉPAYÉ' },
  a_payer: { cls: 'status-onsite', label: '⚠️ À PAYER sur place' },
  non_reserve: { cls: 'status-nobook', label: '❌ NON RÉSERVÉ' },
  debit_prevu: { cls: 'status-onsite', label: '⚠️ Débit prévu' },
  inclut_pdj: { cls: 'status-paid', label: '✅ Petit-déjeuner inclus' }
};

// Initialise le sélecteur des jours
function initSelector() {
  TRIP.days.forEach((d, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${d.j} – ${formatDate(d.date)} · ${d.destination}`;
    daySelector.appendChild(opt);
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Progression circulaire SVG
function renderProgress(currentIdx) {
  const total = TRIP.totalDays;
  const done = currentIdx + 1;
  const pct = Math.round((done / total) * 100);
  progressText.textContent = `Jour ${done} / ${total} (${pct}%)`;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - done / total);
  progressCircle.innerHTML = `
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="44" stroke="#eee" stroke-width="8" fill="none"/>
      <circle cx="48" cy="48" r="44" stroke="var(--turquoise)" stroke-width="8" fill="none"
              stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
      <text x="50%" y="54%" text-anchor="middle" fill="var(--terracotta)" font-size="16" font-weight="700">${pct}%</text>
    </svg>`;
}

// Construit les boutons d’action (liens activables)
function actionButtons(day) {
  const actions = [];
  const { links = {}, contact = {} } = day;
  if (links.maps) actions.push(`<a class="action" href="${links.maps}" target="_blank" rel="noopener">Ouvrir Google Maps</a>`);
  if (day.reservation?.url) actions.push(`<a class="action" href="${day.reservation.url}" target="_blank" rel="noopener">Ouvrir la réservation (${day.reservation.provider || ''})</a>`);
  if (links.reservation) actions.push(`<a class="action outline" href="${links.reservation}" target="_blank" rel="noopener">Lien Réservation</a>`);
  if (contact.phone) actions.push(`<a class="action" href="tel:${contact.phone.replace(/\s+/g,'')}">Contacter l'hôte (📞 ${contact.phone})</a>`);
  if (contact.whatsapp) actions.push(`<a class="action" href="https://wa.me/${contact.whatsapp.replace(/\D+/g,'')}" target="_blank" rel="noopener">WhatsApp hôte</a>`);
  return actions.length ? `<div class="actions">${actions.join('')}</div>` : '';
}

// Rendu d’un jour
function renderDay(idx) {
  const d = TRIP.days[idx];
  daySelector.value = String(idx);
  renderProgress(idx);

  const status = STATUS_MAP[d.reservation?.status] || null;
  const statusHtml = status ? `<span class="status ${status.cls}">${status.label}</span>` : '';

  const rows = [];
  rows.push(row('Date', `${formatDate(d.date)} · ${d.j}`));
  rows.push(row('Destination / Activité', `<strong>${d.destination}</strong>${d.activity ? ' – ' + d.activity : ''}`));
  const lodgingText = d.lodging?.name ? `<strong>${d.lodging.name}</strong>${formatCI(d.lodging)}` : '—';
  rows.push(row('Hébergement', lodgingText));
  const resText = d.reservation?.provider || d.reservation?.status ? `${d.reservation.provider || ''} ${d.reservation.cost ? ' : ' + d.reservation.cost : ''} ${statusHtml}` : '—';
  rows.push(row('Réservation & Coût', resText));
  const notes = [].concat(d.notes || [], d.taxes || []).filter(Boolean);
  if (notes.length) rows.push(row('Logistique / Notes', list(notes)));

  dayContent.innerHTML = rows.join('') + actionButtons(d);
}

function row(label, valueHtml) {
  return `<div class="day-row"><div class="label">${label}</div><div>${valueHtml}</div></div>`;
}
function formatCI(lodging) {
  const ci = lodging.checkin ? ` (Check-in ${lodging.checkin}` : '';
  const co = lodging.checkout ? `${lodging.checkin ? ' / ' : ' ('}Out ${lodging.checkout})` : (lodging.checkin ? ')' : '');
  return (ci || co) ? (ci + co) : '';
}
function list(items) {
  return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

// Navigation
$('#prevDay').addEventListener('click', () => {
  const idx = Number(daySelector.value);
  renderDay(Math.max(0, idx - 1));
});
$('#nextDay').addEventListener('click', () => {
  const idx = Number(daySelector.value);
  renderDay(Math.min(TRIP.days.length - 1, idx + 1));
});

// Sélecteur direct
daySelector.addEventListener('change', e => renderDay(Number(e.target.value)));

// Partage (Web Share API)
$('#shareBtn').addEventListener('click', async () => {
  const shareData = { title: 'Book de Voyage – Mexique/Yucatán/Belize', text: 'Ouvre notre Book de Voyage (J1 à J15) :', url: location.href };
  try { if (navigator.share) await navigator.share(shareData); else alert('Copiez l’URL : ' + location.href); } catch (e) { console.warn('Share canceled', e); }
});

// Détermination du jour courant (si la date du jour est dans l’intervalle)
function initialDayIndex() {
  const today = new Date();
  const idx = TRIP.days.findIndex(d => new Date(d.date + 'T00:00:00').toDateString() === today.toDateString());
  return idx >= 0 ? idx : 0;
}

// Chargement des images d’hébergement (espace futur)
function loadPhotos() {
  const grid = document.getElementById('photoGrid');
  // Placeholders; remplacez par vos photos (URLs) plus tard
  const placeholders = [
    'https://picsum.photos/seed/casa-abuela/500/300',
    'https://picsum.photos/seed/sea-dreams/500/300',
    'https://picsum.photos/seed/selina/500/300'
  ];
  grid.innerHTML = placeholders.map(u => `<img loading="lazy" src="${u}" alt="Photo hébergement"/>`).join('');
}

// PWA – enregistrement du SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

// Init
initSelector();
loadPhotos();
renderDay(initialDayIndex());
``
