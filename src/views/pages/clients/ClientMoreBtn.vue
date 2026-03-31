<script setup>
import router from "@/router";

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

function handleListItemClick(value) {
  if (value == "refresh") {
    router.go();
  }
}
</script>

<template>
  <IconBtn>
    <VIcon icon="bx-dots-vertical" />

    <VMenu v-if="props.menuList" activator="parent">
      <VList>
        <!-- 👉 LIst Item Link -->
        <VListItem v-for="(item, index) in props.menuList" :key="index" :value="index">
          <VListItemTitle @click="handleListItemClick(item.value)">
            {{ item.title }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
