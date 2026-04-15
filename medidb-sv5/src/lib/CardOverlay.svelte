<script>
  let { children } = $props();
</script>

<div
  class="bg-light w-full min-h-full px-6 pt-5 rounded-xl row-span-2 max-h-100 overflow-y-auto pr-2 custom-scrollbar"
>
  <div class="block">
    <div class="text-md font-bold">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  /* Slim down the scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
  }

  /* The track (background) */
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  /* The draggable handle */
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0rem 0.75rem 0.75rem 0rem;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
