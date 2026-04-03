<script>
  let { name, permission_type } = $props();
</script>

<div class="flex items-center gap-4 rounded-xl bg-light p-4 mb-4">
  <div>
    <div class="text-m font-bold">{name}</div>
    <div class="text-sm font-light">{permission_type}</div>
  </div>
</div>
