<template>
<div class = "container">
    <sidebar-menu/>
    <div class = "section">
      <div class="col-md-12 pt-3 page-title"  id= "menu_content">
            <h4 class = "mb-4" id = "label_centers">Centers and Institutions</h4>
            <div class="form-group row" id = "search_section">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" v-model = "search" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary btn-design">Go</button>
              <!--<div>
                <label for="View">View</label>
                <select class ="form-control">
                  <option disabled value="">Select</option>
                  <option>All</option>
                  <option>For Male</option>
                  <option>For Female</option>
                  <option>For Children</option>
                  <option>For Teenager</option>
                  <option>For Adult</option>
                  <option>For Elderly</option>
                  <option>For Disabled</option>
                </select>
              </div>-->
          </div>
      </div>
      <div style="display:block;"><button id="btn_addCenter" v-if="showAddButton" type="button" class="btn btn-primary ml-5 mt-3" @click="showCenterRegisterModal1=true">Add Center or Institution</button></div>
      <div class = "row ml-3 mt-2">
          <div class = "centers col-sm-4" v-for="(center) in filteredCenters" v-bind:key = center._id>
              <b-card
                  :title="center.center_name"
                  :img-src="getCenterImageURL(center.image_name)"
                  img-height=110
                  img-top
                  tag="article"
                  style="max-width: 18rem;"
                  class="mb-2"
              >
                  <b-card-text>
                  </b-card-text>
                  <router-link :to="{name: 'centerprofileinfo', params: {id: center._id , uid: uid}}" id="see_center_profile">See Profile</router-link>          
                  <!--<b-button variant="primary" class = "btn_center_details"><router-link :to="{name: 'centerprofileinfo', params: {id: center._id}}" id="see_center_profile">See Profile</router-link></b-button>-->
                  <!--<b-button href="#" variant  ="primary" class = "btn_report_incident">Add User Account</b-button>-->
              </b-card>
          </div>
      </div>
    </div>
    
    <!--Center Registration Modal 1-->
    <div v-if = "showCenterRegisterModal1">
          <transition name = "modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class = "modal-dialog modal-md modal-dialog-scrollable" role="document">
                  <form>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 1 of 2: Add Center or Institution</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showCenterRegisterModal1=false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields}}</p>
                      <div class="modal-body">
                        <div class="form-group">
                          <ValidationProvider name = "center_name" rules="required" v-slot="{ errors }">
                            <label for="Name">Name<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="center_name" class="form-control" name="center_name" placeholder="Enter center or institution name">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_desc" rules="required" v-slot="{ errors }">
                            <label for="Description">Description<span class = 'required_data'>*</span></label>
                            <textarea type="text" v-model="center_desc" class="form-control" name="center_desc" placeholder="Enter center or institution description"></textarea>
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="Name of Head">Name of Head<span class = 'required_data'>*</span></label>
                            <ValidationProvider name = "center_head_firstname" rules="required" v-slot="{ errors }">
                                <input type="text" v-model="center_head_firstname" class="form-control mb-2" name="center_head_firstname" placeholder="First Name">
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <ValidationProvider name = "center_head_middleinitial" rules="" v-slot="{ errors }">
                                <input type="text" v-model="center_head_middleinitial" class="form-control mb-2" name="center_head_middleinitial" placeholder="Middle Initial">
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <ValidationProvider name = "center_head_lastname" rules="required" v-slot="{ errors }">
                                <input type="text" v-model="center_head_lastname" class="form-control" name="center_head_lastname" placeholder="Last Name">
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name = "center_indivtype" rules="required" v-slot="{ errors }">
                                <label for="center_indivtype">Type of Individuals: <span class = 'required_data'>*</span></label>
                                <select class="form-control" id="center_indivtype" v-model="center_indivtype" name="center_indivtype" placeholder="Select One">
                                    <option disabled value="">Select One</option>
                                    <option>Child</option>
                                    <option>Teenager</option>
                                    <option>Adult</option>
                                    <option>Elderly</option>
                                    <option>Disabled</option>
                                </select>
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        </div>
                      <div class="modal-footer">
                        <div class = "form-group col text-center">
                          <button class="btn btn-primary btn-inline mr-3" type="button" @click="hideRegisterCenterModal1">Next</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!--End of Center Registration Modal-->

        <!--Center Registration Modal 2-->
        <div v-if = "showCenterRegisterModal2">
          <transition name = "modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class = "modal-dialog modal-md modal-dialog-scrollable" role="document">
                  <form @submit.prevent="registerNewCenter">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 2 of 2: Add Center or Institution</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showCenterRegisterModal2=false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                            <ValidationProvider name = "center_gender" rules="required" v-slot="{ errors }">
                                <label for="Gender">Gender: <span class = 'required_data'>*</span></label>
                                <select class="form-control" id="center_gender" v-model="center_gender" name="center_gender" placeholder="">
                                    <option disabled value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Male and Female</option>
                                </select>
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_location" rules="required" v-slot="{ errors }">
                            <label for="Location">Location<span class = 'required_data'>*</span></label>
                            <input ref="location" type="text" v-model="center_location" id="center_location" class="form-control" @focus="initAutocomplete" name="center_location" placeholder="Enter location">
                            <p id = "latitude"></p>
                            <p id = "longitude"></p>
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_yearfounded" rules="required" v-slot="{ errors }">
                            <label for="Year Founded">Year Founded<span class = 'required_data'>*</span></label>
                            <!--<select id="center_yearfounded" v-model="center_yearfounded" class="form-control" name="center_yearfounded" @mousedown="generateLatLong" placeholder="Enter year founded"></select>-->
                            <input type="text" v-model="center_yearfounded" class="form-control" name="center_yearfounded" @mousedown="generateLatLong" placeholder="Enter year founded">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_email" rules="required|email" v-slot="{ errors }">
                            <label for="Email Address">Email Address<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="center_email" class="form-control" name="center_email" placeholder="Enter email address">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_telno" rules="required" v-slot="{ errors }">
                            <label for="Telephone No.">Telephone No.<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="center_telno" class="form-control" name="center_telno" placeholder="Enter telephone no.">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider name = "center_mobileno" rules="required" v-slot="{ errors }">
                            <label for="Mobile No.">Mobile No.<span class = 'required_data'>*</span></label>
                            <input type="text" v-model="center_mobileno" class="form-control" name="center_mobileno" placeholder="Enter mobile no">
                            <span class = "err_message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        </div>
                      <div class="modal-footer">
                        <div class = "form-group col text-center">
                          <button class="btn btn-primary btn-inline mr-3" type="button" @click="showCenterRegisterModal1=true;showCenterRegisterModal2=false">Go Back</button>
                          <button class="btn btn-primary btn-inline mr-3" type="submit" >Save</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!--End of Center Registration Modal 2-->

        <!--Successful Center Registration Modal-->
        <div v-if="showCenterRegistrationSuccessModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Center or Institution Registration</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showCenterRegistrationSuccessModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p>Center or Institution successfully created.</p>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-secondary" @click="showCenterRegistrationSuccessModal = false">OK</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!--Successful Center Registration Modal-->
