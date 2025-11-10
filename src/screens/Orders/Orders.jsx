import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import BottomNav from '../../components/BottomNav/BottomNav'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(saved)
  }, [])

  return (
    <div className={styles.container}>
      <h2>Історія ордерів</h2>

      {orders.length === 0 ? (
        <p className={styles.empty}>Поки що ордерів немає</p>
      ) : (
        <div className={styles.list}>
          {orders.map((order, index) => (
            <div key={index} className={styles.order}>
              <div className={styles.top}>
                <strong>{order.type === 'swap' ? 'Обмін' : order.type}</strong>
                <span className={order.status === 'done' ? styles.done : styles.pending}>
                  {order.status === 'done' ? '🟢 Виконано' : '🟡 Очікує'}
                </span>
              </div>
              <div className={styles.details}>
                <span>{order.amount} {order.token}</span>
                <span>{order.result} {order.resultToken}</span>
              </div>
              <div className={styles.date}>{order.date}</div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
