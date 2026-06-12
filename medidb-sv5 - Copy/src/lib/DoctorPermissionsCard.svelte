<script>
  let { pt_cpr, note } = $props();
</script>

<div class="max-h-24 overflow-y-auto pr-2 custom-scrollbar">
  <div class="flex items-center py-2 border-b border-gray-100 last:border-0">
    <div class="block">
      <div class="text-md font-bold">CPR: {pt_cpr}</div>
      <div class="text-sm font-light text-gray-500">
        Note: {note || "Missing note"}
      </div>
    </div>
  </div>
</div>
