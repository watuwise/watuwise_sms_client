<script setup>
import phoneImg from "@images/cards/phone-vibrate-success.png";
import ClientMoreBtn from "./ClientMoreBtn.vue";

// define props
const props = defineProps(["ids"]);

const moreList = [
  {
    title: "Refresh",
    value: "refresh",
  },
];
</script>

<template>
  <VCard title="Sender IDs">
    <template #append>
      <div class="me-n3 mt-n2">
        <ClientMoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem v-for="(id, index) in props.ids" :key="index">
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              color="success"
              class="me-3"
              :image="phoneImg"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1"> Sender ID </VListItemSubtitle>
          <VListItemTitle>
            {{ id.sender_id }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <VCol>
                <VListItemSubtitle class="text-disabled mb-1">
                  Provider
                </VListItemSubtitle>
                <VListItemTitle v-if="id.sender_id == '23107'">
                  PeakandDale
                </VListItemTitle>
                <VListItemTitle v-else>
                  {{ id.provider ?? "N/A" }}
                </VListItemTitle>
              </VCol>
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
