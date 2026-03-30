<script>
  let { children } = $props();
</script>

<div class="bg-light w-full min-h-full px-6 pt-6 rounded-xl">
  <div class="block">
    <div class="text-md font-bold">
      {@render children?.()}
    </div>
  </div>
</div>
