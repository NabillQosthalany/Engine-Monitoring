<template>
  <v-app>
    <SideBar />
    <div class="content">
     <h1 class="header">Analyze</h1>
      <v-container class="px-6">
        <div class="chart d-flex justify-content-center mt-8">
          <v-row>
            <v-col cols="6">
              <highcharts :options="options1"  class="chart-donut"></highcharts>
            </v-col>
            <v-col cols="6">
              <highcharts :options="options2" class="chart-donut"></highcharts>
            </v-col>
            <v-col cols="6">
              <highcharts :options="options3" class="chart-donut"></highcharts>
            </v-col>
            <v-col cols="6">
              <highcharts :options="options4" class="chart-donut"></highcharts>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
import { Chart } from "highcharts-vue";
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    options1: {
      chart: {
        type: "pie",
        height: "270",
        width: "270",
      },
      title: {
        text: "",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "50%",
          zMin: 0,
          name: "type",
          data: [
            {
              name: "Project",
              y: 0,
            },
          ],
        },
      ],
    },
    options2: {
      chart: {
        type: "pie",
        height: "270",
        width: "270",
      },
      colors: ["#831995"],
      title: {
        text: "",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "50%",
          zMin: 0,
          name: "type",
          data: [
            {
              name: "Server",
              y: 0,
            },
          ],
        },
      ],
    },
    options3: {
      chart: {
        type: "pie",
        height: "270",
        width: "270",
      },
      colors: ["#1B9519"],
      title: {
        text: "",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "50%",
          zMin: 0,
          name: "type",
          data: [
            {
              name: "Engine",
              y: 0,
            },
          ],
        },
      ],
    },
    options4: {
      chart: {
        type: "pie",
        height: "270",
        width: "270",
      },
      colors: ["#7F9AA9"],
      title: {
        text: "",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "50%",
          zMin: 0,
          name: "type",
          data: [
            {
              name: "Service",
              y: 0,
            },
          ],
        },
      ],
    },

  }),

  created(){
    this.getChartProject()
    this.getChartServer()
    this.getChartEngine()
    this.getChartService()
  },

  methods:{
    getChartProject() {
      axios.get('http://localhost:8080/project/count')
          .then(res => {
            this.options1.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartServer() {
      axios.get('http://localhost:8080/server/count')
          .then(res => {
            this.options2.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartEngine() {
      axios.get('http://localhost:8080/monitoring/countEngine')
          .then(res => {
            this.options3.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getChartService() {
      axios.get('http://localhost:8080/monitoring/countService')
          .then(res => {
            this.options4.series[0].data[0].y = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
  },
  components: {
    SideBar,
    highcharts: Chart,
  },
};
</script>
<style scoped>
.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
}
.content {
  height: 100%;
  background-color: #efefef;
}
.v-card {
  height: 45vh;
  width: 95%;
  margin: 25px;
}
.chart {
  background-color: #fff;
  width: 100%;
}
.chart-donut {
  margin-left: 15px;
}
highcharts {
  margin: auto;
}
</style>
