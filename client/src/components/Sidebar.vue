<template>
  <div class = "sidebar">
    <div class = "header">
      <router-link :to="{name:'home'}">
        <img :src="require('../assets/images/dswd_logo.png')" height="30" width="30">
        <p id = "dswd_name">DSWD INCIDENT REPORTING</p>
      </router-link>
    </div>
    <div class = "nav">
      <ul class = "nav-link">
        <li class="nav-link-item">
          <b-button v-b-toggle.sidebar-backdrop variant="light">
            <img :src="getPicURL(displayImage.image_name)" name ="profile_image" id="profile_image" class = "m-auto" width = "50" height = "50"/>
            <br/>
            Profile
          </b-button>
          <b-sidebar
            id="sidebar-backdrop"
            title="Profile"
            :backdrop-variant="variant"
            backdrop
            shadow
          >
            <div>
              <ul class = "nav-sublink">
                <!--<li id = "header_profile">
                  <h3>Profile</h3>
                </li>-->
                <li id = "profile_name">{{ convertToUpperCase(user_data.user.first_name) + ' ' + convertToUpperCase(user_data.user.last_name)}}</li>
                <li class = "nav-sublink-item" id = "sublink1">
                  <router-link :to="{name: 'userprofile', params:{id: user_data.user._id}}">Account Details</router-link>
                  <p id="centerID" style="display:none">{{user_data.user.center_id}}</p>
                </li>
                <li class="nav-sublink-item" id="sublink3">
                  <router-link :to="{name: 'userlogs', params:{id: user_data.user._id}}">My Logs</router-link>
                </li>
                <li class = "nav-sublink-item" id ="sublink2">
                  <button type="button" id="btn_logout" class="btn ml-5" @click="logoutUser">Logout</button>
                </li>
              </ul>
            </div>

          </b-sidebar>
          <!--</router-link>-->
            <ul class = "nav-sublink">
              <li id = "header_profile">
                <h3>Profile</h3>
              </li>
              <li id = "profile_name">{{ convertToUpperCase(user_data.user.first_name) + ' ' + convertToUpperCase(user_data.user.last_name)}}</li>
              <li class = "nav-sublink-item" id = "sublink1">
                <router-link :to="{name: 'userprofile', params:{id: user_data.user._id}}">Account Details</router-link>
                <p id="centerID" style="display:none">{{user_data.user.center_id}}</p>
              </li>
              <li class="nav-sublink-item" id="sublink3">
                <router-link :to="{name: 'userlogs', params:{id: user_data.user._id}}">My Logs</router-link>
              </li>
              <li class = "nav-sublink-item" id ="sublink2">
                <button type="button" id="btn_logout" class="btn ml-5" @click="logoutUser">Logout</button>
              </li>
            </ul>
        </li>
        <li class="nav-link-item">
          <router-link :to ="{name: 'dashboard', params:{id: user_data.user._id}}"><i class = "fas fa-tachometer-alt fa-3x"></i>Dashboard</router-link>
          </li>
        <li class="nav-link-item">
          <router-link :to ="{name: 'centersinstitutionslist',params:{uid: user_data.user._id}}"><i class = "fas fa-house-user fa-3x"></i><br />Centers & Insitutions</router-link>
          <ul v-if="user_data.user.user_type == 'employee' || user_data.user.user_type=='center_head'" class = "nav-sublink">
              <li id = "header_center">
                <h5>Centers & Institutions</h5>
              </li>
              <li id = "center_profile">{{this.center_data.center_name}}</li>
              <li v-if="user.user_type=='center_head'" class = "nav-sublink-item" id = "sublink3">
                <router-link :to="{name: 'centersemployees', params:{id:center_data._id}}">Employees</router-link>
              </li>
              <li class = "nav-sublink-item" id = "sublink4">
                <router-link to="/individualslist">List of Individuals</router-link>
              </li>
          </ul>
        </li>
        <li class="nav-link-item">
          <router-link v-if="user_data.user.user_type==='citizen'" :to="{name:'myincidentreports', params:{id: user_data.user._id}}"><i class = "fas fa-blender-phone fa-3x"></i><br />My Incident Reports</router-link>
          <router-link v-if="user_data.user.user_type=='employee'|| user_data.user.user_type=='center_head'" :to="{name:'centerincidentreports', params:{id: center_data._id}}"><i class = "fas fa-blender-phone fa-3x"></i><br />Incident Reports</router-link>
          <router-link v-if="user_data.user.user_type=='admin'" to=""><i class = "fas fa-blender-phone fa-3x"></i><br />Incident Reports</router-link>
          </li>
        <li class="nav-link-items">
          <router-link v-if="user_data.user.user_type=='admin'" to=""><i class = "fas fa-home"></i><br />SETTINGS</router-link>
          </li>
      </ul>
    </div>
    
    <div>
      
    </div>
    <!--<div v-if="showLogoutModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Logout User</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showLogoutModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p>You have successfully logged out.</p>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" class="btn btn-secondary" @click="showLogoutModal=false">Close</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>-->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
