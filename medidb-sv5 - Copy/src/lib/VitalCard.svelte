<script lang="ts">
    type Vitals = {
        date: number;
        heart_rate?: string;
        blood_pressure?: string;
        SpO2?: string;
        [key: string]: unknown;
    }
    let { vitals } = $props<{ vitals: Vitals}>();

    console.log("vitalCard received:", vitals);
</script>

<div class="max-h-100 overflow-y-auto pr-2 custom-scrollbar space-y-2">
        <div class="flex items-center py-2 border-b border-gray-100 last:border-0">
            <div class="block">
                <div class="text-sm font-light">
                    {new Date(vitals.date * 1000).toLocaleDateString()}
                </div>
                <div class="text-sm font-light">
                    heart rate: {vitals["heart rate"]}
                </div>
                <div class="text-sm font-light">
                    blood pressure: {vitals["blood pressure"]}
                </div>
                <div class="text-sm font-light">
                    SpO2: {vitals.SpO2}
                </div>

            </div>
        </div>
</div>