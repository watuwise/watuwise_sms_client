// stores/counter.js
import { defineStore } from 'pinia';
import router from '@/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import axios from './config/axios';

export const useContactStore = defineStore('contactStore', {
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
        
        getContacts() {

            try {
                this.loading = true;

                const clientID = JSON.parse(localStorage.getItem('user')).id;

                axios.get('/contacts/user/' + clientID)
                    .then(res => {

                        this.contacts = res.data.allcontacts
                        this.groups = res.data.groups
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

        saveContactData(contactData) {

            try {
                this.formProcessing = true;

                axios.post('/contacts', contactData)
                    .then(res => {
                        this.contactData = res.data.user

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
        
        updateContactData(contactData) {

            try {
                this.formProcessing = true;

                axios.post('/contacts/' + contactData.id, contactData)
                    .then(res => {
                        // this.contactData = res.data.user

                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.go()
                            // router.push('/contacts')
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
        
        uploadContactsFile(formUploadData){
            try {
                
                Loading.standard('Uploading Contacts...Please Wait', {
                    clickToClose: true,
                    svgColor: '#a66ae2',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                });

                axios.post('/upload-contacts', formUploadData)
                .then( res => {
                    console.log("success _response");
                    console.log(res.data);

                    Report.success(
                        'Contact Upload Success',
                        'Your contacts have been uploaded and saved in your account.',
                        'Okay',
                    );

                    setTimeout(() => {
                        router.go();
                    }, 3500);
                })
                .catch(error => {
                    console.log("error _response");
                    console.log(error);
                    Report.failure(
                        'Contact Upload Failure',
                        'An error occured while uploading your contacts',
                        'Okay',
                    );
                })
                .finally(() => {
                    
                    Loading.remove();
                })
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        },
          
        
        deleteContactData(id) {

            try {

                Confirm.show(
                    'Are you sure?',
                    "You won't be able to revert this!",
                    'Yes',
                    'No',
                    () => {
                        this.loading = true;
                        
                        axios.delete('/contacts/'+id)
                        .then(res => {

                            if(res.data.status === 301) {

                                Swal.fire({
                                    icon: "info",
                                    title: "Action failed!",
                                    text: res.data.message,
                                    type: "info",
                                    confirmButtonColor: "#81BE41",
                                })

                            } else {

                                this.toast.success(res.data.message)

                                // Notify.success(res.data.message,  {
                                //     timeout: 3500
                                // });

                                setTimeout(() => {
                                    router.go();
                                }, 3500);
                            }

                        })
                        .catch(error => {

                            const errorMsg = error.response.status == 500 ? error.response.statusText : error.response.data.message;

                            // this.toast.error(errorMsg, {
                            //     timeout: 3500,
                            // })

                            Notify.failure(errorMsg, {timeout: 3500});

                            return router.go();
                        })
                        .finally(() => {

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

            } catch(e) {
                console.log(e.message);
            }
        },

        
        removeContactFromGroup(id) {

            try {

                Confirm.show(
                    'Are you sure?',
                    "Contact will be removed from this group!",
                    'Yes',
                    'No',
                    () => {
                        this.loading = true;
                        
                        axios.delete('/groups-contacts/contact/'+id)
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

                                this.toast.success(res.data.message)

                                // Notify.success(res.data.message,  {
                                //     timeout: 3500
                                // });

                                setTimeout(() => {
                                    router.go();
                                }, 3500);
                            }

                        })
                        .catch(error => {

                            const errorMsg = error.response.status == 500 ? error.response.statusText : error.response.data.message;

                            // this.toast.error(errorMsg, {
                            //     timeout: 3500,
                            // })

                            Notify.failure(errorMsg, {timeout: 3500});

                            return router.go();
                        })
                        .finally(() => {

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

            } catch(e) {
                console.log(e.message);
            }
            
        },


        saveGroupData(groupData) {
            console.log("data");
            console.log(groupData);

            try {
                this.formProcessing = true;

                axios.post('/groups/save', groupData)
                    .then(res => {

                        console.log(res.data);
                        this.toast.success(res.data.message);

                        // setTimeout(() => {
                        //     router.go()
                        // }, 2000);
                    })
                    .catch(error => {
                        console.log("error");
                        console.log(error);

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
        

        updateGroupData(groupData) {

            try {
                this.formProcessing = true;

                axios.post('/groups/update/' + groupData.id, groupData)
                    .then(res => {
                        // this.contactData = res.data.user
                        console.log(res);

                        this.toast.success(res.data.message);

                        setTimeout(() => {
                            router.go()
                        }, 3000);
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


        deleteGroupData(id) {
            try {

                console.log(id);
                Confirm.show(
                    'Are you sure?',
                    "You won't be able to revert this!",
                    'Yes',
                    'No',
                    () => {
                        this.loading = true;
                        
                        axios.delete('/groups/'+id)
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

                                // Notify.success(res.data.message,  {
                                //     timeout: 3500
                                // });

                                setTimeout(() => {
                                    router.go();
                                }, 3000);
                            }

                        })
                        .catch(error => {

                            const errorMsg = error.response.status == 500 ? error.response.statusText : error.response.data.message;

                            // this.toast.error(errorMsg, {
                            //     timeout: 3500,
                            // })

                            Notify.failure(errorMsg, {timeout: 3500});

                            // return router.go();
                        })
                        .finally(() => {

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

            } catch(e) {
                console.log(e.message);
            }
            
        },


    },
})
