<template>
  <v-app>
    <SideBar/>
    <div class="content pa-6">
      <v-row dense>
        <v-col>
          <v-card color="primary">
            <v-card-title v-text="'User'" class="white--text"></v-card-title>
            <v-divider color="#ffffff"></v-divider>
            <v-card-text v-text="cardsUser" class="white--text"></v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card color="primary">
            <v-card-title v-text="'Server'" class="white--text"></v-card-title>
            <v-divider color="#ffffff"></v-divider>
            <v-card-text v-text="cardsServer" class="white--text"></v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card color="primary">
            <v-card-title v-text="'Project'" class="white--text"></v-card-title>
            <v-divider color="#ffffff"></v-divider>
            <v-card-text v-text="cardsProject" class="white--text"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card style="height:50vh">
            <v-subheader>Activities</v-subheader>
            <highcharts :options="chartOptions"></highcharts>
          </v-card>
        </v-col>


        <v-col cols="12" sm="4">
          <v-card style="height:50vh">
            <v-subheader>Activities</v-subheader>
            <highcharts :options="options"></highcharts>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card>
            <v-subheader>Latest Update</v-subheader>
            <v-data-table
                :headers="headers"
                :items="monitoringData"
            >
              <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title class="mr-15">Monitoring Management</v-toolbar-title>
                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-spacer></v-spacer>

                  <!--        Dialog View ALl Data-->
                  <v-dialog v-model="dialogViewData" persistant max-width="700px">
                    <v-card>
                      <v-card-title>
            <span class="headline">
              View All Data
            </span>
                      </v-card-title>
                      <v-card-text v-model="valid">
                        <v-container>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field label="Monitoring Id"  v-model="allData.viewMonitoringId" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Username"  v-model="allData.viewUsername" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Name"  v-model="allData.viewName" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Path"  v-model="allData.viewPath" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field label="Type"  v-model="allData.viewType" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Port"  v-model="allData.viewPort" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Project Id"  v-model="allData.viewProjectId" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Server Id"  v-model="allData.viewServerId" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field label="Running Command"  v-model="allData.viewRunningCommand" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field label="Running On"  v-model="allData.viewRunningOn" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Last Update"  v-model="allData.viewLastUpdate" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Git Url"  v-model="allData.viewGitUrl" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field  label="Haproxy"  v-model="allData.viewHaproxy" required>
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field label="Haproxy Port"  v-model="allData.viewHaproxy_port" required>
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="blue-draken-1" text @click="dialogViewData = false">Back</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">

                <v-icon
                    small
                    class="mr-2"
                    @click="viewALlData(item)"
                >mdi-mail
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>


<script>
import SideBar from "@/components/SideBar";
import axios from "axios";

import {Chart} from 'highcharts-vue';

