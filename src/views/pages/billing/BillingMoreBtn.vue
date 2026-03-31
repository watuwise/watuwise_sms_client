<script setup>
import { useBillingStore } from "@/stores/BillingStore";
const props = defineProps({
  menuList: {
    type: Array,
    required: false,
  },
  itemProps: {
    type: Boolean,
    required: false,
  },
});

const billingStore = useBillingStore();
</script>

<template>
  <IconBtn>
    <VIcon icon="bx-dots-vertical" />

    <VMenu v-if="props.menuList" activator="parent">
      <VList>
        <!-- 👉 LIst Item Button -->
        <VListItem v-for="(item, index) in props.menuList" :key="index">
          <VBtn @click="billingStore.getRevenueStats(item)">{{ item }}</VBtn>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
