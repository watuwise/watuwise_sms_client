<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center" style="color: #697a8d">
      &copy;
      {{ new Date().getFullYear() }}
      . Powered By
      <a href="https://peakanddale.com" target="_blank" class="ms-1"
        ><img src="/blackLogo.png" width="120" alt=""
      /></a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 d-none">
      <router-link to="#" style="color: #697a8d">Privacy Policy</router-link>
      <router-link to="#" style="color: #697a8d">Terms & Conditions</router-link>
    </span>
  </div>
</template>
