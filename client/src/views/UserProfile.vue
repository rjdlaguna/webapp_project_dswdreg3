<template>
  <div class="main">
    <div class = "container">
      <sidebar-menu/>
      <div class="page_title">
          <div class="col-md-12 pt-3" id = "menu_content">
              <h4 class = "mb-4" id = "my_profile_label">My Profile</h4>
          </div>
      </div>
      <div class = "row" id = "profile-pic-form">
          <div class="col-md-4 ml-3">
            <form enctype="multipart/form-data">
              <b-card title="" style = "width:15rem">
                  <img :src="getPicURL(displayImage.image_name)" name ="profile_image" id="profile_image" class = "m-auto" width = "200" height = "200"/>
                  <button type="button" class = "btn" title="Upload Picture" id = "upload_pic" @click="showUploadPicModal=true"><i class = "fas fa-upload fa-2x" name = 'profile_pic'></i></button>
              </b-card>
            </form>
          </div>
      </div>

      <div v-if="showUploadPicModal">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Select your Profile Picture</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" @click="closeUploadModal()">&times;</span>
                            </button>
                        </div>
                        <form v-on:submit.prevent="uploadProfilePicture" enctype="multipart/form-data" id="imageForm">
                          <div class="modal-body" id="modal-image">
                            <b-card title = "" style="width: 15rem;" id = "profile_image-container">
                              <input type="hidden" v-model = "user_id" id = "user_id" name ="user_id"/>
                              <img :src="showImage(displayImage.image_name)" name = 'profile_image' id = "profile_image" class = "m-auto" width = "200" height = "200"/>
                              <input type='file' id="image_file" name="image_file" style="display:none" ref="file" accept="image/*" v-on:change="handleFileUpload()" />
                              <!--<button class="btn btn-primary ml-5 mt-3" onclick="document.getElementById('image_file').click()">Select Image</button>-->
                              <button type="button" class="btn btn-primary ml-5 mt-3" onclick="document.getElementById('image_file').click()">Select Image</button>
                              <span class="err_message">{{noImageSelected}}</span>
                            </b-card>                                                
                          </div>
                          <div class="modal-footer">
                            <div class form-group>
                              <button class="btn btn-primary mr-3" type="submit">Upload Image</button>
                              <button type="button" class="btn btn-secondary" @click="closeUploadModal()">Close</button>
                            </div>
                          </div>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
          </transition>
      </div>

      <div id="account-details-container">
          <div class = "form-group">
              <h3>Account Details</h3>
              <div id = "useraccount_info" class ="mt-4">
                <div class="account_items">
                  <h5>Personal Information</h5>
                  <input type="hidden" v-model="user._id" id="id" />
                  <p><label for="Name">Name: {{user.first_name + ' ' + user.middle_initial + '. ' + user.last_name}}</label></p>
                  <p><label for="Birthdate">Date of Birth: {{formatBirthDate(user.birthdate)}}</label></p>
                  <p><label for="Address">Address: {{user.address}}</label></p>
                  <p><label for="Mobile Number">Mobile number: {{user.mobile_no}}</label></p>
                </div>
                <div class="account_btn">
                  <button type="button" id="btn_editinfo" class ="btn btn-primary" @click="showEditInfoModal=true">Edit Information</button>
                </div>
              </div>
              <div id="useraccount_cred" class ="mt-4">
                <div class="account_items">
                  <h5> User Account Credentials</h5>
                  <p><label for="Email">Email address: {{user.email}}</label></p>
                  <!--<p><label for="Username">Username: {{user.username}}</label></p>-->
                  <p><label for="Password">Password: {{this.password}}</label></p>
                </div>
                <div class ="account_btn">
                  <button type="button" id="btn_changepw" class = "btn btn-primary" @click="showChangePasswordModal=true">Change Password</button>
                </div>
              </div>
          </div>
      </div>

      <div v-if="showEditInfoModal">
            <transition name = "modal">
              <div class = "modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog modal-dialog-scrollable" role = "document">
                    <form>
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Edit User Information</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showEditInfoModal = false">&times;</span>
                          </button>
                        </div>
                        <p class = "err_message ml-3">{{required_fields}}</p>
                        <div class="modal-body">
                          <div class="modal-body-section1">
                            <div class="form-group">
                              <ValidationProvider name = "first_name" rules="required" v-slot="{ errors }">
                                  <label for="first_name">First Name<span class = 'required_data'>*</span></label>
                                  <input type="text" v-model="user.first_name" class="form-control" id="first_name" name="first_name" placeholder="Enter First Name">
                                  <p v-if="false">{{first_name = user.first_name}}</p>
                                  <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider name = "middle_initial" rules="" v-slot="{ errors }">
                                <label for="middle_initial">Middle Initial</label>
                                <input type="text" v-model="user.middle_initial" class="form-control" id="middle_initial" name="middle_initial" placeholder="Enter Middle Initial">
                                <p v-if="false">{{middle_initial=user.middle_initial}}</p>
                                <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider name = "last_name" rules="required" v-slot="{ errors }">
                                <label for="last_name">Last Name<span class = 'required_data'>*</span></label>
                                <input type="text" v-model="user.last_name" class="form-control" id="last_name" name="last_name" placeholder="Enter Last Name">
                                <p v-if="false">{{last_name=user.last_name}}</p>
                                <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </div>
                          <div class="modal-body-section2">
                            <div class="form-group">
                              <ValidationProvider name = "mobile_no" rules="required|digits:11" v-slot="{ errors }">
                                <label for="mobilephone_no">Mobile Phone No.<span class = 'required_data'>*</span></label>
                                <input type="text" v-model="user.mobile_no" v-bind="mobile_no" maxlength="11" class="form-control" id="mobile_no" name="mobile_no" placeholder="09xx3456789">
                                <p v-if="false">{{mobile_no = user.mobile_no}}</p>
                                <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider name = "birthdate" rules="required" v-slot="{ errors }">
                                <label for="birthdate">Date of birth:<span class = 'required_data'>*</span></label>
                                <b-form-datepicker 
                                id="birthdate"
                                v-model="user.birthdate" 
                                class="mb-2"
                                right
                                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                                locale="en"
                                placeholder="Choose a date"
                                >
                                </b-form-datepicker>
                                <p style="display:none;">{{birthdate2 = user.birthdate}}</p>
                                <input type="hidden" v-model="birthdate2">
                                <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider name = "user_address" rules="required" v-slot="{ errors }">
                                <label for = "address">Address<span class = 'required_data'>*</span></label>
                                <div id = "address_details">
                                  <input type="hidden" id="loc_lat" />
                                  <input type="hidden" id="loc_long" />
                                  <input id="user_address" v-model="user.address" name="address" placeholder="Enter your address" @focus="initAutocomplete()" type="text" class="form-control">
                                  <p v-if="false">{{address=user.address}}</p>
                                  <span class = "err_message">{{ errors[0] }}</span>
                                </div>
                                </ValidationProvider>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class form-group>
                            <button type="button" id="btn_update" class="btn btn-primary mr-3" @click="updateAccount">Update</button>
                            <button type="button" class="btn btn-secondary" @click="showEditInfoModal=false">Close</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </transition>
          </div>

      <div v-if="showChangePasswordModal">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                    <form @submit.prevent="changePassword">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Change Password</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" @click="showChangePasswordModal=false">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class = "form-group">
                            <ValidationObserver>
                              <ValidationProvider name = "curr_password" rules="required" v-slot="{ errors }">
                                <label for="Current Password">Current Password</label>
                                <input type = "password" class="form-control" id = "curr_password" v-model="curr_password" name="curr_password" />
                                <p class = "err_message">{{ errors[0] }}</p>
                              </ValidationProvider>
                              <ValidationProvider name = "new_password" rules="required" v-slot="{ errors }">
                                <label for="New Password">New Password</label>
                                <input type = "password" class="form-control" id = "new_password" v-model="new_password" name="new_password" @input="checkStrongPassword()"/>
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
                                <p class = "err_message">{{ errors[0] }}</p>
                              </ValidationProvider>
                              <ValidationProvider name = "retyped_new_password" rules="required|retyped_new_password:@new_password" v-slot="{ errors }">
                                <label for="Retype New Password">Confirm New Password</label>
                                <input type = "password" class="form-control" id = "retyped_new_password" v-model="retyped_new_password" name="retyped_new_password" />
                                <p class = "err_message">{{ errors[0] }}</p>
                              </ValidationProvider>
                            </ValidationObserver>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class form-group>
                            <input type="submit" id="btn_save" class="btn btn-primary mr-3" value="Save" @click="changePassword">
                            <button type="button" class="btn btn-secondary" @click="showChangePasswordModal=false">Close</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div v-if="showUserProfileEditSuccessModal">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Profile Information</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" @click="showUserProfileEditSuccessModal = false">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <p>User Profile successfully updated.</p>
                        </div>
                        <div class="modal-footer">
                          <div class form-group>
                            <button type="button" id="btn_ok" class="btn btn-secondary" @click="showUserProfileEditSuccessModal = false">OK</button>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div v-if="showChangePasswordMessageModal">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Change Password</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" @click="showChangePasswordMessageModal = false">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <p id = "changepw_prompt">Password was successfully changed.</p>
                        </div>
                        <div class="modal-footer">
                          <div class form-group>
                            <button type="button" id="btn_ok" class="btn btn-secondary" @click="showChangePasswordMessageModal = false">OK</button>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div v-if="showUploadProfilePicSuccessModal">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Uplad Profile Picture</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" @click="showUploadProfilePicSuccessModal = false">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <p id = "changepw_prompt">Profile picture successfully uploaded.</p>
                        </div>
                        <div class="modal-footer">
                          <div class form-group>
                            <button type="button" id="btn_ok" class="btn btn-secondary" @click="showUploadProfilePicSuccessModal = false">OK</button>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
    </div>
    <app-footer/>      
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script>
import SideBarMenu from '../components/Sidebar'
import Footer from '../components/Footer'
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
import moment from 'moment'
export default {
  name: 'userprofile',
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      props: ['id', 'displayImage'],
      showUploadPicModal: false,
      file: '',
      isUploading: false,
      showPreview: false,
      imagePreview: null,
      user_id: '',
      selectedFile: null,
      image_file: '',
      user_info: {},
      displayImage: '',
      upload_btn: 'Select Image',
      image_data: {},
      password: '********',
      showChangePasswordModal:false,
      showEditInfoModal: false,
      first_name:'',
      middle_initial:'',
      last_name:'',
      mobile_no:'',
      birthdate:'',
      birthdate2: '',
      user_address:'',
      curr_password:'',
      new_password:'',
      retyped_new_password:'',
      required_fields: '',
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
      showUserProfileEditSuccessModal: false,
      showChangePasswordMessageModal: false,
      showUploadProfilePicSuccessModal: false,
      selectedImage: false,
      noImageSelected: ''
    }
  },
  computed: mapGetters([
    'user',
    'imgdata'
    ]),
  components: {
      'sidebar-menu': SideBarMenu,
      'app-footer': Footer
      },
    created() {
      this.getProfile().then( res => {
        this.user_id = res.data.user._id
      })
    },
    beforeMount() {
      this.displayProfilePic(this.id).then(res => {
        this.displayImage = res.data
      })
    },
  methods: {
  ...mapActions(['getProfile', 'displayProfilePic', 'uploadProfilePic', 'updateAccountInfo', 'changeUserPassword']),
  formatBirthDate (date) {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
  /*onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.selectedImage = true
    },*/
  handleFileUpload (e) {
    this.selectedFile = event.target.files[0]
    this.selectedImage = true
    this.noImageSelected = ''
    this.isUploading = true
    this.file = this.$refs.file.files[0]
    let reader = new FileReader()
    reader.addEventListener('load', function () {
      this.showPreview = true
      this.imagePreview = reader.result
    }.bind(this), false)
    if (this.file) {
      if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
        reader.readAsDataURL(this.file)
      }
    }
  },
  showImage (a) {
    if (this.isUploading === false) {
      return require('@/assets/images/' + a)
    } else {
      return this.imagePreview
    }
  },
  getPicURL(pic){
    return require('@/assets/images/' + pic)
  },
  uploadProfilePicture () {
    this.user_id = this.id
    let fd = new FormData()
    this.file = this.$refs.file.files[0]
    fd.append('image_file',this.file)
    fd.append('user_id', this.user_id)
    if(!this.selectedImage) {
      this.noImageSelected = "Please select an image to upload."
    } else {
      this.uploadProfilePic(fd)
      .then(res => {
        if(res.data.success) {
          this.showUploadProfilePicSuccessModal = true
          this.displayProfilePic(this.id).then(res => {
          this.displayImage = res.data
        })
        }
      })
    }
  },
  closeUploadModal () {
    this.showUploadPicModal = false
    this.isUploading = false
  },
  initAutocomplete(){
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      this.autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('user_address')),
          {types: ['geocode'],
          componentRestrictions: { country: "ph" }
          });

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.autocomplete.addListener('place_changed', fillInAddress);
    },
    getGoogleMapAPI() {
      let mapAPIkey;
      this.getAPIkey()
      .then(res => {
        mapAPIkey = res.data
      })
      alert(mapAPIkey)
      return mapAPIkey
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
  updateAccount() {
    this.first_name = document.getElementById("first_name").value
    this.middle_initial = document.getElementById("middle_initial").value
    this.last_name = document.getElementById("last_name").value
    this.mobile_no = document.getElementById("mobile_no").value
    this.address = document.getElementById("user_address").value
    if(this.first_name === '' ||
      this.last_name === '' ||
      this.mobile_no === '' ||
      this.address === '' ||
      this.birthdate2 === '')
    {
      this.required_fields = "Please provide input on the required fields (*)."
    } else {
      let user_info = {
        _id: this.user_id,
        first_name: this.first_name,
        middle_initial: this.middle_initial,
        last_name: this.last_name,
        mobile_no: this.mobile_no,
        birthdate: this.birthdate2,
        address: this.address
    }
    this.updateAccountInfo(user_info)
    .then(res => {
      if(res.data.success) {
        this.showEditInfoModal = false
        this.showUserProfileEditSuccessModal = true
        this.getProfile().then( res => {
          this.user_id = res.data.user._id
        })
      } 
    })
  } 
},
  checkStrongPassword() {
      let orig_pass_len = 0;
      let password_len = this.new_password.length
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
        if(isNaN(this.new_password.charAt(i))) {
          if(this.new_password.charAt(i).match(upper_let)) {
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
        if(isNaN(this.new_password.charAt(i))) {
          if(this.new_password.charAt(i).match(lower_let)) {
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
        if(!isNaN(this.new_password.charAt(i))) {
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
      if(format.test(this.new_password)) {
        this.showCheck5 = true
        this.specialchar_textColor = green
      } else {
        this.showCheck5 = false
        this.specialchar_textColor = red
      }
    },
    changePassword() {
      let change_pass_data = {
        curr_password: this.curr_password,
        new_password: this.new_password,
        retyped_new_password: this.retyped_new_password,
        _id: this.user_id
      }
      this.changeUserPassword(change_pass_data)
      .then(res => {
        if(res.data.success) {
          this.showChangePasswordModal = false
          this.showChangePasswordMessageModal = true
          this.curr_password = ''
          this.new_password = ''
          this.retyped_new_password = ''
        } else if (res.data.failed){
          this.showChangePasswordMessageModal = true
          document.getElementById('changepw_prompt').innerHTML = "New password cannot be the same with the current password."
          this.curr_password = ''
          this.new_password = ''
          this.retyped_new_password = ''
        } else {
          this.showChangePasswordMessageModal = true
          document.getElementById('changepw_prompt').innerHTML = "Current password did not match your account."
          this.curr_password = ''
          this.new_password = ''
          this.retyped_new_password = ''
        }
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
}
.page_title{
    margin-left: 10px;
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
.b-button{
    background: #063146;
}
#btn_editinfo, #btn_changepw, #btn_ok, #btn_update, #btn_save{
    text-decoration: none;
    background:#042331;
    color: white;
    border-radius: 4px;
    padding: 9px;
}
#btn_editinfo:hover, #btn_changepw:hover, #btn_ok:hover, #btn_update:hover, #btn_save:hover{
    background: white;
    color: #042331;
    border:1px solid #042331;
}
sidebar-menu{
    z-index: 100;
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
#upload_pic {
    z-index: 2;
    position: absolute;
    margin-left: 150px;
    margin-top: -40px;
    color:#063146;
}
.modal-body {
    align-items: center;
}
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
}
#profile-pic-form{
    float: left;
}
#account-details-container{
    margin-left: 280px;
}
#useraccount_info, #useraccount_cred{
  display: flex; 
}
.account_items{
  width: 50%;
}
.err_message{
  color: red;
  font-style: italic;
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
#modal-image{
  display: flex;
  justify-content: space-around;
}
</style>
