<script setup>
import BillingTotalRevenue from "@/views/pages/billing/BillingTotalRevenue.vue";
import BulkSmsRadialChart from "@/views/pages/bulk-sms/BulkSmsRadialChart.vue";

const props = defineProps(["billingStore", "smsStore"]);
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        xl="8"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <BillingTotalRevenue
          :revenueStats="props.billingStore.revenueStats"
          :businessYears="props.billingStore.businessYears"
          :billingStore="props.billingStore"
        />
      </VCol>

      <VCol cols="12" sm="4" xl="4">
        <VCardText class="text-center">
          <!-- radial chart -->
          <BulkSmsRadialChart
            :smsStore="props.smsStore"
            :billingStore="props.billingStore"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss">
#bar-chart .apexcharts-series[rel="2"] {
  transform: translateY(-10px);
}
</style>
