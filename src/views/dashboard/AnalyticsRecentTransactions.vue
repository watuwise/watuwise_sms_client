<script setup>
import creditCardSuccess from "@images/cards/credit-card-success-1.png";
import mpesa from "@images/cards/MPESA.png";
import { useBillingStore } from "@/stores/BillingStore";
import DashboardMoreBtn from "./DashboardMoreBtn.vue";

const billingStore = useBillingStore();

// define props
const props = defineProps(["payments"]);
console.log(props.payments);
</script>

<template>
  <VCard title="Recent Transactions">
    <template #append>
      <div class="me-n3 mt-n2">
        <DashboardMoreBtn more-link="/billing" />
      </div>
    </template>

    <VCardText v-if="props.payments.length < 1">
      <VIcon size="20" start icon="bx-info-circle" /> No payment transaction record found
    </VCardText>

    <VCardText v-else>
      <VList class="card-list">
        <VListItem v-for="(item, index) in props.payments.slice(0, 5)" :key="index">
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              color="success"
              class="me-3"
              :image="item.payment_method == 'MPESA' ? mpesa : creditCardSuccess"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1">
            {{ item.payment_method }}
          </VListItemSubtitle>
          <VListItemTitle>
            <!-- {{ item.client_name }} -->
            {{ item.payment_receipt }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1">
                {{ billingStore.nFormatter(item.amount) }}
                <!-- {{ new Intl.NumberFormat().format(Math.abs(item.amount)) }} -->
              </span>
              <span class="text-disabled">KES</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.6rem;
}
</style>
