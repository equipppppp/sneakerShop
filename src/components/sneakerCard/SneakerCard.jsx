import React from "react";
import styles from "./sneakerCard.module.scss";
import { AppContext } from "../../App";
import ContentLoader from "react-content-loader";

function SneakerCard({
  _id,
  title,
  imageURL,
  price,
  favorited = false,
  hasFavorite = true,
  hasAdd = true,
}) {
  const [isFavorite, setFavorite] = React.useState(favorited);
  const { addToBasket, addToFavorite, isLoading, isItemAdded } =
    React.useContext(AppContext);

  const sneaker = { _id, title, imageURL, price };
  const addPlus = () => {
    addToBasket(sneaker);
  };
  const addHeart = () => {
    setFavorite(!isFavorite);
    addToFavorite(sneaker);
  };
  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="214" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="210" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.sneakerInfo}>
            <img width={133} height={112} src={imageURL} alt="Sneaker" />
            {hasFavorite && (
              <img
                className={styles.favorite}
                onClick={addHeart}
                src={
                  isFavorite
                    ? "./images/sneakers/heart-checked.png"
                    : "./images/sneakers/heart.svg"
                }
                alt="Like"
              />
            )}
            <div className={styles.cardText}>{title}</div>
          </div>
          <div className={styles.costInfo}>
            <div className={styles.cost}>
              <p>ЦЕНА</p>
              <b>{price} руб.</b>
            </div>
            {hasAdd && (
              <img
                onClick={addPlus}
                src={
                  isItemAdded(_id)
                    ? "./images/sneakers/plus-checked.svg"
                    : "./images/sneakers/plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SneakerCard;
