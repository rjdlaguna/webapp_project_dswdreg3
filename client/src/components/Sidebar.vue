<template>
  <div class = "sidebar">
    <div class = "header">
      <router-link to="/home">
        <img :src="require('../assets/images/dswd_logo.png')" height="30" width="30">
        <p id = "dswd_name">DSWD INCIDENT REPORTING</p>
      </router-link>
    </div>
    <div class = "nav">
      <ul class = "nav-link">
        <li class="nav-link-item">
          <router-link to=""><i class = "fas fa-user-circle fa-3x"></i><br />Profile</router-link>
            <ul class = "nav-sublink">
              <li id = "header_profile"><h3>Profile</h3></li>
              <li id = "profile_name">{{ user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}}</li>
              <li class = "nav-sublink-item" id = "sublink1">
                <router-link :to="{name: 'userprofile', params: {id: user._id}}">Account Details</router-link>
              </li>
              <li class = "nav-sublink-item">
                <button type="button" id="btn_logout" class="btn ml-5" @click="logoutUser">Logout</button>
              </li>
            </ul>
        </li>
        <li class="nav-link-item">
          <router-link to ="/dashboard"><i class = "fas fa-tachometer-alt fa-3x"></i><br />Dashboard</router-link>
          </li>
        <li class="nav-link-item">
          <router-link to = "/centersinstitutionslist"><i class = "fas fa-house-user fa-3x"></i><br />Centers & Insitutions</router-link></li>
        <li class="nav-link-item">
          <router-link to = "/myincidentreports"><i class = "fas fa-blender-phone fa-3x"></i><br />My Reports</router-link></li>
        <li class="nav-link-items">
          <router-link><i class = "fas fa-home"></i><br />SETTINGS</router-link>
          </li>
      </ul>
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
// import { mapGetters } from 'vuex'
export default {
  /*computed: mapGetters([
    'isLoggedIn',
    'user'
  ]),*/
  computed: mapGetters([
    'user'
    ]),
  data () {
    return {
      userLoggedIn: 0,
      fname: '',
      lname: '',
      fullname:'',
      showLogoutModal: false
    }
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser () {
      this.$store.dispatch('logout')
      this.userLoggedIn = this.$store.getters.isLoggedIn
      router.push('/')
    },
    forceRerender () {
      this.userLoggedIn += 1
    },
    ...mapActions(['getProfile'])
  },
  created() {
    this.getProfile();
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
  }

.nav ul li > ul { 
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  position: absolute; 
  background-color: #fff; 
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
.nav ul li > ul #sublink1{
  padding-top: 10px;
}
.sublinks{
position: absolute;
z-index: 100;
}
#header_profile{
  margin-top:30px;
  text-align: center;
}
#profile_name {
  text-align: center;
}

#btn_logout, #btn_change_pass{
  background:#fff;
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
</style>>
