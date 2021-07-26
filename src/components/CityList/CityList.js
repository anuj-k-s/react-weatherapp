import React from "react";
import Card from "../UI/Card/Card";
import styles from "./CityList.module.css";
const CityList = (props) => {
  console.log("CityList rendered");
  return (
    <section className={styles.city_list}>
      <h2>Loaded Cities</h2>
      <ul>
        {props.cities.map((city) => {
          return (
              <li key={city.id}>
                <span>{city.cityName}</span>
                <span>{city.cityTemp}</span>
              </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CityList;
