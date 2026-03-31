<script setup>
import ComposeMessageDialog from "./ComposeMessageDialog.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";

const props = defineProps(["messages"]);
const search = ref("");

// Set headers for client datatable
const clientsDataHeaders = [
  {
    title: "Recipient Name",
    key: "recipient_name",
  },
  {
    title: "Recipient Number",
    key: "recipient",
  },
  {
    title: "Message",
    key: "message",
  },
  {
    title: "Sent Date",
    key: "send_time",
  },
  {
    title: "Status",
    key: "status",
  },
];

function getColor(status) {
  if (status.toLowerCase() == "forwarded") return "primary";
  else if (status.toLowerCase() == "scheduled") return "warning";
  else if (status.toLowerCase() == "suspended") return "info";
  else if (status.toLowerCase() == "failed") return "error";
  else return "primary";
}
</script>

<template>
  <VRow>
    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VRow class="pa-2 ml-1 mr-1">
        <VResponsive class="text-right" max-width="320">
          <VTextField
            v-model="search"
            hide-details
            placeholder="Search here..."
            class="ma-2 justify-end"
            density="compact"
            prepend-inner-icon="bx-search"
          />
        </VResponsive>

        <VSpacer />

        <!-- Add composer ,essage dialog component -->
        <!-- <VBtn color="primary"> Compose Message </VBtn> -->
        <ComposeMessageDialog />
      </VRow>

      <VDataTable
        :headers="clientsDataHeaders"
        :items="props.messages"
        :items-length="props.messages.length"
        :items-per-page="10"
        class="text-no-wrap rounded-0 text-sm elevation-1"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.columns.status)" class="text-left">
            {{ item.columns.status }}
          </v-chip>
        </template>
      </VDataTable>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>

