<script>
  let { title, imageUrl, name, gender, age } = $props();
</script>

<div class="flex my-1 items-center gap-4 rounded-xl bg-white p-4 shadow-md">
  <img
    class="aspect-square object-cover size-12 rounded-full"
    src={imageUrl}
    alt="Avatar for {title}"
  />
  <div>
    <div class="text-m font-bold">{name}</div>
    <div class="text-sm font-light">{gender} • {age} yrs</div>
  </div>
</div>
