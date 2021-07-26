import React, { useState } from "react";
import styles from "./Home.module.css";
import  Card  from "../UI/Card/Card";
import CityForm from "../CityForm/CityForm";
import CityList from "../CityList/CityList";
const Home = () => {
  const [cities,updateCities] =  useState([]);
  const addCityHandler = city => {
   updateCities(prevCities => [
    ...prevCities,{id:Math.random().toString(),...city}
   ])
  }
  return (
    <React.Fragment>
      <CityForm onAddCity={addCityHandler}/>
      <section>
        <CityList cities = {cities}/>
      </section>
      
    </React.Fragment>
  );
};

export default Home;
