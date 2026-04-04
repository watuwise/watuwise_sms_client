<script setup>
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

const formData = ref({
  email: "",
  password: "",
  remember: false,
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, formData);
const authStore = useAuthStore();
const isPasswordVisible = ref(false);

function handleAdminLogin() {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  // pass data to store for processing
  authStore.login(formData.value);
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
        <h5 class="text-h5 mb-1">Welcome to client portal! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleAdminLogin">
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

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model.trim="formData.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                required
                @input="v$.password.$touch"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox v-model="formData.remember" label="Remember me" />

                <RouterLink class="text-primary ms-2 mb-1" to="forgot-password">
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VRow class="justify-center" v-if="authStore.loading">
                <div class="loading text-center">
                  <div class="effect-1 effects"></div>
                  <div class="effect-2 effects"></div>
                  <div class="effect-3 effects"></div>
                </div>
              </VRow>
              <VBtn block type="submit" @click="v$.$validate" v-else> Login </VBtn>
            </VCol>

            <!-- <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <!-- <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol> -->
            <VCardText class="pt-2">
              <span>Don't have an account ?</span>

              <RouterLink to="register" class="text-primary ms-2 mb-1">
                Register here
              </RouterLink>
            </VCardText>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
