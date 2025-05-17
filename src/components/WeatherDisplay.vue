<template>
  <div>
    <h2>Current: {{ Math.trunc(weatherData.list[0].main.temp) }}°C</h2>
    <img :src="iconUrl(weatherData.list[0].weather[0].icon)" />

    <h3>Next Hours</h3>
    <div class="forecast-hours-row">
      <div v-for="(hour, i) in weatherData.list.slice(0, 4)" :key="i">
        <p>{{ Math.trunc(hour.main.temp) }}°C</p>
        <p>{{ Math.trunc(hour.main.humidity) }}%</p>
        <img :src="iconUrl(hour.weather[0].icon)" />
        <p>{{ formatHour(hour.dt) }}</p>
      </div>
    </div>

    <h3>Next 5 Days</h3>
    <div class="forecast-days-row">
      <div v-for="(day, i) in uniqueDailyForecasts" :key="i" class="weather-row">
        <div class="weather-icon">
          <img :src="iconUrl(day.weather[0].icon)" />
        </div>
        <div class="weather-info">
          <div class="day">{{ formatDayLong(day.dt) }}</div>
          <div class="summary">{{ day.weather[0].main }}</div>
        </div>
        <div class="temps">
          <span class="high">{{ Math.trunc(day.main.temp_max) }}°</span>
          <span class="low">{{ Math.trunc(day.main.temp_min) }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  weatherData: {
    type: Object,
    required: true
  }
})

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

const formatHour = (ts) => new Date(ts * 1000).toLocaleTimeString([], {
  hour: '2-digit', minute: '2-digit'
})

const formatDayLong = (ts) => {
  const date = new Date(ts * 1000); // Convert from seconds to ms
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

import { computed } from 'vue'

const uniqueDailyForecasts = computed(() => {
  const dailyMap = new Map();

  props.weatherData.list.forEach(entry => {
    const date = new Date(entry.dt * 1000);
    const day = date.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"

    if (!dailyMap.has(day)) {
      dailyMap.set(day, entry);
    }
  });

  return Array.from(dailyMap.values()).slice(0, 5); // Get first 5 unique days
})
</script>

<style scoped>
.forecast-hours-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.forecast-hours-row {
  font-family: Arial, sans-serif;
  margin: 20px auto;
}

.forecast-hours-row h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

.weather-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.weather-icon img {
  margin-right: 12px;
}

.weather-info {
  flex: 1;
  text-align: center;
}

.day {
  font-weight: bold;
}

.summary {
  font-size: 13px;
  color: #666;
}

.temps {
  text-align: right;
}

.high {
  margin-right: 8px;
  font-weight: bold;
}

.low {
  color: #555;
}
</style>
