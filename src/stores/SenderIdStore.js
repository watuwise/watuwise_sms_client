// stores/counter.js
import router from '@/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { defineStore } from 'pinia';
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import axios from './config/axios';

export const useSenderIdStore = defineStore('senderIdStore', {
    state: () => ({ 
        sender_ids: [],
        sender_id_names: [],
        loading: false,
        formProcessing: false,
        defaultSenderID: "",
        toast: useToast(),
    }),
    actions: {
        
        getSenderIds() {

            try {
                this.loading = true;

                const clientID = JSON.parse(localStorage.getItem('user')).id;

                axios.get('/sender-ids/user/' + clientID)
                    .then(res => {
                    
                        this.defaultSenderID = res.data.defaultSenderID
                        this.sender_ids = res.data.senderIDs
                        this.sender_id_names = res.data.senderIdNames;

                        console.log("sender id names");
                        console.log(this.sender_id_names);
                    })
                    .catch(error => {

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
                    })
                    .finally(() => {

                        this.loading = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        saveSenderId(formData) {
            
            console.log("data");
            console.log(formData);

            try {
                this.formProcessing = true;

                axios.post('/sender-ids', formData)
                    .then(res => {

                        console.log(res.data);
                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.go()
                        }, 3500);
                    })
                    .catch(error => {

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
                    })
                    .finally(() => {

                        this.formProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        updateSenderId(formData) {

            console.log("data");
            console.log(formData);
        
            try {
                this.formProcessing = true;

                axios.post('/sender-ids/' + formData.id, formData)
                    .then(res => {

                        console.log(res.data);
                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.go()
                        }, 3500);
                    })
                    .catch(error => {

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
                    })
                    .finally(() => {

                        this.formProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        deleteSenderId(id) {
            
            try {
                
                Confirm.show(
                    'Are you sure?',
                    "You are about to delete this Sender ID!",
                    'Yes',
                    'No',
                    () => {

                        Loading.standard('Loading...Please Wait', {
                            clickToClose: false,
                            svgColor: '#a66ae2',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                        });
                             
                        axios.delete('/sender-ids/'+id)
                            .then(res => {

                                console.log(res)

                                if(res.data.status === 301) {

                                    Swal.fire({
                                        icon: "info",
                                        title: "Action failed!",
                                        text: res.data.message,
                                        type: "info",
                                        confirmButtonColor: "#81BE41",
                                    })

                                } else {

                                    this.toast.success(res.data.message, {
                                        timeout:3500,
                                    })

                                    setTimeout(() => {
                                        router.go();
                                    }, 1200);
                                }

                            })
                            .catch(error => {

                                const errorMsg = error.response.status == 500 ? error.response.statusText : error.response.data.message;

                                this.toast.error(errorMsg, {
                                    timeout: 3500,
                                })

                                return router.go();
                            })
                            .finally(() => {
                                    
                                Loading.remove();
                                this.loading = false;
                            })

                    },
                    () => {
                        console.log("nooooo");
                    },
                    {
                        titleColor: '#802ad5',
                        okButtonBackground: '#802ad5',
                        cssAnimationStyle: 'zoom',
                        borderRadius: '12px',
                    },
                );


                // Swal.fire({
                //     icon: "warning",
                //     title: "Delete this Client Sender ID.",
                //     text: "Are you sure?",
                //     type: "warning",
                //     showCancelButton: true,
                //     confirmButtonColor: "#f43b48",
                //     confirmButtonText: "Delete",
                //     closeOnConfirm: true
                //   }).then((result) => {

                //     console.log(result)

                //     if (result.isConfirmed) {

                //     }

                // });


            } catch(e) {

                console.log(e);
            }
        },

    },
})
