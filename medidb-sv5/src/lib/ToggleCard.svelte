<script>
  let { title, accessType } = $props();
</script>

<div class="flex my-1 items-center gap-4 rounded-xl bg-light p-4">
  <div>
    <div class="text-m font-bold">{title}</div>
    <div class="text-sm font-light">{accessType}</div>
  </div>
</div>
