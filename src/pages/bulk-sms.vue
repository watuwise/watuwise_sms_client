<script setup>
import AnalyticsCard from "@/views/dashboard/AnalyticsCard.vue";
import BulkSmsDataTable from "@/views/pages/bulk-sms/BulkSmsDataTable.vue";
import BulkSmsManagementTitle from "@/views/pages/bulk-sms/BulkSmsManagementTitle.vue";

import { useBillingStore } from "@/stores/BillingStore";
import { useSmsStore } from "@/stores/SmsStore";

// 👉 Images
import chart from "@images/cards/chart-success.png";

// Instantiate stores
const smsStore = useSmsStore();
const billingStore = useBillingStore();

// call/invoke getMessages action
smsStore.getMessages();

// call getMessageStats action
smsStore.getMessageStats(`${new Date().getFullYear()}`);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Congratulations -->
      <VRow>
        <VCol cols="12">
          <VRow>
            <VCol md="9">
              <BulkSmsManagementTitle />
            </VCol>
            <VCol md="3">
              <AnalyticsCard
                v-bind="{
                  title: 'SMS Balance',
                  image: chart,
                  stats: new Intl.NumberFormat().format(smsStore.availableSmsUnits),
                  label: 'Available sms in my account',
                }"
              />
            </VCol>
          </VRow>

          <VCard title="Messages Sent" class="mt-5">
            <BulkSmsDataTable :messages="smsStore.messages" />
          </VCard>
        </VCol>

        <!-- <VCol cols="12" md="5" order="2" order-md="1">
          <VRow> -->
        <!-- 👉 Bulk SMS Radial stats -->
        <!-- <VCol cols="12" md="6" sm="6">
              <VCard>
                <BulkSmsRadialChart :smsStore="smsStore" :billingStore="billingStore" />
              </VCard>
            </VCol> -->

        <!-- <VCol cols="12" md="6" sm="6">
              <BulkSmsStatisticsCard v-bind="{
                title: 'SMS Sent Today',
                slug: 'Total sms sent today',
                image: chart,
                stats: smsStore.msgToday,
              }" /> -->

        <!-- <BulkSmsStatisticsCard class="mt-4" v-bind="{
                title: 'Monthly SMS Sent',
                slug: 'Total sms sent this Month',
                image: chart,
                stats: smsStore.msgCurrentMonth,
              }" />
            </VCol>
          </VRow> -->

        <!-- 👉 Bulk SMS Usage chart -->
        <!-- <BulkSmsLineChart class="mt-5" :smsStore="smsStore" />
        </VCol> -->
      </VRow>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.card-title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 12px;
}
</style>
