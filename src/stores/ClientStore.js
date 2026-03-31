// stores/counter.js
import router from '@/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { defineStore } from 'pinia';
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import axios from './config/axios';

export const useClientStore = defineStore('clientStore', {
    state: () => ({ 
        contacts: [],
        contactNs: [{name: 'Kvo', phone: '254789444566'}, {name: 'Mwas', phone: '25434990887'}],
        groups: [],
        groupNs: ['op', 'po', 'ol', 'lo'],
        clientData: "",
        contactData: "",
        loading: false,
        formProcessing: false,
        toast: useToast(),
        route: useRoute(),
    }),
    actions: {
        
        getClientData(clientID) {
            try {
                this.loading = true;

                axios.get(`/users/${clientID}`).then(res => {
                    
                        this.clientData = res.data
                        console.log(this.clientData);
                    })
                    .catch(error => {
                        this.loading = false;

                        console.log("error");
                        console.log(error);

                        // if(status == 401) {

                        //     console.log("status: "+status);

                        //     return router.push('/login');
                        // }

                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.loading = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        saveClientData(clientData) {
            try {
                this.formProcessing = true;

                axios.post('/users/admin_save', clientData)
                    .then(res => {
                        this.clientData = res.data.user

                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.push('clients')
                        }, 2000);
                    })
                    .catch(error => {

                        if (error.response) {

                            this.toast.error(error.response.data.error_message);

                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.data.error_message);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.formProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },
        
        updateClientData(clientData) {
            try {
                this.formProcessing = true;

                axios.post('/users/client/'+clientData.id, clientData)
                    .then(res => {
                        this.clientData = res.data.user

                        localStorage.setItem('user', JSON.stringify(this.clientData));

                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.go()
                        }, 2000);
                    })
                    .catch(error => {

                        if (error.response) {

                            this.toast.error(error.response.data.error_message);

                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.data.error_message);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.formProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },
        
        resetClientPassword(passwordData) {

            try {
                this.formProcessing = true;

                axios.post('/users/reset_password/'+passwordData.id, passwordData)
                    .then(res => {
                        this.clientData = res.data.user

                        this.toast.success(res.data.message, {
                            timeout: 3000,
                        });

                        setTimeout(() => {
                            router.go()
                        }, 2000);
                    })
                    .catch(error => {
                        // this.formProcessing = false;

                        if (error.response.status == 500) {

                            this.toast.error(error.response.data.error_message);    
                        } else if (error.response.status == 405) {

                            this.toast.error(error.response.data.data['message']);  
                        }

                        if (error.response) {
                            console.log("err");
                            console.log(error.response);
                            console.log(error.response.data.data.message);

                            // this.toast.error(error.response.data.message, {
                            //     position: POSITION.TOP_CENTER,
                            //     timeout: 3000,
                            // });    
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.formProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

    },
})
