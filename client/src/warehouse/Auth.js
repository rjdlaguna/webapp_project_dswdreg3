import axios from 'axios'
import router from '../router'

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
}

const getters = {
// isLoggedIn: function(state) {
//     if(state.token != ''){
//         return true
//     } else {
//         return false
//     }
// }
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  image: state => state.image,
  id : state => state.id,
  data: state => state.data
}

const actions = {
  async login ({
    commit
  }, user) {
    commit('auth_request')
    let res = await axios.post('http://104.248.144.145:81/api/users/login', user)
    if (res.data.success) {
      const token = res.data.token
      const user = res.data.user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
    }
    return res
  },
  async register ({
    commit
  }, user) {
    commit('register_request')
    let res = await axios.post('http://104.248.144.145:81/api/users/registeruser', user)
    if (res.data.success !== undefined) {
      commit('register_success')
    }
    else if (res.data.error !== undefined) {
      alert(res.data.error)
      commit('register_failed1')
    }
    return res
  },
  async getProfile ({commit}) {
    commit('profile_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/profile')
    commit('user_profile', res.data.user)
    return res
  },
  async getCenterIDByProfile ({
    commit
  }, id) {
    commit('profile_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/getcenteridbyprofile' +id)
    commit('user_profile', res.data.user)
    return res
  },
  async logout ({commit}) {
    await localStorage.removeItem('token')
    commit('logout')
    delete axios.defaults.headers.common['Authorization']
    router.push({name: 'welcome'})
  },
  async displayProfilePic ({commit}, id) {
      commit('profilepic_request')
      let res = await axios.get('http://104.248.144.145:81/api/users/displayprofilepic/'+ id)
      commit('profile_picture', res.data.image_path)
      return res
  },
  async uploadProfilePic ({
    commit
  }, imgdata) {
    commit('uploadpic_request')
    let imgForm = new FormData
    imgForm = imgdata
    let id = imgForm.get('user_id')
    let res = await axios.post('http://104.248.144.145:81/api/users/uploadprofilepic/' + id, imgForm) //,{headers: {'Content-Type': 'multipart/form-data' }})
    if (res.data.success !== undefined) {
      commit('uploadpic_success')
    }
    return res
  },
  async updateAccountInfo({
    commit
  }, user_info) {
    commit('updateaccount_request')
    let id = user_info._id
    let res = await axios.post('http://104.248.144.145:81/api/users/updateaccountinfo/'+ id, user_info)
    if (res.data.success !== undefined) {
      commit('updateaccount_success')
    }
    return res
  },
  async changeUserPassword({
    commit
  }, password_info) {
    let id = password_info._id
    commit('changepassword_request')
    let res = await axios.post('http://104.248.144.145:81/api/users/changepassword/'+id, password_info)
    if(res.data.success !== undefined) {
      commit('changepassword_success')
    }
    alert(Object.values(res.json()))
    return res
  },
  async registerCenter({
    commit
  }, center){
    commit('registercenter_request')
    let res = await axios.post('http://104.248.144.145:81/api/users/registercenter', center)
    if(res.data.success !== undefined) {
      commit('registercenter_success')
    }
    return res
  },
  async displayCenters({
    commit
  }){
    commit('displaycenters_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/displaycenters')
    if(res.data.success !== undefined) {
      commit('displaycenters_success')
    }
    return res
  },
  async getCenterProfile({
    commit
  }, id) {
    commit('centerprofile_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/getcenterprofile/'+id)
    return res
  },
  async displayCenterImage ({commit}, id) {
    commit('centerimage_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/displaycenterimage/'+ id)
    commit('centerimage_request', res.data.image_path)
    return res
  },
  async uploadCenterPic ({
    commit
  }, imgdata) {
    commit('uploadpic_request')
    let imgForm = new FormData
    imgForm = imgdata
    let id = imgForm.get('center_id')
    let res = await axios.post('http://104.248.144.145:81/api/users/uploadcenterpic/' + id, imgdata) //,{headers: {'Content-Type': 'multipart/form-data' }})
    if (res.data.success !== undefined) {
      commit('uploadpic_success')
    }
    return res
  },
  async createCenterUser({
    commit
  }, usercenter_data) {
    commit('registercenteruser_request')
    let res = await axios.post('http://104.248.144.145:81/api/users/createcenteruser', usercenter_data)
    if(res.data.success !== undefined) {
      commit('registercenteruser_success')
    }
    return res
  },
  async displayCenterUsers({
    commit
  }, id){
    commit('centerusers_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/displaycenterusers/' + id)
    if(res.data.success !== undefined) {
      commit('centerusers_success')
    }
    return res
  },
  async getAPIkey({
    commit
  }){
    commit('apikey_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/getapikey')
    return res
  },
  async getCenterData({
    commit
  }, id){
    commit('centerdata_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/getcenterdatabyuser/' + id)
    return res
  },
  async updateCenterInfo({
    commit
  }, centerdata){
    commit('updatecenterdata_request')
    let id = centerdata._id
    let res = await axios.get('http://104.248.144.145:81/api/users/updatecenterinfo/' + id, centerdata)
    if(res.data.success !== undefined){
      commit('updatecenterdata_success')
    }
    return res
  },
  async sendIncidentReport({
    commit,
  }, report){
    let rptForm = new FormData
    rptForm = report
    commit('sendincidentrep_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/sendincidentreport', rptForm)
    if(res.data.success !== undefined){
      commit('sendincientrep_success')
    }
    return res
  },
  async getMyIncidentReports({
    commit
  }, id){
    commit('myincidentreports_request')
    let res = await axios.get('http://104.248.144.145:81/api/users/getmyincidentreports' + id)
    return res
  }
}

