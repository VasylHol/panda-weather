<template>
  <div class="header">
    <h2>Panda Weahter</h2>
  </div>
  <search-input />
  <div class="container">
    <city-weather :currentWeather="getCurrentWeather" />
    <history-list v-if="getCurrentWeather" />
  </div>
  <temp-chart
    v-if="getCurrentWeather?.coord"
    :currentUserPosition="getCurrentWeather?.coord"
  />
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import SearchInput from "@/components/SearchInput.vue";
import CityWeather from "@/components/CityWeather.vue";
import HistoryList from "@/components/history/HistoryList.vue";
import store from "@/store";
import TempChart from "@/components/TempChart.vue";

export default defineComponent({
  name: "weather-page",
  setup() {
    return {};
  },
  components: { SearchInput, CityWeather, HistoryList, TempChart },
  data() {
    return {
      currentUserPosition: null,
      currentWeather: null,
    };
  },
  computed: {
    ...mapGetters(["defaultUserPosition", "weathersList", "getCurrentWeather"]),
  },
  async mounted() {
    await store.dispatch("GET_DEFAULT_USER_POSITION");
    await store.dispatch("GET_WEATHER_BY_DEFAULT_POSITION");
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
}
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 1030px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
