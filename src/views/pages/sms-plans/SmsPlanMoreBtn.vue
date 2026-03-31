<script setup>
import SmsPlanDialog from "./SmsPlanDialog.vue";
import { useSmsPlanStore } from "@/stores/SmsPlanStore";

const props = defineProps(["smsPlan"]);
const smsPlanStore = useSmsPlanStore();
</script>

<template>
  <IconBtn>
    <VIcon icon="bx-dots-vertical" />

    <VMenu activator="parent">
      <VList>
        <!-- 👉 LIst Item Link -->
        <VListItem style="cursor: pointer">
          <VListItemTitle>
            <SmsPlanDialog :sms-plan-data="props.smsPlan" dialog-type="edit" />
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle
            style="cursor: pointer"
            @click="smsPlanStore.deleteSmsPlan(props.smsPlan.id)"
          >
            <VIcon class="me-2" icon="bx-trash-alt" size="18" /> Delete
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
