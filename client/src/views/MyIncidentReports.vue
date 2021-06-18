<template>
    <div class ="main overflow-auto">
        <div class = "container overflow-auto">
            <sidebar-menu/>
            <div class="section">
                <div class="col-md-12 pt-3 page-title"  id= "menu_content">
                    <h4 class = "mb-4" id = "label_reported_incidents">My Incident Reports</h4>
                    <div class="form-group row" id = "search_section" style="display:flex;">
                        <label for="search" class="col-form-label">Search</label>
                        <div class="col-4">
                            <input class="form-control" v-model="search" type="text" value="" id="search" name="search">
                        </div>
                        <button type="submit" class="btn btn-primary btn-design">Go</button>
                    </div>
                    <button type="button" class="btn btn-design" @click="showReportIncidentModal=true">Report an Incident</button>
                        <div class = "row_header_container">
                            <ul class = "row_header">
                                <li class = "rept_info">Date Reported</li>
                                <li>Name of Individual</li>
                                <li>Type of Individual</li>
                                <li>Gender</li>
                                <li>Location of Incident</li>
                                <li>Description of Incident</li>
                                <li>Sent To</li>
                                <li>Status</li>
                                <li></li>
                            </ul>
                        </div>

                        <div class = "row_records">
                            <ul class="rept_header" v-for="(report,index) in lists" v-bind:key="report._id">
                                <li class = "rept_info">{{ formatBirthDate(report.reported_on) }}</li>
                                <li class = "rept_info">{{ report.first_name + ' ' + report.middle_initial + ' ' + report.last_name}}</li>
                                <li class = "rept_info">{{ report.individual_type }}</li>
                                <li class = "rept_info">{{ report.gender }}</li>
                                <li class = "rept_info">{{ report.location }}</li>
                                <li  class = "rept_info">
                                    <span>{{report.description}}</span>
                                    <div>
                                    <a title="Click image to enlarge"><img class="image_rept" @click="zoomInImage(report.report_image1.image_name)" :src="getReportImages(showReportImage(report.report_image1.image_name))" width="50" height="50" /></a>
                                    <a title="Click image to enlarge"><img class="image_rept" @click="zoomInImage(report.report_image2.image_name2)" :src="getReportImages(showReportImage(report.report_image2.image_name2))" width="50" height="50" /></a>
                                    </div>
                                </li>
                                <li  class = "rept_info">{{ report.center_name }}</li>
                                <li  class = "rept_info">{{ report.status }}</li>
                                <li  class = "rept_info">
                                    <button type="button" class="btn btn-primary btn-actions" @click="getIncidentReport(report._id)">Edit</button>
                                    <button type="button" class="btn btn-danger btn-actions" @click.prevent="confirmDelete(report._id, index)">Delete</button>
                                </li>
                            </ul>
                        </div>

                        <div style="text-align:center;">
                            <b-pagination class="page-item" active-bg-color="#00ff00"
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="center"
                            ></b-pagination>
                            
                            <b-table
                            id="my-table"
                            :items="items"
                            :per-page="perPage"
                            :current-page="currentPage"
                            small
                            ></b-table>
                        
                        </div>

                </div>
            </div>

            <div v-if="showReportIncidentModal" id="reportForm">
                <transition name="modal">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-md modal-dialog-scrollable" role="document">
                            <form @submit.prevent="sendReport" enctype="multipart/form-data">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Report an Incident</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" @click="cancelReport">&times;</span>
                                        </button>
                                    </div>
                                    <p class = "err_message ml-3">{{required_fields}}</p>
                                    <div class="modal-body">
                                        <div class = "modal-body-section1">
                                            <div class="form-group">
                                                <label for="first_name">Name of Indvidual</label>
                                                <input type="text" v-model="first_name" class="form-control mt-2" id="first_name" placeholder="Enter First Name*">
                                                <input type="text" v-model="middle_initial" class="form-control mt-2" id="middle_initial" placeholder="Enter Middle Initial">
                                                <input type="text" v-model="last_name" class="form-control mt-2" id="last_name" placeholder="Enter Last Name*">
                                            </div>
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_indivtype" rules="required" v-slot="{ errors }">
                                                    <label for="type_of_individual">Type of Individual*</label>
                                                    <select class="form-control" id="rep_indivtype" v-model="rep_indivtype">
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
                                            <div class = "form-group">
                                                <ValidationProvider name = "rep_location" rules="required" v-slot="{ errors }">
                                                    <label for="Location">Location*</label>
                                                    <input type="text" placeholder="Type Location*" class="form-control" id = "rep_location" name="rep_location" v-model="rep_location" @focus="initAutocomplete()"/>
                                                    <button type="button" class="btn btn-design" style="display:block" @click="getMyLocation">Get my location</button>
                                                    <p id="latitude" style="display:none"></p>
                                                    <p id="longitude" style="display:none"></p>
                                                    <p id="distance" style="display:none"></p>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class = "modal-body-section2">
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_gender" rules="required" v-slot="{ errors }">
                                                    <label for="gender">Gender*</label>
                                                    <select class="form-control" id="rep_gender" v-model="rep_gender" @mousedown="generateLatLong" @change="filterCenters" @click="filterCenters">
                                                        <option disabled value="Select Gender">Select One</option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_desc" rules="required" v-slot="{ errors }">
                                                    <label for="Description">Description*</label>
                                                    <textarea class="form-control" id="rep_desc" rows="3" v-model="rep_desc"></textarea>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>       

                                            <div class="form-group">
                                                <label for="attach" class="file-label">Attach Image (optional)</label>
                                                <p class="input-guide">Note: You can attach up to 2 images</p>
                                                    <input type="file" multiple accept="image/*" @change="handleImages" ref="images" name="imagesList" id="rept_images"/>
                                                    <div v-for="(image,key) in imagesList" :key="key">
                                                        <button class="close" @click="removeImage(key)">&times;</button>
                                                        <img :src="image" class="preview"/>
                                                        <span>{{image.name}}</span>
                                                    </div>

                                                <!--<label for="attach" class="file-label">Attach Image (optional)</label>
                                                    <p class="input-guide">Note: You can attach up to 2 images</p>
                                                        <div v-for="(image, key) in images" :key="key">
                                                            <button class="close" @click.prevent="removeImage(key, $event)">&times;</button>
                                                            <div>
                                                                <img class="preview" :src="image" :key="'image'"/>
                                                                {{ image.name }}
                                                            </div>
                                                        </div>
                                                        <input type="file" multiple accept="image/*" ref="images" @change="uploadImage" id="image_file"/>
                                                        <button class="btn btn-design" type="button" onclick="document.getElementById('image_file').click()">Select Image</button>-->
                                            </div>
                                            <p id="reported_by"></p>
                                            <p v-if="showCenterName">Note: This will be reported to: {{selected_center}}</p>
                                        </div>                                        
                                    </div>
                                    <div class="modal-footer">
                                        <div class form-group>
                                            <button class="btn btn-primary mr-3 btn-design" type="submit">Send Report</button>
                                            <button type="button" class="btn btn-secondary" @click="cancelReport">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </transition>
            </div>

            <div v-if="showIncidentRepSuccessModal">
                <transition name="modal">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Report an Incident</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" @click="showIncidentRepSuccessModal = false">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Incident successfully sent.</p>
                            </div>
                            <div class="modal-footer">
                                <div class form-group>
                                <button type="button" id="btn_ok" class="btn btn-secondary" @click="showIncidentRepSuccessModal = false">OK</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </transition>
                </div>

                <div v-if="showEditReportIncidentModal">
                <transition name="modal">
                    <div class="modal-mask" @click="showEditReportIncidentModal=false">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-md modal-dialog-scrollable" role="document">
                            <form @submit.prevent="" enctype="multipart/form-data">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Edit Reported Incident</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" @click="showEditReportIncidentModal=false">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class = "modal-body-section1">
                                            <div class="form-group">
                                                <label for="first_name">Name of Indvidual</label>
                                                <input type="text" v-model="repincident_data.first_name" class="form-control mt-2" id="ed_first_name" placeholder="Enter First Name">
                                                <input type="text" v-model="repincident_data.middle_initial" class="form-control mt-2" id="ed_middle_initial" placeholder="Enter Middle Initial">
                                                <input type="text" v-model="repincident_data.last_name" class="form-control mt-2" id="ed_last_name" placeholder="Enter Last Name">
                                            </div>
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_indivtype" rules="required" v-slot="{ errors }">
                                                    <label for="type_of_individual">Type of Individual</label>
                                                    <select class="form-control" id="edit_rep_indivtype" v-model="repincident_data.individual_type">
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
                                            <div class = "form-group">
                                                <ValidationProvider name = "rep_location" rules="required" v-slot="{ errors }">
                                                    <label for="Location">Location</label>
                                                    <input type="text" placeholder="Type Location" class="form-control" id = "ed_rep_location" name="rep_location" v-model="repincident_data.location" @focus="initAutocomplete()"/>
                                                    <button type="button" class="btn btn-design" style="display:block" @click="getMyLocation">Get my location</button>
                                                    <p id="latitude" style="display:none"></p>
                                                    <p id="longitude" style="display:none"></p>
                                                    <p id="distance" style="display:none"></p>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class = "modal-body-section2">
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_gender" rules="required" v-slot="{ errors }">
                                                    <label for="gender">Gender</label>
                                                    <select class="form-control" id="ed_rep_gender" v-model="repincident_data.gender" placeholder="Select Gender" @mousedown="generateLatLong" @click="filterCenters" @change="filterCenters">
                                                        <option selected="selected" disabled value="Select Gender">Select One</option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                            <div class="form-group">
                                                <ValidationProvider name = "rep_desc" rules="required" v-slot="{ errors }">
                                                    <label for="Description">Description</label>
                                                    <textarea class="form-control" id="ed_rep_desc" rows="3" v-model="repincident_data.description"></textarea>
                                                    <span class = "err_message">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>       
                                            <div class="form-group">
                                                <div>
                                                    <button class="close" @click="removeImage(key)">&times;</button>
                                                    <img class="image_rept_edit" :src="getReportImages(showReportImage(repincident_data.report_image1.image_name))" width="50" height="50" />
                                                    <img class="image_rept_edit" :src="getReportImages(showReportImage(repincident_data.report_image2.image_name2))" width="50" height="50" />
                                                </div>
                                            </div>
                                            <p v-if="showCenterName">Note: This will be reported to: {{selected_center}}</p>
                                        </div>                                        
                                    </div>
                                    <div class="modal-footer">
                                        <div class form-group>
                                            <button class="btn btn-primary mr-3 btn-design" type="submit">Update Report</button>
                                            <button type="button" class="btn btn-secondary" @click="showEditReportIncidentModal=false">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </transition>
            </div>

            <div v-if="showConfirmDeleteModal">
                <transition name="modal">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Delete Reported Incident</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" @click="showConfirmDeleteModal=false">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Do you really want to delete this reported incident?</p>
                            </div>
                            <div class="modal-footer">
                                <div class form-group>
                                <button type="button" id="btn_yes" class="btn btn-danger" @click="deleteIncidentReport(report_id, report_index)">Yes</button>
                                <button type="button" id="btn_no" class="btn btn-secondary" @click="hideConfirmDelete">No</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </transition>
            </div>

            <div v-if="showCancelReportModal">
                <transition name="modal">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Cancel Incident Report</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" @click="cancelReport">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Do you really want to cancel sending this incident report?</p>
                            </div>
                            <div class="modal-footer">
                                <div class form-group>
                                <button type="button" id="btn_yes" class="btn btn-danger" @click="confirmCancelReport">Yes</button>
                                <button type="button" id="btn_no" class="btn btn-secondary" @click="hideCancelReport">No</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </transition>
            </div>

            <div v-if="showZoomInImageModal" v-on:close="showZoomInImageModal=false">
                <transition name="modal">
                    <div class="modal-mask" v-on:click="$emit('close')">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Image Preview</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="$emit('close')">
                                    <span aria-hidden="true" @click="showZoomInImageModal=false">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               <img :src="getReportImages(rept_image)" :style="{width:w_size,height:h_size}" @click="show">
                            </div>
                            <div class="modal-footer">
                               <!--  <div class form-group>
                                <button type="button" id="btn_yes" class="btn btn-danger" @click="deleteIncidentReport(report_id, report_index)">Yes</button>
                                <button type="button" id="btn_no" class="btn btn-secondary" @click="hideConfirmDelete">No</button>
                                </div> -->
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

