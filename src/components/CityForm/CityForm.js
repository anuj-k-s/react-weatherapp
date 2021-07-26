import React, { useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./CityForm.module.css";
const CityForm = () => {
  const [currentCityState, updateCurrentCityState] = useState({ cityName: "Jaipur", cityTemp: "45C" });
  return (
    <section className={styles.cityform}>
      <Card>
        <form>
          <div className={styles.form_control}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={currentCityState.cityName}
              onChange={(event) =>
                updateCurrentCityState({ cityName: event.target.value, cityTemp: currentCityState.cityTemp })
              }
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="temp">Temperature</label>
            <input
              type="number"
              id="temp"
              value={currentCityState.cityTemp}
              onChange={(event) =>
                updateCurrentCityState({ cityName: currentCityState.cityName, cityTemp: event.target.value })
              }
            />
          </div>
          <div className="city-form__actions">
            <button type="submit">Add City</button>
          </div>
        </form>
      </Card>
    </section>
  );
};
export default CityForm;
