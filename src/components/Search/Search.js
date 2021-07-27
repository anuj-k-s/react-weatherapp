import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import Card from "../UI/Card/Card";

const Search = (props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onLoadCities } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? "" : `?orderBy="cityName"&equalTo="${enteredFilter}"`;
        fetch("https://react-hooks-45fc8-default-rtdb.asia-southeast1.firebasedatabase.app/.json" + query)
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            const dbCities = [];
            for (const key in responseData) {
              dbCities.push({ id: key, cityName: responseData[key].cityName, cityTemp: responseData[key].cityTemp });
            }
            onLoadCities(dbCities);
          });
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadCities]);

  return (
    <section className={styles.search}>
      <Card>
        <div className={styles.search_bar}>
          <label htmlFor="cty">Search City</label>
          <input
            ref={inputRef}
            type="text"
            id="cty"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
};

export default Search;
