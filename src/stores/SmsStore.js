// stores/counter.js
import router from '@/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import axios from './config/axios';

export const useSmsStore = defineStore('smsStore', {
    state: () => ({ 
        messages: [],
        messageStats: [],
        availableSmsUnits: "",
        spentSmsUnits: "",
        msgToday: "",
        msgCurrentMonth: "",
        loading: false,
        formProcessing: false,
        chartProcessing: false,
        radialChartProcessing: false,
        toast: useToast(),
        actualBalance: "",
        virtualBalance: "",
        clientUnits: "",
        percentageRemaining: "",
        activeSmsPercentage: "",
        user: JSON.parse(localStorage.getItem('user')),
    }),
    actions: {
        
        getMessages() {

            try {
                this.loading = true;

                axios.get('/messages/user/' + this.user.id)
                    .then(res => {
                        console.log(res.data);
                    
                        this.messages = res.data.messages
                        this.availableSmsUnits = res.data.available_sms_units
                        this.spentSmsUnits = res.data.used_sms_units
                        this.activeSmsPercentage = res.data.active_sms_percentage
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
                    })
                    .finally(() => {

                        this.loading = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        getMessageStats(year) {

            try {
                this.loading = true;

                axios.get(`/messages/user/stats/${year}/${this.user.id}`)
                    .then(res => {
                    
                        this.msgToday = res.data.msgSentToday
                        this.msgCurrentMonth = res.data.msgSentThisMonth
                        this.messageStats = res.data.usageStats
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
                    })
                    .finally(() => {

                        this.loading = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        // getMessageUsage() {
        //     try {
        //         this.radialChartProcessing = true;

        //         axios.get('/messages/usage')
        //             .then(res => {
        //                 console.log(res.data);
                    
        //                 this.actualBalance = res.data.actual_balance
        //                 this.virtualBalance = res.data.virtual_balance
        //                 this.clientUnits = res.data.client_units
        //                 this.percentageRemaining = res.data.percentage_available
        //             })
        //             .catch(error => {

        //                 console.log("error");
        //                 console.log(error);

        //                 // if(status == 401) {

        //                 //     console.log("status: "+status);

        //                 //     return router.push('/login');
        //                 // }

        //                 if (error.response) {
        //                     // The request was made and the server responded with a status code
        //                     // that falls out of the range of 2xx
        //                     console.log(error.response.data);
        //                     console.log(error.response.status);
        //                     console.log(error.response.headers);
        //                 } else if (error.request) {
        //                     // The request was made but no response was received
        //                     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //                     // http.ClientRequest in node.js
        //                     console.log(error.request);
        //                 } else {
        //                     // Something happened in setting up the request that triggered an Error
        //                     console.log('Error', error.message);
        //                 }

        //                 console.log(error.config);
        //             })
        //             .finally(() => {

        //                 this.radialChartProcessing = false;
        //             })

        //     } catch(e) {

        //         console.log(e);
        //     }
        // },
 


        // send messge now
        sendMessage(messageData) {
            Confirm.show(
                'Review Message',
                'Hey! Kindly review this message before sending. Note that once message is sent, it cannot be reversed.',
                'Send',
                'Cancel',
                () => {
                    
                    try {
                        messageData["is_scheduled"] = false;

                        console.log("message data: ");
                        console.log(messageData);

                        // this.loading = true;
                        Loading.standard('Loading...Please Wait', {
                            clickToClose: false,
                            svgColor: '#a66ae2',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                        });

                        axios.post('/messages/send-message', messageData)
                            .then(res => {
                            
                                console.log("response");
                                console.log(res.data);

                                Report.success(
                                    'Success',
                                    res.data.message,
                                    'Ok',
                                );

                                // setTimeout(() => {
                                //     router.go();
                                // }, 3500);
                            })
                            .catch(error => {

                                console.log("error");
                                console.log(error);

                                Report.failure(
                                    'Failure',
                                    "An error occurred",
                                    'Ok',
                                );

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
                                    // http.ClientRequest in node.js+
                                    console.log(error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.log('Error', error.message);
                                }
                            })
                            .finally(() => {

                                this.formProcessing = false;
                                Loading.remove();
                            })

                    } catch(e) {

                        console.log(e);
                    }
                },
                () => {
                    console.log("alright");
                },
                {
                    width: '420px',
                    titleColor: '#ff5549',
                    okButtonBackground: '#ff5549',
                    cssAnimationStyle: 'zoom',
                    borderRadius: '12px',
                },
            );
        },


        sendScheduledMessage(messageData) {
            
            try {

                messageData["is_scheduled"] = true;
                console.log("message data: ");
                console.log(messageData);

                Confirm.show(
                    'Confirm Action',
                    "You are about to schedule this message to be sent on "+messageData.scheduled_time+"!",
                    'Yes',
                    'No',
                    () => {

                        Loading.standard('Loading...Please Wait', {
                            clickToClose: false,
                            svgColor: '#a66ae2',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                        });
                                
                        axios.post('/messages/send-message', messageData)
                        .then(res => {
                        
                            console.log("response");
                            console.log(res.data);

                            Report.success(
                                'Success',
                                res.data.message,
                                'Ok',
                            );

                            setTimeout(() => {
                                router.go();
                            }, 2500);
                        })
                        .catch(error => {

                            console.log("error");
                            console.log(error);

                            Report.failure(
                                'Failure',
                                error.response.data.error_message,
                                'Ok',
                            );

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

                            Loading.remove();
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

            } catch(e) {

                console.log(e);
            }
        },


        saveScheduledMessage(messageData) {
            console.log("message data: ");
            console.log(messageData);

            try {
                this.formProcessing = true;

                // this.loading = true;
                Loading.standard('Loading...Please Wait', {
                    clickToClose: true,
                    svgColor: '#a66ae2',
                    // svgColor: '#7928ca',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                axios.post('/messages/schedule-message', messageData)
                    .then(res => {
                    
                        console.log("response");
                        console.log(res.data);

                        Report.success(
                            'Success',
                            res.data.message,
                            'Ok',
                        );

                        setTimeout(() => {
                            router.go();
                        }, 2500);
                    })
                    .catch(error => {

                        console.log("error");
                        console.log(error);

                        Report.failure(
                            'Failure',
                            "An error occurred",
                            'Ok',
                        );

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
                        Loading.remove();
                        router.go();
                    })

            } catch(e) {

                console.log(e);
            }
        },

    },
})
