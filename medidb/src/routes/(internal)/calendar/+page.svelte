<script>
// @ts-nocheck

  import { writable } from 'svelte/store';

  // --- State ---
  let currentYear = 2024;
  let currentMonth = 3; // 0-indexed: 3 = April

  const MONTH_NAMES = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  // Sample appointments
  let appointments = [
    { id: 1, date: '2024-04-10', title: 'Physical Exam', patient: 'Emma Nielsen',   time: '08:00' },
    { id: 2, date: '2024-04-10', title: 'Blood test',    patient: 'John Carter',    time: '09:30' },
    { id: 3, date: '2024-04-10', title: 'Gender Hormones',patient: 'Sophia Lee',   time: '10:00' },
    { id: 4, date: '2024-04-10', title: 'Prescription refill', patient: 'Micheal Brown', time: '10:30' },
    { id: 5, date: '2024-04-15', title: 'Follow-up',     patient: 'Lars Eriksen',   time: '14:00' },
    { id: 6, date: '2024-04-22', title: 'Consultation',  patient: 'Mia Andersen',   time: '11:00' },
  ];

  // Show modal state
  let showModal = false;
  let newAppt = { date: '', title: '', patient: '', time: '' };

  // --- Derived calendar grid ---
  $: firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
  $: daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Convert JS Sunday=0 to Mon=0 offset
  $: startOffset = (firstDayOfMonth + 6) % 7;

  $: calendarCells = (() => {
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  })();

  $: today = new Date();
  $: isToday = (/** @type {number} */ day) =>
    day &&
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth &&
    today.getDate() === day;

  $: dateStr = (/** @type {any} */ day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  $: hasAppointments = (/** @type {any} */ day) =>
    day && appointments.some(a => a.date === dateStr(day));

  // Upcoming: next 10 appts from today sorted by date+time
  $: upcoming = appointments
    .filter(a => a.date >= today.toISOString().slice(0,10))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 10);

  // Selected day
  /**
     * @type {number | null}
     */
  let selectedDay = null;
  $: selectedAppts = selectedDay
    ? appointments.filter(a => a.date === dateStr(selectedDay))
    : null;

  function prevMonth() {
    if (currentMonth === 0) { currentMonth = 11; currentYear--; }
    else currentMonth--;
    selectedDay = null;
  }
  function nextMonth() {
    if (currentMonth === 11) { currentMonth = 0; currentYear++; }
    else currentMonth++;
    selectedDay = null;
  }
  /**
     * @param {number | null} day
     */
  function selectDay(day) {
    if (!day) return;
    selectedDay = selectedDay === day ? null : day;
  }

  /**
     * @param {string} dateStr
     */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { month: 'long', day: 'numeric' });
  }
  /**
     * @param {string} t
     */
  function formatTime(t) {
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    return `${hr > 12 ? hr - 12 : hr}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
  }

  function openModal() {
    newAppt = { date: dateStr(selectedDay || today.getDate()), title: '', patient: '', time: '' };
    showModal = true;
  }
  function closeModal() { showModal = false; }
  function addAppointment() {
    if (!newAppt.date || !newAppt.title || !newAppt.patient || !newAppt.time) return;
    appointments = [...appointments, { id: Date.now(), ...newAppt }];
    showModal = false;
  }
</script>

<!-- ===== STYLES ===== -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --bg:         #f5f4f0;
    --surface:    #ffffff;
    --border:     #e4e2da;
    --text:        #1a1916;
    --muted:      #9a9790;
    --accent:     #3b6bff;
    --accent-soft:#eef1ff;
    --today-ring: #3b6bff;
    --dot:        #ff6b3b;
    --sidebar-w:  320px;
    --radius:     12px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .page {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    color: var(--text);
  }

  /* ---- Calendar panel ---- */
  .calendar-panel {
    flex: 1;
    padding: 2.5rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  .cal-header h2 {
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    min-width: 160px;
    text-align: center;
  }
  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--muted);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
    line-height: 1;
  }
  .nav-btn:hover { color: var(--text); background: var(--border); }

  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .day-label {
    text-align: center;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    padding-bottom: 0.5rem;
  }

  .day-cell {
    aspect-ratio: 1;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0.4rem 0;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
    gap: 4px;
    user-select: none;
  }
  .day-cell:hover:not(.empty) { background: var(--border); }
  .day-cell.empty { cursor: default; }
  .day-cell.today {
    border: 2px solid var(--today-ring);
    background: var(--accent-soft);
  }
  .day-cell.selected {
    background: var(--accent-soft);
    border: 2px solid var(--accent);
  }
  .day-cell.has-appts .day-num::after {
    content: '';
    display: block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--dot);
    margin: 3px auto 0;
  }

  .day-num {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
    line-height: 1;
  }
  .day-cell.today .day-num { color: var(--accent); font-weight: 600; }

  /* ---- Sidebar ---- */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--surface);
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 2.5rem 1.5rem 1.5rem;
    gap: 1rem;
    overflow-y: auto;
  }

  .sidebar h3 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-bottom: 0.25rem;
  }

  .appt-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  .appt-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem 0.9rem;
  }
  .appt-date {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.2rem;
  }
  .appt-title {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text);
  }
  .appt-sub {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 0.1rem;
    font-family: 'DM Mono', monospace;
  }

  .add-btn {
    align-self: flex-end;
    margin-top: auto;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--text);
    color: #fff;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.15s;
    flex-shrink: 0;
  }
  .add-btn:hover { background: var(--accent); transform: scale(1.08); }

  /* ---- Selected day panel ---- */
  .selected-header {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
  }
  .empty-msg {
    font-size: 0.82rem;
    color: var(--muted);
    font-style: italic;
  }

  /* ---- Modal ---- */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(2px);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
  }
  .modal {
    background: var(--surface);
    border-radius: 16px;
    padding: 2rem;
    width: 360px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .modal h4 { font-size: 1rem; font-weight: 600; }
  .modal label {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted);
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .modal input {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    outline: none;
    color: var(--text);
    background: var(--bg);
    transition: border-color 0.15s;
  }
  .modal input:focus { border-color: var(--accent); }
  .modal-btns { display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 0.5rem; }
  .btn-cancel {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: var(--muted);
  }
  .btn-save {
    padding: 0.5rem 1.2rem;
    border-radius: 8px;
    border: none;
    background: var(--accent);
    color: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    transition: opacity 0.15s;
  }
  .btn-save:hover { opacity: 0.88; }
</style>

<!-- ===== MARKUP ===== -->
<div class="page">

  <!-- Calendar -->
  <div class="calendar-panel">
    <div class="cal-header">
      <button class="nav-btn" on:click={prevMonth}>‹</button>
      <h2>{MONTH_NAMES[currentMonth]} {currentYear}</h2>
      <button class="nav-btn" on:click={nextMonth}>›</button>
    </div>

    <div class="cal-grid">
      {#each DAY_LABELS as lbl}
        <div class="day-label">{lbl}</div>
      {/each}

      {#each calendarCells as day}
        <div
          class="day-cell"
          class:empty={!day}
          class:today={isToday(day)}
          class:selected={selectedDay === day}
          class:has-appts={hasAppointments(day)}
          on:click={() => selectDay(day)}
          on:keydown={(e) => e.key === 'Enter' && selectDay(day)}
          role={day ? 'button' : 'presentation'}
          tabindex={day ? 0 : -1}
          aria-label={day ? `${MONTH_NAMES[currentMonth]} ${day}` : undefined}
        >
          {#if day}
            <span class="day-num">{day}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Sidebar -->
  <aside class="sidebar">
    {#if selectedDay && selectedAppts !== null}
      <p class="selected-header">{MONTH_NAMES[currentMonth]} {selectedDay}</p>
      <div class="appt-list">
        {#if selectedAppts.length === 0}
          <p class="empty-msg">No appointments this day.</p>
        {:else}
          {#each selectedAppts as appt (appt.id)}
            <div class="appt-card">
              <p class="appt-title">{appt.title}: {appt.patient}</p>
              <p class="appt-sub">{formatTime(appt.time)}</p>
            </div>
          {/each}
        {/if}
      </div>
    {:else}
      <h3>Upcoming Appointments</h3>
      <div class="appt-list">
        {#each upcoming as appt (appt.id)}
          <div class="appt-card">
            <p class="appt-date">{formatDate(appt.date)}</p>
            <p class="appt-title">{appt.title}: {appt.patient}</p>
            <p class="appt-sub">{formatTime(appt.time)}</p>
          </div>
        {:else}
          <p class="empty-msg">No upcoming appointments.</p>
        {/each}
      </div>
    {/if}

    <button class="add-btn" on:click={openModal} aria-label="Add appointment">+</button>
  </aside>
</div>

<!-- Add appointment modal -->
{#if showModal}
  <div class="overlay" on:click|self={closeModal}>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h4 id="modal-title">New Appointment</h4>

      <label>Date
        <input type="date" bind:value={newAppt.date} />
      </label>
      <label>Title / Type
        <input type="text" placeholder="e.g. Blood test" bind:value={newAppt.title} />
      </label>
      <label>Patient name
        <input type="text" placeholder="Full name" bind:value={newAppt.patient} />
      </label>
      <label>Time
        <input type="time" bind:value={newAppt.time} />
      </label>

      <div class="modal-btns">
        <button class="btn-cancel" on:click={closeModal}>Cancel</button>
        <button class="btn-save" on:click={addAppointment}>Save</button>
      </div>
    </div>
  </div>
{/if}