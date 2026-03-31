<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import { useAuthStore } from "@/stores/AuthStore";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import Notification from "@/layouts/components/Notification.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

const authStore = useAuthStore();
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div class="d-flex align-center cursor-pointer" style="user-select: none">
          <!-- 👉 Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div>

        <VSpacer />

        <Notification class="me-2" />

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home-circle',
          to: '/dashboard',
        }"
      />

      <!-- 👉 Bulk SMS -->
      <VerticalNavLink
        :item="{
          title: 'Messages',
          icon: 'bx-message-rounded-detail',
          to: '/bulk-sms',
        }"
      />

      <!-- 👉 Contacts -->
      <VerticalNavLink
        :item="{
          title: 'Contacts',
          icon: 'bx-group',
          to: '/contacts',
        }"
      />

      <!-- 👉 SMS Sender ID -->
      <VerticalNavLink
        :item="{
          title: 'Sender ID',
          icon: 'bx-mobile-vibration',
          to: '/sender-id',
        }"
      />

      <!-- 👉 Top Up -->
      <VerticalNavLink
        :item="{
          title: 'Top Up',
          icon: 'bx-credit-card',
          to: '/billing',
        }"
      />

      <!-- 👉 Profile -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Profile',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'My Account',
          icon: 'mdi-account-cog-outline',
          to: '/my-account',
        }"
      />
      <VerticalNavLink
        :item="{ title: 'Logout', icon: 'bx-log-out', to: '/login' }"
        @click="authStore.logout()"
      />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
