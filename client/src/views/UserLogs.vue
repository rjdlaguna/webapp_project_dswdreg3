<template>
    <div class="main">
        <div class="container">
            <sidebar-menu/>
            <div class="page_title">
                <div class="col-md-12 pt-3" id = "menu_content">
                    <h4 class = "mb-4" id = "user_logs_label">My Logs</h4>
                </div>
            </div>
            <div>
                <div class = "row_header_container">
                    <ul class = "row_header">
                        <li><button type="button" class="btn btn-danger btn-actions" @click="deleteSelectedLogs">Delete</button></li>
                        <li>Date Logged</li>
                        <li>Time</li>
                        <li>Activity</li>
                    </ul>
                </div>

                <div class = "row_records">
                    <p v-if="hasLogs" id="emptyLogs">No logs has been recorded</p>
                    <ul class="logs_header" v-for="log in logs" v-bind:key="log.user_id">
                        <li style = "display: none">{{log._id}}</li>
                        <li class = "logs_info"><input type="checkbox" id="checkbox" value="checked" @change="addToDeleteList(log._id)" @click="checkValue" ></li>
                        <li class = "logs_info">{{ formatLogDate(log.timestamp)}}</li>
                        <li class = "logs_info">{{ formatLogTime(log.timestamp)}}</li>
                        <li class = "logs_info">{{ log.user_activity}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <app-footer/>    
    </div>
</template>
<script>
import SideBarMenu from '../components/Sidebar'
import Footer from '../components/Footer'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
    computed: mapGetters([
    'user'
    ]),
    props: {
        id: {
            required: true
        }
    },
    components: {
      'sidebar-menu': SideBarMenu,
      'app-footer': Footer
    },
    data() {
        return{
            logs: [],
            haslogs: true,
            isChecked: false,
            logstodelete: []
        }
    },
    methods: {
        ...mapActions(['getUserLogs', 'deleteUserLogs']),
        formatLogDate (date) {
            return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
        },
        formatLogTime (time) {
            return moment(time, 'YYYY-MM-DDThh-mm-ss').format('h:mm:ss A');
        },
        addToDeleteList (id) {
            let logData = {
                log_id: id,
                isChecked: this.isChecked
            }
            if(id){
                this.logstodelete.push(logData)
            }
        },
        checkValue(e){
            this.isChecked = e.target.checked
        },
        deleteSelectedLogs(){
            this.deleteSelectedLogs(this.logstodelete)
            .then(res => {
                alert('Log successfully deleted.')
                return res
            })
        }
    },
    created () {
        this.getUserLogs(this.id)
            .then(res => {
                this.logs = res.data
            })
            if(this.logs != null)
            {
                this.haslogs = false
            }
            
    }
}
</script>

<style>
.container{
    margin-left:120px;
    max-width:100%;
    height:800px;
    width:1220px;
    color:#042331;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    z-index: -5;
}
.page_title{
    font-weight: 500;
    color:#042331;
    border-bottom:2px solid #042331;
}
.row_header{
    display: flex;
    font-size: 14px;
    margin-top: 15px;
    justify-content: space-around;
}
.row_header li{
    font-size: 14px;
    list-style-type: none;
    width: 125px;
    padding-right: 20px;
    font-weight: 500;
}
.row_header_container{
    margin-bottom: 10px;
}
.logs_header{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    padding: 2px;
    display: flex;
    background-color: #f5f5f0;
}
.logs_info{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    list-style-type: none;
    padding-right: 20px;
}
#emptyLogs{
    display: flex;
    justify-content: center;
}
</style>