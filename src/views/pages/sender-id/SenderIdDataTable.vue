<script setup>
import SenderIdDialog from "./SenderIdDialog.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";

const props = defineProps(["senderIdStore"]);

// Set headers for client datatable
const clientsDataHeaders = [
  {
    title: "Provider",
    key: "provider",
  },
  {
    title: "Sender Name",
    key: "sender_name",
  },
  {
    title: "Sender ID",
    key: "sender_id",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
  },
];

const search = ref("");

function getColor(status) {
  if (status == "active") return "primary";
  else if (status == "pending") return "warning";
  else if (status == "cancelled") return "error";
  else if (status == "disabled") return "error";
  else return "primary";
}
</script>

<template>
  <VRow>
    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <VCard>
        <VRow class="pa-2 ml-1 mr-1 mt-2 mb-2">
          <VResponsive class="text-right" max-width="320">
            <VTextField
              v-model="search"
              hide-details
              placeholder="Search here..."
              density="compact"
              prepend-inner-icon="bx-search"
            />
          </VResponsive>

          <VSpacer />

          <!-- Add sender dialog component -->
          <SenderIdDialog :sender-id-store="props.senderIdStore" dialog-type="save" />
        </VRow>

        <VDataTable
          :headers="clientsDataHeaders"
          :items="props.senderIdStore.sender_ids"
          :items-length="props.senderIdStore.sender_ids.length"
          :items-per-page="10"
          class="text-no-wrap rounded-0 text-sm elevation-1"
          :search="search"
        >
          <template v-slot:item.status="{ item }">
            <VChip :color="getColor(item.columns.status)" class="text-left">
              {{ item.columns.status }}
            </VChip>
          </template>

          <template v-slot:item.provider="{ item }">
              {{ item.columns.provider ?? "N/A" }}
          </template>

          <template v-slot:item.actions="{ item }">
            <div v-if="item.raw.sender_id != '23107'">
              <SenderIdDialog
                :senderIdStore="props.senderIdStore"
                dialog-top="edit"
                :sender-id="item.raw"
              />
              <VIcon
                size="small"
                @click="props.senderIdStore.deleteSenderId(item.raw.id)"
              >
                mdi-delete
              </VIcon>
            </div>

            <div v-else>
              <p>N/A</p>
            </div>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <!-- SECTION -->
  </VRow>
</template>
