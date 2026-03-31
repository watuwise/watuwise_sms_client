<script setup>
import { useContactStore } from "@/stores/ContactStore";
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import ContactFormDialog from "./ContactFormDialog.vue";
import ImportContactDialog from "./ImportContactDialog.vue";

const props = defineProps(["contacts"]);
const contactStore = useContactStore();
const search = ref("");

// Set headers for client datatable
const clientsDataHeaders = [
  {
    title: "First Name",
    key: "first_name",
  },
  {
    title: "Last Name",
    key: "last_name",
  },
  {
    title: "Phone Number",
    key: "phone_number",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];
</script>

<template>
  <VRow>
    <!-- SECTION CLIENTS -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard>
        <VDataTable
          :headers="clientsDataHeaders"
          :items="props.contacts"
          :items-per-page="10"
          class="text-no-wrap rounded-0 text-sm"
          show-select
          :search="search"
        >
          <template v-slot:top>
            <VToolbar flat>
              <VToolbarTitle>
                <VResponsive class="text-right" max-width="320">
                  <VTextField
                    v-model="search"
                    hide-details
                    placeholder="Search here..."
                    density="compact"
                    prepend-inner-icon="bx-search"
                  />
                </VResponsive>
              </VToolbarTitle>

              <VSpacer />
              <ContactFormDialog dialog-type="save" />
              <!-- <VBtn> <VIcon icon="file-import" /> Import Contact </VBtn> -->
              <ImportContactDialog />
            </VToolbar>
          </template>

          <template #item.customer="{ item }">
            <div class="d-flex">
              <VIcon start icon="bx-group" color="primary" />
              <span class="text-high-emphasis text-base">
                {{ item.raw.customer }}
              </span>
            </div>
          </template>

          <!-- exclude the action on default sender id -->

          <!-- ACTION BUTTONS -->
          <template v-slot:item.actions="{ item }">
            <IconBtn>
              <VIcon icon="bx-dots-vertical" />

              <VMenu activator="parent">
                <VList>
                  <!-- 👉 LIst Item Link -->
                  <VListItem style="cursor: pointer">
                    <ContactFormDialog :contact="item.raw" dialog-type="edit" />
                  </VListItem>

                  <!-- 👉 LIst Item Link -->
                  <VListItem
                    style="cursor: pointer"
                    @click="contactStore.deleteContactData(item.raw.id)"
                  >
                    <VListItemTitle>
                      <VIcon class="me-2" icon="bx-trash-alt" size="18" /> Delete
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </IconBtn>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <!-- SECTION -->
  </VRow>
</template>
