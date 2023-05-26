<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h2 class="header mb-2">Statistic</h2>
      <v-container fluid>
        <!-- Total data -->

        <v-row dense>
          <v-col v-for="(item, id) in items" :key="id">
            <v-card color="white" class="rounded-xl">
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon v-text="item.icon" color="primary" large></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                        class="font-weight-bold"
                      ></v-list-item-title>
                      <v-list-item-subtitle class="black--text">
                        {{ item.value || "0" }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="font-italic">
                        total account
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <!-- Chart -->

        <v-row>
          <v-col cols="12" sm="4">
            <v-card style="height: 50vh">
              <highcharts :options="Options"></highcharts>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8">
            <v-card style="height: 50vh">
              <v-subheader></v-subheader>
              <highcharts :options="chartOptions"></highcharts>
            </v-card>
          </v-col>
        </v-row>

        <!-- Data Status -->
        <v-row>
          <v-col>
            <v-card color="white" style="height: 30vh">
              <div>
                <v-subheader>Data Update</v-subheader>
                <v-row style="padding-left: 70px">
                  <v-col v-for="total in totals" :key="totals.key">
                    <v-list>
                      <v-list-item-group>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                              {{ total.type }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item
                          v-for="statistic in total.statistic"
                          :key="total.statistic.key"
                        >
                          <v-list-item-title>
                            {{ statistic.name || totals.status }} =
                            {{ statistic.count || "0" }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-divider vertical></v-divider>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
import axios from "axios";

import { Chart } from "highcharts-vue";

export default {
  props: {
    user: Object,
  },
  name: "Home",
  data: () => ({
    items: [
      { icon: "mdi-instagram", title: "Instagram", type: "Instagram" },
      { icon: "mdi-facebook", title: "Facebook", type: "Facebook" },
      { icon: "mdi-whatsapp", title: "Whatsapp", type: "Whatsapp" },
      { icon: "mdi-telegram", title: "Telegram", type: "Telegram" },
      { icon: "mdi-twitter", title: "Twitter", type: "Twitter" },
    ],
    totals: [
      {
        title: "Instagram",
        type: "Instagram",
        status: ["Active", "Available", "Not Active", "Blocked"],
      },
      {
        title: "Facebook",
        type: "Facebook",
        status: ["Active", "Available", "Not Active", "Blocked"],
      },
      {
        title: "Whatsapp",
        type: "Whatsapp",
        status: ["Active", "Available", "Not Active", "Blocked"],
      },
      {
        title: "Telegram",
        type: "Telegram",
        status: ["Active", "Available", "Not Active", "Blocked"],
      },
      {
        title: "Twitter",
        type: "Twitter",
        status: ["Active", "Available", "Not Active", "Blocked"],
      },
    ],

    Options: {
      chart: {
        type: "pie",
        width: "500",
      },
      title: {
        text: "Sosial Media ",
        align: "center",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          // name: "Sosmed",
          colorByPoint: true,
          data: [
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    },

    chartOptions: {
      chart: {
        type: "column",
      },
      title: {
        align: "center",
        text: "Daily Account Entry",
      },

      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        categories: [
          "Instagram",
          "Facebook",
          "Whatsapp",
          "Telegram",
          "Twitter",
        ],
      },
      yAxis: {
        title: {
          text: "Total Account",
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',
      },

      series: [
        {
          colorByPoint: true,
          data: [
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
            {
              name: "",
              y: 0,
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    },
  }),
  created() {
    this.getSosmed();
    this.getStatus();
    this.getPieChart();
    this.getBarChart();
  },
  methods: {
    getSosmed() {
      axios
        .get("http://localhost:8080/account/countAll")
        .then((res) => {
          let object = {};

          res.data.forEach((i) => {
            object[i.type] = i.total;
          });

          this.items = this.items.map((i) => {
            return { ...i, value: object[i.type] };
          });

          console.log(this.items);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStatus() {
      axios
        .get("http://localhost:8080/account/countByStatus/")
        .then((res) => {
          console.log(res);

          this.totals = res.data;

          console.log(this.totals);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPieChart() {
      axios
        .get("http://localhost:8080/account/countAll")
        .then((res) => {
          let sosmed = res.data;

          const options = sosmed.map((s) => {
            return {
              name: s.type,
              y: s.total,
            };
          });
          console.log(options);

          this.Options.series[0].data = options;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBarChart() {
      axios
        .get("http://localhost:8080/account/dailyUpdate")
        .then((res) => {
          let update = res.data;

          const options = update.map((u) => {
            return {
              name: u.type,
              y: u.total,
            };
          });
          console.log(res.data);

          this.chartOptions.series[0].data = options;
        })
        .catch((err) => {
          console.log(err);
        });
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
  font-family: "Poppins", sans-serif;
}
.content {
  background-color: #efefef;
  height: 105vh;
}

.v-list-item {
  font-family: "Poppins", sans-serif;
}

.list-item {
  padding: 0px;
}
</style>
