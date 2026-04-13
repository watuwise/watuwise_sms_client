<script setup>
import { ref, computed } from "vue";
import { useSenderIdStore } from "@/stores/SenderIdStore";

const props = defineProps(["senderIdStore"]);
const senderIdStore = useSenderIdStore();

const dialog = ref(false);
const formRef = ref(null);

const formData = ref({
  sender_id: "",
  clientID: JSON.parse(localStorage.getItem("user")).id,
  reg_certificate: null,
  application_form: null,
});

const certName   = computed(() => formData.value.reg_certificate?.name  || "");
const appName    = computed(() => formData.value.application_form?.name || "");

function onCertChange(e)  { formData.value.reg_certificate  = e.target.files[0] || null; }
function onFormChange(e)  { formData.value.application_form = e.target.files[0] || null; }

function downloadForm() {
  window.open(`${import.meta.env.VITE_API_BASE_URL}sender-id-form/download`, "_blank");
}

async function submitApplication() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  if (!formData.value.reg_certificate || !formData.value.application_form) return;
  try {
    const recordId = await senderIdStore.applySenderId(formData.value);
    dialog.value = false;
    await senderIdStore.initializeSenderIdPayment(recordId);
  } catch(e) {
    // errors handled in store
  }
}

function reset() {
  formData.value = {
    sender_id: "",
    clientID: JSON.parse(localStorage.getItem("user")).id,
    reg_certificate: null,
    application_form: null,
  };
  formRef.value?.reset();
}
</script>

<template>
  <VDialog v-model="dialog" persistent max-width="560">
    <template #activator="{ props: activatorProps }">
      <VBtn color="primary" v-bind="activatorProps">
        <VIcon icon="bx-id-card" class="mr-2" size="18" />
        Apply for Sender ID
      </VBtn>
    </template>

    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center px-6 pt-5 pb-2">
        <span class="text-h6 font-weight-bold">Apply for Sender ID</span>
        <VBtn icon variant="text" size="small" @click="dialog = false; reset()">
          <VIcon icon="bx-x" />
        </VBtn>
      </VCardTitle>

      <VCardText class="px-6 pt-2 pb-0">
        <VAlert type="info" variant="tonal" class="mb-3" density="compact">
          Your Sender ID will appear as the SMS name recipients see. It must reflect your business name and requires approval (typically 1–3 business days).
        </VAlert>
        <VAlert type="warning" variant="tonal" class="mb-5" density="compact">
          <strong>Application fee: KES 8,000</strong> — you will be redirected to Paystack to complete payment after submitting your documents.
        </VAlert>

        <VForm ref="formRef" @submit.prevent="submitApplication">
          <!-- Sender ID name -->
          <div class="field-label mb-1">Sender ID Name <span class="text-error">*</span></div>
          <VTextField
            v-model.trim="formData.sender_id"
            placeholder="e.g. MYBRAND"
            variant="outlined"
            density="compact"
            :rules="[
              v => !!v || 'Sender ID is required',
              v => v.length <= 11 || 'Max 11 characters',
              v => /^[A-Za-z0-9]+$/.test(v) || 'No spaces or special characters',
            ]"
            hint="Max 11 characters, letters and numbers only"
            persistent-hint
            class="mb-5"
          />

          <!-- Download form -->
          <div class="download-box mb-5">
            <div>
              <div class="font-weight-semibold text-body-2">Step 1 — Download, fill &amp; sign the application form</div>
              <div class="text-medium-emphasis text-caption mt-1">Fill in your details, sign, then scan or take a photo and upload below.</div>
            </div>
            <VBtn color="primary" variant="tonal" size="small" @click="downloadForm">
              <VIcon icon="bx-download" class="mr-1" size="16" />Download (.docx)
            </VBtn>
          </div>

          <!-- Business Registration Certificate -->
          <div class="field-label mb-1">Step 2 — Business Registration Certificate <span class="text-error">*</span></div>
          <div class="upload-box mb-1" :class="{ 'upload-box-filled': certName }" @click="$refs.certInput.click()">
            <VIcon :icon="certName ? 'bx-file' : 'bx-upload'" size="22" color="primary" class="mr-2" />
            <span class="text-body-2">{{ certName || 'Click to upload (PDF, JPG, PNG — max 5MB)' }}</span>
          </div>
          <input ref="certInput" type="file" accept=".pdf,.jpg,.jpeg,.png" class="d-none" @change="onCertChange" />
          <div v-if="!formData.reg_certificate" class="text-caption text-error mb-4">Required</div>
          <div v-else class="text-caption text-success mb-4">✓ {{ certName }}</div>

          <!-- Signed Application Form -->
          <div class="field-label mb-1">Step 3 — Filled &amp; Signed Application Form <span class="text-error">*</span></div>
          <div class="upload-box mb-1" :class="{ 'upload-box-filled': appName }" @click="$refs.appInput.click()">
            <VIcon :icon="appName ? 'bx-file-blank' : 'bx-upload'" size="22" color="primary" class="mr-2" />
            <span class="text-body-2">{{ appName || 'Click to upload (PDF, DOCX, JPG, PNG — max 5MB)' }}</span>
          </div>
          <input ref="appInput" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="d-none" @change="onFormChange" />
          <div v-if="!formData.application_form" class="text-caption text-error mb-4">Required</div>
          <div v-else class="text-caption text-success mb-4">✓ {{ appName }}</div>

          <VDivider class="mb-4" />

          <div class="d-flex gap-3 mb-2">
            <VBtn variant="outlined" @click="dialog = false; reset()" class="flex-grow-1">Cancel</VBtn>
            <VBtn
              type="submit"
              color="primary"
              class="flex-grow-1"
              :loading="senderIdStore.formProcessing"
              :disabled="!formData.reg_certificate || !formData.application_form"
            >
              <VIcon icon="bx-credit-card" class="mr-2" size="16" />Submit & Pay KES 8,000
            </VBtn>
          </div>
        </VForm>
      </VCardText>
      <div class="pb-4" />
    </VCard>
  </VDialog>
</template>

<style scoped>
.field-label { font-size: 0.85rem; font-weight: 600; color: #111; }

.download-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(80,37,209,0.05);
  border: 1px solid rgba(80,37,209,0.18);
  border-radius: 10px;
  padding: 14px 16px;
}

.upload-box {
  display: flex;
  align-items: center;
  border: 1.5px dashed #c4b8f5;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  background: #faf9ff;
}
.upload-box:hover { border-color: #5025D1; background: rgba(80,37,209,0.04); }
.upload-box-filled { border-color: #71DD37; border-style: solid; background: rgba(113,221,55,0.04); }
</style>
