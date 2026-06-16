<script lang="ts">
    type Prescription = {
        date: string;
        name: string;
        dosage?: string;
        instructions?: string;
        status?: "active" | "expired" | "paused";
    };
    let { prescriptions = [] } = $props<{ prescriptions: Prescription[] }>();

    console.log("PrescriptionCard received:", prescriptions);
</script>

<div class="max-h-100 overflow-y-auto pr-2 custom-scrollbar space-y-2">
    {#each prescriptions as p}
        <div class="flex items-center py-2 border-b border-gray-100 last:border-0">
            <div class="block">
                <div class="text-sm font-light">
                    {p.date}
                </div>
                <div class="text-md font-bold">
                    {p.name}
                </div>
                <div class="text-sm font-light text-gray-500">
                    {p.instructions || "Take as directed"}
                </div>
                {#if p.dosage}
                    <div class="text-xs text-gray-400">
                        Dosage: {p.dosage}
                    </div>
                {/if}
            </div>
            <span
                    class="w-3 h-3 rounded-full flex-none self-center ml-auto"
                    class:bg-green-600={p.status === "active"}
                    class:bg-yellow-500={p.status === "paused"}
                    class:bg-red-500={p.status === "expired"}
            ></span>
        </div>
    {/each}
</div>