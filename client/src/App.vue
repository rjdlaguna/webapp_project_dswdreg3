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
  },
  mounted () {
    /*this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    )
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      let ac = place.address_components
      let lat = place.geometry.location.lat()
      let lon = place.geometry.location.lng()
      let city = ac[0]['short_name']

      console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`)
    })*/
  }
}
</script>
