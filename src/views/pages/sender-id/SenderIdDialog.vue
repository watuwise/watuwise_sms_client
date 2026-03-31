<script setup>
import { useClientStore } from "@/stores/ClientStore";
import { ref } from "vue";

const props = defineProps(["senderIdStore", "dialogType", "senderId"]);
const clientStore = useClientStore();
const senderID = props.senderId;

const dialog_type = props.dialogType;
const dialog_title = dialog_type == "save" ? "Add Sender ID" : "Edit Sender ID";

const dialog = ref(false);
const formData = ref({
  id: dialog_type == "save" ? "" : senderID.id,
  sender_id: dialog_type == "save" ? "" : senderID.sender_id,
  sender_name: dialog_type == "save" ? "" : senderID.sender_name,
  clientID: JSON.parse(localStorage.getItem("user")).id,
  provider: dialog_type == "save" ? "" : senderID.provider,
  // status: dialog_type == "save" ? "active" : senderID.status,
});

function submitForm() {
  if (dialog_type == "save") props.senderIdStore.saveSenderId(formData.value);
  else props.senderIdStore.updateSenderId(formData.value);
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="720">
    <template v-slot:activator="{ props }">
      <VBtn color="primary" v-bind="props" v-if="dialog_type == 'save'">
        Add Sender ID
      </VBtn>
      <VIcon size="small" v-bind="props" class="mr-4" v-else> mdi-pencil </VIcon>
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
                  label="Sender Name"
                  v-model.trim="formData.sender_name"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Sender ID"
                  v-model.trim="formData.sender_id"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField label="Provider" v-model.trim="formData.provider" required />
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
            v-if="props.senderIdStore.formProcessing"
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
