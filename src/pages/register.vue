<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";

const authStore = useAuthStore();

const form = ref({
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  company_name: "",
  company_email: "",
  company_address: "",
  password: "",
});

const rules = {
  first_name: { required },
  last_name: { required },
  phone_number: { required },
  company_name: { required },
  company_email: { required },
  company_address: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, form);
const isPasswordVisible = ref(false);
const privacyPolicies = ref(true);

function submitForm() {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  authStore.registerClient(form.value);
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="680">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img src="/icon.png" width="50" alt="" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> Bulk SMS </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Seamless Bulk SMS starts here 🚀</h5>
        <p class="mb-0">Make your bulk sms management easy and fun!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitForm">
          <VRow>
            <!-- Firstname -->
            <VCol cols="6">
              <VTextField 
                v-model="form.first_name" 
                autofocus 
                label="First Name" 
                placeholder="John"
                @input="v$.first_name.$touch"
                :error-messages="v$.first_name.$errors.map((e) => e.$message)" 
              />
            </VCol>

            <!-- Lastnanme -->
            <VCol cols="6">
              <VTextField 
                v-model="form.last_name" 
                autofocus 
                label="Last Name" 
                placeholder="Doe" 
                @input="v$.last_name.$touch"
                :error-messages="v$.last_name.$errors.map((e) => e.$message)" 
              />
            </VCol>

            <!-- Phone Number -->
            <VCol cols="6">
              <VTextField 
                v-model="form.phone_number" 
                label="Phone Number" 
                placeholder="254712345789" 
                type="number" 
                @input="v$.phone_number.$touch"
                :error-messages="v$.phone_number.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- email -->
            <VCol cols="6">
              <VTextField 
                v-model="form.email" 
                label="Email" 
                placeholder="johndoe@email.com" 
                type="email"
                @input="v$.email.$touch"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- Company Name -->
            <VCol cols="6">
              <VTextField 
                v-model="form.company_name" 
                label="Company Name" 
                placeholder="Company Name" 
                type="text" 
                @input="v$.company_name.$touch"
                :error-messages="v$.company_name.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- Company Email -->
            <VCol cols="6">
              <VTextField 
                v-model="form.company_email" 
                label="Company Email" 
                placeholder="info@companyname.com"
                type="email" 
                @input="v$.company_email.$touch"
                :error-messages="v$.company_email.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- Company Address -->
            <VCol cols="6">
              <VTextField 
                v-model="form.company_address"
                label="Company Address" 
                placeholder="Nairobi-Westlands"
                type="address" 
                @input="v$.company_address.$touch"
                :error-messages="v$.company_address.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- password -->
            <VCol cols="6">
              <VTextField 
                v-model="form.password" 
                label="Password" 
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                @input="v$.password.$touch"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox id="privacy-policy" @change="privacyPolicies = !privacyPolicies" inline />
                <VLabel for="privacy-policy" style="opacity: 1">
                  <span class="me-1">I agree to</span>
                  <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
                </VLabel>
              </div>

              <VRow class="justify-center" v-if="authStore.loading">
                <div class="loading text-center">
                  <div class="effect-1 effects"></div>
                  <div class="effect-2 effects"></div>
                  <div class="effect-3 effects"></div>
                </div>
              </VRow>
              <VBtn block type="submit" :disabled="privacyPolicies" v-else> Sign up </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" to="/login">
                Sign in instead
              </RouterLink>
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
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
