<script lang="ts">
  import { Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";

  const recentHistory = [
    {
      date: "Mar 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "Feb 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
  ];
</script>

<div class="row-span-3 m-2">
  <CardOverlay>
    <div class="my-3">Recent history</div>
    {#each recentHistory as history}
      <DefaultCard
        title={history.title}
        date={history.date}
        description={history.description}
        status={history.status}
      />
    {/each}
  </CardOverlay>
</div>
