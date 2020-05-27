<template>
<div class = "container" id="addForm">
    <sidebar-menu/>
    <div class="section">
        <div class="col-md-12 pt-3 page-title"  id= "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">My Incident Reports</h4>
            <div class="form-group row" id = "search_section">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" v-model = "search" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary btn-design">Go</button>
            </div>
            <button type="button" class = "btn btn-primary btn-design" id="btn_report" @click="showReportIncidentModal=true">Report an Incident</button> 
            <table class="table col-md-12 mx-auto">
                <tr id = "row_header">
                    <td>Date Reported</td>
                    <td>Name of Individual</td>
                    <td>Type of Individual</td>
                    <td>Gender</td>
                    <td>Location of Incident</td>
                    <td>Description of Incident</td>
                    <td>Sent To</td>
                    <td>Status</td>
                </tr>
                <tbody>
                    <!--<tr v-for="report in myreports" v-bind:key="report._id">-->
                    <tr v-for="report in filteredReports" v-bind:key="report._id">
                        <td>{{ formatBirthDate(report.reported_on) }}</td>
                        <td>{{ report.first_name + ' ' + report.middle_initial + ' ' + report.last_name}}</td>
                        <td>{{ report.individual_type }}</td>
                        <td>{{ report.gender }}</td>
                        <td>{{ report.location }}</td>
                        <td>{{ report.description }}</td>
                        <td>{{ report.center_name }}</td>
                        <!--<td><router-link :to="{name: 'EditReportedIncident', params: { id: post._id }}" class="btn btn-primary">Edit</router-link>
                        <button class="btn btn-danger" @click.prevent = "deleteReported(post._id, index)">Remove</button></td>-->
                    </tr>
                </tbody>
            </table>
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
                                    <span aria-hidden="true" @click="showReportIncidentModal=false">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class = "modal-body-section1">
                                    <div class="form-group">
                                        <label for="first_name">Name of Indvidual</label>
                                        <input type="text" v-model="first_name" class="form-control mt-2" id="first_name" placeholder="Enter First Name">
                                        <input type="text" v-model="middle_initial" class="form-control mt-2" id="middle_initial" placeholder="Enter Middle Initial">
                                        <input type="text" v-model="last_name" class="form-control mt-2" id="last_name" placeholder="Enter Last Name">
                                    </div>
                                    <div class="form-group">
                                        <ValidationProvider name = "rep_indivtype" rules="required" v-slot="{ errors }">
                                            <label for="type_of_individual">Type of Individual</label>
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
                                            <label for="Location">Location</label>
                                            <input type="text" placeholder="Type Location" class="form-control" id = "rep_location" name="rep_location" v-model="rep_location" @focus="initAutocomplete()"/>
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
                                            <select class="form-control" id="rep_gender" v-model="rep_gender" placeholder="Select Gender" @mousedown="generateLatLong" @click="filterCenters" @change="filterCenters">
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
                                            <textarea class="form-control" id="rep_desc" rows="3" v-model="rep_desc"></textarea>
                                            <span class = "err_message">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>       
                                    <div class="form-group">
                                            <div v-if="showAttachImage">
                                                <!--<div class="col-md-4">
                                                    <ul class="list-group" :if="images.length">
                                                        <li class="list-group-item" v-for="(f, index) in images" :key="index">
                                                        <button class="close" @click.prevent="removeImage(index, $event)">&times;</button>
                                                        <div class="button success expand radius">
                                                            <label class="custom-file-upload">
                                                            <input type="file" class="images[]" accept="image/*" @change="previewImage(index, $event)">
                                                            </label>
                                                        </div>
                                                        <div :class="'images[' + index + ']-preview image-preview'"></div>
                                                        </li>
                                                    </ul>
                                                    <button class="btn btn-link add-image" @click.prevent="addNewImage">Add Image</button> (max 2 in this demo)
                                                </div>-->
                                                <label for="image">Images (maximum of 4)</label>
                                                    <div v-for="(image, key) in images" :key="key">
                                                        <button class="close" @click.prevent="removeImage(index, $event)">&times;</button>
                                                        <div>
                                                            <img class="preview" :ref="'image'" width="200" height="100"/>
                                                            {{ image.name }}
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/jpeg"
                                                        @change="uploadImage"
                                                    />
                                            </div>
                                            <button type="button" class="btn btn-design" id="attach_image" @click="attachImage()">Attach Image</button>
                                        <!--<input type="text" v-model="incident_image" class="form-control mt-2" name="incident_image" placeholder="">
                                            <button type = "submit" class = "btn btn-primary mt-2 btn-design">Upload Image</button>-->
                                    </div>
                                    <p id="reported_by"></p>
                                    <p v-if="showCenterName">Note: This will be reported to: {{selected_center}}</p>
                                </div>                                        
                            </div>
                            <div class="modal-footer">
                                <div class form-group>
                                    <button class="btn btn-primary mr-3 btn-design" type="submit">Send Report</button>
                                    <button type="button" class="btn btn-secondary" @click="showReportIncidentModal=false">Cancel</button>
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

