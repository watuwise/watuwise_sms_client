<script setup>
import CustomLoader from "@/@core/components/CustomLoader.vue";
import { useClientStore } from "@/stores/ClientStore";
import ClientAccountProfile from "@/views/pages/clients/ClientAccountProfile.vue";
import ClientAccountSecurity from "@/views/pages/clients/ClientAccountSecurity.vue";
import ClientAccountSettings from "@/views/pages/clients/ClientAccountSettings.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const clientStore = useClientStore();

const activeTab = ref(route.params.tab);
const clientID = route.params.id;

// Invoke get clients method
clientStore.getClientData(clientID);

const userData = JSON.parse(localStorage.getItem("user"));

// tabs
const tabs = [
  {
    title: "Account",
    icon: "bx-user",
    tab: "account",
  },
  {
    title: "Account Settings",
    icon: "bx-cog",
    tab: "account-settings",
  },
  {
    title: "Security",
    icon: "bx-lock-open",
    tab: "security",
  },
];
</script>

<template>
  <VRow
    class="justify-center align-center"
    v-if="clientStore.loading"
    style="height: 75vh"
  >
    <CustomLoader />
  </VRow>
  <div v-else>
    <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindowItem value="account">
        <ClientAccountProfile :user="userData" />
      </VWindowItem>

      <!-- Account Settings -->
      <VWindowItem value="account-settings">
        <ClientAccountSettings :user="userData" />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <ClientAccountSecurity :clientId="userData.id" />
      </VWindowItem>
    </VWindow>
  </div>
</template>
