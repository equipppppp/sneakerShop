import React from "react";
import styles from "./returnButton.module.scss";

function ReturnButton({ text, onClose }) {
  return (
    <button className={styles.confirmBtn} onClick={onClose}>
      {text}
    </button>
  );
}
export default ReturnButton;
