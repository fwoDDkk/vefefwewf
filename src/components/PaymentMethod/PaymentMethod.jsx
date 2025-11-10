import React, { useState } from 'react'
import styles from './PaymentMethod.module.css'

export default function PaymentMethod({ token, amount }) {
  const [paid, setPaid] = useState(false)

  if (token === 'UAH') {
    return (
      <div className={styles.box}>
        <label>Метод оплати (UAH):</label>
        <select className={styles.select}>
          <option>MonoBank</option>
          <option>PrivatBank</option>
          <option>Visa / Mastercard</option>
        </select>
      </div>
    )
  }

  if (token === 'USDT') {
    const handlePayment = async () => {
      setPaid(true)

      // ❗️ Тут має бути твоя логіка запиту до бекенду або Telegram бота
      const payload = {
        from: 'USDT',
        to: 'STAR',
        stars: amount,
        address: 'адреса юзера (через бекенд)',
        telegram: window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'невідомо',
      }

      console.log('[⚡️Відправлено]', payload)

      // fetch('https://your-server.com/notify-manager', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // })
    }

    return (
      <div className={styles.box}>
        <label>Оплата через USDT</label>
        <div className={styles.sendBox}>
          <p>Надішліть точну суму на адресу:</p>
          <code className={styles.address}>TQyU...XYZ123</code>

          <button className={styles.paidBtn} onClick={handlePayment}>
            ✅ Я оплатив
          </button>

          {paid && <p className={styles.success}>Очікуємо підтвердження…</p>}
        </div>
      </div>
    )
  }

  return null
}
