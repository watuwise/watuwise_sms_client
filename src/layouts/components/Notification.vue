<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import userImg from "@images/avatars/user.jpg";

const authStore = useAuthStore();
const userData = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="error" bordered>
      
    <IconBtn>
      <VIcon icon="bx-bell" />
      <VTooltip
        activator="parent"
        open-delay="1000"
        scroll-strategy="close"
      >
        <span class="text-capitalize">notification</span>
      </VTooltip>
      
      <!-- SECTION Menu -->
      <VMenu activator="parent" width="320" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <!-- <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VAvatar color="primary" variant="tonal">
                  <VImg :src="userImg" />
                </VAvatar>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userData.first_name + " " + userData.last_name }}
            </VListItemTitle>
            <VListItemSubtitle>Client</VListItemSubtitle>
          </VListItem> -->

          <VListItem>
            <span> 
              <VIcon size="20" start icon="bx-info-circle" /> No notifications available
            </span>
          </VListItem>

        </VList>
      </VMenu>
      <!-- SECTION -->
    </IconBtn>
    
  </VBadge>
</template>
