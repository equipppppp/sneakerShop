import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../maincontent/maincontent.module.scss";
import SneakerCard from "../sneakerCard/SneakerCard";
import { AppContext } from "../../App";
import Info from "../info/info";

function Favorites() {
  const { favoriteSneakers } = React.useContext(AppContext);

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.contentHeader}>
        <h1>Избранные товары:</h1>
      </div>
      {favoriteSneakers.length > 0 ? (
        <>
          <div className={styles.cards}>
            {favoriteSneakers.map((sneaker) => (
              <SneakerCard key={sneaker._id} favorited={true} {...sneaker} />
            ))}
          </div>
        </>
      ) : (
        <Info
          w={70}
          h={70}
          title={"Избранных товаров нет"}
          descr={"Вы ничего не добавляли в избранное"}
          url={"./images/basket/sad.png"}
          text={"Вернуться на главную"}
          onClose={() => navigate("/")}
        />
      )}
    </>
  );
}

export default Favorites;
