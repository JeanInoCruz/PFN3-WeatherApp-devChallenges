import React from "react";
import "./styles/Loading.css";

export const Loading = () => {
  return (
    <>
      <div className="container md:flex-col md:w-full">
        <div className="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
        <div className="md: text-2xl md:absolute md:top-[600px] hidden md:flex">
          <h1>Cargando...</h1>
        </div>
      </div>
    </>
  );
};
