<script setup>
import SenderIdDataTable from "@/views/pages/sender-id/SenderIdDataTable.vue";
import SenderIdManagementTitle from "@/views/pages/sender-id/SenderIdManagementTitle.vue";
import SenderIdStatisticsCard from "@/views/pages/sender-id/SenderIdStatisticsCard.vue";
import { useSenderIdStore } from "@/stores/SenderIdStore";

// 👉 Images
import phoneGrey from "@images/cards/phone-grey.png";
import phoneBlue from "@images/cards/phone-blue.png";

// Instantiate stores
const senderIdStore = useSenderIdStore();

// call/invoke getSenderIds action
senderIdStore.getSenderIds();
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Heading Title -->
      <VRow>
        <VCol cols="12" md="7">
          <SenderIdManagementTitle />
        </VCol>

        <VCol cols="12" md="5" order="2" order-md="1">
          <VRow>
            <!-- 👉 Current Month Income -->
            <VCol cols="12" md="6" sm="6">
              <SenderIdStatisticsCard
                v-bind="{
                  title: 'Default ID',
                  slug: 'Free sender id used by clients',
                  image: phoneGrey,
                  stats: senderIdStore.defaultSenderID,
                  isDefault: true,
                }"
              />
            </VCol>
            <!-- 👉 Today Income -->
            <VCol cols="12" md="6" sm="6">
              <SenderIdStatisticsCard
                v-bind="{
                  title: 'Total Sender IDs',
                  slug: 'Total client sender-ids',
                  image: phoneBlue,
                  stats: senderIdStore.sender_ids.length,
                  isDefault: false,
                }"
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <!-- 👉 Sender IDs -->
      <VCard title="Client Sender IDs" class="mt-5">
        <SenderIdDataTable :senderIdStore="senderIdStore" />
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
