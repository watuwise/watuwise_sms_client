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
  phoneNumber: "",
});

const units_invalid = ref(false);

function calculatePrice() {
  const plans = smsPlanStore.plans;
  // const plans = JSON.parse(localStorage.getItem("sms_plans"));
  console.log(plans[0]);

  let min_units = 0;

  for (const plan of plans) {
    console.log("is plan");
    console.log(plan);
    console.log(plan.title);

    min_units = +plan.min_units;

    if (+plan.min_units < min_units) {
      min_units = +plan.min_units;
    }

    if (purchaseFormData.value.units < min_units) {
      units_invalid.value = true;
    } else {
      units_invalid.value = false;
    }

    if (plan.max_units == "-1") {
      purchaseFormData.value.price = Math.round(
        +plan.price * +purchaseFormData.value.units
      );
      break;
    } else {
      if (
        +purchaseFormData.value.units >= +plan.min_units &&
        +purchaseFormData.value.units <= +plan.max_units
      ) {
        purchaseFormData.value.price = Math.round(
          +plan.price * +purchaseFormData.value.units
        );
        break;
      }
    }
  }

  console.log("min_units: " + min_units);

  return null;
}

function makePayment() {
  // this.v$.$validate();

  // if (!this.v$.$error) {
  Swal.fire({
    title: "Pay with MPesa?",
    text: "A prompt will be sent to +" + +user.phone_number,
    icon: "question",
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    denyButtonText: `Change phone number`,
    confirmButtonText: "Yes",
    iconColor: "#89CFF0",
  }).then((result) => {
    console.log(result);

    if (result.isConfirmed) {
      console.log('Price of units')
      console.log(purchaseFormData.value.price);
      billingStore.sendPrompt(
        purchaseFormData.value.price,
        user.phone_number,
        purchaseFormData.value.units
      );
    } else if (result.isDenied) {
      Swal.fire({
        title: "Enter your phone number",
        text: "E.g 254712345678",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Send prompt",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          billingStore.sendPrompt(
            purchaseFormData.value.price,
            result.value,
            purchaseFormData.value.units
          );
        }
      });
    }
  });
  // }
}
</script>

<template>
  <VCard>
    <VCardText class="d-flex flex-column align-center text-center">
      <h3 class="pb-3">Purchase SMS</h3>
      <p>
        Purchase SMS units according to your budget with our affordable plans. Click the
        button to top up your sms units.
      </p>

      <!-- DIALOG -->
      <VDialog v-model="dialog" persistent width="860">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props">Top Up</VBtn>
        </template>

        <VCard>
          <VForm @submit.prevent="makePayment">
            <VCardTitle class="mt-4">
              <span class="text-h5">SMS Purchase</span>
            </VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol cols="6">
                    <VTextField
                      type="number"
                      label="Number of SMS to buy "
                      v-model.trim="purchaseFormData.units"
                      @keyup="calculatePrice"
                      required
                    />
                    <span class="text-error" v-if="units_invalid">
                      <small>
                        You have entered invalid sms units. Please confirm with the sms
                        plans
                      </small>
                    </span>
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      type="number"
                      label="Total amount to pay"
                      v-model="purchaseFormData.price"
                      readonly
                    />
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="4" v-for="(plan, index) in smsPlanStore.plans" :key="index">
                  <BillingPlanCard :sms-plan="plan" />
                </VCol>
              </VRow>
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
                Close
              </VBtn>
              <VBtn type="submit" variant="text" @click="dialog = false">
                Make Payment
                <VIcon icon="bx-purchase-tag" class="ml-1" />
              </VBtn>
            </VCardActions>
          </VForm>
        </VCard>
      </VDialog>
      <!-- DIALOG -->
    </VCardText>
  </VCard>
</template>
