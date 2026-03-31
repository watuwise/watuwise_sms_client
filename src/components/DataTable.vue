<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'


const recentDevicesHeaders = [
  {
    title: 'Client Name',
    key: 'customer',
    // sortable: false,
  },
  {
    title: 'Email Address',
    key: 'email',
  },  
  {
    title: 'Company',
    key: 'company',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'recentActivity',
  },
]

const recentDevices = [
  {
    customer: 'Chrom on Windows',
    email: 'HP Spectre 360',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on iPhone',
    email: 'iPhone 12x',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bx-mobile',
      color: 'error',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on MacOS',
    email: 'Apple iMac',
    company: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Windows',
    email: 'HP Spectre 360',
    company: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    customer: 'Chrome on Android',
    email: 'Oneplus 9 Pro',
    company: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
]

</script>

<template>
  <VRow>
    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Client List">

        <VRow>
          <!-- <VCol cols="4" md="5" sm="6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </VCol> -->
        </VRow>
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          :items-per-page="5"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.customer="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.customer }}
              </span>
            </div>
          </template>

        </VDataTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
