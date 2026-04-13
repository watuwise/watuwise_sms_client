<script setup>
import CustomLoader from "@/@core/components/CustomLoader.vue";
import { useVuelidate } from "@vuelidate/core";
import { email, maxLength, required } from "@vuelidate/validators";
import { useContactStore } from "@/stores/ContactStore";
import { useSenderIdStore } from "@/stores/SenderIdStore";
import { useSmsStore } from "@/stores/SmsStore";
import { computed, ref } from "vue";

const senderIdStore = useSenderIdStore();
const contactStore = useContactStore();
const smsStore = useSmsStore();

senderIdStore.getSenderIds();
contactStore.getContacts();

const maxChar = 160;
const dialog = ref(false);
const formData = ref({
  contacts: [],
  groups: [],
  senderID: [],
  message: "",
  clientID: JSON.parse(localStorage.getItem("user")).id,
  // is_scheduled: ref(false),
  scheduled_time: ref(new Date()),
});

  
// Custom validator: passes if either contacts or groups has items
const atLeastOne = (siblingField) =>
  helpers.withMessage(
    "Please select at least one contact or group",
    (value, siblings) =>
      (Array.isArray(value) && value.length > 0) ||
      (Array.isArray(siblings[siblingField]) && siblings[siblingField].length > 0)
);

const rules = {
  contacts: { atLeastOne: atLeastOne("groups") },
  groups:   { atLeastOne: atLeastOne("contacts") },
  senderID: { required },
  message:  { required, maxLength: maxLength(160) },
};
  
const v$ = useVuelidate(rules, formData);


const selectAllGroups = computed(
  () => formData.value.groups.length === contactStore.groups.length
);
const selectSomeGroups = computed(() => formData.value.groups.length > 0);

const selectAllContacts = computed(
  () => formData.value.contacts.length === contactStore.contacts.length
);
const selectSomeContacts = computed(() => formData.value.contacts.length > 0);

const isSelectAllGroups = ref(false);
const isSelectAllContacts = ref(false);

const scheduleList = ["Send Now", "Schedule Send"];

function toggleAllGroups() {
  isSelectAllGroups.value = !isSelectAllGroups.value;

  if (isSelectAllGroups.value) formData.value.groups = contactStore.groups.slice();
  else formData.value.groups = [];
}

function toggleSelectAllContacts() {
  isSelectAllContacts.value = !isSelectAllContacts.value;

  if (isSelectAllContacts.value) formData.value.contacts = contactStore.contacts.slice();
  else formData.value.contacts = [];
}

function appendContact(contact) {
  if (formData.value.contacts.includes(contact)) {
    const index = formData.value.contacts.indexOf(contact);

    formData.value.contacts.splice(index, 1);
  } else formData.value.contacts.push(contact);

  console.log(formData.value.contacts);
}

function appendGroup(group) {
  if (formData.value.groups.includes(group)) {
    const index = formData.value.groups.indexOf(group);

    formData.value.groups.splice(index, 1);
  } else formData.value.groups.push(group);

  console.log(formData.value.groups);
}


// function submitForm(send_type) {
//   v$.value.$touch.call();

//   if (v$.value.$error || v$.value.$invalid) return;


//   if (send_type == "Send Now") smsStore.sendMessage(formData.value);
//   else smsStore.sendScheduledMessage(formData.value);
// }

