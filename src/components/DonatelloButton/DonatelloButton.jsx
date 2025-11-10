import React from 'react'
import styles from './DonatelloButton.module.css'

export default function DonatelloButton({ amount, token, mode }) {
  const rate = 10 // 1 STAR = 10 USD
  const isUSDT = token === 'USDT'

  const stars = token === 'UAH' || isUSDT ? (amount / rate).toFixed(2) : 0
  const username =
    window?.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'невідомо'
  const comment = `@${username} | ${stars} ⭐`

  const donatelloLink = `https://donatello.to/StarcSeller?comment=${encodeURIComponent(comment)}`

  // === Якщо користувач хоче купити зірки ===
  if (mode === 'buy') {
    return (
      <a
        href={donatelloLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.donatelloBtn}
      >
        💸 Donatello (оплата)
      </a>
    )
  }

  // === Якщо користувач хоче продати зірки ===
  if (mode === 'sell') {
    return (
      <div className={styles.sellBox}>
        <p className={styles.infoText}>
          Надішліть свої ⭐ зірки через Telegram на акаунт:
        </p>
        <div className={styles.payBox}>
          <span className={styles.walletLabel}>@StarcManager</span>
          <button
            className={styles.copyBtn}
            onClick={() => {
              navigator.clipboard.writeText('@StarcManager')
            }}
          >
            📋 Скопіювати
          </button>
        </div>
        <p className={styles.note}>
          Після відправки напишіть у боті свій нік і кількість зірок.
        </p>
      </div>
    )
  }

  return null
}
