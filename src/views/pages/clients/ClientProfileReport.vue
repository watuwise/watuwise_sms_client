<script setup>
import { hexToRgb } from "@layouts/utils";
import { integer } from "@vuelidate/validators";
import VueApexCharts from "vue3-apexcharts";
import { useDisplay, useTheme } from "vuetify";
import { useBillingStore } from "@/stores/BillingStore";

const props = defineProps(["billingData", "amountSpent"]);
const vuetifyTheme = useTheme();
const display = useDisplay();
const billingStore = useBillingStore();

const series = [
  {
    data: props.billingData,
  },
];

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 12,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: currentTheme.warning,
      },
    },
    tooltip: { enabled: false },
    colors: [`rgba(${hexToRgb(String(currentTheme.warning))}, 1)`],
    stroke: {
      width: 4,
      curve: "smooth",
      lineCap: "round",
    },
    grid: {
      show: false,
      padding: {
        top: -21,
        left: -5,
        bottom: -8,
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    responsive: [
      {
        breakpoint: display.thresholds.value.lg,
        options: {
          chart: {
            height: 151,
            width: "100%",
          },
        },
      },
      {
        breakpoint: display.thresholds.value.md,
        options: {
          chart: {
            height: 131,
            width: "100%",
          },
        },
      },
    ],
  };
});
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between h-100">
      <div class="d-flex flex-column justify-space-between gap-y-4">
        <div>
          <h6 class="text-h6 text-no-wrap mb-1">Profile Report</h6>
          <VChip color="warning" class="ml-2 mt-2">
            Year {{ new Date().getFullYear() }}
          </VChip>
        </div>

        <div>
          <h5 class="text-h5">
            <span class="text-disabled">KES</span>
            {{ billingStore.nFormatter(props.amountSpent) }}
          </h5>
        </div>
      </div>

      <div class="h-100 d-flex align-center">
        <VueApexCharts
          type="line"
          :height="131"
          width="80%"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </VCardText>
  </VCard>
</template>
