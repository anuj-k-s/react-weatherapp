import React, { useCallback, useEffect, useReducer, useState } from "react";
import CityForm from "../CityForm/CityForm";
import CityList from "../CityList/CityList";
import Search from "../Search/Search";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

const cityReducer = (currentCities, action) => {
  switch (action.type) {
    case "SET":
      return action.cities;
    case "ADD":
      return [...currentCities, action.addedCity];
    case "DELETE":
      return currentCities.filter((city) => city.id !== action.id);
    default:
      throw new Error("Not possible");
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false };
    case "ERROR":
      return { ...currentHttpState, loading: false, error: action.errorData };
    case "CLEAR":
      return { ...currentHttpState, error: null };
    default:
      throw new Error("Not possible");
  }
};
const Home = () => {
  //const [cities, updateCities] = useState([]);
  const [cities, dispatch] = useReducer(cityReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  /* when we have multiple states / complex state  which can update simultaneously and depended on each other,better to use UseReducer */
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  console.log(httpState);
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
    //setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/.json", {
      method: "POST",
      body: JSON.stringify(city),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        //setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "ADD", addedCity: { id: responseData.name, ...city } });
        //updateCities((prevCities) => [...prevCities, { id: responseData.name, ...city }]);
      });
  };

  const removeCityHandler = (id) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(`https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        // setIsLoading(false);
        //updateCities((prevCities) => prevCities.filter((city) => city.id !== id));
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorData: error.message });
        // setIsLoading(false);
        // setError(error.message);
      });
  };

  const filteredCitiesHandler = useCallback((filteredCities) => {
    dispatch({ type: "SET", cities: filteredCities });
    //updateCities(filteredCities);
  }, []);

  const clearError = () => {
    // setError(null);
    dispatchHttp({type:'CLEAR'});
  };
  return (
    <React.Fragment>
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <Search onLoadCities={filteredCitiesHandler} />
      <CityForm onAddCity={addCityHandler} loading={httpState.loading} />
      <section>
        <CityList cities={cities} onRemoveItem={removeCityHandler} />
      </section>
    </React.Fragment>
  );
};

export default Home;
