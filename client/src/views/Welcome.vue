<template>
      <div class = "main">
        <app-navbar/>
        <div class = 'container'>
          <div class = "banner">
             <image-slider>
                  <transition-group name='fade' tag='carousel'>
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
                </transition-group>
              </image-slider>
          </div>
          <div class = "centered"><p id = "welcome_msg">Welcome to DSWD Region III Centers and Institutions Record Management</p></div>
          <div class="row">
          <div class="col-sm-4">
            <div class="card ml-3 mt-1">
              <div class="card-body">
                <h5 class="card-title">Incident Reporting</h5>
                <p class="card-text">The website lets concerned citizens to report abused or neglected individuals encountered to respective centers or institutions.</p>
                <a href="#" class="btn btn-warning">See more details</a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card mt-1">
              <div class="card-body">
                <h5 class="card-title">Centers and Institutions</h5>
                <p class="card-text">The website contains the different centers and institutions located in the Region III which are licensed by the DSWD Region III.</p>
                <a href="#" class="btn btn-warning">See more details</a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card mr-3 mt-1">
              <div class="card-body">
                <h5 class="card-title">Records Management</h5>
                <p class="card-text">The respective centers and institutions and regional office can managem= the records of the reported individuals</p>
                <a href="#" class="btn btn-warning">See more details</a>
              </div>
            </div>
          </div>
        </div>
   </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  el: 'image-slider',
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
    'app-navbar': Navbar
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
.container{
  max-width: 100%;
  height:575px;
  position: relative;
  text-align:center;
  color:whitesmoke;
  /* background: #000066; */
}
.banner{
  position: relative;
}
.fade-enter-active, .fade-leave-active {
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
}
#welcome_msg{
  font-size: 35pt;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  z-index: 999;
}
.centered {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:60em;
}
.card{
  border:.05em solid #000066;
  color: #000066;
  position: relative;
  display: block;
}
</style>
