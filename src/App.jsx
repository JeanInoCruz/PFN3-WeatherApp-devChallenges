import React, { useEffect, useState } from "react";
import { ArrowIcon, LocationIcon, SignalIcon } from "./components/Icons";
import { Search } from "./components/Search";
import { Loading } from "./components/Loading";
import {
  getForecast,
  getForecastByCords,
  getWeather,
  getWeatherByCords,
} from "./components/api/fetch";
import { addPlaceToLocalStorage } from "./utils/storage";
import { Footer } from "./components/Footer";
import { getWindDirection } from "./utils/windDirection";

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
            // El usuario ha negado el acceso a la ubicación
            console.log("El usuario ha negado el acceso a la ubicación");
            getWeather("Helsinki").then((data) => changeWeather(data));
            getForecast("Helsinki").then((data) => changeForecast(data));
            // Mantén la ubicación predeterminada
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
    <main className="md:flex max-w-8xl mx-auto">
      <section className="overflow-hidden md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[459px] relative">
        <article className="bg-blue-1 h-screen">
          <Search inputSearch={inputSearch} />
          <button
            className="absolute top-[18px] md:top-[42px] right-4 md:right-11 bg-gray-3 rounded-full p-2"
            onClick={cords}
          >
            <SignalIcon />
          </button>
          <div className="flex flex-col items-center justify-center">
            <img
              src="Cloud-background.png"
              alt=""
              className="absolute min-w-[563px] overflow-hidden top-[58px] md:top-[103px] md:h-[376px] opacity-5 md:min-w-[650px]"
            />
            <img
              className="w-[150px] mt-[134px] md:min-w-[212px] md:mt-[191px] md:mb-[47px]"
              src={`/${weatherData.weather}.png`}
              alt={`/${weatherData.weather}`}
            />
            <p className="text-[144px] mt-10 font-medium md:h-[169px] text-center p-0">
              {isCelsius
                ? weatherData.temp
                : Math.round((weatherData.temp * 9) / 5 + 32)}
              <span className="text-gray-2 text-5xl">
                {isCelsius ? "°C" : "°F"}
              </span>
            </p>
            <p className="text-gray-2 text-4xl font-semibold mt-[23px] mb-[48px] md:my-[87px] md:h-[42px]">
              {weatherData.weather}
            </p>
            <div className="flex gap-4 text-gray-2 text-lg font-medium pb-8">
              <span>Today</span>
              <span>•</span>
              <span>{weatherData.dateFormat}</span>
            </div>
            <div className="flex gap-2">
              <LocationIcon />
              <p className="text-gray-2 text-lg font-semibold">
                {weatherData.locationName}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="md:flex-1 md:ml-[613px] md:mr-[123px] md:mt-[42px]">
        <div
          id="temp-change"
          className="hidden md:flex items-center justify-end pr-[2px] mb-[66px] gap-3"
        >
          <button
            className={`rounded-full text-lg flex justify-center items-center font-bold p-3 h-10 ${
              celsiusButtonActive ? "bg-gray-1 text-[#110E3C]" : "bg-gray-5"
            }`}
            onClick={toggleToCelsius}
          >
            °C
          </button>
          <button
            className={`rounded-full text-lg flex justify-center items-center font-bold p-3 h-10 ${
              !celsiusButtonActive ? "bg-gray-1 text-[#110E3C]" : "bg-gray-5"
            }`}
            onClick={toggleToFahrenheit}
          >
            °F
          </button>
        </div>
        <section className=" p-[52px] md:p-0 md:pb-[72px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[26px]">
          {keys.slice(0, 5).map((day) => {
            const minTemp = Math.floor(
              isCelsius
                ? forecastData[day].minTemp
                : (forecastData[day].minTemp * 9) / 5 + 32
            );
            const maxTemp = Math.floor(
              isCelsius
                ? forecastData[day].maxTemp
                : (forecastData[day].maxTemp * 9) / 5 + 32
            );
            const weather = forecastData[day].weather;
            return (
              <article
                className="flex flex-col items-center bg-blue-1 py-4 px-[15px] w-[122px] mx-auto h-[177px] "
                key={day}
              >
                <p className="text-base font-medium pb-3">{day}</p>
                <img
                  className="w-14 pb-8"
                  src={`/${weather}.png`}
                  alt={`/${weather}.png`}
                />
                <div className="flex gap-8">
                  <span>
                    {maxTemp}°{isCelsius ? "C" : "F"}
                  </span>
                  <span className="text-gray-2">
                    {minTemp}°{isCelsius ? "C" : "F"}
                  </span>
                </div>
              </article>
            );
          })}
        </section>
        <section className="px-6 md:p-0">
          <h3 className="text-2xl font-bold pb-8">Today’s Hightlights </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <article className="flex flex-col items-center bg-blue-1 w-full p-6 ">
              <p className="text-base font-medium pb-2">Wind status</p>
              <p className="text-[64px] font-bold">
                {weatherData.windStatus}
                <span className="text-4xl font-medium">mph</span>
              </p>
              <div className="flex items-center gap-4">
                <span
                  id="windStatus"
                  className="bg-gray-4 rounded-full w-7 h-7 flex justify-center items-center"
                >
                  <ArrowIcon />
                </span>
                <span className="text-[14px]">{directionText}</span>
              </div>
            </article>
            <article className="flex flex-col items-center bg-blue-1 w-full py-6 px-12">
              <p className="text-base font-medium">Humidity</p>
              <p className="text-[64px] font-bold">
                {weatherData.humidity}
                <span className="text-4xl font-normal">%</span>
              </p>
              <div className="flex justify-between w-full text-xs ">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div className="w-full h-2 bg-gray-1 rounded-full overflow-hidden">
                <div
                  id="progress"
                  className="h-full bg-yellow-1 transition-all duration-300"
                />
              </div>
              <span className="flex justify-end w-full text-xs">%</span>
            </article>
            <article className="flex flex-col items-center bg-blue-1 w-full p-6 h-[160px] ">
              <p className="text-base font-medium pb-2">Visibility</p>
              <p className="text-[64px] font-bold h-[75px]">
                {weatherData.visibilityInMiles.toFixed(1)}{" "}
                <span className="text-4xl font-medium">miles</span>
              </p>
            </article>
            <article className="flex flex-col items-center bg-blue-1 w-full p-6 h-[160px] ">
              <p className="text-base font-medium pb-2">Air Pressure</p>
              <p className="text-[64px] font-bold h-[75px]">
                {weatherData.airPressure}{" "}
                <span className="text-4xl font-medium">mb</span>
              </p>
            </article>
          </div>
        </section>
        < Footer />
      </section>
    </main>
  );
}

export default App;

