<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import dayjs from "dayjs";

  // history prop will now receive the array from timeline_data.timeline
  let { history = [] } = $props();

  function formatEntryDate(dateVal: string) {
    // This handles the "2026-04-09" string format in your logs
    return dayjs(dateVal).format("MMM D, YYYY");
  }
</script>

<div class="max-h-125 overflow-y-auto pr-4 custom-scrollbar">
  <Timeline order="vertical">
    {#each history as entry, index}
      <TimelineItem
        title={entry.data_type === "journal"
          ? "Medical Journal Update"
          : "Update"}
        date={formatEntryDate(entry.date)}
        color="green"
        isLast={index === history.length - 1}
      >
        <div class="pl-4">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {entry.changes}
          </p>
          <p class="text-xs text-gray-500">
            Severity: {entry.severity} | Doctor: {entry.doctor_accessing.split(
              "-",
            )[0]}...
          </p>
        </div>
      </TimelineItem>
    {/each}
  </Timeline>
</div>
