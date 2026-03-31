<script setup>
import { ref } from "vue";
import { useContactStore } from "@/stores/ContactStore";

const props = defineProps(["dialogType", "contact"]);
const contactStore = useContactStore();
const contact = props.contact;

const dialog_type = props.dialogType;
const dialog_title = dialog_type == "save" ? "Add Contact" : "Edit Contact";

const dialog = ref(false);

const formData = ref({
  id: dialog_type == "save" ? "" : contact.id,
  first_name: dialog_type == "save" ? "" : contact.first_name,
  last_name: dialog_type == "save" ? "" : contact.last_name,
  phone_number: dialog_type == "save" ? "" : contact.phone_number,
  clientID: JSON.parse(localStorage.getItem("user")).id,
});

function submitForm() {
  if (dialog_type == "save") contactStore.saveContactData(formData.value);
  else contactStore.updateContactData(formData.value);
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="720">
    <template v-slot:activator="{ props }">
      <VBtn color="primary" v-bind="props" v-if="dialog_type == 'save'">
        Add Contact <VIcon icon="bx-plus-circle" />
      </VBtn>

      <VListItemTitle v-bind="props" v-else>
        <VIcon class="me-2" icon="bx-edit-alt" size="18" />
        Edit
      </VListItemTitle>
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
                  label="First Name"
                  v-model.trim="formData.first_name"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Last Name"
                  v-model.trim="formData.last_name"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Phone Number"
                  v-model.trim="formData.phone_number"
                  required
                />
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
