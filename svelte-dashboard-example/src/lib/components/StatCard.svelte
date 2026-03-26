<script>
  // Each `stat` object: { label, value, delta, trend, color, icon }
  export let stat;
</script>

<div class="card">
  <div class="top-row">
    <span class="icon">{stat.icon}</span>
    <span class="delta" class:up={stat.trend === 'up'} class:down={stat.trend === 'down'}>
      {stat.delta}
    </span>
  </div>
  <div class="value" style="color:{stat.color}">{stat.value}</div>
  <div class="label">{stat.label}</div>
  <!-- Decorative accent bar -->
  <div class="bar" style="background:{stat.color}" />
</div>

<style>
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.3rem 1.4rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .card:hover {
    border-color: var(--border-hi);
    transform: translateY(-2px);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  .icon { font-size: 1.3rem; }

  .delta {
    font-size: 0.72rem;
    font-family: var(--font-mono);
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 99px;
  }
  .up   { background: rgba(62,207,142,0.12); color: var(--success); }
  .down { background: rgba(242,99,99,0.12);  color: var(--danger);  }

  .value {
    font-size: 1.7rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 0.25rem;
  }

  .label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 40%;
    opacity: 0.6;
    border-radius: 0 2px 0 0;
  }
</style>
