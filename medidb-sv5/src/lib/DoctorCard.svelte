<script>
  let { imageUrl, name } = $props();
</script>

<div class="flex my-4 items-center gap-4">
  <img
    class="aspect-square object-cover size-12 rounded-full"
    src={imageUrl}
    alt="Avatar for {name}"
  />
  <div>
    <div class="text-m font-bold">Dr. {name}</div>
  </div>
</div>
