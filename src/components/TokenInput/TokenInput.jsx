import React, { useState } from "react";
import styles from "./TokenInput.module.css";
import uahIcon from "../../assets/uah.svg";
import usdIcon from "../../assets/usd.svg";
import rubIcon from "../../assets/rub.svg";
import starIcon from "../../assets/star.svg";

const icons = {
  UAH: uahIcon,
  USD: usdIcon,
  RUB: rubIcon,
  STAR: starIcon,
};

const TokenInput = ({
  token,
  amount,
  onChange,
  onSelectToken,
  direction,
  label, // 👈 тепер приймає label з Swap.jsx
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (val) => {
    setShowMenu(false);
    if (onSelectToken) onSelectToken(val);
  };

  const isStar = token === "STAR";
  const tokenList = isStar ? ["STAR"] : ["UAH", "USD", "RUB"];

  return (
    <div className={styles.tokenInput}>
      {/* === Верхній рядок з підписом === */}
      <div className={styles.labelRow}>
        <span className={styles.label}>
          {label
            ? label // 👈 якщо label передано — показуємо його
            : direction === "from"
            ? "Ви віддаєте"
            : "Ви отримуєте"}
        </span>
        {/* {direction === "from" && <span className={styles.maxBtn}>MAX</span>} */}
      </div>

      {/* === Поле вводу === */}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="0.00"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* === Вибір токена === */}
        <div
          className={styles.token}
          onClick={() => !isStar && setShowMenu(!showMenu)}
        >
          <img src={icons[token]} alt={token} />
          <span>{token}</span>
        </div>

        {/* === Випадаюче меню валют === */}
        {showMenu && (
          <div className={styles.dropdown}>
            {tokenList.map((t) => (
              <div
                key={t}
                className={styles.dropdownItem}
                onClick={() => handleSelect(t)}
              >
                <img src={icons[t]} alt={t} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInput;
