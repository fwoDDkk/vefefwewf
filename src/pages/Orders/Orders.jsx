import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import OrderItem from '../../components/OrderItem/OrderItem'
import BottomNav from '../../components/BottomNav/BottomNav'
import BtnSellGift from '../../components/BtnSellGift/BtnSellGift'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(stored)
  }, [])

  return (
    <div className={styles.container}>
      <h2>Історія ордерів</h2>
      {orders.length === 0 ? (
        <p>Поки що немає ордерів.</p>
      ) : (
        orders.map((order, i) => (
          <OrderItem key={i} order={order} />
        ))
      )}
      <BottomNav />
    </div>
  )
}
