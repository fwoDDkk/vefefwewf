import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swap from "./screens/Swap/Swap";
import Orders from "./screens/Orders/Orders";

const API_BASE = import.meta.env.VITE_API_BASE || "https://oneback-d62p.onrender.com";

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // === 1️⃣ Логування для перевірки, чи Telegram WebApp взагалі є ===
    console.log("window.Telegram:", window.Telegram);
    console.log("WebApp:", window.Telegram?.WebApp);
    console.log("initData:", window.Telegram?.WebApp?.initData);
  
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      console.error("❌ Telegram WebApp not found");
      setUserData({ error: true });
      return;
    }
  
    tg.ready();
  
    // === 2️⃣ Очікування появи initData (іноді Telegram підтягує його з затримкою) ===
    const waitForInitData = async () => {
      let tries = 0;
      while (!tg.initData && tries < 10) {
        console.log(`⏳ Очікуємо initData... (${tries + 1}/10)`);
        await new Promise((res) => setTimeout(res, 300));
        tries++;
      }
  
      if (!tg.initData) {
        console.error("❌ initData не знайдено навіть після очікування");
        setUserData({ error: true });
        return;
      }
  
      console.log("✅ Отримано initData:", tg.initData);
  
      try {
        const res = await axios.post(`${API_BASE}/api/auth/telegram`, {
          initData: tg.initData,
        });
  
        localStorage.setItem("authToken", res.data.token);
        console.log("✅ Успішна авторизація:", res.data.user);
        setUserData(res.data.user);
      } catch (err) {
        console.error("❌ Auth error:", err.response?.data || err.message);
        setUserData({ error: true });
      }
    };
  
    waitForInitData();
  }, []);
  

  if (userData === null) return <div>🔄 Завантаження...</div>;
  if (userData?.error)
    return <div>Запустіть застосунок через Telegram для авторизації</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap user={userData} />} />
        <Route path="/orders" element={<Orders user={userData} />} />
      </Routes>
    </BrowserRouter>
  );
}
