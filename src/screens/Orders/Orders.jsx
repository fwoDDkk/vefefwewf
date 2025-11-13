import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import axios from "axios";

const API_BASE = "https://oneback-d62p.onrender.com";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.telegramId) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/pay/history`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // якщо ти юзаєш токен авторизації
          },
          telegramId: user.telegramId
        });

        if (res.data.success) {
          setOrders(res.data.history);
        } else {
          console.warn("History load failed:", res.data.message);
        }
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📜 Історія транзакцій</h2>

      {loading ? (
        <p className={styles.loading}>Завантаження...</p>
      ) : orders.length === 0 ? (
        <p className={styles.empty}>Поки що транзакцій немає</p>
      ) : (
        <div className={styles.list}>
          {orders.map((order, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.topRow}>
                <span
                  className={`${styles.type} ${
                    order.type === "sell" ? styles.sell : styles.buy
                  }`}
                >
                  {order.type === "sell" ? "Продаж зірок" : "Покупка"}
                </span>

                <span
                  className={`${styles.status} ${
                    order.status === "paid" ? styles.done : styles.pending
                  }`}
                >
                  {order.status === "paid" ? "✅ Оплачено" : "⏳ Очікує"}
                </span>
              </div>

              <div className={styles.details}>
                <p>
                  <strong>⭐ Кількість:</strong> {order.amount}
                </p>
                <p>
                  <strong>🆔 Номер замовлення:</strong> {order.order_id}
                </p>
              </div>

              <div className={styles.date}>
                {new Date(order.created_at).toLocaleString("uk-UA")}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
