<script setup>
import phoneContact from "@images/cards/phone-error.png";
import boxGroup from "@images/cards/box.png";
import DashboardMoreBtn from "./DashboardMoreBtn.vue";

// define props
const props = defineProps(["contacts", "groups", "type"]);
</script>

<template>
  <VCard :title="props.type == 'contacts' ? 'Latest Contacts' : 'Latest Groups'">
    <template #append>
      <div class="me-n3 mt-n2">
        <DashboardMoreBtn more-link="/contacts" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list" v-if="props.type == 'contacts'">
        <VCardText v-if="props.contacts.length < 1">
          <VIcon size="20" start icon="bx-info-circle" />
          No contact was found
        </VCardText>

        <VListItem
          v-for="(item, index) in props.contacts.slice(0, 5)"
          :key="index"
          v-else
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              color="success"
              class="me-3"
              :image="phoneContact"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1"> Contact </VListItemSubtitle>
          <VListItemTitle> {{ item.first_name }} {{ item.last_name }} </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1"> {{ item.phone_number }} </span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>

      <VList class="card-list" v-else>
        <VCardText v-if="props.groups.length < 1">
          <VIcon size="20" start icon="bx-info-circle" />
          No contact groups found
        </VCardText>

        <VListItem v-for="(item, index) in props.groups.slice(0, 5)" :key="index" v-else>
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              color="success"
              class="me-3"
              :image="boxGroup"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1"> Group Name </VListItemSubtitle>
          <VListItemTitle> {{ item.group_name }} </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1"> {{ item.contacts.length }} contacts </span>
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
