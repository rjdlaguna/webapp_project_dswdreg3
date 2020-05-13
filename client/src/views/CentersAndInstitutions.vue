<template>
    <div class = "main">
        <app-navbar/>
    <div class="container">
        <!--<div id = "menu">
        <b-dropdown id="dropdown1" text="INCIDENT REPORTS" variant = "none text-white" class="m-md-2 pl-5">
            <b-dropdown-item><li><router-link to = "/incidentreports" id = "incident_list_link" class = "menu_link">Reported Incidents List</router-link></li></b-dropdown-item>
            <b-dropdown-item><router-link to = "/reportincident" id = "report_incident_link" class = "menu_link">Report An Incident</router-link></b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
        <ul class = "nav list-inline">
            <li class = "list-inline-item"><router-link to= "/centersandinstitutions" class = "nav-link text-white">CENTERS AND INSTITUTIONS</router-link></li>
            <li class = "list-inline-item"><router-link to= "/aboutcenters" class = "nav-link text-white">ABOUT</router-link></li>
        </ul>
        </div>-->
        <div class="col-md-12 pt-3" id = "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">CENTERS AND INSTITUTIONS</h4>
            <div class="form-group row" id = "search_section">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" type="text" value="" id="search_input">
                </div>
                <button type="submit" class="btn btn-primary">Go</button>
            </div>
        </div>
        <hr/>
        <div class = "col-md-10">
            <button type = "button" class = "btn btn-primary mb-3" v-if = 'isAdmin'><router-link to = "/registercenter" class = "nav-link">Add New Center</router-link></button>
            <!--<table>
                <tr>
                    <td class = "centers">
                        <router-link to="#" class = "centers_link">
                            <img class = "align-center" :src="require('../assets/images/center1.jpg')" width="150" height="150" alt="" id = "centers_icon1"/>
                            <span class = "text-center">Haven Pampanga</span>
                        </router-link>
                    </td>
                    <td class = "centers">
                        <router-link to = "#" class = "centers_link">
                            <img :src="require('../assets/images/center2.jpg')" width="150" height="150" alt="" id = "centers_icon1"/>
                            <span class = "text-center" id = "center_name1">RRCY Pampanga</span>
                        </router-link>
                    </td>
                </tr>
            </table> -->

            <!---Haven-->
            <div class = "row">
                <div class = "centers col-sm-4" v-for="center in centerslist" v-bind:key = center._id>
                    <b-card
                        :title="center.center_name"
                        :img-src="image_path1 + center.image_path + image_path2"
                        :img-alt="image_path1 + center.image_path + image_path2"
                        img-height=110
                        img-top
                        tag="article"
                        style="max-width: 18rem;"
                        class="mb-2"
                    >
                        <b-card-text>
                        {{center.center_desc + ' ' + image_path1 + center.image_path + image_path2}}
                        </b-card-text>
                        <b-button href="#" variant="primary" class = "btn_center_details">See Details</b-button>
                        <b-button href="#" variant  ="primary" class = "btn_report_incident">Report An Incident</b-button>
                    </b-card>
                </div>
                <!--RRCY-->
                <div class = "centers col-sm-4">
                    <b-card
                        title="RRCY Pampanga"
                        :img-src="require('../assets/images/center2.jpg')"
                        img-alt="Image"
                        img-height=110
                        img-top
                        tag="article"
                        style="max-width: 18rem;"

                        class="mb-2"
                    >
                        <b-card-text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>

                        <b-button href="#" variant="primary" class = "btn_center_details">See Details</b-button>
                        <b-button href="#" variant="primary" class = "btn_report_incident">Report An Incident</b-button>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
// import jwtDecode from 'jwt-decode'
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
export default {
    components: {
        'app-navbar': Navbar
    },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    this.showAddCenter()
    this.displayCenters()
  },
  methods: {
    displayCenters () {
      axios.get('users/listofcenters')
        .then(res => {
          this.centerslist = res.data
        })
    },
    showAddCenter () {
      if (this.user.user_type === 'admin') {
        this.isAdmin = true
      }
    },
    computed: {
      /* retrievedCenters: function () {
        return this.centerslist.filter((center) => {
          return center.first_name.toLowerCase().match(this.search) ||
          report.last_name.toLowerCase().match(this.search) ||
          report.individual_type.toLowerCase().match(this.search) ||
          report.gender.toLowerCase().match(this.search) ||
          // report.location.blk_st_brgy.toLowerCase().match(this.search) ||
          // report.location.city_town.toLowerCase().match(this.search) ||
          // report.location.province.toLowerCase().match(this.search) ||
          report.location.toLowerCase().match(this.search) ||
          report.description.toLowerCase().match(this.search)
        })
      } */
    }
  },
  data () {
    // const token = localStorage.usertoken
    // const decoded = jwtDecode(token)
    return {
      // first_name: decoded.first_name,
      // last_name: decoded.last_name,
      // email: decoded.email
      isAdmin: false,
      centerslist: {},
      index: 0,
      image_path1: "require('",
      image_path2: "')",
      image_fullpath: ''
    }
  }
}
</script>

<style scoped>
.container{
    max-width:100%;
    height:600px;
    position:relative;
    color: #000066;
}
ul{
    list-style-type: none;
}
#dropdown1{
    float: left;
}
li a:hover{
    text-decoration: none;
    color:white;
    background: #0073e6;
    border-radius: 5px;
    color: #000066;
}

li{
    padding-top:0.5em;
    padding-bottom:0.5em;
}

#menu{
    background: #80bfff;
    margin-left:-0.95em;
    margin-right:-0.95em;
}
tr{
    font-weight: 400;
    color:#0073e6;
}
#label_reported_incidents{
    color: #0073e6;
    float: left;
}
#search_section{
    justify-content:flex-end;
    color:#0073e6;
}
td{
    padding-right:5em;
    margin-right:10em;
    border: 0.2em solid  #000066;
    border-radius: 50px;
}
/*
.centers_link:hover{
    border: 2px solid #0073e6;
    padding:0em 2.5em 0em 2.5em;
    padding:4em 0em 4em 0em;
    border-radius: 20px;
    color: #000066;
}*/
#label_reported_incidents, .col-form-label, .centers_link {
    color: #000066;
}
.nav-link{
    color:white;
}
.centers {
    margin-right:-4em;
}
.btn_center_details, .btn_report_incident {
    font-size:10pt;
}
</style>
