<script setup>
import userImg from "@images/avatars/user.jpg";
import { useAuthStore } from "@/stores/AuthStore";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, sameAs } from "@vuelidate/validators";
import CustomLoader from "@/@core/components/CustomLoader.vue";

const authStore = useAuthStore();
const adminData = JSON.parse(localStorage.getItem("admin"));

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const accountData = ref({
  id: adminData.id,
  avatarImg: userImg,
  first_name: adminData.first_name,
  last_name: adminData.last_name,
  email: adminData.email,
  phone_number: adminData.phone_number,
  company_name: adminData.company_name,
  company_email: adminData.company_email,
  company_address: adminData.company_address,
});

const pwdFormData = ref({
  id: adminData.id,
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

const refInputEl = ref();

const resetForm = () => {
  accountData.id = adminData.id;
  accountData.avatarImg = userImg;
  accountData.first_name = adminData.first_name;
  accountData.last_name = adminData.last_name;
  accountData.email = adminData.email;
  accountData.phone_number = adminData.phone_number;
  accountData.company_name = adminData.company_name;
  accountData.company_email = adminData.company_email;
  accountData.company_address = adminData.company_address;
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
  accountData.value.avatarImg = accountData.avatarImg;
};

const passwordRequirements = [
  "Minimum 8 characters long - the more, the better",
  "At least one lowercase character",
  "At least one number, symbol, or whitespace character",
];

function updateAdminData() {
  authStore.adminUpdate(accountData.value);
}

function updateAdminPassword() {
  v$.value.$touch.call();

  if (v$.value.$error || v$.value.$invalid) return;

  authStore.updateAdminPassword(pwdFormData.value);
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <VCard title="Account Details">
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
          <VForm @submit.prevent="updateAdminData" class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountData.first_name"
                  placeholder="John"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountData.last_name"
                  placeholder="Doe"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.phone_number"
                  label="Phone Number"
                  placeholder="+254 796 898 345"
                />
              </VCol>

              <!-- 👉 Company -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_name"
                  label="Company"
                  placeholder="Company name"
                />
              </VCol>

              <!-- 👉 Company Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_email"
                  label="Company Email"
                  placeholder="info@company.com"
                />
              </VCol>

              <!-- 👉 Company Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_address"
                  label="Address"
                  placeholder="Nairobi, Westlands"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <CustomLoader v-if="authStore.loading" />
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

    <!-- SECTION: Change Password -->
    <VCol cols="12" md="6">
      <VCard title="Change Password">
        <VForm @submit.prevent="updateAdminPassword">
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
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                  @input="v$.password.$touch"
                  @blur="v$.password.$touch"
                  :error-messages="v$.password.$errors.map((e) => e.$message)"
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
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                  @input="v$.confirmPassword.$touch"
                  @blur="v$.confirmPassword.$touch"
                  :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
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
          <VCardText class="d-flex flex-wrap gap-4 justify-end">
            <CustomLoader v-if="authStore.pwd_loading" />
            <VBtn type="submit" v-else>Save changes</VBtn>

            <VBtn type="reset" color="secondary" variant="tonal"> Reset </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
