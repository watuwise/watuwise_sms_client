<script setup>
const props = defineProps({
  item: {
    type: null,
    required: true,
  },
});
</script>

<template>
  <li class="nav-link" :class="{ disabled: item.disable }">
    <!-- <Component :is="item.to ? 'RouterLink' : 'a'" :to="item.to" :href="item.href"> -->
    <router-link :to="item.to">
      <VIcon :icon="item.icon" class="nav-item-icon" />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ item.title }}
      </span>
    </router-link>
    <!-- </Component> -->
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
