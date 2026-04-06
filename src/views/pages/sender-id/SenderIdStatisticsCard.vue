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
    type: [String, Number],
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
  },
});

</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-3">
      <img width="42" :src="props.image" alt="image" />

      <VSpacer />

      <!-- <MoreBtn size="x-small" class="me-n3 mt-n4" /> -->
    </VCardText>

    <VCardText>
      <p class="mb-2">
        {{ props.title }}
      </p>
      <h5
        class="text-h5 text-no-wrap mb-3"
        :class="props.isDefault ? 'text-primary' : ''"
      >
        {{ props.stats }}
      </h5>
      <span class="d-flex align-center gap-1 text-sm text">
        {{ props.slug }}
      </span>
    </VCardText>
  </VCard>
</template>
