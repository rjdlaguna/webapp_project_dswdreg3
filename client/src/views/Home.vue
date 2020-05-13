<template>
<div class = "container">
    <sidebar-menu/>
    <div class="page_title">
        <div class="col-md-12 pt-3" id = "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">DSWD Incident Reporting</h4>
        </div>
    </div>
    <div class = "section">
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card bg-variant="dark" text-variant="white" title="Dashboard">
                <b-card-text>
                    Display the number of incidents reported in the Region III and number of centers and institutions. 
                </b-card-text>
                <b-button href="#" variant="primary">Click here</b-button>
            </b-card>
        </div>
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card bg-variant="dark" text-variant="white" title="Centers and Institutions">
                <b-card-text>
                    Enable to report to specific centers or institution. Displays the different centers and institutions in Region III.
                </b-card-text>
                <b-button href="#" variant="primary">Click here</b-button>
            </b-card>
        </div>
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card bg-variant="dark" text-variant="white" title="My Incident Reports">
                <b-card-text>
                    Enable you to send report an incident and show all the incidents you have reported.
                </b-card-text>
                <b-button href="#" variant="primary">Click here</b-button>
            </b-card>
        </div>
    </div>
</div>
</template>

<script>
import SideBarMenu from '../components/Sidebar'
//import axios from 'axios'
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      user_id: '',
      email: '',
      search: '',
      index: 0,
      reportslist: []
    }
  },
  methods: {
    
  },
  components: {
      'sidebar-menu': SideBarMenu
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
    z-index: -4;
}
.page_title{
    margin-left: 10px;
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
.page_content{
    float: left;
}

.b-button{
    background: #063146;
}
</style>
