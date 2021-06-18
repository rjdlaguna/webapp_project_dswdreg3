<template>
<div class = "main">
<div class = "container">
    <sidebar-menu/>
    <div class="page_title">
        <div class="col-md-12 pt-3" id = "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">DSWD Incident Reporting</h4>
        </div>
    </div>
    <div class = "section">
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card text-variant="white" title="Dashboard" class="cards">
                <b-card-text>
                    Display the number of incidents you reported and the number of centers and institutions. 
                </b-card-text>
                <router-link :to="{name:'dashboard', params:{id: user._id}}" class="btn btn-primary">Click here</router-link>
            </b-card>
        </div>
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card text-variant="white" title="Centers and Institutions" class="cards">
                <b-card-text>
                    Enable to report to specific centers or institution. Displays the different centers and institutions in Region III.
                </b-card-text>
                <router-link :to="{name:'centersinstitutionslist', params:{uid:user._id}}" class="btn btn-primary">Click here</router-link>
            </b-card>
        </div>
        <div class = "page_content centers col-sm-4 mt-3">
            <b-card text-variant="white" title="My Incident Reports" class="cards">
                <b-card-text>
                    Enable you to send report an incident and show all the incidents you have reported.
                </b-card-text>
                <router-link :to="{name:'myincidentreports', params:{id:user._id}}" class="btn btn-primary">Click here</router-link>
            </b-card>
        </div>
    </div>
</div>
<app-footer/>
</div>
</template>

<script>
import SideBarMenu from '../components/Sidebar'
import Footer from '../components/Footer'
import { mapActions, mapGetters } from 'vuex'
//import axios from 'axios'
export default {
    name: 'home',
    /*props: {
        id: {
            required: true
        }
    },*/
  data () {
    return {
      first_name: '',
      last_name: '',
      user_id: '',
      email: '',
      search: '',
      index: 0,
      reportslist: [],
      user_data: {}
    }
  },
  computed: mapGetters([
    'user'
    ]),
  methods: {
      ...mapActions(['getProfile'])
  },
  components: {
      'sidebar-menu': SideBarMenu,
      'app-footer': Footer
  },
  mounted() {
    this.getProfile()
    .then(res => {
      this.user_data = res.data
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
.cards{
    background: #042331;
}
</style>
