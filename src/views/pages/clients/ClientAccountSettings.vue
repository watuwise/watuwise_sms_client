<script setup>
import userImg from "@images/avatars/user.jpg";
import { useClientStore } from "@/stores/ClientStore";
import { useRoute } from "vue-router";

// define props
const props = defineProps(["user"]);
const userData = props.user;

const route = useRoute();
const clientStore = useClientStore();

const accountDataLocal = ref({
  id: userData.id,
  avatarImg: userImg,
  first_name: userData.first_name,
  last_name: userData.last_name,
  email: userData.email,
  phone_number: userData.phone_number,
  company_name: userData.company_name,
  company_address: userData.company_address,
  company_email: userData.company_email,
});

const refInputEl = ref();
// const accountDataLocal = ref(structuredClone(accountData));
const isAccountDeactivated = ref(false);

const resetForm = () => {
  // accountDataLocal.value = structuredClone(accountData);
};

const changeAvatar = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string")
        accountDataLocal.value.avatarImg = fileReader.result;
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg;
};

// save user account data
const submitAccountForm = () => {
  console.log(accountDataLocal.value.id);
  clientStore.updateClientData(accountDataLocal.value);
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <!-- <VCardText class="d-flex"> -->
        <!-- 👉 Avatar -->
        <!-- <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          /> -->

        <!-- 👉 Upload Photo -->
        <!-- <form class="d-flex flex-column justify-center gap-5">
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
        </VCardText> -->

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm @submit.prevent="submitAccountForm()" class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.first_name"
                  placeholder="John"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.last_name"
                  placeholder="Doe"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.phone_number"
                  label="Phone Number"
                  placeholder="+254701234567"
                />
              </VCol>

              <!-- 👉 Company -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.company_name"
                  label="Company"
                  placeholder="Company Name"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.company_address"
                  label="Company Address"
                  placeholder="Nairobi, Westlands"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.company_email"
                  label="Company Email"
                  placeholder="info@company.com"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <div class="loading text-center" v-if="clientStore.formProcessing">
                  <div class="effect-1 effects"></div>
                  <div class="effect-2 effects"></div>
                  <div class="effect-3 effects"></div>
                </div>
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

    <!-- <VCol cols="12"> -->
      <!-- 👉 Deactivate Account -->
      <!-- <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="I confirm client account deactivation"
            />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol> -->
  </VRow>
</template>
