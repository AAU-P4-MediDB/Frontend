<script lang="ts">
  import { Card, Toggle, Label, Input, Checkbox } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import ImageCard from "$lib/ImageCard.svelte";
  import PermissionCard from "$lib/ImageCard.svelte";

  import { api } from "$lib/services/api";
  import type { Doctor, Notification, Appointment } from "$lib/types";

  let doctors = $state<Doctor[]>([]);
  let notifications = $state<Notification[]>([]);
  let appointments = $state<Appointment[]>([]);

  $effect(() => {
    // Fetch multiple types of data at once
    Promise.all([
      api.doctors.getAll(),
      api.notifications.getUnread(),
      api.appointments.getAll(),
    ]).then(([docData, notifData, appoinData]) => {
      doctors = docData;
      notifications = notifData;
      appointments = appoinData;
    });
  });
</script>

<div class="grid">
  <div></div>
  <h1>Welcome Back!</h1>
  <p>You have {notifications.length} new messages.</p>

  {#each doctors as doctor}
    <div>{doctor.name} - {doctor.specialty}</div>
  {/each}
  hello
  {#each appointments as appointment}
    <div>{appointment.title} - {appointment.notes}</div>
  {/each}
</div>
