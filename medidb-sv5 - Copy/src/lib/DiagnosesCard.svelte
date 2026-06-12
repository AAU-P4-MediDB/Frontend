<script>
  let { name, temp } = $props();
</script>

<div class="max-h-100 overflow-y-auto pr-2 custom-scrollbar">
  <div class="flex items-center py-2 border-b border-gray-100 last:border-0">
    <div class="block">
      <div class="text-md font-bold">{name}</div>
    </div>
    <span
      class="w-4 h-4 rounded-full flex-none self-center ml-auto {temp
        ? 'bg-green-600'
        : 'bg-red-600'}"
    ></span>
  </div>
</div>
