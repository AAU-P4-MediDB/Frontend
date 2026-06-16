<script lang="ts">
  import Calendar from "./calendar.svelte";

  // 1. Define Types
  interface TimelineItem {
    title: string;
    className: string;
    date: Date;
    len: number;
    vlen?: number;
    isBottom?: boolean;
    detailHeader?: string;
    detailContent?: string;
    startCol?: number;
    startRow?: number;
  }

  interface Day {
    name: string;
    enabled: boolean;
    date: Date;
  }

  // 2. Constants
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 3. Reactive State
  let year = $state(new Date().getFullYear());
  let month = $state(new Date().getMonth());
  let eventText = $state("Click an item or date");

  let {
    headers,
    days,
    items,
    onDayClick,
    onItemClick,
  }: {
    headers: string[];
    days: any[];
    items: any[];
    onDayClick?: (detail: any) => void; // Define the function type
    onItemClick?: (detail: any) => void;
  } = $props();

  function randInt(max: number) {
    return Math.floor(Math.random() * max) + 1;
  }

  // 4. Initialization Logic
  function initMonthItems() {
    let y = year;
    let m = month;
    let d1 = new Date(y, m, randInt(7) + 7);

    // We assign a fresh array to trigger reactivity
    let newItems: TimelineItem[] = [
      {
        title: "11:00 Task Early in month",
        className: "task--primary",
        date: new Date(y, m, randInt(6)),
        len: randInt(4) + 1,
      },
      {
        title: "7:30 Wk 2 tasks",
        className: "task--warning",
        date: d1,
        len: randInt(4) + 2,
      },
      {
        title: "Overlapping Stuff",
        date: d1,
        className: "task--info",
        len: 4,
        isBottom: true,
      },
    ];

    for (let i of newItems) {
      let rc = findRowCol(i.date);
      if (rc) {
        i.startCol = rc.col;
        i.startRow = rc.row;
      }
    }
    items = newItems;
  }

  function initMonth() {
    let tempDays: Day[] = [];
    let monthAbbrev = monthNames[month].slice(0, 3);
    let nextMonthAbbrev = monthNames[(month + 1) % 12].slice(0, 3);

    var firstDay = new Date(year, month, 1).getDay();
    var daysInThisMonth = new Date(year, month + 1, 0).getDate();
    var daysInLastMonth = new Date(year, month, 0).getDate();
    var prevMonth = month == 0 ? 11 : month - 1;

    for (let i = daysInLastMonth - firstDay; i < daysInLastMonth; i++) {
      let d = new Date(prevMonth == 11 ? year - 1 : year, prevMonth, i + 1);
      tempDays.push({ name: "" + (i + 1), enabled: false, date: d });
    }
    for (let i = 0; i < daysInThisMonth; i++) {
      let d = new Date(year, month, i + 1);
      tempDays.push({
        name: (i === 0 ? monthAbbrev + " " : "") + (i + 1),
        enabled: true,
        date: d,
      });
    }
    for (let i = 0; tempDays.length % 7 !== 0; i++) {
      let d = new Date(month == 11 ? year + 1 : year, (month + 1) % 12, i + 1);
      tempDays.push({
        name: (i === 0 ? nextMonthAbbrev + " " : "") + (i + 1),
        enabled: false,
        date: d,
      });
    }
    days = tempDays;
  }

  // 5. Replace $: with $effect
  $effect(() => {
    headers = dayNames;
    initMonth();
    initMonthItems();
  });

  function findRowCol(dt: Date) {
    for (let i = 0; i < days.length; i++) {
      let d = days[i].date;
      if (
        d.getFullYear() === dt.getFullYear() &&
        d.getMonth() === dt.getMonth() &&
        d.getDate() === dt.getDate()
      ) {
        return { row: Math.floor(i / 7) + 2, col: (i % 7) + 1 };
      }
    }
    return null;
  }

  // Navigation functions
  function next() {
    month++;
    if (month == 12) {
      year++;
      month = 0;
    }
  }
  function prev() {
    if (month == 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
  }

  // Event Handlers
  function dayClick(detail: any) {
    eventText = `Day: ${detail.date.toDateString()}`;
  }
  function itemClick(detail: any) {
    eventText = `Item: ${detail.title}`;
  }
</script>

<div class="calendar-container">
  <div class="calendar-header">
    <h1>
      <button onclick={() => year--}>&Lt;</button>
      <button onclick={prev}>&lt;</button>
      {monthNames[month]}
      {year}
      <button onclick={next}>&gt;</button>
      <button onclick={() => year++}>&Gt;</button>
    </h1>
    <p>{eventText}</p>
  </div>

  <Calendar
    {headers}
    {days}
    {items}
    onDayClick={dayClick}
    onItemClick={itemClick}
  />
</div>
