<template>
    <div class ="container">
        <app-navbar />

        <div v-if="showVerifyEmailModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Verify Email Address</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showVerifyEmailModal = false">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                        <button type="button" class="btn btn-primary" @click="verifyEmail">Verify Email Address</button>
                      </div>
                      <div class="modal-footer">
                        <div class form-group>
                          <button type="button" id="btn_ok" class="btn btn-secondary" @click="showVerifyEmailModal = false">OK</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import { mapActions } from 'vuex'
export default {
    components: {
    'app-navbar': Navbar
  },
  props: {
    token: {
      required: true
    }
  },
  data () {
      return {
          showVerifyEmailModal: true
      }
  },
  methods: {
      ...mapActions(['verifyEmailAdd']),
      verifyEmail(){
          this.verifyEmailAdd(this.token)
          .then(res => {
              if(res) {
                 alert('Email address successfully verified.')
              }
          })
      }
  }
    
}
</script>

<style>
.container{
    margin-left:120px;
    max-width:100%;
    height:600px;
    width:1220px;
    color:#042331;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    z-index: -5;
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
  z-index: 1
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-title, .modal-body {
  color:#042331;
}
.modal-body {
    align-items: center;
}
</style>