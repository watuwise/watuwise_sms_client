<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBillingStore } from "@/stores/BillingStore";
import BillingDataTable from "@/views/pages/billing/BillingDataTable.vue";
import BillingManagementTitle from "@/views/pages/billing/BillingManagementTitle.vue";
import BillingPurchaseCard from "@/views/pages/billing/BillingPurchaseCard.vue";
import BillingStatisticsCard from "@/views/pages/billing/BillingStatisticsCard.vue";
import BillingTotalRevenue from "@/views/pages/billing/BillingTotalRevenue.vue";

// 👉 Images
import wallet from "@images/cards/wallet-purple.png";

const billingStore = useBillingStore();
const route = useRoute();
const router = useRouter();

billingStore.getPayments();
billingStore.getRevenueStats(`${new Date().getFullYear()}`);

// Auto-verify Paystack payment on return from checkout
onMounted(() => {
  const paystackRef = route.query.paystack_ref;
  if (paystackRef) {
    billingStore.verifyPaystackPayment(paystackRef);
    // Clean the query param from the URL
    router.replace({ path: '/billing' });
  }
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Congratulations -->
      <VRow>
        <VCol cols="12" md="6">
          <BillingManagementTitle />

          <VRow class="mt-2">
            <!-- 👉 Today Income -->
            <VCol cols="12" md="6" sm="6">
              <BillingStatisticsCard v-bind="{
                title: 'Total spent on SMS',
                image: wallet,
                stats: billingStore.nFormatter(billingStore.totalPurchase),
                label: 'Sum of all purchase',
              }" />
            </VCol>

            <!-- 👉 Current Month Income -->
            <VCol cols="12" md="6" sm="6">
              <BillingPurchaseCard />
            </VCol>
          </VRow>
        </VCol>

        <!-- 👉 Total Revenue -->
        <VCol cols="12" md="6" order="2" order-md="1">
          <VCard>
            <BillingTotalRevenue :revenueStats="billingStore.revenueStats" :businessYears="billingStore.businessYears"
              :billingStore="billingStore" />
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12">
      <VCard title="Billing Data">
        <BillingDataTable :paymentsData="billingStore.payments" />
      </VCard>
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
