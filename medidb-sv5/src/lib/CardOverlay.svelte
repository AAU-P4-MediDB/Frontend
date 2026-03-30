<script>
  let { children } = $props();
</script>

<div class="bg-light w-full px-6 py-6 rounded-xl">
  <div class="block">
    <div class="text-md font-bold">
      {@render children?.()}
    </div>
  </div>
</div>
