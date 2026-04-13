<script setup>
import SenderIdDialog from "./SenderIdDialog.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref, computed } from "vue";

const props = defineProps(["senderIdStore"]);

const headers = [
  { title: "Sender ID",  key: "sender_id" },
  { title: "Status",     key: "status" },
  { title: "Submitted",  key: "created_at" },
  { title: "Remarks",    key: "remarks" },
];

const search = ref("");

// Only show the current user's own sender IDs
const clientID = JSON.parse(localStorage.getItem("user")).id;
const mySenderIds = computed(() =>
  props.senderIdStore.sender_ids.filter(s => s.clientID == clientID)
);

function statusColor(status) {
  if (status === "active")          return "success";
  if (status === "pending")         return "warning";
  if (status === "disabled")        return "error";
  if (status === "payment_pending") return "info";
  return "grey";
}

function statusIcon(status) {
  if (status === "active")          return "bx-check-circle";
  if (status === "pending")         return "bx-time";
  if (status === "disabled")        return "bx-x-circle";
  if (status === "payment_pending") return "bx-credit-card";
  return "bx-info-circle";
}

function statusLabel(status) {
  if (status === "active")          return "Approved";
  if (status === "pending")         return "Under Review";
  if (status === "disabled")        return "Rejected";
  if (status === "payment_pending") return "Awaiting Payment";
  return status;
}

function formatDate(ts) {
  if (!ts) return "—";
  const date = typeof ts === "number" ? new Date(ts * 1000) : new Date(ts);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- No sender IDs empty state -->
      <VCard v-if="mySenderIds.length === 0" class="text-center pa-10">
        <VIcon icon="bx-id-card" size="56" color="primary" class="mb-4 opacity-40" />
        <h3 class="text-h6 font-weight-bold mb-2">No Sender IDs Yet</h3>
        <p class="text-medium-emphasis text-body-2 mb-6" style="max-width:360px; margin:0 auto 24px;">
          A Sender ID lets recipients see your brand name instead of a random number. Apply and we'll review within 1–3 business days.
        </p>
        <SenderIdDialog :sender-id-store="props.senderIdStore" />
      </VCard>

      <!-- Has sender IDs -->
      <VCard v-else>
        <div class="d-flex align-center justify-space-between px-4 py-3">
          <VResponsive max-width="280">
            <VTextField
              v-model="search"
              hide-details
              placeholder="Search..."
              density="compact"
              prepend-inner-icon="bx-search"
              variant="outlined"
            />
          </VResponsive>
          <SenderIdDialog :sender-id-store="props.senderIdStore" />
        </div>

        <VDataTable
          :headers="headers"
          :items="mySenderIds"
          :items-per-page="10"
          :search="search"
          class="text-no-wrap px-4"
        >
          <template #item.status="{ item }">
            <VChip :color="statusColor(item.columns.status)" size="small" label>
              <VIcon :icon="statusIcon(item.columns.status)" size="14" class="mr-1" />
              {{ statusLabel(item.columns.status) }}
            </VChip>
            <div v-if="item.columns.status === 'pending'" class="text-caption text-medium-emphasis mt-1">
              Under review — 1–3 business days
            </div>
            <div v-if="item.columns.status === 'payment_pending'" class="text-caption text-warning mt-1">
              Payment not completed
            </div>
          </template>

          <template #item.created_at="{ item }">
            {{ formatDate(item.raw.created_at) }}
          </template>

          <template #item.remarks="{ item }">
            <span v-if="item.raw.rejection_reason" class="text-error text-caption">
              {{ item.raw.rejection_reason }}
            </span>
            <span v-else class="text-medium-emphasis text-caption">—</span>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
