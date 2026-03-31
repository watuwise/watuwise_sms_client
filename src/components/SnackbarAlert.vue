<template>
  
  <v-snackbar v-model="snackbar" color="blue-grey" rounded="pill">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Try Again
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script setup>

  const props = defineProps(['visibility', 'message'])

  const snackbar = ref(props.visibility)
  const text = props.message
  const timeout = props.timeout
  
</script>