<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=geometry,places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script>
import SideBarMenu from '../components/Sidebar'
import Footer from '../components/Footer'
import { mapActions, mapGetters } from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import moment from 'moment'
export default {
    components: {
      'sidebar-menu': SideBarMenu,
      'app-footer': Footer,
      VueGoogleAutocomplete
  },
  computed: mapGetters([
    'user',
    'imgdata'
    ]),
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      first_name: '',
      last_name: '',
      user_id: '',
      email: '',
      search: '',
      index: 0,
      myreports: [],
      showReportIncidentModal: false,
      place: null,
      autocomplete: null,
      lati: 0.0,
      long: 0.0,
      first_name: '',
      middle_initial: '',
      last_name:'',
      rep_location: '',
      rep_indivtype: '',
      rep_gender: '',
      rep_desc: '',
      required_fields:'',
      centerslist: {},
      rep_centerid:'',
      rep_centername: '',
      distance2: 0,
      fname: '',
      mi: '',
      lname:'',
      citizen_name:'',
      images: [],
      imagesList: [],
      imagesList2: [],
      showIncidentRepSuccessModal: false,
      selected_center: '',
      showCenterName: false,
      showEditReportIncidentModal: false,
      repincident_data:[],
      showConfirmDeleteModal: false,
      deleteRep: false,
      report_id: '',
      report_index: 0 ,
      url: [],
      rptimg1: '',
      rptimg2: '',
      showIncidentReportImagesModal: false,
      files:[],
      showImageError: false,
      image_error: '',
      imageData:'',
      image:'',
      key:'',
      w_size: "",
      h_size: "",
      rept_image: "",
      showZoomInImageModal: false,
      selectedtFiles: null,
      perPage: 5,
      currentPage: 1,
      img_index: 0,
      showCancelReportModal: false,
      search: ""
    }
  },
  methods: {
      ...mapActions(['getAPIkey', 'displayCenters', 'getProfile', 'sendIncidentReport', 'getMyIncidentReports', 'getReportedIncident', 'deleteReportedIncident', 'getIncidentReportImages', 'deleteReportedImage1']),
      formatBirthDate (date) {
          return moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');
        },
      initAutocomplete(){
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      this.autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('rep_location')),
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
    generateLatLong() { 
          let geocoder = new google.maps.Geocoder();
          let address = document.getElementById("rep_location").value;
          var loc1, loc2;
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK)
            {
              loc1= results[0].geometry.location.lat();
              loc2= results[0].geometry.location.lng();
              // alert("coordinates: " + loc1 + ' ' + loc2)
            } else{
              alert("Error: " + status);
            }
            document.getElementById('latitude').innerHTML = loc1
            document.getElementById('longitude').innerHTML = loc2
            //alert(this.lati + ' ' + this.long)
          })
          this.rep_location = address
          //alert(this.gen_address +' '+this.lati)
        },
        getLatLong(){
          this.lati = document.getElementById('latitude').innerHTML
          this.long = document.getElementById('longitude').innerHTML
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
    getMyLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    },
    showPosition(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        // alert('coordinates2: ' + lat +' '+lng)
        document.getElementById('latitude').value = lat
        document.getElementById('longitude').value = lng
        // alert(lat + ' ' + lng)
        // map.setCenter(new google.maps.LatLng(lat, lng));
        var geocoder = new google.maps.Geocoder;
        var latlng = lat + ',' + lng
        this.geoceodeLatLong(geocoder, latlng)
    },
    geoceodeLatLong(geocoder, myloclatlng){
        var gen_address
        var latlngStr = myloclatlng.split(',', 2)
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
              if(results[0]) {
                gen_address = results[0].formatted_address
                document.getElementById('rep_location').value = gen_address
              } else {
                 window.alert('No results found')
              }
          } else {
              window.alert('Geocoder failed due to: ' + status);
          }
        })
    },
    filterCenters(){
        this.showCenterName = false
        this.displayCenters()
        .then(res => {
            this.centerslist = res.data
        })
        var centerData = []
        centerData = this.centerslist
        var centerData_bygender = []
        centerData.forEach(el => {
            if (el.center_gender === this.rep_gender || el.center_gender === 'Male and Female'){
                let genCenterData = {
                    center_id: el._id,
                    center_name: el.center_name,
                    center_indivtype: el.center_indivtype,
                    center_location: el.center_location,
                    center_gender: el.center_gender,
                    center_lat: el.center_lat,
                    center_long: el.center_long
                }
                centerData_bygender.push(genCenterData)
            }
        })
        var centerData_byindivtype = []
        centerData_bygender.forEach(el =>{
            if(el.center_indivtype === this.rep_indivtype) {
                let indivCenterData = {
                    center_id: el.center_id,
                    center_name: el.center_name,
                    center_indivtype: el.center_indivtype,
                    center_location: el.center_location,
                    center_gender: el.center_gender,
                    center_lat: el.center_lat,
                    center_long: el.center_long
                }
                centerData_byindivtype.push(indivCenterData)
            }
        })
        this.getNearestCenter(centerData_byindivtype)
    },
    getNearestCenter(centerData){
        this.lati = document.getElementById('latitude').innerHTML
        this.long = document.getElementById('longitude').innerHTML
        var rep_lat = this.lati
        var rep_long = this.long
        var distance1 = 100000
        // var rep_centerid = '', rep_centername = ''
        centerData.forEach(el => {
            //var centerlocation = new google.maps.LatLng(parseFloat(el.center_lat), parseFloat(el.center_long))
            // distance2 = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(parseFloat(rep_lat),parseFloat(rep_long)), new google.maps.LatLng(parseFloat(el.center_lat),parseFloat(el.center_long)))
            this.distance2 = this.getDistanceOfCoordinates(rep_lat, rep_long, el.center_lat,el.center_long)
            if(distance1 > this.distance2) {
                distance1 = this.distance2
                this.rep_centerid = el.center_id
                this.rep_centername = el.center_name
            }
        })
        this.selected_center = this.rep_centername
        this.showCenterName = true
        document.getElementById('distance').innerHTML = distance2
    },
    getDistanceOfCoordinates(lat1, lng1, lat2, lng2){
        var earthRadiusKm = 6371;
        var dLat = (lat2-lat1) * (Math.PI/180)
        var dLon = (lng2-lng1) * (Math.PI/180)

        lat1 = lat1 * (Math.PI/180)
        lat2 = lat2 * (Math.PI/180)

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    },
    getCitizenName(){
         this.getProfile()
        .then(res => {
            this.fname = res.data.user.first_name
            this.mi = res.data.user.middle_initial
            this.lname = res.data.user.last_name
            alert(this.fname + ' ' + this.mi + ' ' + this.lname)
            document.getElementById('reported_by').innerHTML = this.fname + ' ' + this.mi + ' ' + this.lname
        })
    },
    sendReport(){
        if( this.first_name === "" ||
            this.last_name === "" ||
            this.rep_indivtype === "" ||
            this.rep_location === "" ||
            this.rep_desc === "" ||
            this.rep_gender === "" ||
            this.rep_desc === "") {
                this.required_fields = "Please provide input on the required fields (*)." 
        } else {
            this.citizen_name = document.getElementById('reported_by').innerHTML
            for (let i = 0; i < this.selectedFiles.length; i++) {
                //console.log(selectedFiles[i])
                this.imagesList.push(this.selectedFiles[i]);
            }
            let fd = new FormData()
            for( var i = 0; i < this.imagesList.length; i++ ){
                fd.append('imageFiles', this.imagesList[i]);
            }
            fd.append('first_name', this.first_name)
            fd.append('middle_initial', this.middle_initial)
            fd.append('last_name', this.last_name)
            fd.append('location', this.rep_location)
            fd.append('individual_type', this.rep_indivtype)
            fd.append('gender', this.rep_gender)
            fd.append('description', this.rep_desc)
            fd.append('center_id', this.rep_centerid)
            fd.append('center_name',this.rep_centername)
            
            fd.append('reported_by', this.citizen_name)
            fd.append('user_id', this.id)
            fd.append('distance', this.distance2)
            this.sendIncidentReport(fd)
            .then(res => {
                if(res.data.success) {
                    this.showReportIncidentModal = false
                    this.showIncidentRepSuccessModal = true
                    this.getMyIncidentReports(this.id)
                    .then(res => {
                        this.myreports = res.data
                    })
                }
            })
            this.first_name = ""
            this.middle_initial = ""
            this.last_name = ""
            this.rep_location = ""
            this.rep_indivtype = ""
            this.rep_gender = ""
            this.rep_desc = ""
            this.rep_centerid = ""
            this.center_name = ""
            this.citizen_name = ""
            this.showCenterName = false
            this.showAttachImage = false
            for(let i = 0; i < this.imagesList.length; i++) {
                this.imagesList.splice(i, (i+1));
            }
            this.handleImages()
        }
    },
    uploadImage(e) {
      if(this.imagesList.length === 2) {
          alert('You can only upload up to 2 images.')
      } else {
        let vm = this;
        var selectedFiles = e.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            console.log(selectedFiles[i])
            this.images.push(selectedFiles[i]);
        }
        for (let i = 0; i < this.images.length; i++) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.$refs.image[i].src = reader.result;
                //this.imageData = e.target.result
                console.log(this.$refs.image[i].src);
            };
            reader.readAsDataURL(this.images[i]);
        }
      }
    },
    handleImages(e){
        this.imagesList = [];
        this.selectedFiles = e.target.files;
        if(this.selectedFiles.length > 2) {
            alert('You can only upload up to 2 images.')
            document.getElementById("rept_images").value = null
        } else { 

            let fileList = Array.prototype.slice.call(e.target.files);
            fileList.forEach(f => {
                if(!f.type.match("image.*")) {
                    return;
                }			
                let reader = new FileReader();
                let that = this;
                reader.onload = function (e) {
                    that.imagesList.push(e.target.result);
                }
                reader.readAsDataURL(f);
            });
        }
    },
    removeImage(index) {
        this.imagesList.splice(index, 1);
        this.$refs.images[index].name = ""
    },
    getIncidentReport(id){
        this.getReportedIncident(id)
        .then(res => {
            this.repincident_data = res.data
        })
        this.showEditReportIncidentModal = true
    },
    confirmDelete(id,a) {
        this.showConfirmDeleteModal = true
        this.report_id = id
        this.report_index = a
    },
    deleteIncidentReport(id, a) {
        this.showConfirmDeleteModal = false
        this.deleteReportedIncident(id)
        .then(res => {
            this.myreports.splice(a, 1)
        })
    },
    hideConfirmDelete(){
        this.showConfirmDeleteModal = false
        this.deleteRep = false
    },
    getReportImages(pic){
        return require('@/assets/images/' + pic)
    },   
    getValueByKey(v, i) {
        let myimg
        if(i === 'image_name') {
            myimg = v
            this.rptimg1 = v
        }
    },
    showReportImage(a){
        return a;
    },
    getValueByKey2(v, i) {
        let myimg
        if(i === 'image_name2') {
            myimg = v
            this.rptimg2 = v
        }
    },
    showReportImage2(){
        return this.rptimg2
    },
    zoomInImage(a){
        this.showZoomInImageModal = true
        this.rept_image = a
        this.w_size = "470px"
        this.h_size = "400px"
    },
    getAllMyIncidentReports() {
        this.getMyIncidentReports(this.id)
        .then(res => {
            this.myreports = res.data
        })
    },
    cancelReport()
    {
        if(this.first_name !== "" ||
        this.last_name !== "" ||
        this.rep_location !== "" ||
        this.rep_indivtype !== "" ||
        this.rep_gender !== "" ||
        this.rep_desc !== "")
        {
            this.showCancelReportModal = true
        }
        else{
            this.showReportIncidentModal = false
        }
    },
    confirmCancelReport(){
        this.showReportIncidentModal = false
        this.showCancelReportModal = false
        this.first_name = ""
        this.middle_initial = ""
        this.last_name = ""
        this.rep_location = ""
        this.rep_indivtype = ""
        this.rep_gender = ""
        this.rep_desc = ""
        this.rep_centerid = ""
        this.center_name = ""
        this.citizen_name = ""
        this.showCenterName = false
        this.showAttachImage = false
        this.required_fields = ""
        for(let i = 0; i < this.imagesList.length; i++) {
            this.imagesList.splice(i, (i+1));
        }
        this.handleImages()
        
    },
    hideCancelReport(){
        this.showCancelReportModal = false
    }
  },
    mounted () {
        this.getAllMyIncidentReports()
    },
    computed: {
        filteredReports() {
            return this.myreports.filter((report) => {
                return report.first_name.toLowerCase().match(this.search.toLowerCase()) ||
                report.middle_initial.toLowerCase().match(this.search.toLowerCase()) ||
                report.last_name.toLowerCase().match(this.search.toLowerCase()) ||
                report.individual_type.toLowerCase().match(this.search.toLowerCase()) ||
                report.gender.toLowerCase().match(this.search.toLowerCase()) ||
                report.location.toLowerCase().match(this.search.toLowerCase()) ||
                report.description.toLowerCase().match(this.search.toLowerCase()) || 
                report.center_name.toLowerCase().match(this.search.toLowerCase()) ||
                report.reported_on.toLowerCase().match(this.search.toLowerCase())
            })
        },
        lists () {
            const items = this.myreports
            // Return just page of items needed
            return items.slice(
                (this.currentPage - 1) * this.perPage,
                this.currentPage * this.perPage
            )
        },
        totalRows () {
            return this.myreports.length
        }
    }
}
</script>

