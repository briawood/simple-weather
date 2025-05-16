<template>
  <div>
    <h2>Current: {{ weatherData.current.temp }}°C</h2>
    <img :src="iconUrl(weatherData.current.weather[0].icon)" />

    <h3>Next 6 Hours</h3>
    <div class="forecast-row">
      <div v-for="(hour, i) in weatherData.hourly.slice(0, 6)" :key="i">
        <p>{{ formatHour(hour.dt) }}</p>
        <img :src="iconUrl(hour.weather[0].icon)" />
        <p>{{ hour.temp }}°C</p>
      </div>
    </div>

    <h3>Next 5 Days</h3>
    <div class="forecast-row">
      <div v-for="(day, i) in weatherData.daily.slice(0, 5)" :key="i">
        <p>{{ formatDay(day.dt) }}</p>
        <img :src="iconUrl(day.weather[0].icon)" />
        <p>{{ day.temp.day }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weatherData: {
    type: String,
    required: true
  }
})

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

const formatHour = (ts) => new Date(ts * 1000).toLocaleTimeString([], {
  hour: '2-digit', minute: '2-digit'
})

const formatDay = (ts) => new Date(ts * 1000).toLocaleDateString([], {
  weekday: 'short'
})
</script>

<style scoped>
.forecast-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
