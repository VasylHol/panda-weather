<template>
  <div class="weather-block" v-if="!isLoading">
    <div class="weather-info" :style="getStyle(currentImage)">
      <div class="weather-info_upper-block weather-info_inner-blocks">
        <div class="weather-info_title">
          <span> {{ currentDay }} </span>
        </div>
        <div class="weather-info_date">
          <span>{{ currentDate }}</span>
        </div>
        <div class="weahter-info_location">
          <img :src="getIconUrl('location')" alt="" height="27px" /><span
            >{{ currentWeather.name }}, {{ currentWeather.sys.country }}</span
          >
        </div>
      </div>
      <div class="weather-info-lower-block weather-info_inner-blocks">
        <img :src="getIconUrl(currentIcon)" alt="" height="95px" width="95px" />
        <div class="weather-info_temperature">
          <span>{{ Math.round(detailWeather.temp) }} °C</span>
        </div>
        <div class="weather-info_weather">
          {{ detailWeather.main }}
        </div>
      </div>
    </div>
    <div class="weather-addition">
      <div>
        <div class="weather-addition-info">
          <span>PRESSURE</span>
          <span>{{ detailWeather.pressure }}mb</span>
        </div>
        <div class="weather-addition-info">
          <span>HUMIDITY</span>
          <span>{{ detailWeather.humidity }}%</span>
        </div>
        <div class="weather-addition-info">
          <span>WIND</span>
          <span>{{ Math.round(currentWeather.wind.speed) }}km/h</span>
        </div>
        <div class="weather-addition-info">
          <span>VISIBILITY</span>
          <span>{{ currentWeather.visibility / 1000 }} km</span>
        </div>
        <div class="weather-addition-info">
          <span>CLOUDS</span>
          <span>{{ currentWeather.clouds.all }}%</span>
        </div>
      </div>
      <button type="button" class="location-button" @click="show = !show">
        <img :src="getIconUrl('location')" alt="" /><span>Change Location</span>
      </button>
    </div>
  </div>
  <change-weather-dialog v-model="show" title="Location Change" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ChangeWeatherDialog from "./ChangeWeatherDialog.vue";
const store = useStore();
const isLoading = ref(true);
const show = ref(false);
const currentWeather = computed(() => {
  return store.getters.getCurrentWeather;
});

const detailWeather = computed(() => {
  return {
    ...store.getters.getCurrentWeather?.weather?.[0],
    ...store.getters.getCurrentWeather?.main,
  };
});
const currentDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
const currentDay = computed(() => {
  const today = new Date();
  return today.toLocaleDateString("en-US", { weekday: "long" });
});

const currentImage = computed(() => {
  const main = detailWeather.value.main.toLowerCase();
  return `${main}.jpg`;
});

const currentIcon = computed(() => {
  return detailWeather.value.main.toLowerCase();
});
function getStyle(img) {
  return {
    backgroundImage: `linear-gradient(
      to right bottom,
      rgba(136, 236, 239, 0.7),
      rgba(83, 91, 230, 0.7)
    ), url('${img}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
const getIconUrl = (name) => {
  return require(`@/assets/weather-icons/${name}.svg`);
};

onMounted(async () => {
  isLoading.value = true;
  await store.dispatch("GET_DEFAULT_USER_POSITION");
  await store.dispatch("GET_WEATHER_BY_DEFAULT_POSITION");
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.weather-block {
  position: relative;
  background-color: #222831;
  display: flex;
  height: 623px;
  width: 1100px;
  border-radius: 24px;
}
@media (min-width: 1400px) {
  .weather-block {
    transform: scale(1.5);
  }
}

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.weather-info {
  height: 650px;
  min-width: 493px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 50%;
  // background-image: linear-gradient(
  //     to right bottom,
  //     rgba(136, 236, 239, 0.7),
  //     rgba(83, 91, 230, 0.7)
  //   ),
  //   url("/public/weather-beach.jpg");
  background-size: cover;
  background-position: 50% 55%;
  border-radius: 24px;
  position: relative;
  bottom: 12px;
  left: -16px;
  animation: moveInLeft 2s ease-out;
}

.weather-addition {
  width: 50%;
  padding: 55px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.weather-addition-info {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 28px;
  margin-top: 16px;
}

.weather-switch {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-top: 80px;
}
.weather-switch-item {
  background-color: #272e37;
  height: 165px;
  min-width: 103px;
  border-radius: 10px;
}

.weather-switch-item img {
  margin-top: 14px;
}

.weather-switch-item span {
  display: block;
}

.location-button {
  all: unset;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  height: 53px;
  margin-top: 70px;
  background: linear-gradient(to right, #90d9e0, #5460e6);
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.weather-info_title {
  font-weight: 700;
  font-size: 2.313rem;
  display: flex;
}

.weahter-info_location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1.25rem;
  font-weight: 600;
}
.weather-info_date {
  display: flex;
  font-size: 1.375rem;
}
.weather-info_inner-blocks {
  padding-top: 48px;
  padding-left: 32px;
  padding-bottom: 82px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
}

.weather-info_temperature {
  font-size: 3.125rem;
  font-weight: 700;
}
.weather-info_weather {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: left;
}
</style>
