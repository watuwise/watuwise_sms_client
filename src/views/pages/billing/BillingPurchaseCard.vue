<script setup>
import { ref } from "vue";
import { useBillingStore } from "@/stores/BillingStore";
import { useSmsPlanStore } from "@/stores/SmsPlanStore";
import Swal from "sweetalert2";
import BillingPlanCard from "./BillingPlanCard.vue";

const billingStore = useBillingStore();
const smsPlanStore = useSmsPlanStore();

smsPlanStore.getSmsPlans();

const dialog = ref(false);
const user = JSON.parse(localStorage.getItem("user"));

const purchaseFormData = ref({
  price: null,
  units: null,
});

const units_invalid = ref(false);

function calculatePrice() {
  const plans = smsPlanStore.plans;

  let min_units = 0;

  for (const plan of plans) {
    min_units = +plan.min_units;

    if (+plan.min_units < min_units) min_units = +plan.min_units;

    units_invalid.value = purchaseFormData.value.units < min_units;

    if (plan.max_units == "-1") {
      purchaseFormData.value.price = Math.round(+plan.price * +purchaseFormData.value.units);
      break;
    } else {
      if (
        +purchaseFormData.value.units >= +plan.min_units &&
        +purchaseFormData.value.units <= +plan.max_units
      ) {
        purchaseFormData.value.price = Math.round(+plan.price * +purchaseFormData.value.units);
        break;
      }
    }
  }
}

function payWithPaystack() {
  if (!purchaseFormData.value.units || !purchaseFormData.value.price) return;

  dialog.value = false;
  billingStore.payWithPaystack(purchaseFormData.value.units, purchaseFormData.value.price);
}

function payWithMpesa() {
  if (!purchaseFormData.value.units || !purchaseFormData.value.price) return;

  Swal.fire({
    title: "Pay with M-Pesa?",
    text: "A prompt will be sent to +" + user.phone_number,
    icon: "question",
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    denyButtonText: "Change phone number",
    confirmButtonText: "Yes",
    iconColor: "#89CFF0",
  }).then((result) => {
    if (result.isConfirmed) {
      dialog.value = false;
      billingStore.sendPrompt(purchaseFormData.value.price, user.phone_number, purchaseFormData.value.units);
    } else if (result.isDenied) {
      Swal.fire({
        title: "Enter your phone number",
        text: "E.g 254712345678",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Send prompt",
      }).then((result) => {
        if (result.isConfirmed) {
          dialog.value = false;
          billingStore.sendPrompt(purchaseFormData.value.price, result.value, purchaseFormData.value.units);
        }
      });
    }
  });
}
</script>

<template>
  <VCard>
    <VCardText class="d-flex flex-column align-center text-center">
      <h3 class="pb-3">Purchase SMS</h3>
      <p>
        Purchase SMS units according to your budget with our affordable plans.
        Click the button to top up your SMS units.
      </p>

      <!-- DIALOG -->
      <VDialog v-model="dialog" persistent width="860">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" color="primary">Top Up</VBtn>
        </template>

        <VCard>
          <VCardTitle class="mt-4">
            <span class="text-h5">SMS Purchase</span>
          </VCardTitle>

          <VCardText>
            <VContainer>
              <VRow>
                <VCol cols="6">
                  <VTextField
                    type="number"
                    label="Number of SMS units"
                    v-model="purchaseFormData.units"
                    @input="calculatePrice"
                    required
                  />
                  <span class="text-error" v-if="units_invalid">
                    <small>Invalid units. Please check the SMS plans below.</small>
                  </span>
                </VCol>
                <VCol cols="6">
                  <VTextField
                    type="number"
                    label="Total amount (KES)"
                    v-model="purchaseFormData.price"
                    readonly
                  />
                </VCol>
              </VRow>
            </VContainer>
          </VCardText>

          <VDivider />

          <!-- SMS Plans -->
          <VCardText>
            <VRow>
              <VCol cols="4" v-for="(plan, index) in smsPlanStore.plans" :key="index">
                <BillingPlanCard :sms-plan="plan" />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <!-- Payment Buttons -->
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VBtn
                  block
                  color="primary"
                  size="large"
                  :disabled="!purchaseFormData.price || units_invalid"
                  @click="payWithPaystack"
                >
                  <VIcon icon="bx-credit-card" class="mr-2" />
                  Pay with Paystack
                  <small class="ml-2 opacity-70">(Card / M-Pesa / Bank)</small>
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>

          <VCardActions>
            <VSpacer />
            <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
      <!-- DIALOG -->
    </VCardText>
  </VCard>
</template>
