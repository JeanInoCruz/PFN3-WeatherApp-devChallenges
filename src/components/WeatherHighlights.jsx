import React from "react";
import { ArrowIcon } from "./Icons";

const WeatherHighlights = ({ weatherData, directionText }) => {
  return (
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
  );
};

export default WeatherHighlights;