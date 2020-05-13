<template>
  <div class="container pb-4">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto" id = "regform">
        <form @submit.prevent="registerUser">
          <h1 class="h3 mb-3 font-weight-normal">Create an Account</h1>
          <p id = "note_regform">Note: Mark with (<span class = 'required_data'>*</span>) are required.</p>
          <p id = "required_details">{{validationMessage}}</p>
          <div class="form-group">
            <ValidationProvider name = "first_name" rules="required" v-slot="{ errors }">
                <label for="first_name">First Name<span class = 'required_data'>*</span></label>
                <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Enter First Name">
                <span class = "err_input">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "middle_initial" rules="" v-slot="{ errors }">
                <label for="middle_initial">Middle Initial</label>
                <input type="text" v-model="middle_initial" class="form-control" name="middle_initial" placeholder="Enter Middle Initial">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "last_name" rules="required" v-slot="{ errors }">
                <label for="last_name">Last Name<span class = 'required_data'>*</span></label>
                <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Enter Last Name">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "mobile_no" rules="required" v-slot="{ errors }">
                <label for="mobilephone_no">Mobile Phone No.<span class = 'required_data'>*</span></label>
                <input type="text" v-model="mobile_no" class="form-control" name="mobile_no" placeholder="09xx3456789">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "birthdate" rules="required" v-slot="{ errors }">
                <label for="birthdate">Birthdate<span class = 'required_data'>*</span></label>
                <input type="date" v-model="birthdate" class="form-control" name="birthdate" placeholder="">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "user_address" rules="required" v-slot="{ errors }">
                <label for = "address">Address<span class = 'required_data'>*</span></label>
                <div id = "address_details">
                <!--<vue-google-autocomplete
                    ref="address"
                    id="map"
                    class = "form-control"
                    placeholder="Start typing"
                    v-on:placechanged="getAddressData"
                    :country="['ph']"
                >
                </vue-google-autocomplete>-->
                <input ref="autocomplete"
                    placeholder="Type Your Address"
                    class="form-control"
                    onfocus="value = ''"
                    type="text"
                    name="user_address"
                    v-model="user_address"/>
                    <span class = "err_input">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            <!--<input type="text" v-model="address_line1" class="form-control" name="address_line1" placeholder="Address Line 1">
            <input type="text" v-model="address_line2" class="form-control mt-2" name="address_line2" placeholder="Address Line 2">
            <input type="text" v-model="city_town" class="form-control mt-2" name="city_town" placeholder="City or Town">
            <input type="text" v-model="province" class="form-control mt-2" name="province" placeholder="Province">-->
          </div>
          <div class="form-group">
              <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                <label for="email">Email Address<span class = 'required_data'>*</span></label>
                <input type="text" v-model="email" class="form-control" name="email" placeholder="Enter Email">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "password" rules="required" v-slot="{ errors }">
                <label for="password">Password<span class = 'required_data'>*</span></label>
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider name = "confirm_password" rules="required" v-slot="{ errors }">
                <label for="password">Confirm Password<span class = 'required_data'>*</span></label>
                <input type="password" v-model="confirm_password" class="form-control" name="confirm_password" placeholder="Confirm Password">
                <span class = "err_input">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class = "col text-center">
            <button class="btn btn-lg btn-primary btn-inline mr-3" type="submit">Register</button>
            <button class="btn btn-lg btn-primary btn-inline mr-3" type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js"></script>
<script>
import axios from 'axios'
import router from '../router'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import  { mapActions } from 'vuex'
export default {
  components: { VueGoogleAutocomplete },
  data () {
    return {
      first_name: '',
      middle_initial: '',
      last_name: '',
      mobile_no: '',
      birthdate: '',
      user_address: '',
      email: '',
      password: '',
      confirm_password: '',
      date: '',
      address: '',
      validationMessage: ''
      }
  },
  mounted () {
    //this.$refs.address.focus();
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    )
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      let ac = place.address_components
      let lat = place.geometry.location.lat()
      let lon = place.geometry.location.lng()
      let city = ac[0]['short_name']
    })
  },
  methods: {
    /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData (addressData, placeResultData, id) {
                this.address = addressData;
    },
    ...mapActions('register'),
    registerUser() {
      if (this.first_name === '' ||
      this.last_name === '' ||
      this.mobile_no === '' ||
      this.birthdate === '' ||
      this.user_address === '' ||
      this.email === '' ||
      this.password === '' ||
      this.confirm_password === '') {
        this.scrollToTop()
      } else {
        let user = {
        first_name: this.first_name,
        middle_initial: this.middle_initial,
        last_name: this.last_name,
        mobile_no: this.mobile_no,
        birthdate: this.birthdate,
        address: this.user_address,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
        }
        this.register(user).then(res => {
          if (res.data.success) {
            router.push({ name: 'Login' })
          }
        })
      }
    },
    scrollToTop () {
      this.validationMessage = "Please fill in the required details."
      window.scrollTo(0,0)
    }
}
}
</script>
<style scoped>
#regform{
    color:#000066;
}
.err_input,.required_data, #required_details {
  color:red;
  font-style: italic;
}
#note_regform {
  font-style: italic;
}
</style>
