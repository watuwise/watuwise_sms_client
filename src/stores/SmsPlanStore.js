// stores/counter.js
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import axios from './config/axios';

export const useSmsPlanStore = defineStore('smsPlanStore', {
    state: () => ({ 
        plans: [],
        loading: false,
        formProcessing: false,
        toast: useToast(),
        user: JSON.parse(localStorage.getItem('user')),
    }),
    actions: {
        
        getSmsPlans() {

            try {
                this.loading = true;

                axios.get('/users/sms_plans/' + this.user.id)
                    .then(res => {
                    
                        if(res.data.isPreferredPlan) {

                            this.plans = [];
                            this.plans.push(res.data.user_plan)
                        } else {

                            this.plans = res.data.sms_plans;
                        }
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

    },
})
