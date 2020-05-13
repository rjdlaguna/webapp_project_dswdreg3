<template>
<div class = "container">
    <sidebar-menu/>
    <div class="section">
        <div class="col-md-12 pt-3 page-title"  id= "menu_content">
            <h4 class = "mb-4" id = "label_reported_incidents">My Incident Reports</h4>
            <div class="form-group row" id = "search_section">
                <label for="search" class="col-form-label">Search</label>
                <div class="col-4">
                    <input class="form-control" v-model = "search" type="text" value="" id="search" name = "search">
                </div>
                <button type="submit" class="btn btn-primary">Go</button>
            </div>
            <router-link to="/reportanincident" class = "btn btn-primary" id="btn_report">Report an Incident</router-link> 
            <table class="table col-md-12 mx-auto">
                <tr id = "row_header">
                    <td>Date Reported</td>
                    <td>Name of Individual</td>
                    <td>Type of Individual</td>
                    <td>Gender</td>
                    <td>Location of Incident</td>
                    <td>Description of Incident</td>
                    <td>Center In-charge</td>
                    <td>Action Taken</td>
                </tr>
                <tbody>
                    
                </tbody>
            </table>
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
</style>
