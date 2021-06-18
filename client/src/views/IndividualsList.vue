<template>
<div class = "container">
    <sidebar-menu/>
    <div class="main">
        <div class="col-md-12 pt-3 page-title"  id= "menu_content">
          <div class = "header_section">
            <h4 class ="mb-4" id = "label_reported_incidents">List of Individuals</h4>
            <div class="form-group row" id = "search_section" style="display:flex;">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" v-model = "search" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary btn-design">Go</button>
            </div>
          </div>
          <div class="section">
            <div class = "custody-type centers col-sm-4 mt-3">
               <b-card text-variant="white" title="In Custody" class="cards">
                <b-card-text>
                   List of all the individuals in the center
                </b-card-text>
                <router-link to="/individualslist/incustody" class="btn btn-primary">Click here</router-link>
              </b-card>
            </div>
            <div class = "custody-type centers col-sm-4 mt-3">
              <b-card text-variant="white" title="Released" class="cards">
                <b-card-text>
                   List of all the individuals released from the center
                </b-card-text>
                <router-link to="/individualslist/released" class="btn btn-primary">Click here</router-link>
              </b-card>
            </div>
            <div class = "custody-type centers col-sm-4 mt-3">
              <b-card text-variant="white" title="Master List" class="cards">
                <b-card-text>
                   List of all the individuals in and release from the center
                </b-card-text>
                <router-link to="/individualslist/masterlist" class="btn btn-primary">Click here</router-link>
              </b-card>
            </div>
        </div>
        
    </div>

</div>
</div>
</template>
<script>
import SideBarMenu from '../components/Sidebar'
import { mapActions, mapGetters } from 'vuex'
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
import moment from 'moment'
export default {
    components: {
      'sidebar-menu': SideBarMenu
      // VueGoogleAutocomplete
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
      incidentrepdata: [],
      rptimg1: "",
      rptimg2: "" ,
      h_size: "",
      w_size: "",
      rept_image: "",
      showZoomInImageModal: false,
      showCancelBtn: false,
      showSaveBtn: false,
      showUpdateBtn: true,
      incidentrepdata_id: "",
      status_update: "",
      status_assigned: "",
      showConfirmUpdateModal: false,
      savebtn_id: ''
    }
  },
  methods: {
    ...mapActions(['getCenterIncidentReports', 'getReportedIncident','saveUpdatedIncidentReport','saveUpdatedIncidentReport2']),
    formatDate (date) {
        return moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY')
    },
    getReportImages(pic){
        return require('@/assets/images/' + pic)
    },
      getValueByKey(v, i) {
      if(i === 'image_name') {
          //let myimg = v
          this.rptimg1 = v
      }
    },
    showReportImage(){
        return this.rptimg1
    },
    getValueByKey2(v, i) {
        if(i === 'image_name') {
            //let myimg = v
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
    enableSaveBtn(id){
      document.getElementById(id).disabled = false
      this.status_assigned = document.getElementById()
      this.savebtn_id = id
    },
    updateIncidentReportStatus(){
      this.selectStatus = document.getElementById('rep_status');
      this.assigned_status = this.selectStatus.value
      this.selectStatus.disabled = false
      this.showCancelBtn=true; 
      this.showSaveBtn=true; 
      this.showUpdateBtn=false
    },
    cancelUpdateIncidentRepStatus(){ 
      this.showConfirmUpdateModal = false
    },
    saveIncidentReport(id){
      this.getReportedIncident(id)
      .then(res => {
        this.status_update = document.getElementById('rep_status').value;
        let center_uid = this.id
        this.incidentrepdata_id = res.data
       
        if(this.status_update === 'Viewed') {
          let updatedincidentrep = {
            user_id: id,
            center_userid: center_uid,
            report_id: this.incidentrepdata_id._id,
            first_name: this.incidentrepdata_id.first_name,
            middle_initial: this.incidentrepdata_id.middle_initial,
            last_name: this.incidentrepdata_id.last_name,
            individual_type: this.incidentrepdata_id.individual_type,
            gender: this.incidentrepdata_id.gender,
            location: this.incidentrepdata_id.location,
            description: this.incidentrepdata_id.description,
            status: this.status_update,
            image1_data: this.incidentrepdata_id.report_image1.data,
            image1_type: this.incidentrepdata_id.report_image1.contentType,
            image1_path: this.incidentrepdata_id.report_image1.image_path,
            image1_name: this.incidentrepdata_id.report_image1.image_name,
            image2_data: this.incidentrepdata_id.report_image2.data,
            image2_type: this.incidentrepdata_id.report_image2.contentType,
            image2_path: this.incidentrepdata_id.report_image2.image_path,
            image2_name: this.incidentrepdata_id.report_image2.image_name
          }
          this.saveUpdatedIncidentReport(updatedincidentrep)
          .then(res => {
            console.log(res.data)
            alert("Incident report successfully updated...")
            this.showSaveBtn = false
          })
        } else {
          let updatedincidentrep = {
            center_userid: center_uid,
            report_id: this.incidentrepdata_id._id,
            status: this.status_update
          }
          this.saveUpdatedIncidentReport2(updatedincidentrep)
          .then(res => {
            console.log(res.data)
            alert("Incident report successfully updated...")
            this.showSaveBtn = false
            this.showCancelBtn = false
            this.showUpdateBtn = true
            this.selectStatus = document.getElementById('rep_status');
            this.selectStatus.disabled = true
          })
        }
      })
    }
  },
  mounted() {
    this.getCenterIncidentReports(this.id)
    .then(res => {
          this.incidentrepdata = res.data
    })
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
.btn-actions{
    width: 60%;
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
.rept_header{
    font-size: 14px;
    padding: 0;
    display: flex;
}
.rept_info{
    font-size: 14px;
    list-style-type: none;
    width: 170px;
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
#display{
  display: inline;
}
#filter_status{
  display: inline;
}
.header_section{
  border-bottom: 1px solid gray;
}
.cards{
    background: #042331;
    font-size: 20px;
}
.section{
  display: flex;
}
</style>
