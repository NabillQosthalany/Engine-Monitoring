<template>
  <v-app id="inspire">
    <v-app-bar app  color="#ffffff" flat>
      <v-text-field
      hide-details
      label="search.."
      solo
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>

    <v-btn class="ml-2" icon >
      <v-icon dark>
        mdi-cog-outline
      </v-icon>
    </v-btn>
    <v-btn class="mx-2" fab dark color="info">
      <v-icon dark> mdi-account-outline </v-icon>
    </v-btn>
    </v-app-bar>

    <SideBar />
    <v-container color="info">
      
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
        <v-card height="50vh">
          <v-subheader>Lates Update</v-subheader>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
  </v-app>
</template>


<script>
import SideBar from "@/components/SideBar";
import { Chart } from 'highcharts-vue';


export default {
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
    }
  
  }),
  components: {
    SideBar,
     highcharts: Chart
  },
};
</script>
