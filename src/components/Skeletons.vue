
<script setup>
  import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs';

</script>

<template>

  <VRow>
    <v-skeleton-loader
      class="mx-auto"
      elevation="12"
      max-width="400"
      type="table-heading, list-item-two-line, image, table-tfoot"
    ></v-skeleton-loader>

    <v-skeleton-loader
      class="mx-auto"
      elevation="2"
      max-width="360"
      type="card-avatar, article, actions"
    ></v-skeleton-loader>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>

  </VRow>

</template>
