<script setup>
import { ref } from "vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import SmsPlanMoreBtn from "./SmsPlanMoreBtn.vue";

// define props
const props = defineProps(["smsPlans"]);

const itemsPerPageArray = [3, 6, 9];
const itemsPerPage = ref(6);
const page = ref(1);
const search = ref("");
const sortKey = "email";
const sortOrder = ref("asc");

const keys = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "price",
    label: "Price",
  },
];

let numberOfPages = computed(() => Math.ceil(props.smsPlans.length / itemsPerPage.value));

let sortBy = computed(() => [
  {
    key: sortKey,
    order: sortOrder,
  },
]);

function nextPage() {
  if (page.value + 1 <= numberOfPages.value) page.value += 1;
}

function prevPage() {
  if (page.value - 1 >= 1) page.value -= 1;
}
</script>

<template>
  <VDataIterator
    :items-per-page="itemsPerPage"
    v-model:page="page"
    :items="props.smsPlans"
    :search="search"
    :sort-by="sortBy"
  >
    <template v-slot:header>
      <VToolbar dark color="blue-darken-3" class="px-2 mb-2">
        <VTextField
          v-model="search"
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          variant="solo"
          density="comfortable"
        />
        <VSpacer /><VSpacer />

        <VBtnToggle v-model="sortOrder" mandatory>
          <VBtn color="blue" value="asc">
            <VIcon>mdi-arrow-up</VIcon>
          </VBtn>
          <VBtn color="blue" value="desc">
            <VIcon>mdi-arrow-down</VIcon>
          </VBtn>
        </VBtnToggle>
      </VToolbar>
    </template>

    <template v-slot:no-data>
      <VAlert class="ma-2" type="warning">No results</VAlert>
    </template>

    <template v-slot:default="props">
      <VRow>
        <VCol v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="4">
          <VCard :title="item.raw.title">
            <template #append>
              <div class="me-n3 mt-n2">
                <SmsPlanMoreBtn :sms-plan="item.raw" />
              </div>
            </template>

            <VCardText>
              <VRow>
                <VCol>
                  <h4>SMS Range</h4>
                  <span class="text">
                    {{ item.raw.min_units }} - {{ item.raw.max_units }}
                  </span>
                </VCol>

                <VSpacer />

                <v-chip class="ma-2" color="primary" size="x-large">
                  <span class="font-weight-bold">KES {{ item.raw.price }}</span>
                </v-chip>
              </VRow>
            </VCardText>

            <VCardText class="align-center">
              <h4>Description</h4>
              <span class="text-disabled">{{ item.raw.description }}</span>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>

    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <span class="grey--text">Items per page</span>
        <VMenu>
          <template v-slot:activator="{ props }">
            <VBtn
              variant="text"
              color="primary"
              class="ml-2"
              append-icon="mdi-chevron-down"
              v-bind="props"
            >
              {{ itemsPerPage }}
            </VBtn>
          </template>
          <VList>
            <VListItem
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              :title="number"
              @click="itemsPerPage = number"
            />
          </VList>
        </VMenu>

        <VSpacer />

        <span class="mr-4 grey--text"> Page {{ page }} of {{ numberOfPages }} </span>
        <VBtn icon size="small" @click="prevPage">
          <VIcon>mdi-chevron-left</VIcon>
        </VBtn>
        <VBtn icon size="small" class="ml-2" @click="nextPage">
          <VIcon>mdi-chevron-right</VIcon>
        </VBtn>
      </div>
    </template>
  </VDataIterator>
</template>

<style>
small {
  font-size: 14px !important;
}
h4 {
  font-size: 14px !important;
}
</style>
