<template>
<div class = "container">
    <sidebar-menu/>
    <div class="main">
        <div class="col-md-12 pt-3 page-title"  id= "menu_content">
          <div class = "header_section">
            <h4 class ="mb-4" id = "label_reported_incidents">List of Employees</h4>
            <div class="form-group row" id = "search_section" style="display:flex;">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary btn-design">Go</button>
            </div>
            <button type="button" class="btn btn-design" @click="showAddEmployeeModal=true">Add an Employee</button>
          </div>

             <div class="section">
              <div class = "centers col-sm-4" v-for ="(employee, index) in center_users" v-bind:key="employee._id" id= "emp_list">
                  <span id="emp_img_name" style="display:none">{{getEmployeeImageData(employee._id, index)}}</span>
                  <div class="card">
                      <b-img :src="showEmployeeImage(empimgdata[index].image_name)"
                        fluid
                        rounded="circle"
                        class="img-center shadow shadow-lg--hover" style="width: 75px; height:75px; cursor: pointer;" 
                        @click="getEmployeeInformation(employee._id)"/>
                    <div class="pt-4 text-center">
                      <h5>
                        <span class="d-block mb-1">{{employee.first_name + " " + employee.middle_initial + " " + employee.last_name}}</span>
                        <small class="h4 font-weight-light text-muted">{{employee.position}}</small>
                      </h5>
                    </div>
                    <div style="display: flex">
                      <button type="button" class="btn btn-primary" @click="getEmployeeInformation(employee._id)">View More</button>
                    </div>
                  </div>
              </div>

            </div>
        </div> 
    </div>

        <div v-if = "showAddEmployeeModal">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 1 of 2: Add an Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showAddEmployeeModal= false">&times;</span>
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
                              <input type="tel" v-model="mobile_no" v-bind="mobile_no" maxlength="11" class="form-control" name="mobile_no" placeholder="09xx3456789" required pattern="[0-9]{11}" />
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
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="checkEmployeeInput()">Next</button>
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
        <div v-if = "showAddEmployeeModal2">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form @submit.prevent="saveEmployeeInfo">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Step 2 of 2: Add an Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showAddEmployeeModal2=false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields2}}</p>
                      <div class="modal-body">
                        <div class="modal-body-section1">
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
                          <div class="form-group">
                            <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                              <label for="email">Email Address<span class = 'required_data'>*</span></label>
                              <input type="text" v-model="email" class="form-control" name="email" placeholder="Enter Email">
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                         <div class="form-group">
                              <ValidationProvider name = "rep_gender" rules="required" v-slot="{ errors }">
                                  <label for="gender">Gender*</label>
                                  <select class="form-control" id="gender" v-model="gender">
                                      <option disabled value="Select Gender">Select One</option>
                                      <option>Male</option>
                                      <option>Female</option>
                                  </select>
                                  <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                        </div>
                        <div class="modal-body-section2">
                          <div class="form-group">
                              <ValidationProvider name = "position" rules="required" v-slot="{ errors }">
                                  <label for="position">Position*</label>
                                  <select class="form-control" id="position" v-model="position">
                                      <option disabled value="Select Position">Select One</option>
                                      <option>Social Worker</option>
                                      <option>Social Welfare Officer I</option>
                                      <option>Social Welfare Officer II</option>
                                      <option>Social Welfare Officer III</option>
                                      <option>Social Welfare Officer IV</option>
                                  </select>
                                  <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <label for="Upload Image">Upload Image</label>
                                <div id="profilepic_container">
                                    <img :src="showImage()" name ="profile_image" id="profile_image" class = "m-auto" width = "150" height = "150"/>
                                    <input type='file' id="image_file" name="image_file" style="display:none" ref="file" accept="image/*" @change="handleFileUpload"/>
                                    <button type="button" class = "btn" title="Select image" id = "upload_pic" onclick="document.getElementById('image_file').click()"><i class = "fas fa-upload fa-2x" name = 'profile_pic'></i></button>
                                </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="showAddEmployeeModal2=false;showAddEmployeeModal=true">Go Back</button>
                          <button type="submit" class="btn btn-primary mr-3">Save</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div v-if="showAddEmployeeSuccessModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">User Registration</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showAddEmployeeSuccessModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p>Employee information successfully recorded.</p>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="showAddEmployeeSuccessModal = false">OK</button>
                          <!--<button type="button" class="btn btn-secondary" @click="showRegistrationSuccessModal = false">Close</button>-->
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div v-if="showEmployeeInfoModal">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-lg modal-dialog-scrollable" role = "document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Employee Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showEmployeeInfoModal= false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style = "display:flex;">
                        <div id="emp-image-container">
                          <form enctype="multipart/form-data">
                            <b-card title="" style="height: 250px;">
                                <img :src="showEmployeeImage(empimage.image_name)" name ="profile_image" width="200" height = "200"/>
                            </b-card>
                          </form>
                        </div>
                        <div class="modal-body-section1">
                          <div class="form-group" style="text-align:right;width: 100%;">
                              <button type="button" class="btn btn-primary btn-actions" @click="showEditEmployeeModal=true">Edit</button>
                              <button type="button" class="btn btn-warning btn-actions">Archive</button>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="emmployeename">Name:</label>
                              <span class="emp-data" id="employeename">{{empinfo.first_name + ' ' + empinfo.middle_initial + ' ' + empinfo.last_name}}</span>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="position">Position:</label>
                              <span class="emp-data" id="position">{{empinfo.position}}</span>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="address">Address:</label>
                              <span class="emp-data" id="address">{{empinfo.address}}</span>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="mobilenumber">Date of Birth:</label>
                              <span class="emp-data" id="mobilenumber">{{formatBirthDate(empinfo.birthdate)}}</span>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="mobilenumber">Mobile No:</label>
                              <span class="emp-data" id="mobilenumber">{{empinfo.mobile_no}}</span>
                          </div>
                          <div class="form-group">
                              <label class="emp-data-label" for="email">Email Address:</label>
                              <span class="emp-data" id="email">{{empinfo.email}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-design mr-3" @click="showEmployeeInfoModal=false">Close</button>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!--Update Employee Information-->
        <div v-if = "showEditEmployeeModal">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">1 of 2: Edit Employee Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showEditEmployeeModal= false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields}}</p>
                      <div class="modal-body">
                        <div class="modal-body-section1">
                          <div class="form-group">
                            <p class="edit-label">{{empID = empinfo._id}}</p>
                            <ValidationProvider name = "first_name" rules="required" v-slot="{ errors }">
                                <label for="first_name">First Name<span class = 'required_data'>*</span></label>
                                <input type="text" v-model="empinfo.first_name" class="form-control" name="first_name" placeholder="Enter First Name">
                                <p class="edit-label">{{first_name = empinfo.first_name}}</p>
                                <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "middle_initial" rules="" v-slot="{ errors }">
                              <label for="middle_initial">Middle Initial</label>
                              <input type="text" v-model="empinfo.middle_initial" class="form-control" name="middle_initial" placeholder="Enter Middle Initial">
                              <p class="edit-label">{{middle_initial = empinfo.middle_initial}}</p>
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "last_name" rules="required" v-slot="{ errors }">
                              <label for="last_name">Last Name<span class = 'required_data'>*</span></label>
                              <input type="text" v-model="empinfo.last_name" class="form-control" name="last_name" placeholder="Enter Last Name">
                              <p class="edit-label">{{last_name = empinfo.last_name}}</p>
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </div>
                        
                        <div class="modal-body-section2">
                          <div class="form-group">
                            <ValidationProvider name = "mobile_no" rules="required|digits:11" v-slot="{ errors }">
                              <label for="mobilephone_no">Mobile Phone No.<span class = 'required_data'>*</span></label>
                              <input type="tel" v-model="empinfo.mobile_no" v-bind="mobile_no" maxlength="11" class="form-control" name="mobile_no" placeholder="09xx3456789" required pattern="[0-9]{11}" />
                              <p class="edit-label">{{mobile_no = empinfo.mobile_no}}</p>
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "birthdate" rules="required" v-slot="{ errors }">
                              <label for="birthdate">Date of birth:<span class = 'required_data'>*</span></label>
                              <input type="date" v-model="empinfo.birthdate" class="form-control" name="birthdate" placeholder="">
                              <p class="edit-label">{{birthdate = empinfo.birthdate}}</p>
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="checkEmployeeUpdate()">Next</button>
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

        <!-- Update Employee Information-->
        <div v-if = "showEditEmployeeModal2">
          <transition name = "modal">
            <div class = "modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog modal-md modal-dialog-scrollable" role = "document">
                  <form @submit.prevent="updateEmployeeInfo">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">2 of 2: Edit Employee Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showEditEmployeeModal2=false">&times;</span>
                        </button>
                      </div>
                      <p class = "err_message ml-3">{{required_fields2}}</p>
                      <div class="modal-body">
                        <div class="modal-body-section1">
                          <div class="form-group">
                            <ValidationProvider name = "user_address" rules="required" v-slot="{ errors }">
                              <label for = "address">Address<span class = 'required_data'>*</span></label>
                              <div id = "address_details">
                                <input type="hidden" id="loc_lat" />
                                <input type="hidden" id="loc_long" />
                                <input id="input_address" v-model="empinfo.address" placeholder="Enter your address" @focus="initAutocomplete()" type="text" class="form-control">
                                <input type="hidden" class="form-control" id="street_number" disabled="true">
                                <input type="hidden" class="form-control" id="route" disabled="true">
                                <input type="hidden" class="form-control field" id="locality" disabled="true">
                                <input type="hidden" class="form-control" id="administrative_area_level_1" disabled="true">
                                <input type="hidden" class="form-control" id="postal_code" disabled="true">
                                <input type="hidden" class="form-control" id="country" disabled="true">
                                <p class="edit-label">{{address = empinfo.address}}</p>
                                <span class = "err_message">{{ errors[0] }}</span>
                              </div>
                              </ValidationProvider>
                          </div>
                          <div class="form-group">
                            <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                              <label for="email">Email Address<span class = 'required_data'>*</span></label>
                              <input type="text" v-model="empinfo.email" class="form-control" name="email" placeholder="Enter Email">
                              <p class="edit-label">{{email = empinfo.email}}</p>
                              <span class = "err_message">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                         <div class="form-group">
                              <ValidationProvider name = "rep_gender" rules="required" v-slot="{ errors }">
                                  <label for="gender">Gender*</label>
                                  <select class="form-control" id="gender" v-model="empinfo.gender">
                                      <option disabled value="Select Gender">Select One</option>
                                      <option>Male</option>
                                      <option>Female</option>
                                  </select>
                                  <p class="edit-label">{{gender = empinfo.gender}}</p>
                                  <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                        </div>
                        <div class="modal-body-section2">
                          <div class="form-group">
                              <ValidationProvider name = "position" rules="required" v-slot="{ errors }">
                                  <label for="position">Position*</label>
                                  <select class="form-control" id="position" v-model="empinfo.position">
                                      <option disabled value="Select Position">Select One</option>
                                      <option>Social Worker</option>
                                      <option>Social Welfare Officer I</option>
                                      <option>Social Welfare Officer II</option>
                                      <option>Social Welfare Officer III</option>
                                      <option>Social Welfare Officer IV</option>
                                  </select>
                                  <p class="edit-label">{{position = empinfo.position}}</p>
                                  <span class = "err_message">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-primary mr-3" @click="showEditEmployeeModal2=false;showEditEmployeeModal=true">Go Back</button>
                          <button type="submit" class="btn btn-primary mr-3" @click="updateEmployeeInfo()">Save</button>
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
<script>
import SideBarMenu from '../components/Sidebar'
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  components: {
    'sidebar-menu': SideBarMenu
  },
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      showAddEmployeeModal: false,
      showAddEmployeeModal2: false,
      showAddEmployeeSuccessModal: false,
      showEmployeeInfoModal: false,
      showEditEmployeeModal: false,
      showEditEmployeeModal2: false,
      first_name: "",
      middle_initial: "",
      last_name: "",
      mobile_no: "",
      address: "",
      birthdate: "",
      email: "",
      gender: "",
      position: "",
      required_fields: "",
      required_fileds2: "",
      selectedFile: null,
      selectedImage: false,
      noImageSelected: "",
      imagePreview: null,
      file: "",
      showPreview: false,
      center_users: {},
      empID: "",
      empinfo: [],
      empimgdata: [],
      empimgname: "",
      imgindex: 0,
      count: 0,
      empimage: []
    }
  },
    mounted(){
    this.displayCenterUsers(this.id)
    .then(res => {
      this.center_users = res.data
    })
  },
  methods: {
    ...mapActions(['addEmployee', 'displayCenterUsers', 'displayProfilePic', 'getEmployeeInfo', 'updateAccountInfo']),
    formatBirthDate (date) {
          return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    },
    checkEmployeeInput(){
      if(this.first_name === "" ||
      this.last_name === "" ||
      this.mobile_no === "" ||
      this.birthdate === "" 
      ) {
        this.required_fields = "Please input in the required fields*"
      } else {
        this.required_fields = ""
        this.showAddEmployeeModal = false
        this.showAddEmployeeModal2 = true
      }
    },
    checkEmployeeUpdate(){
      if(this.first_name === "" ||
      this.last_name === "" ||
      this.mobile_no === "" ||
      this.birthdate === "" 
      ) {
        alert(this.first_name + ' ' + this.last_name + ' ' + this.mobile_no + ' ' + this.birthdate)
        this.required_fields = "Please input in the required fields*"
      } else {
        this.required_fields = ""
        this.showEditEmployeeModal = false
        this.showEditEmployeeModal2 = true
      }
    },
    saveEmployeeInfo(){
      if(this.address === "" ||
      this.gender === "" ||
      this.email === "" ||
      this.position === "") {
        alert(this.address + ' ' + this.gender + '' + this.email + ' ' + this.position)
        this.required_fields2 = "Please input in the required fields*"
      } else {
        let fd = new FormData()
        fd.append('image_file', this.file)
        fd.append('first_name', this.first_name)
        fd.append('middle_initial', this.middle_initial)
        fd.append('last_name', this.last_name)
        fd.append('mobile_no', this.mobile_no)
        fd.append('birthdate', this.birthdate)
        fd.append('address', this.address)
        fd.append('email',this.email)
        fd.append('gender', this.gender)
        fd.append('position', this.position)
        fd.append('center_id', this.id)
        this.addEmployee(fd)
        .then(res => {
          if(res.data.success){
            this.first_name = ""
            this.middle_initial = ""
            this.last_name = ""
            this.mobile_no = ""
            this.birthdate = ""
            this.gender = ""
            this.email = ""
            this.position = ""
            this.showAddEmployeeModal2 = false
          }
        })
        this.required_fields2 = ""
        this.showAddEmployeeModal2 = false
        this.showAddEmployeeSuccessModal = true
      }
    },
    updateEmployeeInfo(){
      if(this.address === "" ||
      this.gender === "" ||
      this.email === "" ||
      this.position === "") {
        this.required_fields2 = "Please input in the required fields*"
      } else {
        let employee_info = {
          _id: this.empID,
          first_name: this.first_name,
          middle_initial: this.middle_initial,
          last_name: this.last_name,
          mobile_no: this.mobile_no,
          birthdate: this.birthdate,
          address: this.address,
          gender: this.gender,
          position: this.position,
          email: this.email
        }
        this.updateAccountInfo(employee_info)
        .then(res =>{
          if(res.data.success){
            this.showEditEmployeeModal2 = false
            this.required_fields2 = ""
            alert('Employee Information successfully updated.')
          }
        })
      }
    },
    handleFileUpload (e) {
      this.selectedFile = e.target.files[0]
      this.selectedImage = true
      this.noImageSelected = ''
      this.file = this.$refs.file.files[0]
      alert(this.file.path)
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
    showImage () {
      return this.imagePreview
    },
    getEmployeeImageData(id, i) {
      if(this.count <= i){
        this.displayProfilePic(id)
        .then(res => {
          this.empimgdata.push(res.data)
        })
        this.count = this.count + 1
      }
    },
    getEmployeeImage(id) {
      this.displayProfilePic(id)
      .then(res => {
        this.empimage = res.data
      })
    },
    showEmployeeImage(pic){
      return require('@/assets/images/' + pic)
    },
    getEmployeeInformation(id) {
      this.showEmployeeInfoModal = true
      this.getEmployeeImage(id)
      this.getEmployeeInfo(id)
      .then(res => {
        this.empinfo = res.data
      })
    },
    /* computed: {
        /* filteredEmployees() {
            return this.center_users.filter((employee) => {
                return employee.first_name.toLowerCase().match(this.search.toLowerCase()) ||
                employee.middle_initial.toLowerCase().match(this.search.toLowerCase()) ||
                employee.last_name.toLowerCase().match(this.search.toLowerCase()) ||
                employee.mobile_no.toLowerCase().match(this.search.toLowerCase()) ||
                employee.gender.toLowerCase().match(this.search.toLowerCase()) ||
                employee.address.toLowerCase().match(this.search.toLowerCase()) ||
                employee.email.toLowerCase().match(this.search.toLowerCase()) ||
                employee.birthdate.toLowerCase().match(this.search.toLowerCase()) || 
                employee.position.toLowerCase().match(this.search.toLowerCase())
            })
        } 
    } */
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
    z-index: -5;
}
.page_title{
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
table{
    color:#042331;
}
#row_header{
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
#label_reported_incidents{
    color: #042331;
    float: left;
}
#search_section{
    justify-content:flex-end;
    color:#042331;
}
#filter_section{
  margin-right: 205px;
  justify-content:flex-end;
  color:#042331;
}
.btn{
  font-size: 10pt;
  margin:.2em;
}
table{
  font-size: 10pt;
}
#btn_report{
    font-size: 12pt;
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
.btn-design{
    text-decoration: none;
    background:#042331;
    color: white;
    border-radius: 4px;
}
.btn-design:hover{
    background: white;
    color: #042331;
    border:1px solid #042331;
}
.err_message{
  color: red;
  font-style: italic;
}
.btn-actions{
    width: 15%;
}
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
}
.modal-dialog{
  width:80%;
}
.row_header{
    display: flex;
    font-size: 14px;
    padding: 0;
    margin-top: 15px;
}
.row_header li{
    font-size: 14px;
    list-style-type: none;
    width: 170px;
    padding-right: 20px;
    font-weight: 500;
}
.row_header_container{
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
}
#display{
  display: inline;
}
#filter_status{
  display: inline;
}
.header_section{
  border-bottom: 1px solid gray;
}
#upload_pic{
  position:relative;
  margin-top: 115px;
  margin-left: 115px;
  z-index: 2;
  padding:0;
}
#profile_image{
  position: absolute;
  z-index: 1;
}
.row_header{
    display: flex;
    font-size: 14px;
    padding: 0;
    margin-top: 15px;
}
.row_header li{
    font-size: 14px;
    list-style-type: none;
    width: 125px;
    padding-right: 20px;
    font-weight: 500;
}
.emp_header{
    font-size: 14px;
    padding: 0;
    display: flex;
}
.emp_info{
    font-size: 14px;
    list-style-type: none;
    width: 125px;
    padding-right: 20px;
}
.emp_image:hover{
  cursor: hand;
}
.card{
  padding: 0;
  height: 210px;
  border-radius: 10px;
  align-items: center;
  margin: 5px;
}
#emp_list{
  display: flex;
  flex-direction: column;
  float: left;
}
.emp-data{
  margin-left: 40px;
}
.emp-data-label{
  width: 120px;
  margin: 5px 10px;
}
.edit-label{
  display: none;
}
</style>
