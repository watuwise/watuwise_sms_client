<script setup>
import ClientManagementTitle from "@/views/pages/clients/ClientManagementTitle.vue";
import ClientDataTable from "@/views/pages/clients/ClientDataTable.vue";
import ClientDataIterator from "@/views/pages/clients/ClientDataIterator.vue";
import ExportComponent from "@/components/ExportComponent.vue";
import { useContactStore } from "@/stores/ContactStore";

// 👉 Images
import phoneContact from "@images/cards/phone-error.png";
import boxGroup from "@images/cards/box.png";
import ClientCardStatistics from "@/views/pages/clients/ClientCardStatistics.vue";
import CustomLoader from "@/@core/components/CustomLoader.vue";

// Instantiate client store
const contactStore = useContactStore();
const tab = ref("contacts");

// call getClients action
contactStore.getContacts();
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="6">
      <ClientManagementTitle />
    </VCol>

    <VCol cols="12" md="6">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="6" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'Contacts',
              image: phoneContact,
              stats: contactStore.contacts.length,
              label: 'Total saved contacts',
            }"
          />
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="12" md="6" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'Groups',
              image: boxGroup,
              stats: contactStore.groups.length,
              label: 'Total created groups',
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <VRow
      v-if="contactStore.loading"
      class="justify-center align-center"
      style="height: 60vh"
    >
      <CustomLoader />
    </VRow>

    <VCol cols="12" v-else>
      <VCard title="">
        <VCardTitle>
          <div class="card-title">
            <h4>Contacts & Groups</h4>
          </div>
        </VCardTitle>

        <VCardItem>
          <VRow class="pa-3 d-flex align-center">
            <VTabs v-model="tab" class="v-tabs-pill">
              <VTab value="contacts"> Contacts </VTab>
              <VTab value="groups"> Groups </VTab>
            </VTabs>
            <VSpacer />
            <div class="d-flex align-center" style="margin-top: -14px">
              <ExportComponent
                filename="contacts-data"
                label="Contacts"
                :data="contactStore.contacts"
              />
              <ExportComponent
                filename="groups-data"
                label="Groups"
                :data="contactStore.groups"
              />
            </div>
          </VRow>
        </VCardItem>

        <VCardText>
          <VWindow v-model="tab">
            <VWindowItem value="contacts">
              <ClientDataTable :contacts="contactStore.contacts" />
            </VWindowItem>

            <VWindowItem value="groups">
              <ClientDataIterator :groups-data="contactStore.groups" />
            </VWindowItem>
          </VWindow>
        </VCardText>
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
