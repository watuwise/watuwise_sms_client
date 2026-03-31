<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";
import ExportComponent from "@/components/ExportComponent.vue";

const props = defineProps(["paymentsData"]);

// Set headers for client datatable
const clientsDataHeaders = [
  {
    title: "Payment Receipt",
    key: "payment_receipt",
  },
  {
    title: "Payment Date",
    key: "payment_date",
  },
  {
    title: "Units Purchased",
    key: "description",
  },
  {
    title: "Payment Method",
    key: "payment_method",
  },
  {
    title: "Amount(kes)",
    key: "amount",
  },
];

const search = ref("");
</script>

<template>
  <VRow>
    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard>
        <VRow class="pa-2 ml-1 mr-1">
          <v-responsive class="text-right" max-width="320">
            <v-text-field
              v-model="search"
              hide-details
              placeholder="Search here..."
              class="ma-2 justify-end"
              density="compact"
              prepend-inner-icon="bx-search"
            />
          </v-responsive>
          <VSpacer />
          <ExportComponent
            filename="billing-data"
            :data="props.paymentsData"
            label=""
            style="margin-top: -8px"
          />
        </VRow>
        <!-- <VCardTitle> </VCardTitle> -->
        <VDataTable
          :headers="clientsDataHeaders"
          :items="props.paymentsData"
          :items-length="props.paymentsData.length"
          :items-per-page="5"
          class="text-no-wrap rounded-0 text-sm elevation-1"
          :search="search"
        >
          <template #item.customer="{ item }">
            <div class="d-flex">
              <VIcon start icon="bx-group" color="primary" />
              <span class="text-high-emphasis text-base">
                {{ item }}
              </span>
            </div>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
