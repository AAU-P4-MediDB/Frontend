<script>
  import StatCard from '$lib/components/StatCard.svelte';
  import ActivityFeed from '$lib/components/ActivityFeed.svelte';
  import SparklineChart from '$lib/components/SparklineChart.svelte';
  import TopBar from '$lib/components/TopBar.svelte';

  // ── Dummy data ──────────────────────────────────────────────
  // Replace these with real API calls or SvelteKit load() data.

  const stats = [
    { label: 'Total Revenue',  value: '€ 84,320', delta: '+12.4%', trend: 'up',   color: 'var(--success)', icon: '💰' },
    { label: 'Active Users',   value: '3,271',    delta: '+5.1%',  trend: 'up',   color: 'var(--info)',    icon: '👥' },
    { label: 'Conversion',     value: '4.8%',     delta: '-0.3%',  trend: 'down', color: 'var(--danger)',  icon: '🎯' },
    { label: 'Avg. Session',   value: '2m 41s',   delta: '+8.2%',  trend: 'up',   color: 'var(--accent)',  icon: '⏱' },
  ];

  const revenueData = [38, 52, 45, 60, 55, 72, 68, 80, 75, 84, 78, 92];
  const usersData   = [20, 28, 22, 35, 42, 38, 50, 46, 55, 60, 52, 65];

  const activities = [
    { user: 'Marta K.',    action: 'completed onboarding',       time: '2 min ago',  type: 'success' },
    { user: 'Jonas B.',    action: 'upgraded to Pro plan',        time: '14 min ago', type: 'accent'  },
    { user: 'System',      action: 'nightly backup succeeded',    time: '1 hr ago',   type: 'info'    },
    { user: 'Reza A.',     action: 'reported a bug #2214',        time: '2 hr ago',   type: 'warning' },
    { user: 'Camille D.',  action: 'invited 3 new team members',  time: '3 hr ago',   type: 'success' },
    { user: 'System',      action: 'cache cleared automatically', time: '5 hr ago',   type: 'info'    },
  ];
</script>

<TopBar title="Dashboard" subtitle="Good morning — here's what's happening." />

<!-- Stat cards row -->
<section class="stats-grid">
  {#each stats as stat}
    <StatCard {stat} />
  {/each}
</section>

<!-- Charts row -->
<section class="charts-row">
  <div class="chart-card">
    <header class="card-header">
      <div>
        <h2>Revenue</h2>
        <p class="sub">Last 12 months</p>
      </div>
      <span class="badge success">↑ 12.4%</span>
    </header>
    <SparklineChart data={revenueData} color="var(--success)" />
  </div>

  <div class="chart-card">
    <header class="card-header">
      <div>
        <h2>Active Users</h2>
        <p class="sub">Last 12 months</p>
      </div>
      <span class="badge info">↑ 5.1%</span>
    </header>
    <SparklineChart data={usersData} color="var(--info)" />
  </div>
</section>

<!-- Activity feed -->
<section class="activity-section">
  <header class="card-header" style="margin-bottom:1.2rem">
    <h2>Recent Activity</h2>
    <button class="link-btn">View all →</button>
  </header>
  <ActivityFeed {activities} />
</section>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .charts-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 800px) {
    .charts-row { grid-template-columns: 1fr; }
  }

  .chart-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.4rem 1.6rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .card-header h2 {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .sub {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  .badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 99px;
    font-family: var(--font-mono);
  }
  .badge.success { background: rgba(62,207,142,0.12); color: var(--success); }
  .badge.info    { background: rgba(91,141,238,0.12); color: var(--info); }

  .activity-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.4rem 1.6rem;
  }

  .link-btn {
    font-size: 0.8rem;
    color: var(--accent);
    font-family: var(--font-display);
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .link-btn:hover { opacity: 0.7; }
</style>