</div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script src="https://maps.google.com/maps?file=api&amp;v=3&amp;sensor=false" type="text/javascript"></script>
<script>
import SideBarMenu from '../components/Sidebar'
import { mapActions } from 'vuex'
export default {
  props: {
    uid: {
      required: true
    }
  },
  data () {
    return {
      first_name: '',
      last_name: '',
      user_id: '',
      user_type: '',
      email: '',
      search: '',
      index: 0,
      reportslist: [],
      showCenterRegisterModal1: false,
      showCenterRegisterModal2: false,
      showAddButton: false,
      center_name: '',
      center_desc: '',
      center_head_firstname:'',
      center_head_middleinitial:'',
      center_head_lastname:'',
      center_indivtype:'',
      center_location:'',
      center_email:'',
      center_telno:'',
      center_mobileno:'',
      place:null,
      autocomplete:null,
      lati:0.0,
      long:0.0,
      gen_address:'',
      required_fields:'',
      showCenterRegistrationSuccessModal: false,
      centerslist:[],
      dropdown_years: 0
    }
  },
  created () {
      this.getProfile().then( res => {
        this.user_id = res.data.user._id
        this.user_type = res.data.user.user_type
        if(this.user_type === 'admin'){
            this.showAddButton = true
        }
      })
  },
  beforeMount () {
    this.displayCenters()
    .then(res => {
      this.centerslist = res.data
    })
  },
  methods: {
    ...mapActions(['getProfile', 'registerCenter', 'displayCenters']),
    registerNewCenter() {
      if(this.center_name === '' ||
      this.center_desc === '' ||
      this.center_head_firstname === '' ||
      this.center_head_lastname === '' ||
      this.center_indivtype === '' ||
      this.center_location === '' ||
      this.center_gender === '' ||
      this.center_telno === '' ||
      this.center_mobileno === '' ||
      this.center_email === '' || 
      this.center_yearfounded === '') {
        this.required_fields = "Please provide input on the required fields (*)."
        this.showCenterRegisterModal2 = false
        this.showCenterRegisterModal1 = true
      } else {
        this.getLatLong()
        let center = {
          center_name: this.center_name,
          center_desc: this.center_desc,
          center_head_firstname: this.center_head_firstname,
          center_head_middleinitial: this.center_head_middleinitial,
          center_head_lastname: this.center_head_lastname,
          center_indivtype: this.center_indivtype,
          center_location: this.center_location,
          center_gender: this.center_gender,
          center_telno: this.center_telno,
          center_mobileno: this.center_mobileno,
          center_email: this.center_email,
          center_yearfounded: this.center_yearfounded,
          center_long: this.long,
          center_lat: this.lati
        }
        this.registerCenter(center)
        .then(res => {
          if(res.data.success){
            this.showCenterRegisterModal2 = false
            this.showCenterRegistrationSuccessModal = true
            this.center_name = ""
            this.center_desc = ""
            this.center_head_firstname=""
            this.center_head_middleinitial=""
            this.center_head_lastname=""
            this.center_location=""
            this.center_gender=""
            this.center_telno=""
            this.center_mobileno=""
            this.center_email=""
            this.center_yearfounded= ""
            this.lati = 0.0
            this.long = 0.0
          }
          this.displayCenters()
          .then(res => {
            this.centerslist = res.data
            })
        })
      }
    },
    getGoogleMapAPI() {
      let mapAPIkey;
      this.getAPIkey()
      .then(res => {
        mapAPIkey = res.data
      })
      return mapAPIkey
    },
    initAutocomplete(){
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      this.autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('center_location')),
          {types: ['geocode'],
          componentRestrictions: { country: "ph" },
          });
      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.autocomplete.addListener('place_changed', fillInAddress)
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
    generateLatLong() { 
      let geocoder = new google.maps.Geocoder();
      let address = document.getElementById("center_location").value;
      var loc1, loc2;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
          loc1= results[0].geometry.location.lat();
          loc2= results[0].geometry.location.lng();
        } else{
          alert("Error: " + status);
        }
        document.getElementById('latitude').innerHTML = loc1
        document.getElementById('longitude').innerHTML = loc2
        //alert(this.lati + ' ' + this.long)
      })
      this.center_location = address
      //alert(this.gen_address +' '+this.lati)
    },
    getLatLong(){
      this.lati = document.getElementById('latitude').innerHTML
      this.long = document.getElementById('longitude').innerHTML
    },
    hideRegisterCenterModal1() {
      if(this.centerd_name === '' || 
      this.center_desc === '' ||
      this.center_head_firstname === '' ||
      this.center_head_lastname === '' ||
      this.center_indivtype === '') {
        this.required_fields = "Please provide input on the required fields (*)."
      } else {
        this.showCenterRegisterModal1 = false
        this.showCenterRegisterModal2 = true
        // this.populateYear()
      }
    },
    getCenterImageURL(pic){
      return require('@/assets/images/' + pic)
    },
    populateYear(){
      var dropdown_years = document.getElementById('center_yearfounded')
      var currentYear = (new Date()).getFullYear()
      for(var i = 1950; i <= currentYear; i++){
        var option = document.createElement("OPTION")
        option.innerHTML = i
        option.value = i
        dropdown_years.appendChild(option)
      }
      dropdown_years.value = currentYear
    }
  },
  components: {
      'sidebar-menu': SideBarMenu
  },
  computed : {
        filteredCenters() {
            return this.centerslist.filter((center) => {
                return center.center_name.toLowerCase().match(this.search.toLowerCase()) ||
                center.center_desc.toLowerCase().match(this.search.toLowerCase()) ||
                center.center_gender.toLowerCase().match(this.search.toLowerCase()) ||
                center.center_indivtype.toLowerCase().match(this.search.toLowerCase())
            })
        }
    
    }
}
</script>

<style scoped>
.container{
    margin-left:120px;
    max-width:100%;
    height:600px;
    width:1220px;
    color:#042331;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    z-index: -2;
}
#menu-content{
  border-bottom: 50px solid #042331;
}
#label_centers{
    color: #042331;
    float: left;
}
#search_section{
    justify-content:flex-end;
    color:#042331;
}
.b-button, #btn_addCenter{
    background: #063146;
}
.btn_center_details, .btn_report_incident{
  font-size: 10pt;
  background: #063146;
}
.err_message{
    color: red;
    font-size: 10pt;
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
  z-index: 1
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-title, .modal-body {
  color:#042331;
}
.modal-body {
    align-items: center;
    float: left;
    padding-right: 20px;
    width:100%;
}
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
}
#center_yearfounded{
  z-index: 1;
}
#see_center_profile{
  text-decoration:none;
  background: #042331;
  padding: 9px;
  border-radius: 4px;
  color:white;
}
#see_center_profile:hover{
  background: white;
  color: #042331;
  border:1px solid #042331;
}
</style>
