import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { ValidationProvider , ValidationObserver} from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
 
import { localize } from 'vee-validate';
import moment from 'moment';

import { extend } from 'vee-validate';
import { email, digits } from 'vee-validate/dist/rules';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.component('vue-phone-number-input', VuePhoneNumberInput)

Vue.use(VueGoogleAutocomplete, {
  load: {
    key: 'AIzaSyD0av1I6ws3pKn06FOdeRfBt0HRqxBhBao',
    libraries: 'places,geometry' // necessary for places input
  }
}) 


Vue.filter('formatDate', function(value){
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('font-awesome-icon',FontAwesomeIcon);
Vue.config.productionTip = false
Vue.prototype.$http = axios

const token = localStorage.getItem("token");
if(token){
  Vue.prototype.$http.default.headers.common['Authorization'] = token;
}

Vue.use(BootstrapVue)
Vue.use(axios)
Vue.use(VueRouter)

//Global variables

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

extend('email', email)
extend('digits', digits)

extend('confirm_password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

extend('retyped_new_password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

localize({
  en: {
    fields: {
      email: {
        required: 'Email address is required.',
        email: 'Email address is invalid.'
      },
      password: {
        required: 'Password is required.'
      },
      first_name: {
        required: 'First name is required.'
      },
      last_name: {
        required: 'Last name is requred.'
      },
      mobile_no: {
        required: 'Mobile number is required.',
        digits: 'Mobile must have numeric value and has 11 digits.'
      },
      birthdate: {
        required: 'Date of birth is required.'
      },
      user_address: {
        required: 'Address is required.'
      },
      username: {
        required: 'Username is required.'
      },
      confirm_password: {
        required: 'Please retype your password.'
      },
      curr_password: {
        required: 'Please type your current password.'
      },
      new_password: {
        required: 'Please type your new password.'
      },
      retyped_new_password: {
        required: 'Please retype your new password.'
      },
      center_name: {
        required: 'Name of center or institution is required.'
      },
      center_desc: {
        required: 'Description of center or institution is required.'
      },
      center_head_firstname: {
        required: 'First name of center or institution head is required.'
      },
      center_head_lastname: {
        required: 'Lastname of center or institution head is required.'
      },
      center_indivtype: {
        required: 'Type of individual is required.'
      },
      center_location: {
        required: 'Location of center or institution is required.'
      },
      center_yearfounded: {
        required: 'Year founded is required.'
      },
      center_email: {
        required: 'Email address is required.',
        email: 'Email address is invdalid'
      },
      center_telno: {
        required: 'Telephone number is required.'
      },
      center_mobileno: {
        required: 'Mobile number is required.'
      },
      center_gender: {
        required: 'Gender is required.'
      },
      position: {
        required: 'Position is required.'
      },
      rep_indivtype:{
        required:'Type of inidvidual is required.'
      },
      rep_gender: {
        required: 'Gender is required.'
      },
      rep_desc: {
        required: 'Description is required.'
      },
      rep_location: {
        required: 'Location is required.'
      },
      emailadd: {
        required: 'Email address is required.',
        email: 'Email address is invalid.'
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
