<script setup>
import * as XLSX from "xlsx";

const props = defineProps(["filename", "data", "label"]);
const filename = props.filename + ".xlsx";
const jsonData = props.data;
const label = props.label;

console.log("json data before");
console.log(jsonData);

function exportToExcel() {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook to a file (e.g., 'data.xlsx')
  XLSX.writeFile(workbook, filename);
}
</script>

<template>
  <div>
    <VBtn class="mt-4 ml-4" @click="exportToExcel"> Export {{ label }}</VBtn>
  </div>
</template>
