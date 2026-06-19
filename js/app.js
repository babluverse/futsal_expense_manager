// ── DOM Elements ──
const turfFeeInput = document.getElementById('turf-fee');
const playerNameInput = document.getElementById('player-name');
const addPlayerBtn = document.getElementById('add-player-btn');
const playerList = document.getElementById('player-list');
const perPersonEl = document.getElementById('per-person');
const totalCollectedEl = document.getElementById('total-collected');
const totalDueEl = document.getElementById('total-due');

// ── State ──
let players = [];

// ── Calculate & Render Summary ──
function updateSummary() {
  const totalFee = parseFloat(turfFeeInput.value) || 0;
  const count = players.length;
  const perPerson = count > 0 ? Math.ceil(totalFee / count) : 0;

  let collected = 0;
  let due = 0;

  players.forEach(p => {
    if (p.paid) {
      collected += perPerson;
    } else {
      due += perPerson;
    }
  });

  perPersonEl.textContent = `Rs. ${perPerson}`;
  totalCollectedEl.textContent = `Rs. ${collected}`;
  totalDueEl.textContent = `Rs. ${due}`;
}

// ── Render Player List ──
function renderPlayers() {
  playerList.innerHTML = '';

  const totalFee = parseFloat(turfFeeInput.value) || 0;
  const count = players.length;
  const perPerson = count > 0 ? Math.ceil(totalFee / count) : 0;

  players.forEach((player, index) => {
    const li = document.createElement('li');
    li.classList.add('player-item');

    li.innerHTML = `
      <span class="player-name">${player.name}</span>
      <span class="player-amount">Rs. ${perPerson}</span>
      <button class="status-btn ${player.paid ? 'paid' : 'due'}" data-index="${index}">
        ${player.paid ? 'Paid' : 'Due'}
      </button>
      <button class="remove-btn" data-index="${index}">✕</button>
    `;

    playerList.appendChild(li);
  });

  updateSummary();
}

// ── Add Player ──
function addPlayer() {
  const name = playerNameInput.value.trim();

  if (!name) {
    playerNameInput.focus();
    return;
  }

  players.push({ name, paid: false });
  playerNameInput.value = '';
  playerNameInput.focus();
  renderPlayers();
}

// ── Toggle Paid / Due ──
function toggleStatus(index) {
  players[index].paid = !players[index].paid;
  renderPlayers();
}

// ── Remove Player ──
function removePlayer(index) {
  players.splice(index, 1);
  renderPlayers();
}

// ── Event Listeners ──
addPlayerBtn.addEventListener('click', addPlayer);

playerNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addPlayer();
});

turfFeeInput.addEventListener('input', renderPlayers);

playerList.addEventListener('click', (e) => {
  const index = parseInt(e.target.dataset.index);

  if (e.target.classList.contains('status-btn')) {
    toggleStatus(index);
  }

  if (e.target.classList.contains('remove-btn')) {
    removePlayer(index);
  }
});