<script setup>
const props = defineProps(["more-link"]);
</script>

<template>
  <IconBtn>
    <VIcon icon="bx-dots-vertical" />

    <VMenu activator="parent">
      <VList>
        <!-- 👉 LIst Item Link -->
        <VListItem :to="props.moreLink">
          <VListItemTitle> More </VListItemTitle>
        </VListItem>

        <!-- 👉 LIst Item Link -->
        <VListItem to="/dashboard">
          <VListItemTitle> Refresh </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
