<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto" id = "loginApp">
                <form @submit.prevent="checkLogin">
                    <h1 class="h3 mb-3 font-weight-normal">Login to your Account</h1>
                    <p class = "err_message" v-if='isShown3'>{{message}}</p>
                    <div class="form-group">
                        <ValidationProvider name = "email" rules="required|email" v-slot="{ errors }">
                            <label for="email">Email Address</label>
                            <input type="email" v-model="email" v-bind = "email" class="form-control" name="email" placeholder="Enter Email">
                            <p class = "err_message">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <ValidationProvider name = "password" rules="required" v-slot="{ errors }">
                            <label for="password">Password</label>
                            <input type="password" v-model="password" v-bind = "password" class="form-control" name="password" placeholder="Enter Password">
                            <p class = "err_message">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </div>
                    <input type = "submit" id = "login_btn" class="btn btn-lg btn-primary btn-block" value = "Login">
                </form>
                <div id = "forgot_pass">
                 <span>Forgot Password? <router-link to= "/forgotpassword">Click here.</router-link></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
import router from '../router/index'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      value: '',
      isShown: false,
      isShown2: false,
      isShown3: false,
      message: '',
      message2: '',
      message3: '',
      user_type: '',
      user_info: {},
      user_id: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser () {
      let user = {
        email: this.email,
        password: this.password
      }
      //this.login(user)
      this.$store.dispatch('login', user)
        .then(res => {
          if (res.data.success) {
            router.push({ name: 'centersandinstitutions' })
          } else {
            this.errorLogin()
          }
        })
    },
    /* emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
      EventBus.$emit('admin-user', 'adminuser')
    }, */
    errorLogin () {
      this.isShown3 = true
      this.message = 'Incorrect Username or Password.'
    },
    checkLogin () {
      if (this.email === '') {
        this.message2 = 'Please enter your email.'
        this.isShown = true
      } else if (this.password === '') {
        this.message3 = 'Please enter your password.'
        if (this.isShown) {
          this.isShown = false
        }
        this.isShown2 = true
      } else {
        this.loginUser()
        this.isShown = false
        this.isShown2 = false
      }
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
.container{
  max-width: 100%;
  height:575px;
}
#loginApp{
  color:#000066;
  border: 1px solid gray;
  padding: 30px;
  border-radius: 10px;
}

.err_message{
  color:red;
}

#forgot_pass{
  text-align: center;
  margin-top:1em;
}

</style>
