import axios from 'axios'

const API_KEY = '95785a793dd8ff2fbcdcd608576d39b8'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'

export const fetchWeather = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  const response = await axios.get(url)
  return response.data
}
