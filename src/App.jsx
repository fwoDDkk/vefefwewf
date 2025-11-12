import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swap from "./screens/Swap/Swap";
import Orders from "./screens/Orders/Orders";

const API_BASE = "https://oneback-d62p.onrender.com";

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log("📱 Telegram WebApp object:", tg);
    
    if (tg?.initData) {
      console.log("✅ initData:", tg.initData);
    } else {
      console.log("❌ initData відсутнє (ймовірно не WebApp або відкрито не з Telegram)");
    }
  
    // 👇 тестовий варіант для візуального логування
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.bottom = "10px";
    el.style.left = "10px";
    el.style.color = "white";
    el.style.background = "rgba(0,0,0,0.7)";
    el.style.padding = "5px 10px";
    el.style.borderRadius = "10px";
    el.style.zIndex = 9999;
    el.textContent = tg?.initData
      ? "✅ WebApp працює"
      : "❌ WebApp не ініціалізований";
    document.body.appendChild(el);
  }, []);
  

  if (userData === null) return <div>🔄 Завантаження...</div>;
  if (userData?.error) return <div>Запустіть застосунок через Telegram</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap user={userData} />} />
        <Route path="/orders" element={<Orders user={userData} />} />
      </Routes>
    </BrowserRouter>
  );
}
