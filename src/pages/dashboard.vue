<script setup>
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import AnalyticsRecentCGs from "@/views/dashboard/AnalyticsRecentCGs.vue";
import AnalyticsRecentTransactions from "@/views/dashboard/AnalyticsRecentTransactions.vue";
import AnalyticsTotalRevenue from "@/views/dashboard/AnalyticsTotalRevenue.vue";
import BulkSmsLineChart from "@/views/pages/bulk-sms/BulkSmsLineChart.vue";

import { useBillingStore } from "@/stores/BillingStore";
import { useContactStore } from "@/stores/ContactStore";
import { useSmsStore } from "@/stores/SmsStore";

// 👉 Images
import AnalyticsCard from "@/views/dashboard/AnalyticsCard.vue";
import chart from "@images/cards/chart-success.png";
import wallet from "@images/cards/wallet-grey.png";

// Instantiate pinia stores
const contactStore = useContactStore();
const smsStore = useSmsStore();
const billingStore = useBillingStore();

// call getClients action
contactStore.getContacts();

// call getMessageStats action
smsStore.getMessageStats(`${new Date().getFullYear()}`);

// call getMessageUsage action
// smsStore.getMessageUsage();
smsStore.getMessages();

// call getPayments action
billingStore.getPayments();

// call getRevenueStats action
billingStore.getRevenueStats(`${new Date().getFullYear()}`);

const userData = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="8">
      <AnalyticsCongratulations :user="userData" />
    </VCol>

    <VCol cols="12" sm="4">
      <VRow>
        <!-- 👉 SMS Balance -->
        <VCol cols="12" md="6">
          <AnalyticsCard
            v-bind="{
              title: 'SMS Balance',
              image: chart,
              stats: new Intl.NumberFormat().format(smsStore.availableSmsUnits),
              label: 'Available sms',
            }"
          />
        </VCol>

        <!-- 👉 SMS Sent -->
        <VCol cols="12" md="6">
          <AnalyticsCard
            v-bind="{
              title: 'SMS Sent',
              image: wallet,
              stats: new Intl.NumberFormat().format(smsStore.spentSmsUnits),
              label: 'Total sms sent/spent',
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Total Revenue & SMS balance -->
    <VCol cols="12" md="8" order="2" order-md="1">
      <AnalyticsTotalRevenue :billingStore="billingStore" :smsStore="smsStore" />
    </VCol>

    <!-- 👉 Bulk SMS Usage chart -->
    <VCol cols="12" sm="8" md="4" order="1" order-md="2">
      <BulkSmsLineChart :smsStore="smsStore" />
    </VCol>

    <!-- 👉 Latest Contacts -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsRecentCGs
        :contacts="contactStore.contacts"
        :groups="[]"
        type="contacts"
      />
    </VCol>

    <!-- 👉 Latest Groups -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsRecentCGs :groups="contactStore.groups" :contacts="[]" type="groups" />
    </VCol>

    <!-- 👉 Recent Transactions -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsRecentTransactions :payments="billingStore.payments" />
    </VCol>
  </VRow>
</template>
