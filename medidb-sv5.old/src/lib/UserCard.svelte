<script>
  let { imageUrl, name, age, cpr } = $props();
</script>

<div class="flex my-4 items-center gap-4">
  <img
    class="aspect-square object-cover size-12 rounded-full"
    src={imageUrl}
    alt="Avatar for {name}"
  />
  <div>
    <div class="text-m font-bold">{name}</div>
    <div class="text-sm font-light">{age} years • CPR {cpr}</div>
  </div>
</div>
