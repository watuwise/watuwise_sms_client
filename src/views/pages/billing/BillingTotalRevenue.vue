<script setup>
import { hexToRgb } from "@layouts/utils";
import VueApexCharts from "vue3-apexcharts";
import { useDisplay, useTheme } from "vuetify";

const props = defineProps(["revenueStats", "businessYears", "billingStore"]);
const vuetifyTheme = useTheme();
const display = useDisplay();
const chartYear = ref(`${new Date().getFullYear()}`);

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const disabledTextColor = `rgba(${hexToRgb(String(currentTheme["on-surface"]))},${
    variableTheme["disabled-opacity"]
  })`;
  const primaryTextColor = `rgba(${hexToRgb(String(currentTheme["on-surface"]))},${
    variableTheme["high-emphasis-opacity"]
  })`;
  const borderColor = `rgba(${hexToRgb(String(variableTheme["border-color"]))},${
    variableTheme["border-opacity"]
  })`;

  return {
    bar: {
      chart: {
        stacked: true,
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 3,
        lineCap: "round",
        colors: [currentTheme.surface],
      },
      colors: [
        `rgba(${hexToRgb(String(currentTheme.primary))}, 1)`,
        `rgba(${hexToRgb(String(currentTheme.info))}, 1)`,
      ],
      legend: {
        offsetX: -10,
        position: "top",
        fontSize: "14px",
        horizontalAlign: "left",
        fontFamily: "Public Sans",
        labels: { colors: currentTheme.secondary },
        itemMargin: {
          vertical: 4,
          horizontal: 10,
        },
        markers: {
          width: 8,
          height: 8,
          radius: 10,
          offsetX: -4,
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      grid: {
        borderColor,
        padding: { bottom: 5 },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "35%",
          endingShape: "rounded",
          startingShape: "rounded",
        },
      },
      xaxis: {
        axisTicks: { show: false },
        crosshairs: { opacity: 0 },
        axisBorder: { show: false },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "14px",
            colors: disabledTextColor,
            fontFamily: "Public Sans",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            colors: disabledTextColor,
            fontFamily: "Public Sans",
          },
        },
      },
      responsive: [
        {
          breakpoint: display.thresholds.value.xl,
          options: { plotOptions: { bar: { columnWidth: "43%" } } },
        },
        {
          breakpoint: display.thresholds.value.lg,
          options: { plotOptions: { bar: { columnWidth: "50%" } } },
        },
        {
          breakpoint: display.thresholds.value.md,
          options: { plotOptions: { bar: { columnWidth: "42%" } } },
        },
        {
          breakpoint: display.thresholds.value.sm,
          options: { plotOptions: { bar: { columnWidth: "45%" } } },
        },
      ],
    },
  };
});

function handleYearlyStats(year) {
  chartYear.value = year;

  props.billingStore.getRevenueStats(year);
}
</script>

<template>
  <!-- <VCard> -->
  <VRow no-gutters>
    <VCol cols="12" class="pb-3">
      <VCardItem class="pb-2" title="Purchase Summary">
        <!-- <VCardTitle>Total Revenue </VCardTitle> -->

        <template #append>
          <div class="me-n3">
            <VBtn
              size="small"
              variant="tonal"
              append-icon="bx-chevron-down"
              class="d-flex align-center justify-center gap-3"
            >
              {{ chartYear }}
              <VMenu activator="parent">
                <VList>
                  <VListItem
                    v-for="(year, index) in props.businessYears"
                    :key="index"
                    :value="year"
                  >
                    <VListyearTitle @click="handleYearlyStats(year)">
                      {{ year }}
                    </VListyearTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </div>
        </template>
      </VCardItem>

      <!-- bar chart -->
      <VueApexCharts
        id="bar-chart"
        type="bar"
        :height="336"
        :options="chartOptions.bar"
        :series="[{ name: 'Total Purchase', data: props.revenueStats }]"
      />
    </VCol>
  </VRow>
  <!-- </VCard> -->
</template>

<style lang="scss">
#bar-chart .apexcharts-series[rel="2"] {
  transform: translateY(-10px);
}
</style>
