<template>
  <div class="app">
    <h1>Simple Weather</h1>
    <CityTabs :selectedCity="selectedCity" @select-city="handleCitySelect" />
<!--<button @click="refreshWeather">🔄 Refresh</button>-->
    <WeatherDisplay :weatherData="weatherData" v-if="weatherData" />
    <div class="lastUpdated" v-if="weatherData">
      <p>Last updated on {{ new Date(weatherData.list[0].dt * 1000).toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CityTabs from './components/CityTabs.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import { fetchWeather } from './services/weatherService.js'

const selectedCity = ref({
  name: 'Rio de Janeiro',
  lat: -22.9068,
  lon: -43.1729
})
const weatherData = ref(null)

const loadWeather = async () => {
weatherData.value = await fetchWeather(selectedCity.value.lat, selectedCity.value.lon)
}

const handleCitySelect = (city) => {
  selectedCity.value = city
  loadWeather()
}
// Uncomment the line below to enable the refresh button
// const refreshWeather = () => {
//  loadWeather()
// }

onMounted(loadWeather)
</script>
