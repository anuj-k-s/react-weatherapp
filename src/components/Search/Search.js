import React from "react";
import styles from "./Search.module.css";
import Card from "../UI/Card/Card";
const Search = (props) => {
  return (
    <section className={styles.search}>
      <Card>
        <div className={styles.search_bar}>
          <label htmlFor="cty">Search City</label>
          <input type="text" id="cty" />
        </div>
      </Card>
    </section>
  );
};

export default Search;
