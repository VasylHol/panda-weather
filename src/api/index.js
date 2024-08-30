import api from "./api";

const APP_ID  = process.env.VUE_APP_API_WEATHER_KEY
export const apiMethods = {
  async getCurrentUserPosition(){
    const apiKey = '122c3056145646c8bd928b73e967e95d'
    const data = await api('https://api.geoapify.com/v1/').get(`/ipinfo?apiKey=${apiKey}`)
    return data.data
  },
  async getWeather(userPosition) {
    try{
        const params = { lat: userPosition.lat, lon: userPosition.lon, APPID: APP_ID, units: 'metric' };
        const data = await api().get(`/data/2.5/weather`, { params });
        return data.data;
    }   
    catch(e){
        console.log(e)
    }
  },
  async getTemperature(userPosition){
    const params = { lat: userPosition.lat, lon: userPosition.lon, APPID: APP_ID, cnt: 8, units: 'metric' };
    const data = await api().get('/data/2.5/forecast', {params})
    return data.data
  },
  async getCityList(cityName){
    const params = {APPID: APP_ID, q: cityName, limit: 5}
    const data = await api().get('/geo/1.0/direct', {params})
    return data.data
  }
};
