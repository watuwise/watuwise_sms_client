<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-4">
      <img width="42" :src="props.image" alt="image" />

      <VSpacer />

      <!-- <MoreBtn size="x-small" class="me-n3 mt-n4" /> -->
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ props.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        <!-- {{ props.stats }} -->
        {{ new Intl.NumberFormat().format(Math.abs(props.stats)) }}
      </h5>
      <span class="d-flex align-center gap-1 text-sm text">
        {{ props.label }}
      </span>
    </VCardText>
  </VCard>
</template>
