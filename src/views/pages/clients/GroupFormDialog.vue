<script setup>
import { useContactStore } from "@/stores/ContactStore";
import { ref } from "vue";
import ImportGroupContactDialog from "./ImportGroupContactDialog.vue";

const contactStore = useContactStore();
const props = defineProps(["dialogType", "group", "isDetail"]);

const dialog = ref(false);
const group = props.group;
const contact_filename = ref("");
const dialog_type = props.dialogType;
const dialog_title = dialog_type == "save" ? "Create Group" : "Edit Group";

const formData = ref({
  contacts_file: "",
  id: dialog_type == "save" ? "" : group.id,
  clientID: JSON.parse(localStorage.getItem("user")).id,
  group_name: dialog_type == "save" ? "" : group.group_name,
  selected_contacts: dialog_type == "save" ? [] : group.contacts,
});

const contactFileUpload = (file) => {
  console.log("contact file");
  console.log(file);

  formData.value.contacts_file = file;
  contact_filename.value = file.name;
} 

const selectAllContacts = computed(
  () => formData.value.selected_contacts.length === contactStore.contacts.length
);
const selectSomeContacts = computed(() => formData.value.selected_contacts.length > 0);
const isSelectAllContacts = ref(false);

function toggleSelectAllContacts() {
  isSelectAllContacts.value = !isSelectAllContacts.value;

  if (isSelectAllContacts.value)
    formData.value.selected_contacts = contactStore.contacts.slice();
  else formData.value.selected_contacts = [];
}

function appendContact(contact) {
  if (formData.value.selected_contacts.includes(contact)) {
    const index = formData.value.selected_contacts.indexOf(contact);

    formData.value.selected_contacts.splice(index, 1);
  } else {
    formData.value.selected_contacts.push(contact);
  }

  console.log(formData.value.selected_contacts);
}

function removeContactFile() {
  contact_filename.value = "";
  formData.value.contacts_file = "";
}

function submitForm() {
  console.log('formData.value');
  console.log(formData.value);

  if (dialog_type == "save") {
    contactStore.saveGroupData(formData.value);
  } else {
    contactStore.updateGroupData(formData.value);
  }
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="790">
    <template v-slot:activator="{ props }">
      <VBtn color="primary" v-bind="props" v-if="dialog_type == 'save'">
        Create Group
      </VBtn>

      <VListItemTitle v-bind="props" v-else>
        <!-- <VBtn variant="text"> <VIcon class="me-2" icon="bx-edit" size="18" /> Edit </VBtn> -->
        <span> <VIcon class="me-2" icon="bx-edit" size="18" /> Edit </span>
      </VListItemTitle>
    </template>
    <VCard>
      <VForm @submit.prevent="submitForm">
        <VCardTitle class="mt-4">
          <VRow  class="ma-2">
            <span class="text-h5">{{ dialog_title }}</span>
            <VSpacer />
            <span v-if="contact_filename!=''">
              <VCardText class="pa-0">
                <VIcon icon="bx-file-blank" /> 
                {{ contact_filename }} 
                <VBtn 
                  variant="text" 
                  style="padding: 12px; border-radius: 50%; min-width: 1em; min-height: 1em;"
                  @click="removeContactFile">
                  <VIcon icon="bx-x-circle" />
                </VBtn>
              </VCardText>
            </span>
            <ImportGroupContactDialog component-source="groupForm" @uploadContactFile="contactFileUpload" v-else />
          </VRow>
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
              <VCol cols="12">
                <VSelect
                  v-model="formData.selected_contacts"
                  :items="contactStore.contacts"
                  label="Contacts"
                  multiple
                >
                  <template v-slot:prepend-item>
                    <VListItem title="Select All" @click="toggleSelectAllContacts">
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          :color="selectAllContacts ? 'primary' : 'undefined'"
                          :indeterminate="selectSomeContacts && !selectAllContacts"
                          :model-value="selectSomeContacts"
                        />
                      </template>
                    </VListItem>

                    <VDivider class="mt-2" />
                  </template>

                  <template v-slot:item="{ item, index }">
                    <VListItem
                      :title="item.value.first_name + ' ' + item.value.last_name"
                      :value="item.value"
                      @click="appendContact(item.value)"
                      :key="index"
                    >
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          color="primary"
                          :model-value="formData.selected_contacts.includes(item.value)"
                        />
                      </template>
                    </VListItem>
                  </template>

                  <template v-slot:selection="{ item, index }">
                    <VChip v-if="index < 5" color="primary">
                      <span>{{
                        item.value.first_name + " " + item.value.last_name
                      }}</span>
                    </VChip>
                    <span
                      v-if="index === 5"
                      class="text-grey text-caption align-self-center"
                    >
                      (+{{ formData.selected_contacts.length - 5 }} others)
                    </span>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </VBtn>
          <CustomLoader
            v-if="contactStore.formProcessing"
            style="height: 50; width: 50"
          />
          <VBtn type="submit" variant="text" v-else>
            {{ dialog_type == "save" ? "Save" : "Update" }}
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
  <!-- !DIALOG -->
</template>
