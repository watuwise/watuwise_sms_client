<script setup>
import { useSmsPlanStore } from "@/stores/SmsPlanStore";
import SmsPlanDataIterator from "@/views/pages/sms-plans/SmsPlanDataIterator.vue";
import SmsPlanManagementTitle from "@/views/pages/sms-plans/SmsPlanManagementTitle.vue";
import SmsPlanStatisticsCard from "@/views/pages/sms-plans/SmsPlanStatisticsCard.vue";

// 👉 Images
import walletGrey from "@images/cards/wallet-grey.png";

// Instantiate stores
const smsPlanStore = useSmsPlanStore();

// call/invoke getSenderIds action
smsPlanStore.getSmsPlans();
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Heading Title -->
      <VRow>
        <VCol cols="12" md="7">
          <SmsPlanManagementTitle />
        </VCol>

        <VCol cols="12" md="5" order="2" order-md="1">
          <SmsPlanStatisticsCard
            v-bind="{
              title: 'Available Plans/Pricing',
              slug: 'Total created sms plans',
              image: walletGrey,
              stats: smsPlanStore.plans.length,
              isDefault: true,
            }"
          />
        </VCol>
      </VRow>

      <!-- 👉 Sender IDs -->
      <VCard title="Sms Plans" class="mt-5">
        <SmsPlanDataIterator :sms-plans="smsPlanStore.plans" />
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
