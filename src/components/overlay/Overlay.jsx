import React from "react";
import axios from "axios";
import styles from "./overlay.module.scss";
import { AppContext } from "../../App";
import Info from "../info/info";
import ReturnButton from "../returnButton/returnButton";

function Overlay({ onRemove }) {
  const { sneakersInBasket, setSneakersInBasket, isOrdered, setIsOrdered } =
    React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const closeBasket = () => {
    document.querySelector("#overlay").setAttribute("hidden", "");
    if (isOrderComplete) {
      setIsOrderComplete(false);
    }
  };
  const totalPrice = sneakersInBasket.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const makeOrder = async () => {
    setIsOrderComplete(true);
    const { data } = await axios.post(
      "https://63629b1266f75177ea33fe5e.mockapi.io/orders",
      { items: sneakersInBasket }
    );
    setOrderId(data.id);
    setSneakersInBasket([]);
    setIsOrdered(!isOrdered);
    for (let i = 0; i < sneakersInBasket.length; i++) {
      await axios.delete(
        `https://63629b1266f75177ea33fe5e.mockapi.io/basket/${i + 1}`
      );
      await delay(500);
    }
  };

  return (
    <div id="overlay" className={styles.back} hidden>
      <div className={styles.overlay} onClick={closeBasket}></div>
      <div className={styles.trolley}>
        <div className={styles.cancelBtn}>
          <h3>Корзина</h3>
          <img
            className={styles.cancel}
            onClick={closeBasket}
            src="./images/basket/cancel.svg"
            alt="cancel"
          />
        </div>
        {sneakersInBasket.length > 0 ? (
          <>
            <div className={styles.sneakersInBasket}>
              {sneakersInBasket.map((item) => (
                <div key={item._id} className={styles.sneakerInBasket}>
                  <img src={item.imageURL} alt="sneaker" />
                  <div className={styles.sneakerInfo}>
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    className={styles.cancel}
                    onClick={() => onRemove(item.id)}
                    src="./images/basket/cancel.svg"
                    alt="cancel"
                  />
                </div>
              ))}
            </div>
            <div className={styles.trolleyCostInfo}>
              <p>Итого:</p>
              <div className={styles.dashed}></div>
              <b>{totalPrice} руб.</b>
            </div>
            <ReturnButton onClose={makeOrder} text={"Оформить заказ"} />
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
            descr={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            url={
              isOrderComplete
                ? "./images/basket/complete.jpg"
                : "./images/basket/empty.png"
            }
            w={isOrderComplete ? 83 : 120}
            h={120}
            text={"Вернуться назад"}
            onClose={closeBasket}
          />
        )}
      </div>
    </div>
  );
}

export default Overlay;
