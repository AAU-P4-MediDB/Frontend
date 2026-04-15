<script>
  let { pfp, name, pronouns, birthdate } = $props();
</script>

<div class="flex items-center gap-4 rounded-xl bg-light p-4">
  <img
    class="aspect-square object-cover size-12 rounded-full"
    src={pfp}
    alt="Avatar for {name}"
  />
  <div>
    <div class="text-m font-bold">{name}</div>
    <div class="text-sm font-light">{pronouns} • {birthdate}</div>
  </div>
</div>
