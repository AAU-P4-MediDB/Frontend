<script>
  let { date, title, description, status } = $props();
</script>

<div class="flex items-center py-2">
  <div class="block">
    <div class="text-sm font-light">{date}</div>
    <div class="text-md font-bold">{title}</div>
    <div class="text-sm font-light">{description}</div>
  </div>
  <span
    class="w-4 h-4 rounded-full flex-none self-center ml-auto bg-{status}-600"
  ></span>
</div>
