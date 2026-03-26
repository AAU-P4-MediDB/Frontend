<script>
  export let title = 'Page';
  export let subtitle = '';

  // Live clock — a great Svelte learning example (reactive + lifecycle)
  import { onDestroy } from 'svelte';

  let time = new Date();
  const timer = setInterval(() => { time = new Date(); }, 1000);
  onDestroy(() => clearInterval(timer));

  // Format: "Thu 26 Mar · 14:22:05"
  $: timeStr = time.toLocaleTimeString('en-GB');
  $: dateStr = time.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
</script>

<header class="topbar">
  <div class="titles">
    <h1>{title}</h1>
    {#if subtitle}<p>{subtitle}</p>{/if}
  </div>
  <div class="right">
    <div class="clock mono">
      <span class="date">{dateStr}</span>
      <span class="separator">·</span>
      <span class="time">{timeStr}</span>
    </div>
    <button class="notify-btn" title="Notifications">
      <span>🔔</span>
      <span class="dot" />
    </button>
  </div>
</header>

<style>
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  p {
    font-size: 0.82rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .clock {
    font-size: 0.78rem;
    color: var(--text-secondary);
    display: flex;
    gap: 0.4rem;
  }

  .separator { color: var(--text-muted); }
  .time { color: var(--text-primary); }

  .notify-btn {
    position: relative;
    font-size: 1.1rem;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .notify-btn:hover { opacity: 1; }

  .dot {
    position: absolute;
    top: 0;
    right: -1px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--danger);
    border: 2px solid var(--bg);
  }
</style>
