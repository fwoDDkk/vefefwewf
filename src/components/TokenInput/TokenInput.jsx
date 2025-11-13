import React from "react";
import styles from "./TokenInput.module.css";
import uahIcon from "../../assets/uah.svg";
import starIcon from "../../assets/star.svg";

const icons = {
  UAH: uahIcon,
  STAR: starIcon,
};

const TokenInput = ({
  token,
  amount,
  onChange,
  direction,
  label,
}) => {
  return (
    <div className={styles.tokenInput}>
      {/* === Верхній рядок з підписом === */}
      <div className={styles.labelRow}>
        <span className={styles.label}>
          {label
            ? label
            : direction === "from"
            ? "Ви віддаєте"
            : "Ви отримуєте"}
        </span>
      </div>

      {/* === Поле вводу === */}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="0.00"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* === Токен (фіксований) === */}
        <div className={styles.token}>
          <img src={icons[token]} alt={token} />
          <span>{token}</span>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