</div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=getGoogleMapAPI&libraries=geometry,places&callback=initAutocomplete&language=nl&output=json" async defer></script>
<script>
import SideBarMenu from '../components/Sidebar'
import { mapActions, mapGetters } from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import moment from 'moment'
export default {
    components: {
      'sidebar-menu': SideBarMenu,
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
  el: '#reportForm',
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
      centerslist: {},
      rep_centerid:'',
      rep_centername: '',
      distance2: 0,
      fname: '',
      mi: '',
      lname:'',
      citizen_name:'',
      images: [],
      file: [],
      showIncidentRepSuccessModal: false,
      selecter_center: '',
      showCenterName: false,
      showAttachImage: false,
      maxImages: 2,
      addImage: 'button.add-image',
      selectedFiles: []
    }
  },
  methods: {
      ...mapActions(['getAPIkey', 'displayCenters', 'getProfile', 'sendIncidentReport', 'getMyIncidentReports']),
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
        //alert('hello hello hello')
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
            // alert(rep_centername + ' ' + distance2)
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
        this.citizen_name = document.getElementById('reported_by').innerHTML
        for (let i = 0; i < this.images.length; i++) {
            this.file = this.$refs.file.files[i]
        }
        let reportdata = {
            first_name: this.first_name,
            middle_initial: this.middle_initial,
            last_name: this.last_name,
            location: this.rep_location,
            individual_type: this.rep_indivtype,
            gender: this.rep_gender,
            description: this.rep_desc,
            center_id: this.rep_centerid,
            center_name: this.rep_centername,
            reported_by: this.citizen_name,
            user_id: this.id,
            distance: this.distance2      
            }
        let fd = new FormData()
        fd.append('report_data', reportdata)
        fd.append('image_files',this.file)
        alert('hello')
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
        
    },
    attachImage(){
        if(this.showAttachImage === false){
            this.showAttachImage = true
            document.getElementById('attach_image').innerHTML = "Cancel"
        } else {
            this.showAttachImage = false
            document.getElementById('attach_image').innerHTML = "Attach Image"
        }
    },
    uploadImage(e) {
      if(this.images.length === 4) {
          alert('You can only upload up to 4 images.')
      } else {
        let vm = this;
        this.selectedFiles = e.target.files;
        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.images.push(this.selectedFiles[i]);
            //alert(selectedFiles[i])
        }
        for (let i = 0; i < this.images.length; i++) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.$refs.image[i].src = reader.result;
                console.log(this.$refs.image[i].src);
            };
            reader.readAsDataURL(this.images[i]);
        }
      }
    },
    addNewImage(e) {
      var n = this.maxImages || -1;
      if (n && this.images.length < n) {
        this.images.push('');
      }
      this.checkImages();
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.$refs.image[index].name = ""
    },
    checkImages() {
      var n = this.maxImages || -1;
      if (n && this.images.length >= n) {
        $(this.addImage, this.el).prop('disabled', true);  // Disables the button.
      } else {
        $(this.addImage, this.el).prop('disabled', false); // Enables the button.
      }
    },
    previewImage(index, e) {
      var r = new FileReader(),
        f = e.target.files[0];
      r.addEventListener('load', function() {
        $('[class~="images[' + index + ']-preview"]', this.el).html(
          '<img src="' + r.result + '" class="thumbnail img-responsive">'
        );
      }, false);
      if (f) {
        r.readAsDataURL(f);
      }
    }

  },
    mounted(){
        this.getMyIncidentReports(this.id)
        .then(res => {
            this.myreports = res.data
        })
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
.modal-body-section1, .modal-body-section2{
  float: left;
  padding-right: 20px;
  width:100%;
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
</style>
