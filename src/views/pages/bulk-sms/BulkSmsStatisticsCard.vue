<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  slug: {
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
});

const isPositive = controlledComputed(
  () => props.change,
  () => Math.sign(props.change) === 1
);
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-1">
      <img width="42" :src="props.image" alt="image" />

      <VSpacer />

      <!-- <MoreBtn size="x-small" class="me-n3 mt-n4" /> -->
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ props.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        {{ props.stats }}
      </h5>
      <span class="d-flex align-center gap-1 text-sm text">
        {{ props.slug }}
      </span>
    </VCardText>
  </VCard>
</template>
