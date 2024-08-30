<template>
  <weather-card
    v-if="currentWeather"
    :weatherInfo="currentWeather"
    :currentUserPosition="currentUserPosition"
  />
</template>

<script>
import { defineComponent } from "vue";
import WeatherCard from "./WeatherCard.vue";
export default defineComponent({
  components: { WeatherCard },
  props: {
    currentWeather: { type: Object, default: () => {} },
    currentUserPosition: { type: Object, default: () => {} },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
