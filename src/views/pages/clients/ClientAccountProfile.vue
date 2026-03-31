<script setup>
import userImg from "@images/avatars/user.jpg";
import ClientCardStatistics from "./ClientCardStatistics.vue";
import ClientAnalyticsTransactions from "./ClientAnalyticsTransactions.vue";

// 👉 Images
import chart from "@images/cards/chart-success-1.png";
import chartInfo from "@images/cards/chart-info.png";
import phoneContact from "@images/cards/phone-error.png";
import boxGroup from "@images/cards/box.png";
import ClientProfileReport from "./ClientProfileReport.vue";
import ClientSenderIdsCard from "./ClientSenderIdsCard.vue";

// define props
const props = defineProps(["user"]);
const userData = props.user;

const accountData = {
  avatarImg: userImg,
  first_name: userData.first_name,
  last_name: userData.last_name,
  email: userData.email,
  phone_number: userData.phone_number,
  company_name: userData.company_name ?? "N/A",
  company_address: userData.company_address ?? "N/A",
  company_email: userData.company_email ?? "N/A",
};
</script>

<template>
  <VRow>
    <VCol cols="12" md="6" sm="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="accountData.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <h2 class="">{{ accountData.first_name }} {{ accountData.last_name }}</h2>
            <p class="text-body-1">{{ accountData.email }}</p>
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
                  v-model="accountData.first_name"
                  placeholder="John"
                  label="First Name"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountData.last_name"
                  placeholder="Doe"
                  label="Last Name"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.phone_number"
                  label="Phone Number"
                  placeholder="+1 (917) 543-9876"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_name"
                  label="Company"
                  placeholder="ThemeSelection"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Company Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_address"
                  label="Company Address"
                  placeholder="123 Main St, New York, NY 10001"
                  :readonly="true"
                />
              </VCol>

              <!-- 👉 Company Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.company_email"
                  label="Company Email"
                  placeholder="New York"
                  :readonly="true"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>

      <!-- <VRow class="mt-3">
        <VCol cols="12" sm="12">
          <ClientSenderIdsCard :ids="userData.senderIDs" />
        </VCol>
      </VRow> -->
    </VCol>

    <VCol cols="12" md="6" sm="12">
      <VRow>
        <!-- 👉 Contacts -->
        <VCol cols="12" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'Contacts',
              image: phoneContact,
              stats: userData.contacts.length,
            }"
          />
        </VCol>

        <!-- 👉 SMS Units -->
        <VCol cols="12" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'Groups',
              image: boxGroup,
              stats: userData.groups.length,
            }"
          />
        </VCol>
      </VRow>

      <VRow class="mt-3">
        <!-- 👉 SMS Units Active -->
        <VCol cols="12" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'SMS Balance',
              image: chart,
              stats: userData.smsUnits ? userData.smsUnits.unit_balance : '0',
            }"
          />
        </VCol>

        <!-- 👉 SMS Units Used -->
        <VCol cols="12" sm="6">
          <ClientCardStatistics
            v-bind="{
              title: 'Total SMS sent',
              image: chartInfo,
              stats: userData.totalUsedSms,
            }"
          />
        </VCol>

        <!-- 👉 Profit Report -->
        <VCol cols="12" sm="12">
          <ClientProfileReport
            :billingData="userData.clientPayments"
            :amountSpent="userData.amountSpent"
          />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
