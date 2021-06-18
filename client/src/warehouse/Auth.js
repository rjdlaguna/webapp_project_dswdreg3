import axios from 'axios'
import router from '../router'

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
}

const getters = {
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
    let res = await axios.post('http://localhost:9000/api/users/login', user)
    if (res.data.success) {
      const token = res.data.token
      const user = res.data.user
      localStorage.setItem('token', token)
      //Vue.prototype.$http.default.headers.common['Authorization'] = token;
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
    }
    return res
  },
  async register ({
    commit
  }, user) {
    commit('register_request')
    let res = await axios.post('http://localhost:9000/api/users/registeruser', user)
    if (res.data.success !== undefined) {
      commit('register_success')
    }
    return res
  },
  async addEmployee ({
    commit
  }, empData) {
    let empForm = new FormData
    empForm = empData
    commit('register_request')
    let res = await axios.post('http://localhost:9000/api/users/addcenteremployee', empForm)
    if (res.data.success !== undefined) {
      commit('register_success')
    }
    return res
  },
  async getEmployeeInfo({
    commit
  }, id) {
    commit('empinfo_request')
    let res = await axios.get('http://localhost:9000/api/users/getemployeeinfo/' + id)
    commit('empinfo_success', res.data.empinfo)
    return res
  },
  async verifyEmailAdd({
    commit
  }, token) {
    commit('verifyemail_request')
    let res = await axios.post('http://localhost:9000/api/users/emailactivate/' + token)
    if(res.data.success !== 'undefined'){
      commit('verifyemail_success')
    }
    return res
  },
  async getProfile ({commit}) {
    commit('profile_request')
    let res = await axios.get('http://localhost:9000/api/users/profile')
    commit('user_profile', res.data.user)
    return res
  },
  async getCenterIDByProfile ({
    commit
  }, id) {
    commit('profile_request')
    let res = await axios.get('http://localhost:9000/api/users/getcenteridbyprofile/'+id)
    commit('user_profile', res.data.user)
    return res
  },
  async logout ({commit}) {
    await localStorage.removeItem('token')
    //let res = await axios.get('http://localhost:9000/api/users/logout')
    delete axios.defaults.headers.common['Authorization']
    //router.push({name: 'welcome'})
    if (
      localStorage.getItem('token') !== null &&
      this.$route.path == "/"
    ) {
      router.push({name: 'welcome'});
    }
    commit('logout')
    //return res
  },
  async displayProfilePic ({commit}, id) {
      commit('profilepic_request')
      let res = await axios.get('http://localhost:9000/api/users/displayprofilepic/'+ id)
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
    let res = await axios.post('http://localhost:9000/api/users/uploadprofilepic/' + id, imgForm) //,{headers: {'Content-Type': 'multipart/form-data' }})
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
    let res = await axios.post('http://localhost:9000/api/users/updateaccountinfo/'+ id, user_info)
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
    let res = await axios.post('http://localhost:9000/api/users/changepassword/'+id, password_info)
    if(res.data.success !== undefined) {
      commit('changepassword_success')
    }
    return res
  },
  async resetPassword({
    commit
  }, resetpass_data) {
    let email = resetpass_data.email
    commit('resetpassword_request')
    let res = await axios.post('http://localhost:9000/api/users/resetpassword/'+email, resetpass_data)
    if(res.data.success !== undefined) {
      commit('resetpassword_success')
    }
    return res
  },
  async registerCenter({
    commit
  }, center){
    commit('registercenter_request')
    let res = await axios.post('http://localhost:9000/api/users/registercenter', center)
    if(res.data.success !== undefined) {
      commit('registercenter_success')
    }
    return res
  },
  
  async displayCenters({
    commit
  }){
    commit('displaycenters_request')
    let res = await axios.get('http://localhost:9000/api/users/displaycenters')
    if(res.data.success !== undefined) {
      commit('displaycenters_success')
    }
    return res
  },

  async getCenterProfile({
    commit
  }, id) {
    commit('centerprofile_request')
    let res = await axios.get('http://localhost:9000/api/users/getcenterprofile/' + id)
    return res
  },

  async displayCenterImage ({commit}, id) {
    commit('centerimage_request')
    let res = await axios.get('http://localhost:9000/api/users/displaycenterimage/'+ id)
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
    let res = await axios.post('http://localhost:9000/api/users/uploadcenterpic/' + id, imgdata) //,{headers: {'Content-Type': 'multipart/form-data' }})
    if (res.data.success !== undefined) {
      commit('uploadpic_success')
    }
    return res
  },
  async createCenterUser({
    commit
  }, usercenter_data) {
    commit('registercenteruser_request')
    let res = await axios.post('http://localhost:9000/api/users/createcenteruser', usercenter_data)
    if(res.data.success !== undefined) {
      commit('registercenteruser_success')
    }
    return res
  },
  async displayCenterUsers({
    commit
  }, id){
    commit('centerusers_request')
    let res = await axios.get('http://localhost:9000/api/users/displaycenterusers/' + id)
   /*  if(res.data.success !== undefined) {
      commit('centerusers_success')
    } */
    return res
  },
  async getAPIkey({
    commit
  }){
    commit('apikey_request')
    let res = await axios.get('http://localhost:9000/api/users/getapikey')
    return res
  },
  async getCenterData({
    commit
  }, id){
    commit('centerdata_request')
    let res = await axios.get('http://localhost:9000/api/users/getcenterdatabyuser/' + id)
    return res
  },
  async updateCenterInfo({
    commit
  }, centerdata){
    commit('updatecenterdata_request')
    let id = centerdata._id
    let res = await axios.post('http://localhost:9000/api/users/updatecenterinfo/' + id, centerdata)
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
    let res = await axios.post('http://localhost:9000/api/users/sendincidentreport', rptForm)
    if(res.data.success !== undefined){
      commit('sendincientrep_success')
    }
    return res
  },
  async getMyIncidentReports({
    commit
  }, id){
    commit('myincidentreports_request')
    let res = await axios.get('http://localhost:9000/api/users/getmyincidentreports/' + id)
    return res
  },

  async getIncidentReportImages({
    commit
  }, id) {
    commit('myincidentreportimg_request')
    let res = await axios.get('http://localhost:9000/api/users/getincidentreportimages/' + id)
    return res
  },
  async getCenterIncidentReports({
    commit
  }, id){
    commit('centerincidentrep_request')
    let res = await axios.get('http://localhost:9000/api/users/getcenterincidentreports/' + id)
    return res
  },
  async getReportedIncident({
    commit
  }, id) {
    commit('reportedincident_request')
    let res = await axios.get('http://localhost:9000/api/users/getreportedincident/' + id)
    return res
  },
  async deleteReportedIncident({
    commit
  }, id){
    commit('deleteincidentrep_request')
    let res = await axios.get('http://localhost:9000/api/users/deletereportedincident/' + id)
    return res
  },
  async deleteReportedImage1({
    commit
  }, image1){
    commit('deleterptimage1_loading')
    let res = await axios.delete('http://localhost:9000/api/users/deletereportedimage1/ ' + image1)
    return res
  },
  async saveUpdatedIncidentReport({
    commit,
  }, reptdata){
    commit('saveupdateincidentrept_loading')
    let res = await axios.post('http://localhost:9000/api/users/saveupdatedincidentreport', reptdata)
    return res
  },
  async saveUpdatedIncidentReport2({
    commit,
  }, reptdata){
    commit('saveupdateincidentrept_loading')
    let res = await axios.post('http://localhost:9000/api/users/saveupdatedincidentreport2', reptdata)
    return res
  },
  async getUserLogs({
    commit
  }, id){
    commit('userlogs_request')
    let res = await axios.get('http://localhost:9000/api/users/getuserlogs/' + id)
    return res
  },
  async deleteUserLogs({
    commit
  }, logs_info) {
    commit('deleteuserlogs_request')
    let res = await axios.post('http://localhost:9000/api/users/deleteuserlogs/', logs_info)
    if(res.data.success !== undefined) {
      commit('deleteuserlogs_success')
    }
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
  },
  myincidentreportimg_request(state){
    state.status = 'loading'
  },
  myincidentreportimg_success(state){
    state.status = 'success'
  },
  centerincidentrep_request(state) {
    state.status = 'loading'
  },
  centerincidentrep_success(state) {
    state.status = 'success'
  },
  reportedincident_request(state) {
    state.status = 'loading'
  },
  reportedincident_success(state) {
    state.status = 'success'
  },
  deleteincidentrep_request(state) {
    state.status = 'loading'
  },
  deleteincidentrep_success(state) {
    state.status = 'success'
  },
  verifyemail_request(state){
    state.status = 'loading'
  },
  verifyemail_success(state){
    state.status = 'success'
  },
  resetpassword_request(state){
    state.status = 'loading'
  },
  resetpassword_success(state){
    state.status = 'success'
  },
  deleterptimage1_request(state){
    state.status = 'loading'
  },
  deleterptimage1_success(state){
    state.status = 'success'
  },
  saveupdateincidentrept_request(state){
    state.status = 'loading'
  },
  saveupdateincidentrept_success(state){
    state.status = 'success'
  },
  empinfo_request(state){
    state.status = "loading"
  },
  empinfo_success(state){
    state.status = "success"
  },
  userlogs_request(state) {
    state.status = 'loading'
  },
  deleteuserlogs_request(state){
    state.status = 'loading'
  },
  deleteuserlogs_success(state){
    state.status = 'success'
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
