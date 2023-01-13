import React from "react";
import SneakerCard from "../sneakerCard/SneakerCard";
import styles from "../maincontent/maincontent.module.scss";
import Info from "../info/info";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function Orders() {
  const { orders } = React.useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.contentHeader}>
        <h1>Мои покупки:</h1>
      </div>
      {orders.length > 0 ? (
        <div className={styles.cards}>
          {orders.map((sneaker) => (
            <SneakerCard
              key={sneaker._id}
              hasAdd={false}
              hasFavorite={false}
              {...sneaker}
            />
          ))}
        </div>
      ) : (
        <Info
          w={70}
          h={70}
          title={"Купленных товаров нет"}
          descr={"Вы еще ничего не купили"}
          url={"./images/basket/sad.png"}
          text={"Вернуться на главную"}
          onClose={() => navigate("/")}
        />
      )}
    </>
  );
}

export default Orders;
