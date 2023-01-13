import React from "react";
import styles from "./info.module.scss";
import ReturnButton from "../returnButton/returnButton";

function Info({ title, descr, url, onClose, w, h, text }) {
  return (
    <div className={styles.emptyBasket}>
      <img width={w} height={h} src={url} alt="empty" />
      <b>{title}</b>
      <p>{descr}</p>
      {/* {overlay.hasAttribute("hidden") ? (
        <Link to="/">
          <button className={styles.confirmBtn}>Вернуться назад</button>
        </Link>
      ) : (
        <button className={styles.confirmBtn} onClick={onClose}>
          Вернуться назад
        </button>
      )} */}
      <ReturnButton text={text} onClose={onClose} />
    </div>
  );
}

export default Info;
