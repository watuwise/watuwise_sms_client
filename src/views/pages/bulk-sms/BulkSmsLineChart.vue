<script setup>
import { hexToRgb } from "@layouts/utils";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const props = defineProps(["smsStore"]);
const vuetifyTheme = useTheme();
const chartYear = ref(`${new Date().getFullYear()}`);

const chartConfig = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const disabledTextColor = `rgba(${hexToRgb(String(currentTheme["on-surface"]))},${variableTheme["disabled-opacity"]
    })`;
  const borderColor = `rgba(${hexToRgb(String(variableTheme["border-color"]))},${variableTheme["border-opacity"]
    })`;

  return {
    chart: {
      height: "320px",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor,
      padding: {
        left: 14,
        top: -20,
        right: 11,
        bottom: 7,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        // opacityTo: 0.5,
        // opacityFrom: 0.25,
        // stops: [0, 95, 100],
        shadeIntensity: 0.6,
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.8,
              color: currentTheme.primary,
            },
            {
              offset: 100,
              opacity: 0.6,
              color: currentTheme.surface,
            },
          ],
        ],
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 1,
        color: currentTheme.primary,
      },
    },
    xaxis: {
      axisTicks: { show: false },
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
      min: 0,
      // max: 50,
      show: true,
      tickAmount: 4,
      labels: {
        style: {
          fontSize: "14px",
          colors: disabledTextColor,
          fontFamily: "Public Sans",
        },
      },
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      hover: { size: 8 },
      colors: ["transparent"],
      strokeColors: "transparent",
      discrete: [
        {
          size: 8,
          seriesIndex: 0,
          fillColor: "#fff",
          strokeColor: currentTheme.primary,
          dataPointIndex: props.smsStore.messageStats.length - 1,
        },
      ],
    },
  };
});

function handleYearlyMsgStats(year) {
  chartYear.value = year;

  // invoke getRevenueStats action
  props.smsStore.getMessageStats(year);
}
</script>

<template>
  <VCard>
    <VCardItem class="pb-10 mr-4">
      <VCardTitle>Usage Statistics </VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn size="small" variant="tonal" append-icon="bx-chevron-down"
            class="d-flex align-center justify-center gap-3">
            {{ chartYear }}
            <VMenu activator="parent">
              <VList>
                <VListItem v-for="(item, index) in ['2023', '2022', '2021']" :key="index" :value="item">
                  <VListItemTitle @click="handleYearlyMsgStats(item)">{{
                    item
                  }}</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts type="area" :height="241" :options="chartConfig" :series="[
        {
          data: props.smsStore.messageStats,
        },
      ]" />
    </VCardText>
  </VCard>
</template>
