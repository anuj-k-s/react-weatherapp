import React, { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Card from "../UI/Card/Card";
import CityForm from "../CityForm/CityForm";
import CityList from "../CityList/CityList";
import Search from "../Search/Search";

const Home = () => {
  const [cities, updateCities] = useState([]);
  console.log("home component loading");

  // useEffect(() => {
  //   fetch("https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       const dbCities = [];
  //       for (const key in responseData) {
  //         dbCities.push({ id: key, cityName: responseData[key].cityName, cityTemp: responseData[key].cityTemp });
  //       }
  //       updateCities(dbCities);
  //     });
  // }, []);
  /* 	Use Effect with empty [] will execute only once on load of component ,so will work like conmponentdidmount */

  useEffect(() => {
    console.log("UseEffect for every render cycle");
  });
  /* 	Use Effect with empty array will execute on every render cycle and works like componentdidupdate */

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

  const filteredCitiesHandler = useCallback(
    (filteredCities) => {
      updateCities(filteredCities);
    },
    [updateCities]
  );

  return (
    <React.Fragment>
      <Search onLoadCities={filteredCitiesHandler} />
      <CityForm onAddCity={addCityHandler} />
      <section>
        <CityList cities={cities} onRemoveItem={removeCityHandler} />
      </section>
    </React.Fragment>
  );
};

export default Home;
