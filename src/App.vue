<script setup>
import { hexToRgb } from "@layouts/utils";
import { useTheme } from "vuetify";

const { global } = useTheme();
</script>

<template>
  <VApp
    :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`"
  >
    <RouterView />
  </VApp>
</template>

<style lang="scss">
::selection {
  background-color: #802ad5;
  color: #fff;
}
</style>
