<template>
<div>
      <div class = "b-navbar">
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand><router-link id="dswd_homelink" to="/"><img :src="require('../assets/images/dswd_logo.png')" width="50" height="50" alt="" id = "logo"/><span id="dswd_home">DSWD R3</span></router-link></b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!--<b-navbar-nav>
              <b-nav-item class="nav-link">CENTERS AND INSTITUTIONS</b-nav-item>
              <b-nav-item class="nav-link">ABOUT</b-nav-item>
            </b-navbar-nav>-->

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-button type="button" id="btn_login" @click="showLoginModal = true">LOGIN</b-button>
              <b-button type="button" id="btn_register" @click="showRegisterModal = true">REGISTER</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

        <!-- Login Modal -->
        <div v-if="showLoginModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                  <form @submit.prevent="checkLogin">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Login to your account</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="hideLoginModal">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p class = "err_message">{{error_login}}</p>
                         <p class = "login_message">{{login_message}}</p>
                        <div class = "form-group">
                          <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                            <label for="email">Email</label>
                            <input type = "text" class="form-control" id = "loginemail" v-model="loginemail" name="loginemail" />
                            <p class = "err_message">{{ errors[0] }}</p>
                          </ValidationProvider>
                          <ValidationProvider name = "password" rules="required" v-slot="{ errors }">
                            <label for="password">Password</label>
                            <input type = "password" class="form-control" id = "loginpassword" v-model="loginpassword" name="loginpassword" />
                            <p class = "err_message">{{ errors[0] }}</p>
                          </ValidationProvider>
                        </div>
                        <div id ="forgotpass">
                          <p>Forgot your password? <button type="button" class="btn btn-primary" @click="showForgotPasswordModal=true; showLoginModal=false">Click here</button></p>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <input type="submit" class="btn btn-primary mr-3" value="Login">
                          <button type="button" class="btn btn-secondary" @click="hideLoginModal">Close</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!--End of Login Modal-->

        <!--Register User Modal Step 1-->
        <div v-if = "showRegisterModal">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 1 of 2: Create your user account</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showRegisterModal = false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields}}</p>
                      <div class="modal-body">
                        <div class="modal-body-section1">
                          <div class="form-group">
                            <ValidationProvider name = "first_name" rules="required" v-slot="{ errors }">
                                <label for="first_name">First Name<span class = 'required_data'>*</span></label>
                                <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Enter First Name">
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "middle_initial" rules="" v-slot="{ errors }">
                              <label for="middle_initial">Middle Initial</label>
                              <input type="text" v-model="middle_initial" class="form-control" name="middle_initial" placeholder="Enter Middle Initial">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "last_name" rules="required" v-slot="{ errors }">
                              <label for="last_name">Last Name<span class = 'required_data'>*</span></label>
                              <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Enter Last Name">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </div>
                        <div class="modal-body-section2">
                          <div class="form-group">
                            <ValidationProvider name = "mobile_no" rules="required|digits:11" v-slot="{ errors }">
                              <label for="mobilephone_no">Mobile Phone No.<span class = 'required_data'>*</span></label>
                              <input type="text" v-model="mobile_no" v-bind="mobile_no" maxlength="11" class="form-control" name="mobile_no" placeholder="09xx3456789">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "birthdate" rules="required" v-slot="{ errors }">
                              <label for="birthdate">Date of birth:<span class = 'required_data'>*</span></label>
                              <input type="date" v-model="birthdate" class="form-control" name="birthdate" placeholder="">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "user_address" rules="required" v-slot="{ errors }">
                              <label for = "address">Address<span class = 'required_data'>*</span></label>
                              <div id = "address_details">
                                <input type="hidden" id="loc_lat" />
                                <input type="hidden" id="loc_long" />
                                <input id="input_address" v-model="address" placeholder="Enter your address" @focus="initAutocomplete()" type="text" class="form-control">
                                <input type="hidden" class="form-control" id="street_number" disabled="true">
                                <input type="hidden" class="form-control" id="route" disabled="true">
                                <input type="hidden" class="form-control field" id="locality" disabled="true">
                                <input type="hidden" class="form-control" id="administrative_area_level_1" disabled="true">
                                <input type="hidden" class="form-control" id="postal_code" disabled="true">
                                <input type="hidden" class="form-control" id="country" disabled="true">
                                <span class = "err_message">{{ errors[0] }}</span>
                              </div>
                              </ValidationProvider>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="registerDetails()">Next</button>
                          <!--<button type="button" class="btn btn-secondary" @click="showRegisterModal = false">Cancel</button>-->
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div> 

        <!-- User Registration Step 2-->
        <div v-if = "showRegisterModal2">
          <transition name = "modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class = "modal-dialog" role="document">
                  <form @submit.prevent="registerUser">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 2 of 2: Create your user account</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showRegisterModal2 = false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <ValidationObserver>
                        <div class="form-group">
                          <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                            <label for="email">Email Address<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="email" class="form-control" name="email" placeholder="Enter Email">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name="username" rules="required" v-slot="{ errors }">
                            <label for="username">Username<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="username" class="form-control" name="username" placeholder="Enter Username">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name = "password" rules="required" v-slot="{ errors }">
                              <label for="password">Password<span class = 'required_data'>*</span></label>
                              <input type="password" v-model="password" @input="checkStrongPassword()" class="form-control" name="password" placeholder="Enter Password">
                              
                               <ul class = "pass_list">
                                <li>
                                  <span>Password must have:</span>
                                </li>
                               <li>
                                 <span class="cross" v-if="!showCheck1">&#10006;</span><span class="check" v-if="showCheck1">&#10004;</span><span :style="{color:passlen_textColor}" id="pass_len" class="password_criteria">Atleast 8 characters</span> 
                               </li>
                               <li>
                                 <span class="cross" v-if="!showCheck2">&#10006;</span><span class="check" v-if="showCheck2">&#10004;</span><span :style="{color:upperc_textColor}" id="upper_char" class="password_criteria">Uppercase letters</span>
                               </li>
                               <li>
                                 <span class="cross" v-if="!showCheck3">&#10006;</span><span class="check" v-if="showCheck3">&#10004;</span><span :style="{color:lowerc_textColor}" id="lower_char" class="password_criteria">Lowecase letters</span> 
                               </li>
                               <li>
                                 <span class="cross" v-if="!showCheck4">&#10006;</span><span class="check" v-if="showCheck4">&#10004;</span><span :style="{color:numchar_textColor}" id="num_char" class="password_criteria">Numbers</span>
                               </li>
                               <li>
                               <span class="cross" v-if="!showCheck5">&#10006;</span><span class="check" v-if="showCheck5">&#10004;</span><span :style="{color:specialchar_textColor}" id="special_char" class="password_criteria">Special characters</span>
                               </li>
                               </ul>
                              <span class = "err_message">{{ errors[0] }}</span>
                              <span class="err_message">{{valid_password}}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name = "confirm_password" rules="required|confirm_password:@password" v-slot="{ errors }">
                              <label for="password">Confirm Password<span class = 'required_data'>*</span></label>
                              <input type="password" v-model="confirm_password" class="form-control" name="confirm_password" placeholder="Confirm Password">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        </ValidationObserver>
                      </div>
                      <div class="modal-footer">
                        <div class = "form-group col text-center">
                          <button class="btn btn-primary btn-inline mr-3" type="button" @click="showRegisterModal=true;showRegisterModal2=false">Go Back</button>
                          <button class="btn btn-primary btn-inline mr-3" type="submit">Create Account</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- End of User Registration Step 2-->

        <!--Successful Registration Modal-->
        <div v-if="showRegistrationSuccessModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">User Registration</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showRegistrationSuccessModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p>Activate your account by clicking the link sent to your email.</p>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="showRegistrationSuccessModal = false">OK</button>
                          <!--<button type="button" class="btn btn-secondary" @click="showRegistrationSuccessModal = false">Close</button>-->
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!--Successful Registration Modal-->

        <div v-if="showForgotPasswordModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Forgot Password</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showForgotPasswordModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <ValidationProvider name = "emailadd" rules="required|email" v-slot="{ errors }">
                            <label for="email">Email Address</label>
                            <input type = "text" class="form-control" id = "emailadd" v-model="emailadd" name="emailadd" />
                            <p class = "err_message">{{ errors[0] }}</p>
                          </ValidationProvider>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="resetPass">Reset Password</button>
                          <button type="button" class="btn btn-secondary" @click="showForgotPasswordModal = false; showLoginModal=true">Cancel</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
    </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import router from '../router/index'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: 'Navbar',
  /* computed: mapGetters([
    'isLoggedIn',
    'user'
  ]), */
  components: { VueGoogleAutocomplete },
  computed: {
    isLoggedIn () {
      // location.reload()
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    },
    isCharlen: false
  },
  data () {
    return {
      auth: '',
      user_type: '',
      user_data: {},
      logged: false,
      userLoggedIn: 0,
      showLoginModal: false,
      showRegisterModal: false,
      showRegisterModal2: false,
      showRegistrationSuccessModal: false,
      showForgotPasswordModal: false,
      loginemail: '',
      loginpassword:'',
      error_login:'',
      login_message: '',
      first_name: '',
      middle_initial: '',
      last_name: '',
      mobile_no: '',
      birthdate: '',
      address: '',
      email:'',
      username:'',
      password:'',
      confirm_password:'',
      address_id: '',
      place: null,
      autocomplete: null,
      gen_address: '',
      required_fields: '',
      valid_password: '',
      passlen_textColor:'',
      upperc_textColor:'',
      lowerc_textColor:'',
      numchar_textColor:'',
      specialchar_textColor:'',
      showCheck1:false,
      showCheck2:false,
      showCheck3:false,
      showCheck4:false,
      showCheck5:false,
      pass_num: 0,
      logdata: '',
      emailadd: ''
    }
  },
  methods: {
    ...mapActions(['getProfile', 'getCenterID', 'resetPassword']),
    logout () {
      axios.get('users/logout', {
        first_name: this.first_name,
        last_name: this.last_name
      }).then(res => {
        this.auth = ''
        this.first_name = ''
        this.last_name = ''
        this.user_data = res.data
        router.push({ name: 'Login' })
      })
    },
    ...mapActions(['logout']),
    logoutUser () {
      this.logout()
      this.userLoggedIn = this.$store.getters.isLoggedIn
      alert('Successfully Logged out...')
    },
    forceRerender () {
      this.userLoggedIn += 1
    },
    openLoginModal () {
      document.getElementById("loginModal").modal({backdrop:  false})
    },
    checkLogin () {
      if(this.loginemail === '' || this.loginpassword === ''){
        this.error_login = 'Please enter your username and/or password.'
      }
      else {
        this.loginUser()
      }
    },
    ...mapActions(['login']),
    loginUser () {
      let user = {
        loginemail: this.loginemail,
        loginpassword: this.loginpassword
      }
      this.login(user)
      //this.$store.dispatch('login', user)
        .then(res => {
          this.logdata = Object.values(res.data)
          if (res.data.success) {
            // router.push({ name: 'home' })
            router.push({ name: 'home', params:{id: res.data.user._id}})
          } else if(String(this.logdata) === 'User account not verified.') {
            this.error_login = "Email address not verified"
          } else {
            this.errorLogin()
          }
        }).catch(err => {
          console.log(err)
        })
    },
    errorLogin () {
      this.error_login = "Email or Password is incorrect. Please try again."
    },
    loginMessage () {
      this.login_message = "User successfully registered. You can now login to your account."
    },
    ...mapActions(['register', 'getAPIkey']),
    registerUser() {
      if (this.first_name === '' ||
      this.last_name === '' ||
      this.mobile_no === '' ||
      this.birthdate === '' ||
      this.address === '' ||
      this.email === '' ||
      this.username === '' ||
      this.password === '' ||
      this.confirm_password === '') {
        // this.scrollToTop()
      } else {
        //this.mobile_no = "63" + this.mobile_no
        let user = {
        first_name: this.first_name,
        middle_initial: this.middle_initial,
        last_name: this.last_name,
        mobile_no: this.mobile_no,
        birthdate: this.birthdate,
        address: this.address,
        email: this.email,
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password
        }
        this.register(user).then(res => {
          if (res.data.success) {
            this.first_name =""
            this.middle_initial = ""
            this.last_name = ""
            this.mobile_no = ""
            this.birthdate = ""
            this.address = ""
            this.email = ""
            this.username = ""
            this.password = ""
            this.confirm_password = ""
            this.showRegisterModal2 = false
            this.showRegistrationSuccessModal = true
          }
        })
      }
    },
    hideLoginModal () {
      this.loginemail = ""
      this.loginpassword = ""
      this.error_login = ""
      this.showLoginModal = false
    },
    registerDetails() {
      if (this.first_name === '' ||
      this.last_name === '' ||
      this.mobile_no === '' ||
      this.birthdate === '' ||
      this.address === '') {
        this.required_fields = "Please provide input on the required fields (*)."
        this.getGoogleMapAPI()
      }
      else {
        this.address = document.getElementById('input_address').value
        this.showRegisterModal = false
        this.showRegisterModal2 = true
      }
    },
    /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData(addressData) {
      document.getElementById('input_address').value = addressData
      //this.address = addressData
      //this.address_id = id;
      //this.place_result = placeResultData; 
    },
    getGoogleMapAPI() {
      let mapAPIkey;
      this.getAPIkey()
      .then(res =>{
        mapAPIkey = res.data
      })
      return mapAPIkey
    },
    initAutocomplete(){
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      this.autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('input_address')),
          {types: ['geocode'],
          componentRestrictions: { country: "ph" }
          });

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.autocomplete.addListener('place_changed', fillInAddress);
    },
    fillInAddress() {
        let componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
        }
        // Get the place details from the autocomplete object.
        this.place = this.autocomplete.getPlace();
        // this.getAddressData(this.place)
        
        for (let component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (let i = 0; i < this.place.address_components.length; i++) {
        let addressType = this.place.address_components[i].types[0];
        if (componentForm[addressType]) {
            let val = this.place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
        }
    },
    geolocate() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            let circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
            });
            this.autocomplete.setBounds(circle.getBounds());
        });
        }
    },
    checkStrongPassword() {
      let orig_pass_len = 0;
      let password_len = this.password.length
      this.pass_num = this.pass_num + 1
      if(this.pass_num === 1) {
        orig_pass_len = password_len
      }
      let upper_let = /^[A-Z]+$/
      let lower_let = /^[a-z]+$/

      if(password_len === 0) {
        this.showCheck2 = false
        this.showCheck3 = false
        this.showCheck4 = false
        this.upperc_textColor = "red"
        this.lowerc_textColor = "red"
        this.numchar_textColor = "red"
      }
      //Checking for the minimum length of password
      if(password_len < 8) {
        this.showCheck1 = false
        this.passlen_textColor = 'red'
      } else {
        this.showCheck1 = true
        this.passlen_textColor = 'green'
      }
      
      //Checking if the password typed has Uppercase letters
      for(let i = 0; i < password_len; i++) {
        if(isNaN(this.password.charAt(i))) {
          if(this.password.charAt(i).match(upper_let)) {
            this.showCheck2 = true
            this.upperc_textColor = 'green'
            break
          } else {
            this.showCheck2 = false
            this.upperc_textColor = 'red'
          }
        } 
      }

      //Checking if the password typed has Lowercase letters
      for(let i = 0; i < password_len; i++) {
        if(isNaN(this.password.charAt(i))) {
          if(this.password.charAt(i).match(lower_let)) {
            this.showCheck3 = true
            this.lowerc_textColor = 'green'
            break
          } else {
            this.showCheck3 = false
            this.lowerc_textColor = 'red'
          }
        }
      }

      //Checking if the password typed has a number
      for(let i = 0; i < password_len; i++) {
        if(!isNaN(this.password.charAt(i))) {
          this.showCheck4 = true
          this.numchar_textColor = 'green'
          break
        } else {
          this.showCheck4 = false
          this.numchar_textColor = 'red'
        }
      }
      //Check if there is a special character
      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if(format.test(this.password)) {
        this.showCheck5 = true
        this.specialchar_textColor = green
      } else {
        this.showCheck5 = false
        this.specialchar_textColor = red
      }
    },
    resetPass() {
      // var email = this.emailadd
      var random_pass = this.randomPassword()
      let pass_data = {
        email: this.emailadd, 
        password: random_pass
      }
      this.resetPassword(pass_data)
      .then(res => {
        if(res.data.success) {
          alert('Password successfully reset. Check your email for the new password.')
          this.showForgotPasswordModal = false
        }
      })
    },
    randomPassword(){
      var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890"
      var pass = ""
      for (var x = 0; x < 10; x++) {
          var i = Math.floor(Math.random() * chars.length)
          pass += chars.charAt(i);
      }
      return pass;
    }
  },
  created () {
    this.getProfile()
  },
}
</script>

