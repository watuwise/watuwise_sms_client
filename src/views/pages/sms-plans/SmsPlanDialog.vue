<script setup>
import CustomLoader from "@/@core/components/CustomLoader.vue";
import { useSmsPlanStore } from "@/stores/SmsPlanStore";
import { ref } from "vue";

const props = defineProps(["smsPlanData", "dialogType"]);
const dialogType = props.dialogType;

const dialog_title = dialogType == "save" ? "Create SMS Plan" : "Edit SMS Plan";
const btn_type = dialogType == "save" ? "Save" : "Update";

const smsPlanStore = useSmsPlanStore();

const dialog = ref(false);
const formData = ref({
  id: dialogType == "save" ? "" : props.smsPlanData.id,
  title: dialogType == "save" ? "" : props.smsPlanData.title,
  min_units: dialogType == "save" ? "" : props.smsPlanData.min_units,
  max_units: dialogType == "save" ? "" : props.smsPlanData.max_units,
  price: dialogType == "save" ? "" : props.smsPlanData.price,
  description: dialogType == "save" ? "" : props.smsPlanData.description,
});

function submitPlanData() {
  if (dialogType == "save") {
    console.log("saving sms plan");
    console.log(formData.value);
    smsPlanStore.saveSmsPlan(formData.value);
  } else {
    console.log("updating sms plan");
    console.log(formData.value);
    smsPlanStore.updateSmsPlan(formData.value);
  }
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="720">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props" v-if="dialogType == 'save'">Add Plan</VBtn>
      <span v-bind="props" v-else>
        <VIcon class="me-2" icon="bx-edit" size="18" /> Edit
      </span>
    </template>
    <VCard>
      <VForm @submit.prevent="submitPlanData">
        <VCardTitle class="mt-4">
          <span class="text-h5">{{ dialog_title }}</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <VCol cols="12">
                <VTextField label="Plan Title " v-model.trim="formData.title" required />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField type="number" label="Min" v-model.trim="formData.min_units" required />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField type="number" label="Max" v-model.trim="formData.max_units" required />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField type="number" label="Price" v-model.trim="formData.price" required />
              </VCol>
              <VCol cols="12">
                <VTextarea label="Description" v-model.trim="formData.description" required />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </VBtn>
          <CustomLoader v-if="smsPlanStore.formProcessing" style="height: 50; width: 50" />
          <VBtn type="submit" variant="text" v-else>
            {{ btn_type }}
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
  <!-- !DIALOG -->
</template>
