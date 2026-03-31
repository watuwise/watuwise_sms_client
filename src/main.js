/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import '/src/stores/config/axios'
import 'vue-toastification/dist/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@vuepic/vue-datepicker/dist/main.css'

import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import VueDatePicker from '@vuepic/vue-datepicker';
import Toast, { POSITION } from 'vue-toastification';
import VueSweetalert2 from 'vue-sweetalert2';
import { loadFonts } from '@/plugins/webfontloader'
import { createPinia } from 'pinia'
import { createApp } from 'vue'


loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(router)
app.use(createPinia())
app.use(VueSweetalert2)
app.use(Toast, {position: POSITION.BOTTOM_CENTER, timeout: 3500})
app.component('VueDatePicker', VueDatePicker);

// Mount vue app
app.mount('#app')
