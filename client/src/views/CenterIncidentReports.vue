<template>
<div class = "container">
    <sidebar-menu/>
    <div class="section">
        <div class="col-md-12 pt-3 page-title"  id= "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">Incident Reports</h4>
            <div class="form-group row" id = "search_section">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" v-model = "search" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary btn-design">Go</button>
            </div>
            <table class="table col-md-12 mx-auto">
                <tr id = "row_header">
                    <td>Date Reported</td>
                    <td>Name of Individual</td>
                    <td>Type of Individual</td>
                    <td>Gender</td>
                    <td>Location of Incident</td>
                    <td>Description of Incident</td>
                    <td>Status</td>
                    <td></td>
                </tr>
                <tbody>
                    <tr v-for="center_rep in incidentrepdata" v-bind:key="center_rep._id">
                      <td>{{formatDate(center_rep.reported_on)}}</td>
                      <td>{{center_rep.first_name + ' ' + center_rep.middle_initial + ' ' + center_rep.last_name}}</td>
                      <td>{{center_rep.individual_type}}</td>
                      <td>{{center_rep.gender}}</td>
                      <td>{{center_rep.location}}</td>
                      <td>{{center_rep.description}}</td>
                      <td>{{center_rep.status}}</td>
                    </tr>
                </tbody>
            </table>
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
      incidentrepdata: [] 
    }
  },
  methods: {
      ...mapActions(['getCenterIncidentReports']),
      formatDate (date) {
          return moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY')
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
    width: 70%;
}
</style>