const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.token = token
    state.user = user
    state.status = 'success'
  },
  register_request (state) {
    state.status = 'loading'
  },
  register_success (state) {
    state.status = 'success'
  },
  register_failed1 (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = ''
  },
  profile_request (state) {
    state.status = 'loading'
  },
  user_profile (state, user) {
    state.user = user
  },
  profilepic_request (state) {
    state.status = 'loading'
  },
  profile_picture (state, image){
    state.image = image
  },
  uploadpic_request (state) {
    state.status = 'loading'
  },
  uploadpic_success (state) {
    state.status = 'success'
  },
  updateaccount_request (state) {
    state.status = 'loading'
  },
  updateaccount_success(state) {
    state.status = 'success'
  },
  changepassword_request(state) {
    state.status = 'loading'
  },
  changepassword_success(state) {
    state.status = 'success'
  },
  registercenter_request(state) {
    state.status = 'loading'
  },
  registercenter_success(state) {
    state.status = 'success'
  },
  displaycenters_request(state) {
    state.status = 'loading'
  },
  displaycenters_success(state) {
    state.status = 'success'
  },
  centerprofile_request(state) {
    state.status = 'loading'
  },
  centerprofile_success(state) {
    state.status = 'success'
  },
  centerimage_request(state) {
    state.status = 'loading'
  },
  centerimage_success(state) {
    state.status = 'success'
  },
  registercenteruser_request(state) {
    state.status = 'loading'
  },
  registercenteruser_success(state) {
    state.status = 'success'
  },
  centerusers_request(state) {
    state.status = 'loading'
  },
  centerusers_success(state) {
    state.status = 'success'
  },
  apikey_request(state) {
    state.status = 'loading'
  },
  apikey_success(state) {
    state.status = 'success'
  },
  centerdata_request(state) {
    state.status = 'loading'
  },
  centerdata_success(state) {
    state.status = 'success'
  },
  updatecenterdata_request(state) {
    state.status = 'loading'
  },
  updatecenterdata_success(state) {
    state.status = 'success'
  },
  sendincidentrep_request(state) {
    state.status = 'loading'
  },
  sendincidentrep_success(state) {
    state.status = 'success'
  },
  myincidentreports_request(state) {
    state.status = 'loading'
  },
  myincidentreports_success(state) {
    state.status = 'success'
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