export default {
  props: {
    user: Object,
  },
  name: 'Home',
  data: () => ({
    dialogViewData: false,
    cardsUser: 0,
    cardsProject: 0,
    cardsServer: 0,
    projectId: 0,
    port: '',
    path: '',
    gitUrl: '',
    haproxy: '',
    haproxyPort: '',
    monitoringId: '',
    runningOn: '',
    runningCommand: '',
    lastUpdate: '',
    name: '',
    serverId: '',
    type: '',
    username: '',
    valid: false,
    allData: {
      viewProjectId: 0,
      viewPort: '',
      viewPath: '',
      viewGitUrl: '',
      viewHaproxy: '',
      viewHaproxy_port: '',
      viewMonitoringId: '',
      viewRunningOn: '',
      viewRunningCommand: '',
      viewLastUpdate: '',
      viewName: '',
      viewServerId: '',
      viwType: '',
      viewUsername: '',
    },

    cards: [
      {cardtitle: 'User'},
      {cardtitle: 'Server'},
      {cardtitle: 'Project'},
    ],
    options: {
      chart: {
        type: 'pie',
        height: '300'
      },
      title: {
        text: ''
      },
      series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'type',
        data: [{
          name: 'Project',
          y: 0
        }, {
          name: 'Server',
          y: 0
        }]
      }]
    },

    chartOptions: {

      chart: {
        type: 'column',
        height: '300'

      },

      title: {
        text: 'Chart Bar Engine Monitoring'
      },

      xAxis: {
        categories: ['Project', 'Server', 'Service', 'Engine']
      },

      yAxis: [{ // Primary axis
        title: {
          text: 'Engine Monitoring'
        }
      }, { // Secondary axis
        opposite: true,
        title: {
          text: 'Engine Monitoring'
        }
      }],

      plotOptions: {
        column: {
          borderRadius: 5
        }
      },

      series: [{
        name: 'Project',
        data: [{
          y: 0
        }],
        yAxis: 1,
      }, {
        name: 'Server',
        data: [{
          y: 0
        }],
        yAxis: 1
      },
        {
          name: 'Service',
          data: [{
            y: 0
          }],
          yAxis: 1
        }, {
          name: 'Engine',
          data: [{
            y: 0
          }],
          yAxis: 1
        }]

    },


    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Username', value: 'username'},
      {text: 'Monitoring Id', value: 'monitoring_id'},
      {text: 'Path', value: 'path'},
      {text: 'Type', value: 'type'},
      {text: 'Port', value: 'port'},
      {text: 'Actions', value: 'actions', sortable: false},
      // {text: 'Haproxy', value: 'haproxy'},
      // {text: 'Haproxy Port', value: 'haproxy_port'},
      // {text: 'Git_url', value: 'git_url'},
      // {text: 'Running On', value: 'running_on'},
      // {text: 'Running Command', value: 'running_command'},
      // {text: 'Last Update', value: 'last_update'},
    ],
    monitoringData: []


  }),
  created() {
    this.getCard()
    this.getMonitoring()
    this.getProject()
    this.getServer()

    this.getChartProject()
    this.getChartServer()
    this.getChartEngine()
    this.getChartService()
  },
  methods: {
    viewALlData(monitoringData) {
      this.dialogViewData = true
      this.allData.viewGitUrl = monitoringData.git_url
      this.allData.viewHaproxy = monitoringData.haproxy
      this.allData.viewHaproxy_port = monitoringData.haproxy_port
      this.allData.viewName = monitoringData.name
      this.allData.viewPath = monitoringData.path
      this.allData.viewPort = monitoringData.port
      this.allData.viewServerId = monitoringData.server_id
      this.allData.viewMonitoringId = monitoringData.monitoring_id
      this.allData.viewRunningCommand = monitoringData.running_command
      this.allData.viewProjectId = monitoringData.project_id
      this.allData.viewRunningOn = monitoringData.running_on
      this.allData.viewProjectId = monitoringData.project_id
      this.allData.viewProjectId = monitoringData.project_id
      this.allData.viewUsername = monitoringData.username
      this.allData.viewLastUpdate = monitoringData.last_update
      this.allData.viewType = monitoringData.type
    },
    getChartProject() {
      axios.get('http://localhost:8080/project/count')
          .then(res => {
            this.chartOptions.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartServer() {
      axios.get('http://localhost:8080/server/count')
          .then(res => {
            this.chartOptions.series[1].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartService() {
      axios.get('http://localhost:8080/monitoring/countService')
          .then(res => {
            this.chartOptions.series[2].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartEngine() {
      axios.get('http://localhost:8080/monitoring/countEngine')
          .then(res => {
            this.chartOptions.series[3].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    getProject() {
      axios.get('http://localhost:8080/project/count')
          .then(res => {
            this.options.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getServer() {
      axios.get('http://localhost:8080/server/count')
          .then(res => {
            this.options.series[0].data[1].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    logOut() {
      sessionStorage.removeItem('token');
      this.$router.push('/')
    },
    getCard() {
      let one = 'http://localhost:8080/user/count'
      let two = 'http://localhost:8080/server/count'
      let three = 'http://localhost:8080/project/count'

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);
      const requestThree = axios.get(three);

      axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        this.cardsUser = responses[0].data
        this.cardsProject = responses[2].data
        this.cardsServer = responses[1].data
      })).catch(errors => {
        // react on errors.
      })
    },
    getMonitoring() {
      axios.get('http://localhost:8080/monitoring/')
          .then(res => {
            this.monitoringData = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
  },
  components: {
    SideBar,
    highcharts: Chart
  },
};
</script>
<style scoped>
.content {
  background-color: #efefef;
}

.v-list-item {
  font-family: 'Poppins', sans-serif;
}

.list-item {
  padding: 0px;
}

</style>
