<template>
    <div class="container">
        <sidebar-menu/>
        <div class="page_title">
            <div class="col-md-12 pt-3" id = "menu_content">
                <h4 class = "mb-4" id = "centers_label">Center or Institution Name: {{center_profile.center_name}}</h4>
            </div>
        </div>
        <div id="centerinfo_section">
            <div class="col-md-9 ml-5 mt-2"  id="center_details">
                <div id="centerimage_upload_form">
                    <form enctype="multipart/form-data">
                        <b-card title="" style = "width:45rem">
                            <img :src="getCenterImageURL(center_profile.image_name)" name ="center_image" id="center_image" class = "m-auto" width = "680" height = "250"/>
                            <button type="button" class = "btn" title="Upload Picture" id = "btnupload_center_image" @click="showUploadCenterPicModal=true"><i class = "fas fa-upload fa-2x" id="upload_icon" name = 'upload_center_image'></i></button>
                        </b-card>
                    </form>
                </div>

                <div v-if="showUploadCenterPicModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Select your Center Image</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" @click="closeUploadModal()">&times;</span>
                                        </button>
                                    </div>
                                    <form v-on:submit.prevent="uploadCenterImage" enctype="multipart/form-data"   id="imageForm">
                                        <div class="modal-body flex">
                                        <b-card title = "" style="width: 29rem;" id = "center_image-container">
                                            <input type="hidden" v-model = "user_id" id = "user_id" name ="user_id"/>
                                            <img :src="showCenterImage(displayImage)" name = 'center_image' id = "center_image" class = "m-auto" width = "430" height = "200"/>
                                            <input type='file' id="image_file" name="image_file" style="display:none" ref="file" accept="image/*" v-on:change="handleFileUpload()" />
                                            <button class="btn btn-primary ml-5 mt-3" onclick="document.getElementById('image_file').click()">Select Image</button>
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

                <div>
                    <label for="Description" class="field_label">Description</label>
                    <p id="desc_content">{{center_profile.center_desc}}</p>
                    <div class = "center_info">
                        <div id = "center_info_item1">
                            <table>
                                <tr>
                                    <td class = "row_labels"><label for="Center Head" class="field_label">Center Head: </label></td>
                                    <td><span class="center_data">{{center_profile.center_head_firstname + ' ' +center_profile.center_head_middleinitial+' '+ center_profile.center_head_lastname}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Type of Individual" class="field_label">Type of Individual:</label></td>
                                    <td><span class="center_data">{{center_profile.center_indivtype}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Gender" class="field_label">Gender:</label></td>
                                    <td><span class="center_data">{{center_profile.center_gender}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Location" class="field_label">Location:</label></td>
                                    <td><span class="center_data">{{center_profile.center_location}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Year Founded" class="field_label">Year Founded: </label></td>
                                    <td><span class="center_data">{{center_profile.center_yearfounded}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Email Address" class="field_label">Email Address: </label></td>
                                    <td><span class="center_data">{{center_profile.center_email}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Telephone No" class="field_label">Telephone No.</label></td>
                                    <td><span class="center_data">{{center_profile.center_telno}}</span></td>
                                </tr>
                                <tr>
                                    <td class = "row_labels"><label for="Mobile No" class="field_label">Mobile No.</label></td>
                                    <td><span class="center_data">{{center_profile.center_mobileno}}</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id ="center_btnaction" class ="mt-5">
                <button type="button" class="btn mb-3" id="btn_user" @click="displayCenterUserAccounts">User Accounts</button>
                <button type="button" class="btn mb-3" id="btn_incident">Incident Reports</button>
            </div>
        </div>

        <div v-if="showListofUserAccountsModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                  <form @submit.prevent="">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">List of User Accounts</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showListofUserAccountsModal=false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <ul class="" v-for="user in centerusers" v-bind:key = user._id>
                              <li>{{user.first_name + ' ' + user.last_name}}</li>
                          </ul>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <input type="submit" class="btn btn-primary mr-3" value="Add New User" @click="showCenterUserRegisterModal1=true">
                          <button type="button" class="btn btn-secondary" @click="showListofUserAccountsModal=false">Close</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div v-if = "showCenterUserRegisterModal1">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 1 of 2: Create New User Account for {{center_profile.center_name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showCenterUserRegisterModal1 = false">&times;</span>
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
                            <ValidationProvider name = "position" rules="required" v-slot="{ errors }">
                              <label for="position">Position:<span class = 'required_data'>*</span></label>
                              <input type="position" v-model="position" class="form-control" name="position" placeholder="Enter position">
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
                          <button type="button" class="btn btn-primary mr-3" @click="hideCenterUserRegisterModal">Next</button>
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

        <div v-if = "showCenterUserRegisterModal2">
          <transition name = "modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class = "modal-dialog modal-dialog-scrollable" role="document">
                  <form @submit.prevent="createCenterUserAccount">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 2 of 2: Create New User Account for {{center_profile.center_name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showCenterUserRegisterModal2 = false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields2}}</p>
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
                          <button class="btn btn-primary btn-inline mr-3" type="button" @click="showCenterUserRegisterModal1=true;showCenterUserRegisterModal2=false">Go Back</button>
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

    </div>    
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script>
import SideBarMenu from '../components/Sidebar'
import { mapActions } from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
    name: 'centerprofileinfo',
    components: { VueGoogleAutocomplete },
    props: {
        id: {
            required: true
        }
    },
    components: {
    'sidebar-menu': SideBarMenu
    },
    data () {
        return {
            props: ['id', 'displayImage'],
            center_profile: [],
            showUploadCenterPicModal: false,
            isUploading: false,
            file: '',
            selectedFile: null,
            displayImage: '',
            imagePreview: null,
            showPreview: false,
            center_id:'',
            showListofUserAccountsModal: false,
            showCenterUserRegisterModal1: false,
            showCenterUserRegisterModal2: false,
            first_name: '',
            middle_initial: '',
            last_name: '',
            mobile_no: '',
            position: '',
            address: '',
            email:'',
            username:'',
            password:'',
            confirm_password:'',
            required_fields:'',
            required_fields2:'',
            centerusers: [],
            autocomplete:null,
            place:null,
        }
    },
    methods: {
        ...mapActions(['getCenterProfile', 'displayCenterImage', 'uploadCenterPic', 'createCenterUser', 'displayCenterUsers', 'getAPIkey']),
        getCenterImageURL(img) {
            return require('@/assets/images/'+img)
        },
        closeUploadModal () {
            this.showUploadCenterPicModal = false
            this.isUploading = false
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
            },
        handleFileUpload () {
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
        showCenterImage(a) {
            if (this.isUploading === false) {
                return require('@/assets/images/' + a)
            } else {
                return this.imagePreview
            }
        },
        uploadCenterImage () {
            this.center_id = this.id
            let fd = new FormData()
            this.file = this.$refs.file.files[0]
            fd.append('image_file',this.file)
            fd.append('center_id', this.center_id)
                
            this.uploadCenterPic(fd)
            .then(res => {
            if(res.data.success) {
                alert('Center image successfully uploaded.')
                this.displayCenterImage(this.id).then(res => {
                this.displayImage = res.data
            })
            }
            })
        },
        hideCenterUserRegisterModal() {
            if(this.first_name ===  ""||
            this.last_name === "" ||
            this.mobile_no === "" ||
            this.position === "" ||
            this.address === "") {
                this.required_fields = "Please provide input on the required fields (*)."
            } else {
                this.showCenterUserRegisterModal1 = false
                this.showCenterUserRegisterModal2 = true
                this.required_fields =""
            }
        },
        createCenterUserAccount() {
            if (this.email === '' ||
            this.username === '' ||
            this.password === '' ||
            this.confirm_password === '') {
                this.required_fields2 = "Please provide input on the required fields (*)."
            } else {
                let center_useraccount = {
                    first_name: this.first_name,
                    middle_initial: this.middle_initial,
                    last_name: this.last_name,
                    mobile_no: this.mobile_no,
                    position: this.position,
                    address: this.address,
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    confirm_password: this.confirm_password, 
                    center_id: this.id
                }
                this.createCenterUser(center_useraccount)
                .then(res => {
                    if(res.data.success){
                        alert('User account for center successfully created...')
                    }
                })
                this.showListofUserAccountsModal = false
            }
        },
        displayCenterUserAccounts() {
            this.showListofUserAccountsModal=true
            this.displayCenterUsers(this.id)
            .then(res => {
                this.centerusers = res.data
            })
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
    },
    created() {
        this.getCenterProfile(this.id)
        .then(res => {
            this.center_profile = res.data
        })
    },
    beforeMount() {
      this.displayCenterImage(this.id).then(res => {
        this.displayImage = res.data
      })
    }
}

</script>

<style>
.container{
    margin-left:120px;
    max-width:100%;
    height:700px;
    width:1220px;
    color:#042331;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.page_title{
    margin-left: 30px;
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
.field_label{
    font-weight: bold;
}
#center_info_item1{
    width: 100%;
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
}
#centerinfo_section{
    display: flex;
}
#btn_user, #btn_incident{
    text-decoration: none;
    background:#042331;
    color: white;
    border-radius: 4px;
    padding: 9px;
}
#btn_user:hover, #btn_incident:hover{
    background: white;
    color: #042331;
    border:1px solid #042331;
}
.row_labels{
    padding-right: 50px;
}
.err_message{
    color: red;
    font-style: italic;
}
</style>
