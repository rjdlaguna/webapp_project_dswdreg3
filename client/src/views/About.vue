<template>
  <div class = "sidebar">
    <app-navbar/>
    <div class = "header">
      <router-link to="/about">
        <img :src="require('../assets/images/dswd_logo.png')" height="50" width="50">
        <p id = "dswd_name">DSWD REGION 3</p>
      </router-link>
    </div>
    <div class = "nav">

      <ul class = "nav-link">
        <li class="nav-link-item">
          <router-link to="/about"><i class = "fas fa-user-circle fa-3x"></i><br />PROFILE</router-link>
          </li>
        <li class="nav-link-item">
          <router-link to ="/about"><i class = "fas fa-tachometer-alt fa-3x"></i><br />DASHBOARD</router-link>
          </li>
        <li class="nav-link-item">
          <router-link to = "/about"><i class = "fas fa-house-user fa-3x"></i><br />CENTERS AND INSTITUTIONS</router-link></li>
        <li class="nav-link-item">
          <router-link to = "/about"><i class = "fas fa-blender-phone fa-3x"></i><br />MY REPORTS</router-link></li>
        <li class="nav-link-items">
          <router-link><i class = "fas fa-home"></i><br />SETTINGS</router-link>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  
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
}

.sidebar .header{
  text-align: center;
  line-height: 50px;
  color:white;
  background: #063146;
   width: 100%;
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

#dswd_name{
  font-weight: bold;
}

</style>>
