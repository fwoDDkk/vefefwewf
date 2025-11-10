import React from 'react'
import styles from './OrderItem.module.css'

export default function OrderItem({ order }) {
  return (
    <div className={styles.item}>
      <div className={styles.row}>
        <strong>{order.type === 'buy' ? 'Купівля' : 'Продаж'}</strong>
        <span className={order.status === 'done' ? styles.done : styles.pending}>
          {order.status === 'done' ? '🟢 Виконано' : '🟡 Очікує'}
        </span>
      </div>
      <div className={styles.row}>
        <span>{order.amount} {order.token}</span>
        <span>{order.stars} ⭐</span>
      </div>
      <small>{order.date}</small>
    </div>
  )
}
