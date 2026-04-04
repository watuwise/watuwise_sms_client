<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

const formData = ref({
  email: "",
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, formData);
const authStore = useAuthStore();

function handleForgotPassword() {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  // pass data to store for processing
  authStore.forgotPassword(formData.value);
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img src="/icon.png" width="50" alt="" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> WatuwiseSMS </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Forgot Password?</h5>
        <!--🔒-->
        <p class="mb-0">
          Enter your email and we'll send you instructions to reset your password
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleForgotPassword">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model.trim="formData.email"
                autofocus
                placeholder="username@email.com"
                label="Email"
                type="email"
                required
                @input="v$.email.$touch"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
              />
            </VCol>

            <VCol cols="12" class="mb-4">
              <!-- login button -->
              <VRow class="justify-center" v-if="authStore.loading">
                <div class="loading text-center">
                  <div class="effect-1 effects"></div>
                  <div class="effect-2 effects"></div>
                  <div class="effect-3 effects"></div>
                </div>
              </VRow>
              <VBtn block type="submit" @click="v$.$validate" v-else>
                Send Reset Link
              </VBtn>
            </VCol>

            <VCol cols="12" class="text-center text-base">
              <RouterLink class="text-primary ms-2 login-back-btn" to="/login">
                <VIcon icon="bx-arrow-back" class="mr-2 arrow-icon" />
                Back to login
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
