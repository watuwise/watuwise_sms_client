<script setup>
const props = defineProps(["smsPlan"]);
</script>

<template>
  <VCard>
    <VCardText>
      <h4 class="mb-4">{{ props.smsPlan.title }}</h4>
      <p v-if="props.smsPlan.max_units == '-1'">{{ props.smsPlan.min_units }} & above</p>
      <p v-else>{{ props.smsPlan.min_units }} - {{ props.smsPlan.max_units }}</p>
      <h4 class="d-flex align-center gap-1">
        {{ props.smsPlan.price }}
        <small class="d-flex align-center gap-1 text-sm">KES/SMS</small>
      </h4>
    </VCardText>
  </VCard>
</template>
