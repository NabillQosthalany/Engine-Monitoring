<template>
  <v-app>
    <v-app-bar app  color="#fefefe" flat>
      <v-text-field
      hide-details
      label="search.."
      solo
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-btn class="ml-2" icon  href="/Settings">
      <v-icon dark>
        mdi-cog-outline
      </v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        fab
         dark
         color="#c0c0c0"
         small
          v-bind="attrs"
          v-on="on"
        >
        <v-icon dark> mdi-account-outline
        </v-icon>
        </v-btn>
      </template>
      <v-list class="list-item">
        <v-list-item-group
            color="primary"
        >
          <v-list-item @click="logOut">
            <v-list-item-icon>
              <v-icon >mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    </v-app-bar>

    <SideBar />
   <div class="content pa-6">

      <v-row dense>
        <v-col v-for="card in cards" :key="card.cardtitle" :value="card.value">
          <v-card color="primary">
            <v-card-title v-text="card.cardtitle" class="white--text"></v-card-title>
              <v-divider color="#ffffff"></v-divider>
              <v-card-text v-text="card.value" class="white--text"></v-card-text>
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
          <highcharts :options="options" ></highcharts>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-subheader>Lates Update</v-subheader>
          <v-data-table
             :headers="headers"
             :items="update"
         ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    </div>
  </v-app>
</template>


<script>
import SideBar from "@/components/SideBar";
import { Chart } from 'highcharts-vue';
export default {
  props: {
    user: Object,
  },
  name: 'Home',
  data: () => ({
    cards: [
      { cardtitle: 'User', value: '40 user active' },
      { cardtitle: 'Server', value: '5 server ready' },
      { cardtitle: 'Project',  value: '30 project created' },
      { cardtitle: 'Other', value: '10 other' }
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
          name: 'Server',
          y: 80
        }, {
          name: 'Service',
          y: 20
        }]
      }]
    },

    chartOptions: {
      chart: {
        type: 'line',
        height:'300'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Tru', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        title: {
            text: 'activities'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Service',
        data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
            22.0, 17.8]
    }, {
        name: 'Server',
        data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
            2.0, -0.9]
    }]
    },

    headers: [
          {
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Username', value: 'username' },
          { text: 'Type', value: 'type' },
          { text: 'Port', value: 'port' },
          { text: 'Haproxy', value: 'haproxy' },
          { text: 'Git_url', value: 'url' },
          { text: 'Status', value: 'status' },
          { text: 'Last Update', value: 'update' },
        ],
        update: [
          {
            username: 'user1',
            type: 'service',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user2',
            type: 'service',
            port: 80,
            haproxy: 'HHTP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user3',
            type: 'server',
            port: 80,
            haproxy: 'HTTP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user4',
            type: 'server',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user5',
            type: 'service',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user6',
            type: 'server',
            port: 80,
            haproxy: 'HTTP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user7',
            type: 'service',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user8',
            type: 'service',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user9',
            type: 'server',
            port: 80,
            haproxy: 'HTTP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
          {
            username: 'user10',
            type: 'server',
            port: 80,
            haproxy: 'TCP',
            url: 'git_url',
            status: 'on',
            update: '3 minutes ago'
          },
        ],

  
  }),
  methods:{
    logOut(){
     sessionStorage.removeItem('token');
     this.$router.push('/')
    }
  },
  components: {
    SideBar,
     highcharts: Chart
  },
};
</script>
<style scoped>
.content{
  background-color: #efefef;
}
.v-list-item{
font-family: 'Poppins', sans-serif;
}
.list-item{
  padding: 0px;
}

</style>
