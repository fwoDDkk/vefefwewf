import React, { useState } from 'react'
import styles from './DonatelloButton.module.css'

export default function DonatelloButton({ amount, token, mode }) {
  const [showManager, setShowManager] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // === Курси ===
  const buyRate = 149.99 / 200 // ≈ 0.75 грн за 1 зірку
  const sellRate = 80 / 200    // = 0.4 грн за 1 зірку
  const minStars = 200
  const managerLink = 'https://t.me/StarcManager'

  // === Розрахунок кількості зірок ===
  const isBuying = mode === 'buy'
  const rate = isBuying ? buyRate : sellRate
  const stars = token === 'UAH' ? (amount / rate).toFixed(2) : amount
  const enough = stars >= minStars

  const username =
    window?.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'невідомо'

  const comment = `@${username} | ${stars} ⭐`
  const donatelloLink = `https://donatello.to/StarcSeller?comment=${encodeURIComponent(comment)}`

  const handleClick = (e) => {
    if (!enough) {
      e.preventDefault()
      return
    }
    setShowManager(true)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // === Купівля зірок ===
  if (isBuying) {
    return (
      <div className={styles.section}>
        <a
          href={enough ? donatelloLink : '#'}
          target={enough ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className={`${styles.donatelloBtn} ${!enough ? styles.disabled : ''}`}
          onClick={handleClick}
        >
          💸 Купити через Donatello
        </a>

        {showToast && (
          <div className={styles.toast}>
            💬 Після оплати натисніть “✉️ Написати менеджеру”
          </div>
        )}

        {showManager && (
          <div className={styles.managerBox}>
            <p className={styles.infoText}>
              Після оплати напишіть менеджеру, щоб отримати свої зірки:
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
        <p className={styles.rateInfo}>
          💰 Курс: 200 ⭐ = 149.99 грн
        </p>
      </div>
    )
  }

  // === Продаж зірок ===
  if (mode === 'sell') {
    return (
      <div className={styles.sellBox}>
        <p className={styles.infoText}>Надішліть свої ⭐ зірки на акаунт:</p>

        <div className={styles.payBox}>
          <span className={styles.walletLabel}>@StarcManager</span>
          <button
            className={styles.copyBtn}
            onClick={() => navigator.clipboard.writeText('@StarcManager')}
          >
            📋 Копіювати
          </button>
        </div>

        <p className={styles.note}>
          Після надсилання напишіть менеджеру з нікнеймом і кількістю зірок.
        </p>
        <a
          href={managerLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.managerLink}
        >
          ✉️ Написати менеджеру
        </a>

        <p className={styles.rateInfo}>
          💰 Курс: 200 ⭐ = 80 грн
        </p>
      </div>
    )
  }

  return null
}
