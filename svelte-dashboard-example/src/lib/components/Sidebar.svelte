<script>
  export let activePage = 'dashboard';

  const nav = [
    { id: 'dashboard', label: 'Dashboard',  icon: '▦' },
    { id: 'analytics', label: 'Analytics',  icon: '◈' },
    { id: 'users',     label: 'Users',      icon: '⊙' },
    { id: 'settings',  label: 'Settings',   icon: '⚙' },
  ];
</script>

<aside class="sidebar">
  <!-- Logo / brand -->
  <div class="brand">
    <div class="logo-mark">◈</div>
    <span class="logo-text">Dash<em>board</em></span>
  </div>

  <nav>
    {#each nav as item}
      <button
        class="nav-item"
        class:active={activePage === item.id}
        on:click={() => activePage = item.id}
      >
        <span class="nav-icon">{item.icon}</span>
        <span class="nav-label">{item.label}</span>
        {#if activePage === item.id}
          <span class="pip" />
        {/if}
      </button>
    {/each}
  </nav>

  <footer class="sidebar-footer">
    <div class="avatar">JD</div>
    <div class="user-info">
      <span class="user-name">Jane Doe</span>
      <span class="user-role">Admin</span>
    </div>
  </footer>
</aside>

<style>
  .sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    background: var(--bg-surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 0.25rem;
  }

  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 0.5rem;
    margin-bottom: 2rem;
  }
  .logo-mark {
    font-size: 1.4rem;
    color: var(--accent);
    line-height: 1;
  }
  .logo-text {
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }
  .logo-text em {
    font-style: normal;
    color: var(--accent);
  }

  /* Nav */
  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    border-radius: var(--radius);
    color: var(--text-secondary);
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    position: relative;
    transition: background 0.15s, color 0.15s;
    text-align: left;
    width: 100%;
  }
  .nav-item:hover {
    background: var(--border);
    color: var(--text-primary);
  }
  .nav-item.active {
    background: var(--accent-dim);
    color: var(--accent);
  }

  .nav-icon {
    font-size: 1rem;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }

  .pip {
    position: absolute;
    right: 0.75rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent-glow);
  }

  /* Footer */
  .sidebar-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--accent-dim);
    border: 1px solid var(--accent-glow);
    color: var(--accent);
    font-size: 0.72rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }
  .user-name {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  .user-role {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }
</style>
