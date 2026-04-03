// stores/counter.js
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { defineStore } from 'pinia';
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import axios from './config/axios';
import { useAuthStore } from './AuthStore';

Loading.init({

    messageMaxLength: 100,
});

export const useBillingStore = defineStore('billingStore', {
    state: () => ({ 
        payments: [],
        businessYears: [],
        revenueStats: [],
        totalPurchase: "",
        currentWeekStats: "",
        currentMonthStats: "",
        lastWeekStats: "",  
        todayStats: "",
        paymentData: "",
        loading: false,
        chartProcessing: false,
        toast: useToast(),
    }),
    actions: {
        
        getPayments() {

            try {
                this.loading = true;

                const clientID = JSON.parse(localStorage.getItem('user')).id;

                axios.get('/billings/user/' + clientID)
                    .then(res => {

                        console.log(res);
                    
                        this.payments = res.data.paymentsData
                        this.businessYears = res.data.businessYears
                        this.totalPurchase = res.data.totalPurchase
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

        getPaymentData(paymentID) {
            try {
                this.loading = true;

                axios.get(`/billings/${paymentID}`).then(res => {
                    
                        this.paymentData = res.data
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

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.loading = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        getRevenueStats(year) {
            try {
                this.chartProcessing = true;

                const userID = JSON.parse(localStorage.getItem('user')).id;

                axios.get(`/billings/purchase_stats/${userID}/${year}`).then(res => {
                    
                        this.revenueStats = res.data.revenueStats
                        this.currentWeekStats = res.data.currentWeekStats
                        this.lastWeekStats = res.data.lastWeekStats
                        this.todayStats = res.data.todayStats
                        this.currentMonthStats = res.data.currentMonthStats
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

                        console.log(error.config);
                    })
                    .finally(() => {

                        this.chartProcessing = false;
                    })

            } catch(e) {

                console.log(e);
            }
        },

        nFormatter(num) {
            const lookup = [
              { value: 1, symbol: "" },
              { value: 1e3, symbol: "k" },
              { value: 1e6, symbol: "M" },
              { value: 1e9, symbol: "G" }, 
              { value: 1e12, symbol: "T" },
              { value: 1e15, symbol: "P" },
              { value: 1e18, symbol: "E" }
            ];

            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var item = lookup.slice().reverse().find(function(item) {
              return num >= item.value;
            });

            return item ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol : "0";
        },

        
        addBilling(units, amount){
            try {
                this.loading = true;
                axios.post('/api/billings',
                {
                    units_purchased:units,
                    amount_paid:amount,
                    clientID:userStore.user.id
                },
                {
                    headers:{
                        'Authorization':'Bearer '+userStore.token,
                    }
                }).then(_response => {
                    console.log(_response);
                    this.fetchBillings();
                }
                ).catch(error => {
                    // toast.error(error.response.data.error_message,{timeout: 2800});
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                })
            } catch (error) {
                console.log(error);
            }
        },  

        async payWithPaystack(units, amount) {
            try {
                Loading.standard('Initializing payment...', {
                    svgColor: '#5025D1',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                const user = JSON.parse(localStorage.getItem('user'));
                const ref_no = 'WW-' + Math.floor(100000000 + Math.random() * 900000000);

                const response = await axios.post('/payments/paystack/initialize', {
                    email:   user.email,
                    amount:  amount,
                    units:   units,
                    user_id: user.id,
                    ref_no:  ref_no,
                });

                Loading.remove();

                if (response.data.status === 200) {
                    // Redirect user to Paystack checkout
                    window.location.href = response.data.payment_url;
                } else {
                    this.toast.error(response.data.error_message || 'Could not initialize payment');
                }

            } catch (error) {
                Loading.remove();
                this.toast.error('Payment initialization failed. Please try again.');
                console.log(error);
            }
        },

        async verifyPaystackPayment(reference) {
            try {
                Loading.standard('Verifying payment...', {
                    svgColor: '#5025D1',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                const response = await axios.get(`/payments/paystack/verify/${reference}`);

                Loading.remove();

                if (response.data.status === 200) {
                    this.toast.success('Payment successful! Your SMS units have been credited.');
                    this.getPayments();
                } else {
                    this.toast.error('Payment verification failed. Contact support if units were deducted.');
                }

            } catch (error) {
                Loading.remove();
                this.toast.error('Could not verify payment. Please contact support.');
                console.log(error);
            }
        },

        sendPrompt(amount, pNumber, units){
            try {

                // this.loading = true;
                Loading.standard('Loading...Please Wait', {
                    clickToClose: true,
                    svgColor: '#a66ae2',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                var user_id = JSON.parse(localStorage.getItem('user')).id;

                 //generate a random number
                var randomNumber =  Math.floor(100000000 + Math.random() * 900000000);

                var data = {

                    amount:amount,
                    phone_number:pNumber,
                    units: units,
                    user_id: user_id,
                    name: 'Malindi John',
                    ref_no: randomNumber,

                };

                axios.post('/stkpush', data).then(_response => {
                    console.log("stk repsonse: ");
                    console.log(_response); 

                    if(_response.data.status == 200){

                        console.log("Ref Number")
                        console.log(data.ref_no)

                        // Swal.fire("Prompt Sent", 'Whoa! '+_response.data.message, "success");

                        this.listenMpesaCallback(data.ref_no);

                        // Report.success('Mpesa Payments', 'Whoa! '+_response.data.message, 'Ok');// this.loading = true;
                        Loading.change(_response.data.message, {
                            clickToClose: false,
                            svgColor: '#a66ae2',
                            // svgColor: '#7928ca',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                        });

                        setTimeout(() => {

                            Loading.change("Confirming Payment", {
                                clickToClose: false,
                                svgColor: '#a66ae2',
                                // svgColor: '#7928ca',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                            });
                            
                        }, 3000);

                    } else{

                        // Loading.remove();
                        // Swal.fire("Mpesa Payments", 'Whoops! '+_response.data.message, "error");
                        Report.failure('Mpesa Payments', 'Whoops! '+_response.data.message, 'Ok');
                    }
                    
                }).catch(error => {

                    // Loading.remove();

                    // toast.error(error.response.data.error_message,{timeout: 2800});
                    Report.failure('Mpesa Payments', "Whoops! An error occurred with the stk push", 'Ok')
                    // Swal.fire("Failure!", "An error occurred with the stk push", "error");
                })
                .finally(() => {
                    // this.loading = false;
                    Loading.remove();
                })
            } catch (error) {
                console.log(error); 
            }
        },

        //listen to mpesa callback


        //listen to mpesa callback data
        listenMpesaCallback(ref){

            //show an error if the payment stays for more than 30 secs
    
            setTimeout(() => {
    
                Loading.remove();

                // this.showAlert("Mpesa payment process took too long. Kindly contact support for help.", "error", "Mpesa Payments", "#f27474");
                Report.failure(
                    'Mpesa Payments',
                    'Whoops! Mpesa payment process took too long. Kindly contact support for help',
                    'Ok'
                );
    
            }, 60000);
    
            var interval = setInterval(() => {
    
            //send the request
            axios
                .get("/check_payment/"+ref)
                .then((res) => {
                console.log("Payment callback data")
                console.log(res.data)
    
                if(res.data.is_paid == 'true'){
    
                    console.log("The data returned is not null")
    
                    var data = res.data;

                    console.log(data);
    
                    //clear the interval
                    clearInterval(interval);

                    Loading.remove();

                    Report.success(
                        'Mpesa Payments',
                        res.data.message,
                        'Ok'
                    );

    
                } else{
    
                    console.log("The data returned is null")
    
                    console.log(res.data)
                    console.log("receipt number still empty")
                }
                })
                .catch((error) => {
                // this.saving = false;
                // this.error = true;
                // this.message = error.response.data.message;
                console.log(error);
                });
                
            }, 5000);
    
    
    
        },

    },
})
