<template>
    <div class = "main">
    <app-navbar/>
    <div class="container">
        <!--<div id = "menu">
        <b-dropdown id="dropdown1" text="INCIDENT REPORTS" variant = "none text-white" class="m-md-2 pl-5">
            <b-dropdown-item><li><router-link to = "/incidentreports" id = "incident_list_link" class = "menu_link">Reported Incidents List</router-link></li></b-dropdown-item>
            <b-dropdown-item><router-link to = "/reportincident" id = "report_incident_link" class = "menu_link">Report An Incident</router-link></b-dropdown-item>
        </b-dropdown>
        <ul class = "nav list-inline">
            <li class = "list-inline-item"><router-link to= "/centersandinstitutions" class = "nav-link text-white">CENTERS AND INSTITUTIONS</router-link></li>
            <li class = "list-inline-item"><router-link to= "/aboutcenters" class = "nav-link text-white">ABOUT</router-link></li>
        </ul>
        </div>-->
        <div class="col-md-12 pt-3" id = "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">About the Centers and Institutions</h4>
        </div>
        <br /> <br /> <br />
        <div class = "col-md-12" id = "about_area">
            <p id = "about_info1" class = "about_centers">The Department of Social Welfare and Development (DSWD) has been providing residential care services to disadvantaged and vulnerable sectors and training and rehabilitation for persons with disabilities through the establishment of its centers and residential care facilities since the early 1950s.</p>
            <br />
            <p id = "about_info2" class = "about_centers">Children in residential care of 915 private social welfare agencies licensed by the DSWD, 177 agencies operate a total of 197 residential care facilities for children, the majority of which institutions cater to abandoned, neglected and abused children with an average capacity of 30-40 beds. Funds are generated mostly from international funding agencies and the private sector. These institutions are not subsidized by the government. (See separate publication.) On the other hand, the DSWD operates 46 residential facilities for children nationwide. Eleven of these serve abandoned or neglected children aged 0-7 years, 11 are for children in conflict with the law, 15 are for girl victims of sexual/physical abuse, and the rest are for street children and other victims of various forms of child abuse. These facilities have an average capacity of 50 beds, except for the National Center for the Mentally Challenged (Elsie Gaches Village) with 400-490 beds, and another two for abandoned and sexually abused children that have 125 beds each. However, current admissions exceed the capacity of these centers. (See separate publication.) The Local Government Units from the 13 regions registered a total of 63 residential facilities, of which three are for drug dependents; five are for children in conflict with the law; six are for abandoned/neglected; 19 are for victims of sexual/physical abuse, prostitution, trafficking and other forms of abuse; 23 are for street children; and seven cater to all other categories of children. The biggest facility can accommodate up to 200 children while the smallest only four.</p>
        </div>
    </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  data () {
    // const token = localStorage.usertoken
    // const decoded = jwtDecode(token)
    return {
      // first_name: decoded.first_name,
      // last_name: decoded.last_name,
      // email: decoded.email
    }
  },
  components: {
      'app-navbar': Navbar
  }
}
</script>

<style scoped>
.container{
    max-width:100%;
    height:600px;
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
    border-bottom:1px solid #0073e6;
}
#label_reported_incidents{
    color: #063146;
    float: left;
}
#about_area{
    color: #063146;
    text-align: justify;
}
#about_info1:first-letter , #about_info2:first-letter {
    color: #063146;
    float: left;
    font-family: Georgia;
    font-size: 75px;
    line-height: 60px;
    padding-top: 4px;
    padding-right: 8px;
    padding-left: 3px;
}
</style>
