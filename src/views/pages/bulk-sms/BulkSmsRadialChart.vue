<script setup>
import { hexToRgb } from "@layouts/utils";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const props = defineProps(["smsStore", "billingStore"]);
const vuetifyTheme = useTheme();

// invoke getMessageUsage action
// props.smsStore.getMessageUsage();

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;

  const primaryTextColor = `rgba(${hexToRgb(String(currentTheme["on-surface"]))},${
    variableTheme["high-emphasis-opacity"]
  })`;

  return {
    radial: {
      chart: { sparkline: { enabled: true } },
      labels: ["Active"],
      stroke: { dashArray: 5 },
      colors: [`rgba(${hexToRgb(String(currentTheme.primary))}, 1)`],
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          opacityTo: 0.6,
          opacityFrom: 1,
          shadeIntensity: 0.5,
          stops: [30, 70, 100],
          inverseColors: false,
          gradientToColors: [currentTheme.primary],
        },
      },
      plotOptions: {
        radialBar: {
          endAngle: 150,
          startAngle: -140,
          hollow: { size: "55%" },
          track: { background: "transparent" },
          dataLabels: {
            name: {
              offsetY: 25,
              fontWeight: 600,
              fontSize: "16px",
              color: currentTheme.secondary,
              fontFamily: "Public Sans",
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: "24px",
              color: primaryTextColor,
              fontFamily: "Public Sans",
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 735,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 660,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 600,
          options: { chart: { height: 280 } },
        },
      ],
    },
  };
});
</script>

<template>
  <!-- <VCard> -->
  <VRow no-gutters>
    <VCol cols="12">
      <VCardText class="text-center">
        <!-- radial chart -->
        <VueApexCharts
          type="radialBar"
          :height="200"
          :options="chartOptions.radial"
          :series="[Math.round(props.smsStore.activeSmsPercentage)]"
          class="mt-6"
        />

        <p class="font-weight-medium text-high-emphasis mb-7">P&D SMS Units</p>
        <div class="d-flex align-center justify-center gap-x-4 gap-y-4 flex-wrap">
          <!-- sold sms stats div -->
          <div class="d-flex align-center gap-1">
            <VAvatar
              icon="bx-message-rounded-dots"
              color="primary"
              size="38"
              rounded
              variant="tonal"
            />

            <div class="text-start">
              <span class="text-sm"> Available </span>
              <h6 class="text-base font-weight-medium">
                {{ props.billingStore.nFormatter(props.smsStore.availableSmsUnits) }}
              </h6>
            </div>
          </div>

          <!-- sold sms stats div -->
          <div class="d-flex align-center gap-1">
            <VAvatar
              icon="bx-message-rounded-dots"
              color="error"
              size="38"
              rounded
              variant="tonal"
            />

            <div class="text-start">
              <span class="text-sm"> Spent </span>
              <h6 class="text-base font-weight-medium">
                {{ props.billingStore.nFormatter(props.smsStore.spentSmsUnits) }}
              </h6>
            </div>
          </div>
        </div>
        <span
          class="d-flex align-center justify-center gap-x-8 gap-y-4 flex-wrap pt-6 text"
        >
          Monitor Bulk SMS Usage
        </span>
      </VCardText>
    </VCol>
  </VRow>
  <!-- </VCard> -->
</template>

<style lang="scss">
#bar-chart .apexcharts-series[rel="2"] {
  transform: translateY(-10px);
}
</style>
