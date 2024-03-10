import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getCurrentWeather = (lat, lon) => {
    return axios
        .get(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then((response) => response.data);
    };


export default { getCurrentWeather };