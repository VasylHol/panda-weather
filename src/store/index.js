import { createStore } from "vuex";
import { apiMethods } from "@/api";
export default createStore({
  state: {
    default_user_position: null,
    weathers: [],
    current_weather: null,
    search_city_list: [],
    favorite_cities: [],
    history: [],
  },
  getters: {
    defaultUserPosition: (state) => ({
      ...state.default_user_position,
      coord: {
        lat: state.default_user_position.location.latitude,
        lon: state.default_user_position.location.longitude,
      },
    }),
    weathersList: (state) => state.weathers,
    serchCityList: (state) => state.search_city_list,
    favoriteCities: (state) => state.favorite_cities,
    historyList: (state) => state.history,
    getCurrentWeather: (state) => state.current_weather,
  },
  mutations: {
    setDefaultUserPosition(state, payload) {
      state.default_user_position = payload;
    },
    setWeather(state, payload) {
      state.weathers.push(payload);
    },
    setCurrentWeather(state, payload) {
      state.current_weather = payload;
    },
    setCityList(state, payload) {
      state.search_city_list = payload;
    },
    deleteWeather(state, payload) {
      state.weathers = state.weathers.filter((el) => el.id !== payload);
    },
    setFavoriteCity(state, payload) {
      state.favorite_cities.push(payload);
    },
    deleteFavoriteCity(state, payload) {
      state.favorite_cities = state.favorite_cities.filter(
        (el) => el.id !== payload.id
      );
    },
    setHistoryCity(state, payload) {
      state.history.unshift(payload);
    },
    deleteAllSearchList(state) {
      state.search_city_list = [];
    },
  },
  actions: {
    async GET_DEFAULT_USER_POSITION() {
      try {
        const defaultUserPosition = await apiMethods.getCurrentUserPosition();
        this.commit("setDefaultUserPosition", defaultUserPosition);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_WEATHER_BY_DEFAULT_POSITION({ getters, commit }) {
      try {
        const defaultWeather = await apiMethods.getWeather(
          getters.defaultUserPosition.coord
        );
        if (getters.getCurrentWeather) {
          commit("setHistoryCity", getters.getCurrentWeather);
        }
        commit("setCurrentWeather", defaultWeather);
      } catch (e) {
        console.log(e);
      }
    },
    async SET_WEATHER({ commit, getters, state }, city) {
      try {
        const cityWeather = await apiMethods.getWeather(city);
        const isCityInHistory = getters.historyList.filter(
          (el) => el.id === getters.getCurrentWeather.id
        );

        if (getters.historyList.length === 5 && !isCityInHistory.length) {
          state.history.pop();
        }
        if (getters.getCurrentWeather && !isCityInHistory.length) {
          commit("setHistoryCity", getters.getCurrentWeather);
        }
        commit("setCurrentWeather", cityWeather);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_CITY_LIST({ commit }, searchName) {
      try {
        const cityList = await apiMethods.getCityList(searchName);
        commit("setCityList", cityList);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_TEMPERATURE(context, position) {
      try {
        console.log("positions ====", position);
        return await apiMethods.getTemperature(position);
      } catch (e) {
        console.log(e);
      }
    },
    async DELETE_WEATHER({ commit }, weatherId) {
      try {
        commit("deleteWeather", weatherId);
      } catch (e) {
        console.log(e);
      }
    },
    async SET_FAVOTIRE_WEATHER({ getters, commit }, city) {
      commit("setFavoriteCity", city);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(getters.favoriteCities)
      );
    },
    // async SET_FAVORITE_CITY(){
    //   try{
    //     this.commit()
    //   }
    // }
  },

  modules: {},
});
