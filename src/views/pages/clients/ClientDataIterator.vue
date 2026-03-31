<script setup>
import { useContactStore } from "@/stores/ContactStore";
import boxGroup from "@images/cards/box.png";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import GroupFormDialog from "./GroupFormDialog.vue";
import GroupDetailDialog from "./GroupDetailDialog.vue";

// define props
const props = defineProps(["groupsData"]);
const contactStore = useContactStore();

const itemsPerPageArray = [4, 8, 12];
const itemsPerPage = ref(8);
const page = ref(1);
const search = ref("");
const sortKey = "fullname";
const sortOrder = ref("asc");

let numberOfPages = computed(() =>
  Math.ceil(props.groupsData.length / itemsPerPage.value)
);
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
    :items="props.groupsData"
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
        <VSpacer />
        <VSpacer />

        <GroupFormDialog dialog-type="save" />
      </VToolbar>
    </template>

    <template v-slot:no-data>
      <VAlert class="ma-2" type="warning">No results</VAlert>
    </template>

    <template v-slot:default="props">
      <VRow>
        <VCol v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <VCard>
            <div>
              <VRow>
                <VSpacer />
                <IconBtn class="me-3 mt-3">
                  <VIcon icon="bx-dots-vertical" />

                  <VMenu activator="parent">
                    <VList>
                      <!-- 👉 LIst Item Link -->
                      <VListItem to="">
                        <VListItemTitle style="cursor: pointer">
                          <GroupFormDialog
                            dialog-type="edit"
                            :group="item.raw"
                            :is-detail="false"
                          />
                        </VListItemTitle>
                      </VListItem>

                      <!-- 👉 LIst Item Link -->
                      <VListItem to="">
                        <VListItemTitle
                          style="cursor: pointer"
                          @click="contactStore.deleteGroupData(item.raw.id)"
                        >
                          <VIcon class="me-2" icon="bx-trash-alt" size="18" /> Delete
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </IconBtn>
              </VRow>
            </div>
            <VCardTitle>
              <VCol class="text-center">
                <VAvatar class="cursor-pointer" color="primary" variant="tonal" size="80">
                  <VImg :src="boxGroup" />
                </VAvatar>

                <h4 class="mt-4">{{ item.raw.group_name }}</h4>
                <p>Contacts: {{ item.raw.contacts.length }}</p>
                <GroupDetailDialog :group="item.raw" />
              </VCol>
            </VCardTitle>
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
