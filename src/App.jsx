import React, { useEffect, useState } from "react";
import { ArrowIcon, LocationIcon, SignalIcon } from "./components/Icons";
import { Search } from "./components/Search";
import { Loading } from "./components/Loading";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherHighlights from "./components/WeatherHighlights";
import { Footer } from "./components/Footer";
import {
  getForecast,
  getForecastByCords,
  getWeather,
  getWeatherByCords,
} from "./components/api/fetch";
import { addPlaceToLocalStorage } from "./utils/storage";
import { getWindDirection } from "./utils/windDirection";
import { Main } from "./components/Main";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    minTemp: 0,
    maxTemp: 0,
    dateFormat: "",
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityInMiles: 0,
    weather: "",
    locationName: "",
    windDeg: "",
  });
  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [celsiusButtonActive, setCelsiusButtonActive] = useState(true);
  const [loading, setLoading] = useState(true);

  const changeWeather = (data) => {
    const { weather, main, visibility, wind, name } = data;
    const date = new Date();
    const dateOptions = { weekday: "short", day: "numeric", month: "short" };

    setWeatherData({
      temp: Math.round(main?.temp ?? 0),
      minTemp: Math.round(main?.temp_min ?? 0),
      maxTemp: Math.round(main?.temp_max ?? 0),
      dateFormat: date.toLocaleDateString("en-UK", dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? "Shower",
      locationName: name,
      windDeg: wind?.deg ?? 0,
    });

    const progreso = document.getElementById("progress");
    const windStatus = document.getElementById("windStatus");
    progreso.style.width = Math.round(main?.humidity ?? 0) + "%";
    windStatus.style.transform = `rotate(${wind.deg}deg)`;
  };

  const changeForecast = (data) => {
    const dailyForecast = {};

    data.list.forEach((segment) => {
      const fechaTexto = segment.dt_txt;
      const fecha = new Date(fechaTexto);
      const day = fecha.toLocaleDateString("en-UK", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      if (!dailyForecast[day]) {
        dailyForecast[day] = {
          minTemp: segment.main.temp_min,
          maxTemp: segment.main.temp_max,
          weather: segment.weather[0].main,
        };
      } else {
        dailyForecast[day].minTemp = Math.min(
          dailyForecast[day].minTemp,
          segment.main.temp_min
        );
        dailyForecast[day].maxTemp = Math.max(
          dailyForecast[day].maxTemp,
          segment.main.temp_max
        );
      }
    });
    const dayKeys = Object.keys(dailyForecast);
    setForecastData(dailyForecast);
    setKeys(dayKeys);
  };

  const cords = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByCords(lat, lon)
            .then((data) => {
              changeWeather(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
            
          getForecastByCords(lat, lon).then((data) => changeForecast(data));
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("El usuario ha negado el acceso a la ubicación");
            getWeather("Helsinki").then((data) => changeWeather(data));
            getForecast("Helsinki").then((data) => changeForecast(data));
            setLoading(false);
          } else {
            console.log("Error al obtener la ubicación:", error.message);
            setLoading(false);
          }
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }
  };

  const inputSearch = (place) => {
    addPlaceToLocalStorage(place);
    getWeather(place).then((data) => changeWeather(data));
    getForecast(place).then((data) => changeForecast(data));
  };

  const toggleToCelsius = () => {
    setIsCelsius(true);
    setCelsiusButtonActive(true);
  };

  const toggleToFahrenheit = () => {
    setIsCelsius(false);
    setCelsiusButtonActive(false);
  };

  useEffect(() => {
    setLoading(true);
    cords();
  }, []);

  const directionText = getWindDirection(weatherData.windDeg);

  if (loading) {
    return <Loading />;
  }

  return (
    <Main>
      <WeatherCard
        weatherData={weatherData}
        isCelsius={isCelsius}
        toggleToCelsius={toggleToCelsius}
        toggleToFahrenheit={toggleToFahrenheit}
        inputSearch={inputSearch}
        cords={cords}
      />
      <section className="md:flex-1 md:ml-[613px] md:mr-[123px] md:mt-[42px]">
        <ForecastCard
          keys={keys}
          forecastData={forecastData}
          isCelsius={isCelsius}
          toggleToCelsius={toggleToCelsius}
          toggleToFahrenheit={toggleToFahrenheit}
          celsiusButtonActive={celsiusButtonActive}
        />
        <WeatherHighlights
          weatherData={weatherData}
          directionText={directionText}
        />
        <Footer />
      </section>
    </Main>
  );
}

export default App;
