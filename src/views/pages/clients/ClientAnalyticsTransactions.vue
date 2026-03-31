<script setup>
import creditCardSuccess from "@images/cards/credit-card-success-1.png";
import mpesa from "@images/cards/MPESA.png";
import ClientMoreBtn from "./ClientMoreBtn.vue";

// define props
const props = defineProps(["payments"]);

const transactions = [
  {
    paymentMethod: "M-Pesa",
    amount: 838.71,
    description: "SMS Units",
    detail: "Units: 900",
    icon: mpesa,
    color: "success",
  },
  {
    paymentMethod: "Credit Card",
    amount: 838.71,
    description: "Sender ID",
    detail: "ID: PnD",
    icon: creditCardSuccess,
    color: "success",
  },
];

const moreList = [
  {
    title: "Refresh",
    value: "refresh",
  },
];
</script>

<template>
  <VCard title="Transactions">
    <template #append>
      <div class="me-n3 mt-n2">
        <!-- <MoreBtn :menu-list="moreList" /> -->
        <ClientMoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText v-if="props.payments.length < 1">
      <VIcon size="20" start icon="bx-info-circle" /> No payment transaction record found
    </VCardText>

    <VCardText v-else>
      <VList class="card-list">
        <VListItem v-for="(item, index) in props.payments" :key="index">
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
            {{ item.units_purchased ? "SMS Units" : "Sender ID" }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="mr-10" style="text-align: left">
                <span class="text-disabled">Units: </span>
                <span>{{ item.units_purchased }}</span>
              </span>

              <span class="me-1">
                {{
                  item.amount_paid > 0
                    ? `+${Math.abs(item.amount_paid)}`
                    : `-${Math.abs(item.amount_paid)}`
                }}
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
