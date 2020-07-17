<template>
    <div class = "main">
        <app-navbar/>
        <div class = 'main_content'>
          <div class = "row">
              <div class = "banner">
                <div class="banner-content">
                  <h1 id = "welcome_msg">Welcome to DSWD Region III Centers and Institutions Records Management and Incident Reporting</h1>
                </div>
                      <!-- <transition-group name='fade' tag='carousel'>
                        <div
                        v-for="number in [currentNumber]"
                        :key='number'
                        >
                          <img
                              :src="currentImage"
                              v-on:mouseover="stopRotation"
                              v-on:mouseout="startRotation"
                              width = "1305"
                              height = "500"
                              class = "carousel ml-2"
                              />
                      </div>
                    </transition-group> -->
              </div> 
          </div>
          
          <div class="overview" >
            <div class="col-sm-4">
              <div class="overview-card mt-1">
                <div class="overview-card-body">
                  <i class = "fas fa-blender-phone fa-3x icons"></i>
                  <h5 class="overview-card-title">Incident Reporting</h5>
                  <p class="overview-card-text">The website lets concerned citizens to report abused or neglected individuals encountered to respective centers or institutions.</p>
                  <!--<a href="#" class="btn btn-warning">See more details</a>-->
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="overview-card mt-1">
                <div class="overview-card-body">
                  <i class = "fas fa-house-user fa-3x icons"></i>
                  <h5 class="overview-card-title">Centers and Institutions</h5>
                  <p class="overview-card-text">The website contains the different centers and institutions located in the Region III which are licensed by the DSWD Region III.</p>
                  <!--<a href="#" class="btn btn-warning">See more details</a>-->
                </div>
              </div>
            </div>
          
            <div class="col-sm-4">
              <div class="overview-card mt-1">
                <div class="overview-card-body">
                  <i class="fas fa-file-alt fa-3x icons"></i>
                  <h5 class="overview-card-title">Records Management</h5>
                  <p class="overview-card-text">The respective centers and institutions and regional office can management the records of the reported individuals</p>
                  <!--<a href="#" class="btn btn-warning">See more details</a>-->
                </div>
              </div>
            </div>
          </div>

          <app-footer/>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  data () {
    return {
      images: [
        require('@/assets/images/banner_pic1.jpg'),
        require('@/assets/images/banner_pic2.jpg'),
        require('@/assets/images/banner_pic3.jpg')
      ],
      currentNumber: 0,
      timer: null,
      modalShow: false
    }
  },
  components: {
    'app-navbar': Navbar,
    'app-footer' : Footer
  },
  mounted: function () {
    this.startRotation()
  },
  methods: {
    startRotation: function () {
      this.timer = setInterval(this.next, 3000)
    },
    stopRotation: function () {
      clearTimeout(this.timer)
      this.timer = null
    },
    next: function () {
      this.currentNumber += 1
    },
    prev: function () {
      this.currentNumber -= 1
    }
  },

  computed: {
    currentImage: function () {
      return this.images[Math.abs(this.currentNumber) % this.images.length]
    }
  }
}
</script>

<style scoped>
*,
*::before,
*::after{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.main_content{
  max-width: 100%;
  max-height: 100%;
  height:575px;
  position: relative;
  text-align:center;
  color:whitesmoke;
  display: flex;
  flex-direction: column;
}

.banner{
  background: url("../assets/images/banner_pic4.jpg") no-repeat center; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 600px;
  max-width: 100%;
  align-items: center;
  display: flex;
  filter: brightness(80%);
}

/*.banner{
	width: 100%;
	height: 560px;
	display: flex;
	justify-content: center;
	align-items: center;
  background: url("../assets/images/banner_pic4.jpg") no-repeat top center;
  background-position: center center;
  /*filter: brightness(30%);
}*/

.banner-content {
  color: white;
}

.banner_content h1{
  color: #fff;
  filter: brightness(100%);
}

.overview{
  display: flex;
	margin-top: 30px;
  justify-content: space-around;
}

/*.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  visibility: visible;
  opacity: 1;
  position: relative;
}
.fade-enter, .fade-leave-to {
  opacity: 0.8;
  visibility: hidden;
}
img{
  max-width: 100%;
  filter: brightness(30%);
  display: block;
  position: relative;
}*/

#welcome_msg{
  font-size: 35pt;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  z-index: 999;
}
.overview-card{
  color: #042331;
  display: block;
  padding: 1em;
}

.overview-card-text{
  max-height: 100%;
}
.icons{
  margin: 15px;
}

@media (max-width:414px){
  .overview{
    margin-top: 620px
  }
}

</style>
