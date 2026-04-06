// stores/counter.js
import router from '@/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { defineStore } from 'pinia';
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import axios from './config/axios';

const SENDER_ID_FEE = 8000; // KES

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

                        // Only include sender IDs that belong to this user (exclude admin default)
                        const clientID = JSON.parse(localStorage.getItem('user')).id;
                        this.sender_id_names = res.data.senderIDs
                            .filter(s => s.clientID == clientID && s.status === 'active')
                            .map(s => s.sender_id);

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

        async applySenderId(formData) {
            this.formProcessing = true;
            try {
                const data = new FormData();
                data.append('sender_id',        formData.sender_id);
                data.append('clientID',          formData.clientID);
                data.append('reg_certificate',   formData.reg_certificate);
                data.append('application_form',  formData.application_form);

                const res = await axios.post('/sender-ids/apply', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                return res.data.sender_id_record_id;
            } catch(error) {
                const msg = error.response?.data?.error_message || 'Failed to submit application';
                this.toast.error(msg);
                throw error;
            } finally {
                this.formProcessing = false;
            }
        },

        async initializeSenderIdPayment(senderIdRecordId) {
            try {
                Loading.standard('Redirecting to payment...', {
                    svgColor: '#5025D1',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                const user = JSON.parse(localStorage.getItem('user'));
                const ref_no = 'WW-SID-' + Math.floor(100000000 + Math.random() * 900000000);

                const response = await axios.post('/payments/paystack/initialize', {
                    email:                user.email,
                    amount:               SENDER_ID_FEE,
                    units:                0,
                    user_id:              user.id,
                    ref_no:               ref_no,
                    payment_type:         'sender_id',
                    sender_id_record_id:  senderIdRecordId,
                });

                Loading.remove();

                if (response.data.status === 200) {
                    window.location.href = response.data.payment_url;
                } else {
                    this.toast.error(response.data.error_message || 'Could not initialize payment');
                }
            } catch(error) {
                Loading.remove();
                this.toast.error('Payment initialization failed. Please try again.');
                console.log(error);
            }
        },

        async verifySenderIdPayment(reference) {
            try {
                Loading.standard('Verifying payment...', {
                    svgColor: '#5025D1',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                const response = await axios.get(`/payments/paystack/verify/${reference}`);

                Loading.remove();

                if (response.data.status === 200) {
                    this.toast.success(response.data.message);
                    router.replace({ path: '/sender-id' });
                    this.getSenderIds();
                } else {
                    this.toast.error('Payment verification failed. Contact support if you were charged.');
                }
            } catch(error) {
                Loading.remove();
                this.toast.error('Could not verify payment. Please contact support.');
                console.log(error);
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
