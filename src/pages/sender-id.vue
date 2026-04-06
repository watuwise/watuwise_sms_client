<script setup>
import SenderIdDataTable from "@/views/pages/sender-id/SenderIdDataTable.vue";
import SenderIdManagementTitle from "@/views/pages/sender-id/SenderIdManagementTitle.vue";
import SenderIdStatisticsCard from "@/views/pages/sender-id/SenderIdStatisticsCard.vue";
import { useSenderIdStore } from "@/stores/SenderIdStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// 👉 Images
import phoneGrey from "@images/cards/phone-grey.png";
import phoneBlue from "@images/cards/phone-blue.png";

const senderIdStore = useSenderIdStore();
const route = useRoute();

senderIdStore.getSenderIds();

const approvedCount = computed(() => senderIdStore.sender_ids.filter(s => s.status === "active").length);
const pendingCount  = computed(() => senderIdStore.sender_ids.filter(s => s.status === "pending").length);

onMounted(() => {
  const ref = route.query.paystack_ref;
  if (ref) {
    senderIdStore.verifySenderIdPayment(ref);
  }
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="12" md="7">
          <SenderIdManagementTitle />
        </VCol>

        <VCol cols="12" md="5" order="2" order-md="1">
          <VRow>
            <VCol cols="12" md="6" sm="6">
              <SenderIdStatisticsCard
                title="Approved IDs"
                slug="Active & ready to use"
                :image="phoneBlue"
                :stats="approvedCount"
                :is-default="false"
              />
            </VCol>
            <VCol cols="12" md="6" sm="6">
              <SenderIdStatisticsCard
                title="Pending Applications"
                slug="Awaiting admin approval"
                :image="phoneGrey"
                :stats="pendingCount"
                :is-default="true"
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>

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
