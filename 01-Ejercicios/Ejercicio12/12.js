/* ── Mi Colección — 12.JS ─────────────────────────────── */

const collection = [];
let currentFilter = 'all';
let selectedRating = 0;

/* ── DOM refs ─────────────────────────────────────────── */
const counterEl    = document.getElementById('counter');
const errorMsg     = document.getElementById('error-msg');
const grid         = document.getElementById('collection-grid');
const emptyState   = document.getElementById('empty-state');
const noResults    = document.getElementById('no-results');
const addBtn       = document.getElementById('add-btn');
const themeBtn     = document.getElementById('theme-btn');
const stars        = document.querySelectorAll('.star');
const filterBtns   = document.querySelectorAll('.filter-btn');

const fName   = document.getElementById('f-name');
const fDesc   = document.getElementById('f-desc');
const fType   = document.getElementById('f-type');
const fStatus = document.getElementById('f-status');
const fRating = document.getElementById('f-rating');
const fImg    = document.getElementById('f-img');

/* ── Theme toggle ─────────────────────────────────────── */
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

/* ── Stars ────────────────────────────────────────────── */
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.val);
        fRating.value = selectedRating;
        updateStarUI(selectedRating);
    });

    star.addEventListener('mouseenter', () => {
        highlightStars(parseInt(star.dataset.val));
    });
});

document.getElementById('star-group').addEventListener('mouseleave', () => {
    updateStarUI(selectedRating);
});

function highlightStars(n) {
    stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= n);
    });
}

function updateStarUI(n) {
    stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= n);
    });
}

function resetStars() {
    selectedRating = 0;
    fRating.value = 0;
    updateStarUI(0);
}

/* ── Filters ──────────────────────────────────────────── */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filterType;
        renderGrid();
    });
});

/* ── Error helper ─────────────────────────────────────── */
function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
    // Re-trigger animation
    errorMsg.style.animation = 'none';
    void errorMsg.offsetWidth;
    errorMsg.style.animation = '';
    setTimeout(() => errorMsg.classList.remove('visible'), 3000);
}

/* ── Add element ──────────────────────────────────────── */
addBtn.addEventListener('click', () => {
    const name   = fName.value.trim();
    const desc   = fDesc.value.trim();
    const type   = fType.value;
    const status = fStatus.value;
    const rating = parseInt(fRating.value) || 0;
    const img    = fImg.value.trim();

    if (!name)   return showError('El nombre es obligatorio.');
    if (!type)   return showError('Elegí un tipo.');
    if (!status) return showError('Elegí un estado.');

    const item = {
        id: Date.now(),
        name,
        desc,
        type,
        status,
        rating,
        img
    };

    collection.push(item);
    updateCounter();
    renderGrid();
    clearForm();
});

/* ── Clear form ───────────────────────────────────────── */
function clearForm() {
    fName.value   = '';
    fDesc.value   = '';
    fType.value   = '';
    fStatus.value = '';
    fImg.value    = '';
    resetStars();
}

/* ── Counter ──────────────────────────────────────────── */
function updateCounter() {
    counterEl.textContent = collection.length;
}

/* ── Status cycle ─────────────────────────────────────── */
const statusCycle = ['Pendiente', 'En progreso', 'Terminado'];

function cycleStatus(id) {
    const item = collection.find(i => i.id === id);
    if (!item) return;
    const idx = statusCycle.indexOf(item.status);
    item.status = statusCycle[(idx + 1) % statusCycle.length];
    renderGrid();
}

/* ── Delete ───────────────────────────────────────────── */
function deleteItem(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.add('removing');
        card.addEventListener('animationend', () => {
            const idx = collection.findIndex(i => i.id === id);
            if (idx !== -1) collection.splice(idx, 1);
            updateCounter();
            renderGrid();
        }, { once: true });
    }
}

/* ── Type emoji ───────────────────────────────────────── */
function typeEmoji(type) {
    const map = {
        'Videojuego': '🎮',
        'Película':   '🎬',
        'Serie':      '📺',
        'Otro':       '✦',
    };
    return map[type] || '◈';
}

/* ── Stars string ─────────────────────────────────────── */
function starsString(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* ── Render grid ──────────────────────────────────────── */
function renderGrid() {
    // Remove existing cards (keep empty-state and no-results)
    const existingCards = grid.querySelectorAll('.card');
    existingCards.forEach(c => c.remove());

    const filtered = currentFilter === 'all'
        ? collection
        : collection.filter(i => i.type === currentFilter);

    // Empty state logic
    emptyState.style.display    = collection.length === 0 ? 'block' : 'none';
    noResults.style.display     = collection.length > 0 && filtered.length === 0 ? 'block' : 'none';

    filtered.forEach((item, index) => {
        const card = buildCard(item, index);
        grid.appendChild(card);
    });
}

/* ── Build card ───────────────────────────────────────── */
function buildCard(item, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = item.id;
    card.style.animationDelay = `${index * 40}ms`;

    const statusClass = item.status.replace(' ', '.');

    card.innerHTML = `
        ${item.img
            ? `<img class="card-img" src="${escapeAttr(item.img)}" alt="${escapeAttr(item.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="card-img-placeholder" style="display:none;">${typeEmoji(item.type)}</div>`
            : `<div class="card-img-placeholder">${typeEmoji(item.type)}</div>`
        }
        <div class="card-body">
            <div class="card-meta">
                <span class="card-type">${escapeHTML(item.type)}</span>
                ${item.rating > 0 ? `<span class="card-stars" title="${item.rating}/5">${starsString(item.rating)}</span>` : ''}
            </div>
            <div class="card-title">${escapeHTML(item.name)}</div>
            ${item.desc ? `<div class="card-desc">${escapeHTML(item.desc)}</div>` : ''}
        </div>
        <div class="card-footer">
            <span class="status-badge status-${statusClass}" data-status="${escapeAttr(item.status)}" title="Clic para cambiar estado">${escapeHTML(item.status)}</span>
            <button class="delete-btn" title="Eliminar">✕</button>
        </div>
    `;

    // Status click
    card.querySelector('.status-badge').addEventListener('click', () => {
        cycleStatus(item.id);
    });

    // Delete click
    card.querySelector('.delete-btn').addEventListener('click', () => {
        deleteItem(item.id);
    });

    return card;
}

/* ── Escape helpers ───────────────────────────────────── */
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ── Init ─────────────────────────────────────────────── */
renderGrid();