<style scoped>
.container{
    margin-left:120px;
    max-width:100%;
    height:800px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  z-index: 100;
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
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
}
.btn-design{
    text-decoration: none;
    background-color:#042331;
    color: white;
    border-radius: 4px;
}
.btn-design:hover{
    background-color: white;
    color: #042331;
    border:1px solid #042331;
}
.err_message{
  color: red;
  font-style: italic;
}
.btn-actions{
    width: 60%;
}
.preview{
    width: 200px;
    height: 100px;
}
.input-guide{
    color:red;
    line-height: 0%;
    font-style: italic;
    font-size: 10pt;
}
.rept_image{
    width: 600px;
    height: 600px;
}
.image_rept{
    cursor: pointer;
}
.image_rept_edit{
    width: 200px;
    height: 200px;
}
.err_message{
  color:red;
  font-style: italic;
}
img.preview{
    max-width:150px;
    max-height:150px;
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
.rept_header{
    font-size: 14px;
    padding: 2px;
    display: flex;
    background-color: #f5f5f0;
}
.rept_info{
    font-size: 14px;
    list-style-type: none;
    width: 125px;
    padding-right: 20px;
}
.rept_images{
    list-style-type: none;
    display: flex;
    padding:0;
    margin:0;
}
.row_header_container{
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
}
.page-item{
    display: flex;
    position: relative;
    z-index: 50;
}
</style>
