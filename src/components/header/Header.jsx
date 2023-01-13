import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

function Header({ price }) {
  function openBasket() {
    document.querySelector("#overlay").removeAttribute("hidden");
  }
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img
            width={40}
            heigt={40}
            src="./images/header/logo.png"
            alt="logo"
          />
          <div className={styles.logo_text}>
            <h2>REACT SNEAKERS</h2>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div className={styles.userBlock}>
        <img
          onClick={openBasket}
          width={20}
          heigt={20}
          src="./images/header/cart.svg"
          alt="basket"
        />
        <p onClick={openBasket}>{price} руб.</p>
        <Link to="/favorites">
          <img
            width={20}
            heigt={20}
            src="./images/header/heart.png"
            alt="favorite"
          />
        </Link>
        <Link to="/orders">
          <img
            width={20}
            heigt={20}
            src="./images/header/profile.svg"
            alt="profile"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
