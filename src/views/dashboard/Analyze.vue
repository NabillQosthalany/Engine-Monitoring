<template>
  <v-app>
    <SideBar />
    <div class="content">
      <v-app-bar app flat>
        <h4>Analyze</h4>
      </v-app-bar>

      <v-row>
        <v-col cols="12" sm="12" class="pt-0">
          <v-card class="card mb-0 pb-0">
            <v-subheader>Activities</v-subheader>
            <highcharts :options="chartOptions"></highcharts>
          </v-card>
        </v-col>
      </v-row>

      <v-container class="px-6">
        <div class="chart d-flex justify-content-center mt-15">
          <highcharts :options="options1" class="chart-donut"></highcharts>
          <highcharts :options="options2" class="chart-donut"></highcharts>
          <highcharts :options="options3" class="chart-donut"></highcharts>
          <highcharts :options="options4" class="chart-donut"></highcharts>
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
import { Chart } from "highcharts-vue";
export default {
  name: "Home",
  data: () => ({
    options1: {
      chart: {
        type: "pie",
        height: "250",
        width: "250",
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
              name: "Server",
              y: 80,
            },
          ],
        },
      ],
    },
    options2: {
      chart: {
        type: "pie",
        height: "250",
        width: "250",
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
              y: 80,
            },
          ],
        },
      ],
    },
    options3: {
      chart: {
        type: "pie",
        height: "250",
        width: "250",
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
              name: "Server",
              y: 80,
            },
          ],
        },
      ],
    },
    options4: {
      chart: {
        type: "pie",
        height: "250",
        width: "250",
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
              name: "Server",
              y: 80,
            },
          ],
        },
      ],
    },

    chartOptions: {
      chart: {
        type: "line",
        height: "300",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: ["Mon", "Tue", "Wed", "Tru", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        title: {
          text: "activities",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Service",
          data: [
            16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0,
            17.8,
          ],
        },
        {
          name: "Server",
          data: [
            -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9,
          ],
        },
      ],
    },
  }),
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
