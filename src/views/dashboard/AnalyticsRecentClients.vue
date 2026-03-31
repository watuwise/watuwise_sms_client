<script setup>
import DashboardMoreBtn from "./DashboardMoreBtn.vue";

const props = defineProps(["clientsData"]);

// Set headers for client datatable
const clientsDataHeaders = [
  {
    title: "Client Name",
    key: "fullname",
    // sortable: false,
  },
  {
    title: "Company",
    key: "company_name",
  },
  {
    title: "Email Address",
    key: "email",
  },
  {
    title: "Phone Number",
    key: "phone_number",
  },
];
</script>

<template>
  <VRow>
    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Recent Clients" class="pb-8">
        <template #append>
          <div class="me-n3 mt-n2">
            <DashboardMoreBtn more-link="/clients" />
          </div>
        </template>

        <!-- <VDataTable
          :headers="clientsDataHeaders"
          :items="props.clientsData"
          :items-per-page="5"
          class="text-no-wrap rounded-0 text-sm"
          show-select
          search=""
        >
          <template #item.customer="{ item }">
            <div class="d-flex">
              <VIcon start icon="bx-group" color="primary" />
              <span class="text-high-emphasis text-base">
                {{ item.raw.customer }}
              </span>
            </div>
          </template>
        </VDataTable> -->
        <VTable>
          <thead>
            <tr>
              <!-- <th class="text-left">Client Name</th>
              <th class="text-left">Company</th>
              <th class="text-left">Email Address</th>
              <th class="text-left">Phone Number</th> -->
              <th class="" v-for="(header, index) in clientsDataHeaders" :key="index">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in props.clientsData.slice(0, 5)">
              <td>{{ client.fullname }}</td>
              <td>{{ client.company_name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.phone_number }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>

<style lang="scss">
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
