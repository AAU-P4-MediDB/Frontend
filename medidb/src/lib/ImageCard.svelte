<script>
  export let title;
  export let imageUrl;
  export let name;
  export let gender;
  export let age;
</script>

<div class="flex my-4 items-center gap-4 rounded-xl bg-white p-4 shadow-md">
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

<style>
  /* Something to make it look pretty */
</style>
