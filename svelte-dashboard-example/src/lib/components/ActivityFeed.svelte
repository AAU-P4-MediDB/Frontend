<script>
  // activities: { user, action, time, type }[]
  // type: 'success' | 'accent' | 'info' | 'warning' | 'danger'
  export let activities = [];

  const typeColor = {
    success: 'var(--success)',
    accent:  'var(--accent)',
    info:    'var(--info)',
    warning: 'var(--warning)',
    danger:  'var(--danger)',
  };

  const typeIcon = {
    success: '✓',
    accent:  '★',
    info:    'i',
    warning: '!',
    danger:  '✕',
  };
</script>

<ul class="feed">
  {#each activities as item, i}
    <li class="feed-item" style="animation-delay:{i * 60}ms">
      <div class="dot-wrap">
        <div class="dot" style="background:{typeColor[item.type] ?? '#fff'}; box-shadow: 0 0 8px {typeColor[item.type] ?? '#fff'}44">
          {typeIcon[item.type] ?? '·'}
        </div>
        {#if i < activities.length - 1}
          <div class="connector" />
        {/if}
      </div>

      <div class="body">
        <span class="user">{item.user}</span>
        <span class="action">{item.action}</span>
        <span class="time mono">{item.time}</span>
      </div>
    </li>
  {/each}
</ul>

<style>
  .feed {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .feed-item {
    display: flex;
    gap: 1rem;
    animation: fadeUp 0.4s both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Dot + vertical connector */
  .dot-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    font-size: 0.65rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .connector {
    width: 1px;
    flex: 1;
    min-height: 18px;
    background: var(--border);
    margin: 3px 0;
  }

  /* Text */
  .body {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35rem;
    padding-bottom: 1rem;
    padding-top: 3px;
    font-size: 0.85rem;
  }

  .user {
    font-weight: 700;
    color: var(--text-primary);
  }

  .action {
    color: var(--text-secondary);
  }

  .time {
    margin-left: auto;
    font-size: 0.7rem;
    color: var(--text-muted);
    white-space: nowrap;
  }
</style>
