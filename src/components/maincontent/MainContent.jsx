import React from "react";
import SneakerCard from "../sneakerCard/SneakerCard";
import styles from "./maincontent.module.scss";
import { AppContext } from "../../App";

function MainContent() {
  const [searchValue, setSearchValue] = React.useState("");
  const { sneakers, favoriteSneakers, isLoading } =
    React.useContext(AppContext);

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const searchedSneakers = sneakers.filter((item) =>
    item.title
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchValue.toLowerCase().replace(/\s/g, ""))
  );

  return (
    <>
      <div className={styles.contentHeader}>
        <h1>
          {searchValue ? `Поиск по категории: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className={styles.search}>
          <img src="./images/sneakers/search.png" alt="Search" />
          <input
            onChange={onSearch}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              className={styles.cancel}
              onClick={() => setSearchValue("")}
              src="./images/basket/cancel.svg"
              alt="cancel"
            />
          )}
        </div>
      </div>
      <div className={styles.cards}>
        {isLoading
          ? [...Array(8)].map((sneaker, i) => <SneakerCard key={i} />)
          : searchedSneakers.map((sneaker) => (
              <SneakerCard
                key={sneaker._id}
                {...sneaker}
                favorited={favoriteSneakers.some(
                  (item) => item._id === sneaker._id
                )}
              />
            ))}
      </div>
    </>
  );
}

export default MainContent;
