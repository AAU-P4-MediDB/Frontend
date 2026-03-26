<script>
  // data: number[]  — array of values
  // color: CSS color string
  export let data = [];
  export let color = 'var(--accent)';

  const W = 500;
  const H = 100;
  const PAD = 10;

  // Normalise data into SVG coordinates
  $: min = Math.min(...data);
  $: max = Math.max(...data);
  $: range = max - min || 1;

  $: points = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return [x, y];
  });

  $: polyline = points.map(([x, y]) => `${x},${y}`).join(' ');

  // Area fill path
  $: area = points.length > 0
    ? `M${points[0][0]},${H} ` +
      points.map(([x, y]) => `L${x},${y}`).join(' ') +
      ` L${points[points.length - 1][0]},${H} Z`
    : '';

  // Month labels
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  $: labels = data.map((_, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    label: months[i % months.length]
  }));

  // Tooltip state
  let hoveredIndex = null;
  $: hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;
  $: hoveredValue  = hoveredIndex !== null ? data[hoveredIndex] : null;

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width * W;
    let closest = 0;
    let minDist = Infinity;
    points.forEach(([x], i) => {
      const d = Math.abs(x - relX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    hoveredIndex = closest;
  }

  function onMouseLeave() { hoveredIndex = null; }
</script>

<div class="chart-wrap">
  <svg
    viewBox="0 0 {W} {H}"
    preserveAspectRatio="none"
    on:mousemove={onMouseMove}
    on:mouseleave={onMouseLeave}
    role="img"
    aria-label="Sparkline chart"
  >
    <defs>
      <linearGradient id="grad-{color}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color={color} stop-opacity="0.25" />
        <stop offset="100%" stop-color={color} stop-opacity="0"    />
      </linearGradient>
    </defs>

    <!-- Area fill -->
    <path d={area} fill="url(#grad-{color})" />

    <!-- Line -->
    <polyline
      points={polyline}
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <!-- Hover indicator -->
    {#if hoveredPoint}
      <line
        x1={hoveredPoint[0]} y1={PAD}
        x2={hoveredPoint[0]} y2={H}
        stroke={color}
        stroke-width="1"
        stroke-dasharray="3 3"
        opacity="0.5"
      />
      <circle
        cx={hoveredPoint[0]}
        cy={hoveredPoint[1]}
        r="4"
        fill={color}
        stroke="var(--bg-card)"
        stroke-width="2"
      />
    {/if}
  </svg>

  <!-- Month labels -->
  <div class="x-labels">
    {#each labels as { label }, i}
      {#if i % 2 === 0}
        <span>{label}</span>
      {/if}
    {/each}
  </div>

  <!-- Tooltip -->
  {#if hoveredIndex !== null}
    <div class="tooltip" style="left: {(hoveredIndex / (data.length - 1)) * 100}%">
      <span class="t-label">{months[hoveredIndex % 12]}</span>
      <span class="t-val" style="color:{color}">{data[hoveredIndex]}</span>
    </div>
  {/if}
</div>

<style>
  .chart-wrap {
    position: relative;
    user-select: none;
  }

  svg {
    width: 100%;
    height: 100px;
    display: block;
    cursor: crosshair;
  }

  .x-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 0.65rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }

  .tooltip {
    position: absolute;
    top: -28px;
    transform: translateX(-50%);
    background: var(--bg-surface);
    border: 1px solid var(--border-hi);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 0.72rem;
    display: flex;
    gap: 6px;
    white-space: nowrap;
    pointer-events: none;
  }

  .t-label { color: var(--text-secondary); }
  .t-val   { font-weight: 700; font-family: var(--font-mono); }
</style>
