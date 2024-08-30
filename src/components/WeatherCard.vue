<template>
  <div class="weather-card glass-effect">
    <div style="display: flex; justify-content: space-between">
      <div class="weather-title">
        {{ weatherInfo?.name }}
      </div>
      <div style="display: flex">
        <button
          class="favorite-button"
          :style="{ background: isFavorite ? 'yellow' : 'white' }"
          @click="setFavorite"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div style="display: flex">
      <img :src="weaterIcon" alt="" width="75px" height="75px" />
      <span
        style="
          margin-top: 8px;
          font-size: 64px;
          line-height: 62px;
          align-items: center;
          direction: ltr;
        "
        >{{ Math.round(weatherInfo.main.temp) }}°
      </span>
      <span
        style="
          font-size: 34px;
          height: 100%;
          display: flex;
          align-items: center;
        "
        >C</span
      >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          margin-left: 32px;
        "
      >
        <span style="font-size: 18px; line-height: 24px; font-weight: 600">{{
          detailWeatherInfo.main
        }}</span>
        <span style="font-size: 12px"
          >Feels like {{ Math.round(detailWeatherInfo.feels_like) }}°</span
        >
      </div>
    </div>
    <div style="text-align: left; margin-top: 24px">
      {{ detailWeatherInfo.description }}
    </div>
    <div class="more-info">
      <div class="detail-info">
        <span class="title">Humidity</span>
        <span>{{ detailWeatherInfo.humidity }}%</span>
      </div>
      <div class="detail-info">
        <span class="title">Pressure</span>
        <span>{{ detailWeatherInfo.pressure }} mb</span>
      </div>
      <div class="detail-info">
        <span class="title">Visibility</span>
        <span>{{ weatherInfo.visibility / 1000 }} km</span>
      </div>
      <div class="detail-info">
        <span class="title">Clouds</span>
        <span>{{ weatherInfo.clouds.all }}%</span>
      </div>
      <div class="detail-info">
        <span class="title">Wind</span>
        <span style="display: flex; justify-content: center"
          >{{ weatherInfo.wind.speed }}
          <svg
            width="14"
            height="14"
            viewBox="0 0 10 14"
            :style="{ transform: `rotate(-${weatherInfo.wind.deg}deg)` }"
          >
            <path
              d="M5 0L9.66895 14L5 9.33105L0.331055 14L5 0Z"
              fill="white"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <temp-chart v-if="false" :currentUserPosition="currentUserPosition" />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import TempChart from "./TempChart.vue";

export default defineComponent({
  name: "weather-card",
  props: {
    weatherInfo: { type: Object, default: () => {} },
    currentUserPosition: { type: Object, default: () => {} },
  },
  components: {
    TempChart,
  },
  computed: {
    ...mapGetters(["favoriteCities"]),
    weaterIcon() {
      return `https://openweathermap.org/img/wn/${this.weatherInfo?.weather?.[0]?.icon}.png`;
    },
    detailWeatherInfo() {
      return {
        ...this.weatherInfo?.weather?.[0],
        ...this.weatherInfo?.main,
      };
    },
    isFavorite() {
      return this.favoriteCities.filter((el) => el.id === this.weatherInfo.id)
        .length;
    },
  },
  setup() {
    return {};
  },
  methods: {
    ...mapMutations(["deleteFavoriteCity"]),
    async deleteWeather() {
      await store.dispatch("DELETE_WEATHER", this.weatherInfo.id);
    },
    async setFavorite() {
      if (this.isFavorite) {
        this.deleteFavoriteCity(this.weatherInfo);
      } else {
        await store.dispatch("SET_FAVOTIRE_WEATHER", this.weatherInfo);
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

.weather-card {
  border-radius: 8px;
  padding: 12px 24px;
  max-width: 560px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  //   background-image: url("../assets/snowy.gif");
  // color: red;
}
.weather-title {
  font-size: xx-large;
  font-family: "Open Sans", sans-serif;
}
.favorite-button {
  cursor: pointer;
  border-radius: 16px;
  border-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
}
.more-info {
  margin-top: auto;
  position: relative;
  display: grid;
  padding: 12px 0;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: center;
}
.detail-info {
  display: flex;
  flex-direction: column;
}

.more-info::before {
  content: "";
  height: 1px;
  width: 100%;
  position: absolute;
  background: gray;
}
.detail-info > .title {
  font-size: 0.75em;
  font-weight: normal;
  line-height: 1em;
  opacity: 0.8;
}
.detail-info :first-child {
  margin-bottom: 4px;
}
</style>
