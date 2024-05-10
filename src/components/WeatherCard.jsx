import React, { useState } from "react";
import { Search } from "./Search";
import { LocationIcon, SignalIcon } from "./Icons";


const WeatherCard = ({ weatherData, inputSearch, cords, isCelsius }) => {
    
  return (
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
  );
};

export default WeatherCard;
