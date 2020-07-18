<template>
    <div class = "main">
        <div class = "container">
            <sidebar-menu/>
            <div class="page_title">
                <div class="col-md-12 pt-3" id = "menu_content">
                    <h4 class = "mb-4" id = "dashboard_label">Dashboard</h4>
                </div>
            </div>
            <div class = "section">
                <div class = "page_content centers col-sm-4 mt-3">
                    <b-card text-variant="white" class="cards">
                        <h1>{{countReports}}</h1>
                        <b-card-text>
                            Number of Incidents You Reported 
                        </b-card-text>
                    </b-card>
                </div>
                <div class = "page_content centers col-sm-4 mt-3">
                    <b-card text-variant="white" class="cards">
                        <h1>{{countCenters}}</h1>
                        <b-card-text>
                            Number of Centers and Institutions 
                        </b-card-text>
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
import { mapActions } from 'vuex'
//import axios from 'axios'
export default {
    name: 'dashboard',
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
      reportslist: [],
      centerslist: []
    }
  },
  methods: {
      ...mapActions(['getMyIncidentReports', 'displayCenters'])
  },
  created () {
      this.getMyIncidentReports(this.id)
      .then(res => {
          this.reportslist = res.data
      })

    this.displayCenters()
    .then(res => {
        this.centerslist = res.data
    })
  },
  components: {
      'sidebar-menu': SideBarMenu,
      'app-footer': Footer
  },
  computed : {
      countReports () {
          return this.reportslist && this.reportslist.length
      },
      countCenters () {
          return this.centerslist && this.centerslist.length
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
.page_content{
    float: left;
}
.b-button{
    background: #063146;
}
.cards{
    background: #042331;
    padding: 2em 0 3em 0;
}
</style>
