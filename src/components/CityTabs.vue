<template>
  <div class="tabs">
    <button v-for="city in cities" :key="city.name" :class="{ active: city.name === selectedCity.name }"
      @click="$emit('select-city', city)">
      {{ city.name }}
    </button>
  </div>
</template>

<script setup>//
defineProps(
  {
    selectedCity: {
      type: Object,
      required: true
    }
  },
  {
    "select-city": {
      type: Object,
      required: true
    }
  }
)

const cities = [
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 }
]
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button.active {
  border-bottom: 2px solid #f74b24;
}
</style>