function submitForm(send_type) {
  v$.value.$touch();

  if (v$.value.$error || v$.value.$invalid) return;

  if (send_type == "Send Now") smsStore.sendMessage(formData.value);
  else smsStore.sendScheduledMessage(formData.value);
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="720">
    <template v-slot:activator="{ props }">
      <VBtn color="primary" v-bind="props"> Compose Message </VBtn>
    </template>
    <VCard>
      <VForm @submit.prevent="submitForm('Send Now')">
        <VCardTitle class="mt-4">
          <span class="text-h5">Compose Message</span>
        </VCardTitle>

        <VCardText>
          <!-- No sender ID warning -->
          <VAlert
            v-if="senderIdStore.sender_id_names.length === 0"
            type="warning"
            variant="tonal"
            border="start"
            class="mb-4"
          >
            <div class="d-flex align-center justify-space-between flex-wrap gap-2">
              <span>
                You don't have an approved Sender ID yet. Messages cannot be sent without one.
              </span>
              <RouterLink to="/sender-id">
                <VBtn color="warning" size="small" variant="elevated">
                  <VIcon icon="bx-id-card" class="mr-1" size="16" />
                  Apply for Sender ID
                </VBtn>
              </RouterLink>
            </div>
          </VAlert>

          <VContainer>
            <VRow>
              <VCol cols="4">
                <VSelect
                  label="Select Sender ID"
                  v-model.trim="formData.senderID"
                  :items="senderIdStore.sender_id_names"
                  :disabled="senderIdStore.sender_id_names.length === 0"
                  :placeholder="senderIdStore.sender_id_names.length === 0 ? 'No Sender ID available' : ''"
                  @input="v$.senderID.$touch"
                  :error-messages="v$.senderID.$errors.map((e) => e.$message)"
                />
              </VCol>

              <VCol cols="8">
                <VSelect
                  v-model="formData.groups"
                  :items="contactStore.groups"
                  label="Groups"
                  multiple
                  clearable
                  @input="v$.groups.$touch"
                  :error-messages="v$.groups.$errors.map((e) => e.$message)"
                >
                  <template v-slot:selection="{ item, index }">
                    <VChip v-if="index < 4" color="primary">
                      <span>{{ item.value.group_name }}</span>
                    </VChip>
                    <span
                      v-if="index === 4"
                      class="text-grey text-caption align-self-center"
                    >
                      (+{{ formData.groups.length - 4 }} others)
                    </span>
                  </template>

                  <template v-slot:prepend-item>
                    <VListItem title="Select All" @click="toggleAllGroups">
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          :color="selectAllGroups ? 'primary' : 'undefined'"
                          :indeterminate="selectSomeGroups && !selectAllGroups"
                          :model-value="selectSomeGroups"
                        />
                      </template>
                    </VListItem>
                    <VDivider class="mt-2" />
                  </template>

                  <template v-slot:item="{ item, index }">
                    <VListItem
                      :title="item.value.group_name"
                      :value="item.value"
                      @click="appendGroup(item.value)"
                      :key="index"
                    >
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          color="primary"
                          :model-value="formData.groups.includes(item.value)"
                        />
                      </template>
                    </VListItem>
                  </template>

                  <template v-slot:append-item>
                    <VDivider class="mb-2" />

                    <VListItem
                      :subtitle="formData.groups.length"
                      title="Number of selected groups"
                      disabled
                    >
                      <template v-slot:prepend>
                        <VAvatar icon="mdi-account-group-outline" color="primary" />
                      </template>
                    </VListItem>
                  </template>
                </VSelect>
              </VCol>

              <VCol cols="12">
                <VSelect
                  v-model="formData.contacts"
                  :items="contactStore.contacts"
                  label="Contacts"
                  multiple
                  clearable
                  @input="v$.contacts.$touch"
                  :error-messages="v$.contacts.$errors.map((e) => e.$message)"
                >
                  <template v-slot:prepend-item>
                    <VListItem title="Select All" @click="toggleSelectAllContacts">
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          :color="selectAllContacts ? 'primary' : 'undefined'"
                          :indeterminate="selectSomeContacts && !selectAllContacts"
                          :model-value="selectSomeContacts"
                        />
                      </template>
                    </VListItem>

                    <VDivider class="mt-2" />
                  </template>

                  <template v-slot:item="{ item, index }">
                    <VListItem
                      :title="item.value.first_name + ' ' + item.value.last_name"
                      :value="item.value"
                      @click="appendContact(item.value)"
                      :key="index"
                    >
                      <template v-slot:prepend>
                        <VCheckboxBtn
                          color="primary"
                          :model-value="formData.contacts.includes(item.value)"
                        />
                      </template>
                    </VListItem>
                  </template>

                  <template v-slot:append-item>
                    <VDivider class="mb-2" />

                    <VListItem
                      :subtitle="formData.contacts.length"
                      title="Number of selected contacts"
                      disabled
                    >
                      <template v-slot:prepend>
                        <VAvatar icon="mdi-account" color="primary" />
                      </template>
                    </VListItem>
                  </template>

                  <template v-slot:selection="{ item, index }">
                    <VChip v-if="index < 4" color="primary">
                      <span>
                        {{ item.value.first_name + " " + item.value.last_name }}
                      </span>
                    </VChip>
                    <span
                      v-if="index === 4"
                      class="text-grey text-caption align-self-center"
                    >
                      (+{{ formData.contacts.length - 4 }} others)
                    </span>
                  </template>
                </VSelect>
              </VCol>

              <VCol cols="12">
                <v-textarea
                  label="Message"
                  v-model.trim="formData.message"
                  :maxlength="maxChar"
                  required
                  @input="v$.message.$touch"
                  :error-messages="v$.message.$errors.map((e) => e.$message)"
                />
                <span>
                  Number of characters left: {{ maxChar - formData.message.length }}
                </span>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VSpacer />
          <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
            Cancel
          </VBtn>

          <div>
            <VueDatePicker
              v-model="formData.scheduled_time"
              time-picker-inline
              @update:model-value="submitForm('Schedule Send')"
            >
              <template #trigger>
                <VBtn type="button" variant="text">
                  Schedule Send
                  <VIcon icon="bx-timer" class="ml-1" />
                </VBtn>
              </template>
            </VueDatePicker>
          </div>

          <CustomLoader v-if="smsStore.formProcessing" style="height: 50; width: 50" />
          <VBtn type="submit" variant="text" v-else :disabled="senderIdStore.sender_id_names.length === 0">
            Send
            <VIcon icon="bx-send" class="ml-1" />

            <!-- <VMenu v-if="scheduleList" activator="parent">
              <VList> -->
            <!-- 👉 LIst Item Button -->
            <!-- <VListItemAction v-for="(item, index) in scheduleList">
                  <VListItem to="" :key="index" @click="submitForm(item)">
                    <VListItemTitle>
                      {{ item }}
                      <VIcon icon="bx-timer" class="ml-1" v-if="item == 'Schedule Send'" />
                    </VListItemTitle>
                  </VListItem>
                </VListItemAction>
              </VList>
            </VMenu> -->
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
  <!-- DIALOG -->
</template>

<style lang="scss">
.dp__today {
  border-color: #802ad5;
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
  background-color: #802ad5;
  border-color: #802ad5;
}

.dp__action_select {
  color: #fff;
  background: #802ad5;
  margin-left: 8px;
}

.dp__action_select:hover {
  color: #fff;
  background: #9447e2e1;
}

.dp__action_cancel:hover {
  border-color: #802ad5;
}

.dp__tp_inline_btn_top:hover .dp__tp_btn_in_r {
  background: #802ad5;
}

.dp__tp_inline_btn_top:hover .dp__tp_btn_in_l {
  background: #802ad5;
}

.dp__tp_inline_btn_bottom:hover .dp__tp_btn_in_r {
  background: #802ad5;
}

.dp__tp_inline_btn_bottom:hover .dp__tp_btn_in_l {
  background: #802ad5;
}
</style>
