
import router from "@/router";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import axios from "./config/axios";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem('accessToken'),
        user: localStorage.getItem('user'),
        login_status: localStorage.getItem('login-status'),
        toast: useToast(),
        returnUrl: null,
        loading: false,
        pwd_loading: false,
        criticalError: false,
        criticalErrorMsg: "",
    }),
    getters:{
        
    },
    actions: {

        checkUser() {

            try {

                if(!user && !token) {

                    localStorage.removeItem('user');

                    return router.push('/login');
                }

            } catch(e) {

                console.log(e);
            }
        },

        loadUser() {

            try {

                axios.get('/user', {headers: {'Authorization': 'Bearer ' + this.token}})
                     .then(res => {

                        console.log(res);
                     })
                     .catch(error => {

                        const status = error.response.status;

                        if(status == 401) {

                            console.log("status: "+status);

                            localStorage.removeItem('user');

                            return router.push('/login');
                        }

                     })

            } catch(e) {

                console.log(e);
            }
        },

        login(loginData) {
            localStorage.removeItem('user');

            try {

                this.loading = true;

                axios.post('/login', loginData)
                    .then(res => {

                        console.log(res);
                        let userData = res.data.user;

                        // store user details and jwt in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', JSON.stringify(userData))

                        //set user token to enable authentication
                        localStorage.setItem('accessToken', res.data.token)
                        
                        this.toast.success(res.data.message);
                        // return router.push('/dashboard');
                        
                        setTimeout(() => {    
                            location.href = '/dashboard';
                        }, 3000);
                    })
                    .catch(error => {
                        console.log("from pinia ");
                        console.log(error)

                        if(error.response.data.error_message == "Email Verification") {
            
                          Report.failure(
                            'Email Verification Required',
                            'A verification email was sent to your email address. Please check your email and verify to proceed with login.',
                            'Okay', 
                            {
                              width: "420px"
                            }
                          );
                        } 
                        else if(error.response.data.account_status == "Pending") {

                            Report.warning(
                                'Whoops! Account Pending Approval',
                                'Please wait as the approval of your account is being processed.',
                                'Okay', 
                                {
                                  width: "420px"
                                }
                            );
                        }
                        else if(error.response.data.account_status == "Disapproved") {

                            Report.warning(
                                'Sorry! You can\'t login.',
                                'Whoops! Your account has been disapproved. Kindly contact the support team for more info.',
                                'Okay', 
                                {
                                  width: "420px"
                                }
                            );
                        }
                        else if(error.response.data.account_status == "Inactive") {

                            Report.warning(
                                'Sorry! You can\'t login.',
                                'Whoops! Your account is deactivated. Kindly contact the support team for any assistance.',
                                'Okay', 
                                {
                                  width: "420px"
                                }
                            );
                        }
                        else if (error.code === 'ECONNABORTED') {

                            this.criticalError = true;
                            this.criticalErrorMsg = "Connection Timeout";

                            this.toast.error(this.criticalErrorMsg)    
                        }
                        else {
                        
                            this.toast.error(error.response.data.error_message)   
                        }

                    })
                    .finally(() => {

                        this.loading = false;
                        this.criticalError = false;
                    })  

            } catch (e) {

                this.loading = false;

                this.toast.error("Fatal Error Occurred!");
            }
        },

        forgotPassword(email) {

            try {

                this.loading = true;

                axios.post('/forgot-password', email)
                    .then(res => {

                        Report.success(
                            'Password Reset Complete',
                            'Your password has been reset. Kindly check your email for further instructions.',
                            'Okay', 
                            {
                                width: "420px"
                            }
                        );

                        setTimeout(() => {    
                            router.push('/login');
                        }, 2000);
                    })
                    .catch(error => {
                        console.log("from pinia ");
                        console.log(error)

                        if(error.response.data.error == "invalid_email") {
            
                          Report.failure(
                            'Invalid Email Address',
                            error.response.data.error_message,
                            'Okay', 
                            {
                              width: "420px"
                            }
                          );
                        } 
                        else {
                        
                            this.toast.error(error.response.data.error_message)   
                        }

                    })
                    .finally(() => {

                        this.loading = false;
                    })  

            } catch (e) {

                this.toast.error("Fatal Error Occurred! " + e.getMessage());
            }
        },

        registerClient(registrationData) {

            try {

                this.loading = true;

                axios.post('/register', registrationData)
                    .then(res => {

                        console.log(res);

                        Report.success(
                            'Registration Completed',
                            'A verification email has been sent to your email address. Please check your email and verify to proceed with login.',
                            'Okay', 
                            {
                                width: "420px"
                            }
                        );

                        return router.push('/login');
                    })
                    .catch(error => {
                        console.log("from pinia ");
                        console.log(error)

                        if (error.code === 'ECONNABORTED') {

                            this.criticalError = true;
                            this.criticalErrorMsg = "Connection Timeout";

                            this.toast.error(this.criticalErrorMsg)    
                        }
                        else {
                        
                            this.toast.error(error.response.data.error_message)   
                        }

                    })
                    .finally(() => {

                        this.loading = false;
                        this.criticalError = false;
                    })  

            } catch (e) {

                this.loading = false;

                this.toast.error("Fatal Error Occurred!");
            }
        },

        adminUpdate(adminData) {

            console.log("admin data");
            console.log(adminData);


            try {

                this.loading = true;

                axios.post('/users/admin_update/'+adminData.id, adminData)
                    .then(res => {

                        console.log(res.data);
                        let admin = res.data.admin;

                        // store user details and jwt in local storage to keep user logged in between page refreshes
                        localStorage.setItem('admin', JSON.stringify(admin))
                
                        this.toast.success(res.data.message);

                        router.push('/account-settings')
                    })
                    .catch(error => {
                        console.log("from pinia ");
                        console.log(error)

                        if (error.code === 'ECONNABORTED') {

                            this.criticalError = true;
                            this.criticalErrorMsg = "Connection Timeout";

                            this.toast.error(this.criticalErrorMsg)    
                        }
                        else {
                        
                            this.toast.error(error.response.data.error_message)   
                        }

                    })
                    .finally(() => {

                        this.loading = false;
                        this.criticalError = false;
                    })  

            } catch (e) {

                this.loading = false;

                this.toast.error("Fatal Error Occurred!");
            }
        },

        updateAdminPassword(passwordData) {

            console.log("admin data");
            console.log(passwordData);

            try {

                this.pwd_loading = true;

                axios.post('/users/admin_update/password/'+passwordData.id, passwordData)
                    .then(res => {

                        console.log(res.data);
                
                        this.toast.success(res.data.message);

                        router.push('/account-settings')
                    })
                    .catch(error => {
                        console.log("from pinia ");
                        console.log(error)

                        if (error.code === 'ECONNABORTED') {

                            this.criticalError = true;
                            this.criticalErrorMsg = "Connection Timeout";

                            this.toast.error(this.criticalErrorMsg)    
                        }
                        else {
                        
                            this.toast.error(error.response.data.error_message)   
                        }

                    })
                    .finally(() => {

                        this.pwd_loading = false;
                        this.criticalError = false;
                    })  

            } catch (e) {

                this.pwd_loading = false;

                this.toast.error("Fatal Error Occurred!");
            }
        },

        logout() {

            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');

            location.href = "/login";
            // return router.push('/login');
        },

    },
});