<style scoped>
.b-navbar{
  background:#042331;
  padding:1.5em;
  position: relative;
}
#btn_login:hover, #btn_register:hover{
  background: #fff;
  color:#042331;
  font-weight:500;
  margin-right:0.5em;
  border: 1px solid #fff;
  margin-top: 5px
}
#btn_login, #btn_register{
  background: #042331;
  color:#fff;
  font-weight:500;
  margin-right:0.5em;
  border: 1px solid #fff;
  margin-top: 5px
}
#dswd_home{
  font-size: 20pt;
  font-weight: bold;
}
#dswd_homelink{
  text-decoration: none;
  color:white;
}
.nav-link{
    color:white;
}
.nav-link:hover{
    text-decoration: none;
    color:#042331;
    background:white;
    border-radius: 5px;
}
#navbar2{
  justify-content: flex-end;
  font-size:10pt;
}
#dropdown1{
  background:#042331;
  color:white;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  z-index: 1;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-title, .modal-body {
  color:#042331;
}
#forgotpass{
  display: block;
}
.err_message{
  color:red;
  font-style: italic;
}
.login_message {
  color: blue;
}
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
}
.pass_list{
  list-style-type: none;
  padding:0;
  font-size: 10pt;
}
.pass_list li {
  margin-left:5px;
}
.cross{
  color: red;
}
.check{
  color: green;
}
</style>
