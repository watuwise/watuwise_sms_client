<script setup>
import SmsPlanDialog from "./SmsPlanDialog.vue";

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
  isDefault: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        sm="12"
        xl="6"
        md="6"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <VCardText class="d-flex align-center pb-3">
          <img width="42" :src="props.image" alt="image" />
        </VCardText>

        <VCardText>
          <h4 class="mb-2">
            {{ props.title }}
          </h4>
          <h5
            class="text-h5 text-no-wrap mb-3"
            :class="props.isDefault ? 'text-primary' : ''"
          >
            {{ props.stats }}
          </h5>
          <span class="d-flex align-center gap-1 text-sm">
            {{ props.slug }}
          </span>
        </VCardText>
      </VCol>

      <!-- ADD PLAN DIV -->
      <VCol cols="12" sm="12" xl="6" md="6">
        <VCardText class="d-flex flex-column align-center text-center">
          <h3 class="pb-1">Create Plan</h3>
          <p>
            Create a new plan defining min units, max units, price, plan title and
            description
          </p>
          <SmsPlanDialog sms-plan-data="" dialog-type="save" />
        </VCardText>
        <!-- <VCardText class="pb-3"> </VCardText> -->
      </VCol>
    </VRow>
  </VCard>
</template>
