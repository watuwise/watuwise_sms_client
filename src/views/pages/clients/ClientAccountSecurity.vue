<script setup>
import { useClientStore } from "@/stores/ClientStore";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, sameAs } from "@vuelidate/validators";

const props = defineProps(["clientId"]);
const clientStore = useClientStore();

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const pwdFormData = ref({
  id: props.clientId,
  password: "",
  confirmPassword: "",
});

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsRef: sameAs(pwdFormData.value.password) },
  };
});

const v$ = useVuelidate(rules, pwdFormData);

const passwordRequirements = [
  "Minimum 8 characters long - the more, the better",
  "At least one lowercase character",
  "At least one number, symbol, or whitespace character",
];

function submitPasswordData() {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  clientStore.resetClientPassword(pwdFormData.value);
}
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Reset Password">
        <VForm @submit.prevent="submitPasswordData">
          <VCardText>
            <!-- 👉 New Password -->
            <VRow>
              <VCol cols="12" md="6">
                <!-- 👉 new password -->
                <VTextField
                  v-model="pwdFormData.password"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="New Password"
                  placeholder="············"
                  @input="v$.password.$touch"
                  @blur="v$.password.$touch"
                  :error-messages="v$.password.$errors.map((e) => e.$message)"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                  required
                />
              </VCol>

              <VCol cols="12" md="6">
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="pwdFormData.confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Confirm New Password"
                  placeholder="············"
                  @input="v$.confirmPassword.$touch"
                  @blur="v$.confirmPassword.$touch"
                  :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">Password Requirements:</p>

            <ul class="d-flex flex-column gap-y-3">
              <li v-for="item in passwordRequirements" :key="item" class="d-flex">
                <div>
                  <VIcon size="7" icon="bxs-circle" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <div class="loading text-center" v-if="clientStore.formProcessing">
              <div class="effect-1 effects"></div>
              <div class="effect-2 effects"></div>
              <div class="effect-3 effects"></div>
            </div>
            <VBtn type="submit" v-else>Save changes</VBtn>

            <VBtn type="reset" color="secondary" variant="tonal"> Reset </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <!-- <VCol cols="12">
      <VCard title="Two-steps verification">
        <VCardText>
          <p class="font-weight-semibold">
            Two factor authentication is not enabled yet.
          </p>
          <p>
            Two-factor authentication adds an additional layer of security to your account
            by requiring more than just a password to log in.
            <a href="javascript:void(0)" class="text-decoration-none">Learn more.</a>
          </p>

          <VBtn color="secondary"> Enable 2FA </VBtn>
        </VCardText>
      </VCard>
    </VCol> -->
    <!-- !SECTION -->
  </VRow>
</template>
