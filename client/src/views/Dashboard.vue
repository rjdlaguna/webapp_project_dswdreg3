<template>
<div class = "container">
    <sidebar-menu/>
    <div class="page_title">
        <div class="col-md-12 pt-3" id = "menu_content">
            <h4 class = "mb-4" id = "dashboard_label">Dashboard</h4>
        </div>
    </div>
    <div class = "row">
        
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
}
.page_title{
    margin-left: 10px;
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
.b-button{
    background: #063146;
}
</style>
