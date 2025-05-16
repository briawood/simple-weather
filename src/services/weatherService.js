import axios from 'axios'
const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
export const fetchWeather = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  const response = await axios.get(url)
  return response.data
}
