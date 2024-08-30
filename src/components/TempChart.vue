<template>
  <div
    style="
      width: 100%;
      height: 200px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      margin-top: 20px;
    "
  >
    <div style="text-align: left; padding-top: 8px; padding-left: 8px">
      Hourly forecast
    </div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import { apiMethods } from "@/api";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import store from "@/store";
export default defineComponent({
  name: "temp-chart",
  props: {
    currentUserPosition: { type: Object, default: () => {} },
  },
  setup() {
    return {};
  },
  data() {
    return {
      weaterTempInfo: null,
      chart: null,
    };
  },
  computed: {
    temperature() {
      return this.weaterTempInfo?.list?.map((el) => {
        return Math.round(el.main.temp);
      });
    },
    temperatureLabels() {
      return this.weaterTempInfo?.list?.map((el) => {
        const elementDate = new Date(el.dt * 1000);
        const hours = elementDate.getHours();
        const timePeriod = hours > 12 ? "PM" : "AM";
        return (hours % 12 || 12) + " " + timePeriod;
      });
    },
    chartData() {
      return {
        labels: this.temperatureLabels,
        datasets: [
          {
            data: this.temperature,
            pointRadius: 0,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            fill: true,
          },
        ],
      };
    },
    chartOptions() {
      return {
        maintainAspectRatio: false,
        hover: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          tooltip: false,
          legend: {
            display: false,
          },
          datalabels: {
            color: "white",
            formatter: (value) => {
              return value + "°";
            },
            anchor: "start",
            align: "start",
            offset: 2,
          },
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            grid: { drawOnChartArea: false },
          },
          x: {
            grid: { drawOnChartArea: false },
          },
        },
      };
    },
  },
  async mounted() {
    this.weaterTempInfo = await store.dispatch(
      "GET_TEMPERATURE",
      this.currentUserPosition
    );
    const ctx = this.$refs["myChart"];
    this.chart = new Chart(ctx, {
      type: "line",
      data: this.chartData,
      options: this.chartOptions,
      plugins: [ChartDataLabels],
    });
  },
  unmounted() {
    this.chart.destroy();
  },
  watch: {
    currentUserPosition: {
      handler: async function () {
        this.weaterTempInfo = await store.dispatch(
          "GET_TEMPERATURE",
          this.currentUserPosition
        );
        await this.chart.destroy();
        const ctx = this.$refs["myChart"];

        this.chart = new Chart(ctx, {
          type: "line",
          data: this.chartData,
          options: this.chartOptions,
          plugins: [ChartDataLabels],
        });
      },
    },
  },
});
</script>

<style scoped></style>
