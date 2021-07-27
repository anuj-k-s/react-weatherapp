import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Card from "../UI/Card/Card";
import CityForm from "../CityForm/CityForm";
import CityList from "../CityList/CityList";
const Home = () => {
  const [cities, updateCities] = useState([]);
 
  const addCityHandler = (city) => {
    fetch("https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/.json", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(city),
      headers: { "Content-Type": "application/json" },
    }).then(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    updateCities((prevCities) => [...prevCities, { id: Math.random().toString(), ...city }]);
  };

  const removeCityHandler = (id) => {
    updateCities((prevCities) => prevCities.filter((city) => city.id !== id));
  };
  return (
    <React.Fragment>
      <CityForm onAddCity={addCityHandler} />
      <section>
        <CityList cities={cities} onRemoveItem={removeCityHandler} />
      </section>
    </React.Fragment>
  );
};

export default Home;
