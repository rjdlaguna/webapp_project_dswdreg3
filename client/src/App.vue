<template>
  <div id="app">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <router-view/>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places&key=AIzaSyD0av1I6ws3pKn06FOdeRfBt0HRqxBhBao"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script>
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      
    }
  },
  mounted() {
    window.onpopstate = event => {
		if (localStorage.getItem('token') == null) {
			this.$router.push("/");
      console.log('logged out...')
		}
	};
  }
}
</script>
