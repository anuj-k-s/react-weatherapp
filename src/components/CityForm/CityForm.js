import React, { useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./CityForm.module.css";
import LoadingIndicator from "../UI/LoadingSpinner/LoadingSpinner";


const CityForm = (props) => {
  const [cityName, updateCityName] = useState("");
  const [cityTemp, updateCityTemp] = useState("");
  const submitHandler = event => {
      event.preventDefault();
        props.onAddCity({cityName,cityTemp});
  }
  console.log("CityForm rendered")
  console.log(props.loading)
  return (
    <section className={styles.cityform}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={styles.form_control}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={cityName.cityName}
              onChange={(event) =>
                updateCityName(event.target.value)
              }
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="temp">Temperature</label>
            <input
              type="number"
              id="temp"
              value={cityName.cityTemp}
              onChange={(event) =>
                updateCityTemp(event.target.value)
              }
            />
          </div>
          <div className={styles.cityform__actions}>
            <button type="submit">Add City</button>
            {props.loading && <LoadingIndicator/>}
            {props.loading}
          </div>
        </form>
      </Card>
    </section>
  );
};
export default CityForm;
