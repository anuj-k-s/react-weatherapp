import React, { useCallback, useEffect, useState } from "react";
import CityForm from "../CityForm/CityForm";
import CityList from "../CityList/CityList";
import Search from "../Search/Search";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

const Home = () => {

  const [cities, updateCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  console.log(isLoading);
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
    setIsLoading(true);
    fetch("https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/.json", {
      method: "POST",
      body: JSON.stringify(city),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        updateCities((prevCities) => [...prevCities, { id: responseData.name, ...city }]);
      });
  };

  const removeCityHandler = (id) => {
    debugger;
    setIsLoading(true);
    fetch(`https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/${id}.jso`, {
      method: "DELETE",
    })
      .then((response) => {
        setIsLoading(false);
        updateCities((prevCities) => prevCities.filter((city) => city.id !== id));
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const filteredCitiesHandler = useCallback(
    (filteredCities) => {
      updateCities(filteredCities);
    },
    [updateCities]
  );
 
  const clearError = () => {
    setError(null);
    
  }
  return (
    <React.Fragment>
      {error && <ErrorModal onClose={clearError} >{error}</ErrorModal>}
      <Search onLoadCities={filteredCitiesHandler} loading={isLoading} />
      <CityForm onAddCity={addCityHandler} loading={isLoading} />
      <section>
        <CityList cities={cities} onRemoveItem={removeCityHandler} />
      </section>
    </React.Fragment>
  );
};

export default Home;
