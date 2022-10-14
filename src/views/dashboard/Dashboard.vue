<template>
  <v-app id="inspire">
    <v-app-bar color="transparent">
      <v-text-field
        hide-details
        filled
        rounded
        label="search.."
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-btn class="mx-2" fab dark color="info">
        <v-icon dark> mdi-account-outline </v-icon>
      </v-btn>
    </v-app-bar>
    <SideBar />
    <v-container>
      
      <v-row dense>
        <v-col v-for="card in cards" :key="card.cardtitle" :value="card.value">
          <v-card color="primary" light>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title v-text="card.cardtitle"></v-list-item-title>
                <v-list-item-subtitle v-text="card.value"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

    <v-row>
      <v-col cols="12" sm="8">
        <v-card style="height:50vh">
        <v-subheader>Activities</v-subheader>
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
    }
  
  }),
  components: {
    SideBar,
     highcharts: Chart
  },
};
</script>
