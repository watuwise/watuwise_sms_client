<script setup>
import userImg from "@images/avatars/user.jpg";
import { useClientStore } from "@/stores/ClientStore";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import CustomLoader from "@/@core/components/CustomLoader.vue";

const clientStore = useClientStore();

const accountData = ref({
  avatarImg: userImg,
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  company_name: "",
  company_address: "",
  company_email: "",
});

const rules = {
  first_name: { required },
  last_name: { required },
  email: { required },
  phone_number: { required },
  company_name: { String },
  company_address: { String },
  company_email: { String },
};

const v$ = useVuelidate(rules, accountData);
const refInputEl = ref();

const resetForm = () => {
  accountData.value.first_name = "";
  accountData.value.last_name = "";
  accountData.value.email = "";
  accountData.value.phone_number = "";
  accountData.value.company_name = "";
  accountData.value.company_address = "";
  accountData.value.company_email = "";
};

const changeAvatar = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;

  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string")
        accountData.value.avatarImg = fileReader.result;
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  accountData.value.avatarImg = userImg;
};

// save user account data
const submitAccountForm = () => {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  clientStore.saveClientData(accountData.value);
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Create Bulk SMS Client Account">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="accountData.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />

              <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="bx-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm @submit.prevent="submitAccountForm()" class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model.trim="accountData.first_name"
                  placeholder="John"
                  label="First Name"
                  @input="v$.first_name.$touch"
                  @blur="v$.first_name.$touch"
                  :error-messages="v$.first_name.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model.trim="accountData.last_name"
                  placeholder="Doe"
                  label="Last Name"
                  @input="v$.last_name.$touch"
                  @blur="v$.last_name.$touch"
                  :error-messages="v$.last_name.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model.trim="accountData.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  @input="v$.email.$touch"
                  @blur="v$.email.$touch"
                  :error-messages="v$.email.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model.trim="accountData.phone_number"
                  label="Phone Number"
                  placeholder="+254701234567"
                  @input="v$.phone_number.$touch"
                  @blur="v$.phone_number.$touch"
                  :error-messages="v$.phone_number.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Company -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model.trim="accountData.company_name"
                  label="Company"
                  placeholder="Company Name"
                  @input="v$.company_name.$touch"
                  @blur="v$.company_name.$touch"
                  :error-messages="v$.company_name.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model.trim="accountData.company_address"
                  label="Company Address"
                  placeholder="Nairobi, Westlands"
                  @input="v$.company_address.$touch"
                  @blur="v$.company_address.$touch"
                  :error-messages="v$.company_address.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model.trim="accountData.company_email"
                  label="Company Email"
                  placeholder="info@company.com"
                  @input="v$.company_email.$touch"
                  @blur="v$.company_email.$touch"
                  :error-messages="v$.company_email.$errors.map((e) => e.$message)"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <CustomLoader v-if="clientStore.formProcessing" />
                <VBtn type="submit" v-else>Save changes</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
