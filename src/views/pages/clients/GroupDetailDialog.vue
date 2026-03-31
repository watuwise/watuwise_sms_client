<script setup>
import { useContactStore } from "@/stores/ContactStore";
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import ImportGroupContactDialog from "./ImportGroupContactDialog.vue";

const contactStore = useContactStore();
const props = defineProps(["group"]);

const dialog = ref(false);
const group = props.group;
const dialog_type = props.dialogType;
const dialog_title = dialog_type == "save" ? "Create Group" : "Edit Group";

const formData = ref({
  id: dialog_type == "save" ? "" : group.id,
  group_name: dialog_type == "save" ? "" : group.group_name,
});

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
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="860">
    <template v-slot:activator="{ props }">
      <VBtn color="primary mb-4" v-bind="props">
        <span class="d-none d-sm-block mr-2">Details</span>
        <VIcon icon="bx-folder-open" size="18" class="d-sm-block" />
      </VBtn>
    </template>
    <VCard>
      <VForm @submit.prevent="submitForm">
        <VCardTitle class="mt-4">
          <span class="text-h5">{{ dialog_title }}</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <VCol cols="12">
                <VTextField
                  label="Group Name"
                  v-model.trim="formData.group_name"
                  required
                />
              </VCol>
              <VDivider />
              <VCol cols="12">
                <VDataTable
                  :headers="clientsDataHeaders"
                  :items="group.contacts"
                  :items-per-page="10"
                  class="text-no-wrap rounded-0 text-sm"
                >
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
                          <!-- <VListItem style="cursor: pointer">
                            <ContactFormDialog :contact="item.raw" dialog-type="edit" />
                          </VListItem> -->

                          <!-- 👉 LIst Item Link -->
                          <VListItem
                            style="cursor: pointer"
                            @click="contactStore.removeContactFromGroup(item.raw.id)"
                          >
                            <VListItemTitle>
                              <VIcon class="me-2" icon="bx-trash-alt" size="18" /> Remove
                            </VListItemTitle>
                          </VListItem>
                        </VList>
                      </VMenu>
                    </IconBtn>
                  </template>
                </VDataTable>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          
          <ImportGroupContactDialog component-source="groupDetail" :group-id="group.id" />
          <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
  <!-- DIALOG -->
</template>
