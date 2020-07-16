import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import CentersAndInstitutions from '../views/CentersAndInstitutions'
import About from '../views/About'
import AboutCenters from '../views/AboutCenters'
import MyIncidentReports from '../views/MyIncidentReports'
import ReportAnIncident from '../views/ReportAnIncident'
import UserProfile from '../views/UserProfile'
import Dashboard from '../views/Dashboard'
import CentersInstitutionsList from '../views/CentersInstitutionsList'
import CenterRegistration from '../views/CenterRegistration'
import CenterProfileInfo from '../views/CenterProfileInfo'
import CenterIncidentReports from '../views/CenterIncidentReports'
import VerifyEmail from '../views/VerifyEmail'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/home/:id',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/centersandinstitutions',
    name: 'centersandinstitutions',
    component: CentersAndInstitutions
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/aboutcenters',
    name: 'aboutcenters',
    component: AboutCenters
  },
  {
    path: '/myincidentreports/:id',
    name: 'myincidentreports',
    component: MyIncidentReports,
    props: true
  },
  {
    path: '/reportanincident',
    name: 'reportanincident',
    component: ReportAnIncident
  },
  {
    path: '/userprofile/:id',
    name: 'userprofile',
    component: UserProfile,
    props: true
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: Dashboard,
    props: true
  },
  {
    path: '/centersinstitutionslist/:uid',
    name: 'centersinstitutionslist',
    component: CentersInstitutionsList,
    props: true
  },
  {
    path: '/centerregistration',
    name: 'centerregistration',
    component: CenterRegistration
  },
  {
    path: '/centerinstitutionslist/:uid/centerprofile/:id',
    name: 'centerprofileinfo',
    component: CenterProfileInfo,
    props: true
  },
  {
    path: '/centerincidentreports/:id',
    name: 'centerincidentreports',
    component: CenterIncidentReports,
    props: true
  },
  {
    path: '/verifyemail/:token',
    name: 'verifyemail',
    component: VerifyEmail,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      alert('You are not logged in.')
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next('/myincidentreports')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
