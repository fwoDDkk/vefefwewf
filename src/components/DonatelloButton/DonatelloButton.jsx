import React, { useState } from "react";
import styles from "./DonatelloButton.module.css";

export default function DonatelloButton({ amount, token, mode }) {
  const [showManager, setShowManager] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // === Константи ===
  const RATES = { BUY: 149.99 / 200, SELL: 80 / 200 };
  const MIN_STARS = 200;
  const MANAGER = "@StarcManager";
  const managerLink = `https://t.me/${MANAGER.replace("@", "")}`;

  // === Логіка ===
  const isBuying = mode === "buy";
  const rate = isBuying ? RATES.BUY : RATES.SELL;
  const stars = token === "UAH" ? (amount / rate).toFixed(2) : amount;
  const enough = stars >= MIN_STARS;

  const username =
    window?.Telegram?.WebApp?.initDataUnsafe?.user?.username || "невідомо";
  const comment = `@${username} | ${stars} ⭐`;
  const donatelloLink = `https://donatello.to/StarcSeller?comment=${encodeURIComponent(
    comment
  )}`;

  // === Клік по кнопці ===
  const handleClick = (e) => {
    if (!enough) {
      e.preventDefault();
      return;
    }
    setShowManager(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // === 💸 Купівля зірок ===
  if (isBuying) {
    return (
      <div className={`${styles.section} ${styles.fadeIn}`}>
        {/* 💱 Курс над кнопкою */}
        <p className={styles.rateInfo}>💰 Курс: 200 ⭐ = 149.99 грн</p>

        <a
          href={enough ? donatelloLink : "#"}
          target={enough ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`${styles.donatelloBtn} ${
            !enough ? styles.disabled : ""
          }`}
          onClick={handleClick}
        >
          💸 Купити через Donatello
        </a>

        {/* ❗ Якщо менше ніж 200 */}
        {!enough && (
          <p className={styles.warnText}>Мінімальна покупка — 200 ⭐</p>
        )}

        {/* 💬 Підказка */}
        {showToast && (
          <div className={styles.toast}>
            💬 Після оплати натисніть “✉️ Написати менеджеру”
          </div>
        )}

        {/* 👤 Блок менеджера */}
        {showManager && (
          <div className={styles.managerBox}>
            <p className={styles.infoText}>
              Після оплати напишіть менеджеру, щоб отримати свої ⭐:
            </p>
            <a
              href={managerLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.managerLink}
            >
              ✉️ Звʼязатись з менеджером
            </a>
          </div>
        )}
      </div>
    );
  }

  // === 💫 Продаж зірок ===
  if (mode === "sell") {
    return (
      <div className={`${styles.sellBox} ${styles.fadeIn}`}>
        {/* 💱 Курс над інструкцією */}
        <p className={`${styles.rateInfo} ${styles.sellRate}`}>
          💰 Курс: 200 ⭐ = 80 грн
        </p>

        <p className={styles.infoText}>Надішліть свої ⭐ на акаунт:</p>

        <div className={styles.payBox}>
          <span className={styles.walletLabel}>{MANAGER}</span>
          <button
            className={styles.copyBtn}
            onClick={() => navigator.clipboard.writeText(MANAGER)}
          >
            📋 Копіювати
          </button>
        </div>

        <p className={styles.note}>
          Після надсилання напишіть менеджеру свій нікнейм і кількість ⭐.
        </p>

        <a
          href={managerLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.managerLink}
        >
          ✉️ Написати менеджеру
        </a>
      </div>
    );
  }

  return null;
}