import router from '../router/index'
export default {
  computed: mapGetters([
    'user',
    'isLoggedIn'
    ]),
  data () {
    return {
      userLoggedIn: '',
      fname: '',
      lname: '',
      fullname:'',
      showLogoutModal: false,
      user_data: {},
      center_data: {},
      displayImage: '',
      id: ''
    }
  },
  methods: {
    ...mapActions(['logout','getProfile', 'getCenterProfile', 'displayProfilePic']),
    logoutUser () {
      this.$store.dispatch('logout')
      this.userLoggedIn = this.$store.getters.isLoggedIn
      router.push('/')
    },
    forceRerender () {
      this.userLoggedIn += 1
    },
    convertToUpperCase(name){
      let strUpper = name;
      return strUpper;
    },
    getPicURL(pic){
      return require('@/assets/images/' + pic)
    }
  },
  beforeMount() {
    this.id = this.user._id
    this.displayProfilePic(this.id).then(res => {
      this.displayImage = res.data
    })
  },
  mounted() {
    this.getProfile()
    .then(res => {
      this.user_data = res.data
      //this.centerID = document.getElementById('centerID').innerHTML;
      if(this.user.user_type === "employee" || this.user.user_type === "center_head")
      {
        this.getCenterProfile(this.centerID)
        .then(res => {
          this.center_data = res.data  
        })
      }

    })
  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

.sidebar{
  position: fixed;
  left: 0;
  width: 140px;
  height: 100%;
  background: #042331;
  z-index: 999;
}

.sidebar .header{
  text-align: center;
  padding:1em;
  color:white;
  background: #063146;
  width: 100%;
  font-size: 10pt;
}

.sidebar .header a{
  text-decoration: none;
  color:white;
}

.sidebar .nav-link a{
  display: block;
  height: 100%;
  width: 100%;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  color:white;
  text-decoration: none;
  box-sizing: border-box;
  border-top: 1px solid rgba(255,255,255,.1);
}

.sidebar .nav-link a:hover{
   background: #063146;
}
.sidebar .nav-link .nav-link-item{
  line-height: 30px;
  margin-bottom: 20px;
}
.sidebar .nav-link .nav-link-item .nav-sublink .nav-sublink-item a{
  color: #063146;
}
.sidebar .nav-link .nav-link-item .nav-sublink .nav-sublink-item a:hover{
  color: #fff;
  background: #063146;
}

#dswd_name{
  font-weight: bold;
}
/*
.nav ul li:hover > ul { 
  left: 140px; 
  -webkit-transition: left 300ms ease-in; 
  -moz-transition: left 300ms ease-in; 
  -ms-transition: left 300ms ease-in; 
  transition: left 300ms ease-in; 
  overflow: hidden;
  position: absolute;
  z-index: 999;
  opacity: 1;
  background-color: #fff; 
  }
*/
.nav ul li > ul { 
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  position: absolute; 
  top: 0; 
  left: -200px; 
  min-width: 200px; 
  z-index: -1; 
  height: 100%; 
  -webkit-transition: left 300ms ease-in; 
  -moz-transition: left 300ms ease-in; 
  -ms-transition: left 300ms ease-in; 
  transition: left 300ms ease-in; 
  z-index: -1;
  opacity: 1;
}

.nav ul li > ul #sublink1, .nav ul li > ul #sublink3{
  padding-top: 10px;
}
.sublinks{
position: absolute;
z-index: 100;
}
#header_profile, #header_center{
  margin-top:30px;
  text-align: center;
}
#profile_name, #center_profile {
  text-align: center;
}

#btn_logout, #btn_change_pass{
  color:#063146;
  font-weight:bold;
  margin: 0;
}

#btn_logout:hover, #btn_change_pass:hover{
  background:#063146;
  color:#fff;
  font-weight:bold;
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
  z-index: 1;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-title, .modal-body {
  color:#042331;
}
#profile_image{
  border-radius: 25px;
}
</style>>
