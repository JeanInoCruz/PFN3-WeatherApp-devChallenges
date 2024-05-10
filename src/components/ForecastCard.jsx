import React, { useState } from "react";

const ForecastCard = ({ keys, forecastData, isCelsius, toggleToCelsius, toggleToFahrenheit, celsiusButtonActive }) => {
    
  return (
    <>
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
    </>
  );
};

export default ForecastCard;