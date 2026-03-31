<script setup>
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useContactStore } from "@/stores/ContactStore";
import { ref } from "vue";

const props = defineProps(["senderIdStore", "senderId"]);
const contactStore = useContactStore();
const dialog = ref(false);
const dragging = ref(false);
const upload_filename = ref('');  

const formData = ref({
  clientID: JSON.parse(localStorage.getItem("user")).id,
  file: "",
});

function submitForm() {
  console.log("upload contact file");
  console.log(formData.value);

  contactStore.uploadContactsFile(formData.value);
}

function uploadContacts(e) {
  var files = e.target.files || e.dataTransfer.files;
  
  if (!files.length) {
    dragging.value = false;
    return;
  }
  
  createFile(files[0]);
}

function createFile(file) {
  if (!file.type.match('text/csv')) {
    Report.warning(
      'Invalid File Format',
      'Whoops! It seems you have not uploaded a CSV file. Kindly upload a .csv file to continue.',
      'Okay',
    );
    dragging.value = false;
    return;
  }
  
  if (file.size > 5000000) {
    Report.warning(
      'File size too large',
      'Whoops! You are trying to upload a large file. Maximum file to be uploaded is 5MB.',
      'Okay',
    );
    dragging.value = false;
    return;
  }
  
  formData.value.file = file;
  upload_filename.value = file.name;
  dragging.value = false;

}

function removeFile() {
  formData.value.file = '';
}
</script>

<template>
  <!-- DIALOG -->
  <VDialog v-model="dialog" persistent width="850">
    <template v-slot:activator="{ props }">
      <VBtn color="primary" variant="text" v-bind="props">
        Import Contact
        <VIcon icon="bx-file-blank" />
      </VBtn>
    </template>
    <VCard>
      <VForm @submit.prevent="submitForm">
        <VCardText>
          <VContainer>
            <VRow>
              <VCol cols="12">
                <div v-if="!formData.file">
                  <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                    <div class="dropZone-info" @drag="uploadContacts">
                      <span><VIcon icon="bx-cloud-upload" class="mr-2" /></span>
                      <span class="dropZone-title">Drop file or click to upload</span>
                      <div class="dropZone-upload-limit-info">
                        <div>extension support: csv</div>
                        <div>maximum file size: 5 MB</div>
                      </div>
                    </div>
                    <input type="file" @change="uploadContacts"/>
                  </div>
                </div>
                <div v-else class="dropZone-uploaded">
                  <div class="dropZone-uploaded-info">
                    <span class="dropZone-title">Uploaded</span>
                    <span class="dropZone-title">{{ upload_filename }}</span>
                    <VBtn @click="removeFile" class="mt-2"> Remove File </VBtn>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </VBtn>
          <VBtn type="submit" variant="text"> Upload Contact </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
  <!-- DIALOG -->
</template>

<style>
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px dashed #802ad5;
}

.dropZone:hover .dropZone-title {
  color: #802ad5;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #e8eaed;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>