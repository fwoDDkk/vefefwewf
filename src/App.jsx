import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swap from "./screens/Swap/Swap";
import Orders from "./screens/Orders/Orders";

const API_BASE = import.meta.env.VITE_API_BASE || "https://oneback-d62p.onrender.com";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initTelegram = async () => {
      // --- 1️⃣ Перевірка наявності Telegram WebApp ---
      if (!window.Telegram?.WebApp) {
        console.error("❌ Telegram WebApp not found");
        setError("❌ Відкрий застосунок через Telegram Mini App, а не в браузері");
        return;
      }

      const tg = window.Telegram.WebApp;
      tg.ready(); // Telegram сигналу, що сторінка готова

      // --- 2️⃣ Перевірка користувача ---
      const u = tg.initDataUnsafe?.user;
      if (!u?.id) {
        setError("Не вдалося отримати дані користувача з Telegram");
        return;
      }

      // --- 3️⃣ Формуємо дані користувача ---
      const userData = {
        telegram_id: u.id,
        first_name: u.first_name || "",
        username: u.username || "",
        photo_url: u.photo_url || "",
      };

      try {
        // --- 4️⃣ Реєстрація або логін ---
        const res = await axios.post(`${API_BASE}/api/auth/register`, userData);
        if (res.data?.success) {
          setUser(res.data.user);
        } else {
          console.warn("⚠️ Реєстрація повернула помилку:", res.data);
          setError("Не вдалося зареєструвати користувача");
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError("Помилка при з’єднанні з сервером");
      }
    };

    // Telegram іноді віддає об’єкт із затримкою
    const timer = setTimeout(initTelegram, 300);
    return () => clearTimeout(timer);
  }, []);

  // --- UI Loading / Error state ---
  if (error)
    return (
      <div
        style={{
          color: "#ff4444",
          textAlign: "center",
          marginTop: "40%",
          fontSize: "18px",
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        {error}
      </div>
    );

  if (!user)
    return (
      <div
        style={{
          color: "#00ffff",
          textAlign: "center",
          marginTop: "40%",
          fontSize: "18px",
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        🔄 Завантаження...
      </div>
    );

  // --- Основний роутинг ---
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}
