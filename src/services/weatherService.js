import axios from 'axios'

const API_KEY = process.env.VUE_APP_API_KEY
const BASE_URL = process.env.VUE_APP_API_BASE_URL

export const fetchWeather = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  const response = await axios.get(url)
  return response.data
}
