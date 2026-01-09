import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swap from "./screens/Swap/Swap";
import Orders from "./screens/Orders/Orders";
import Gifts from "./pages/Nft/Nft";
import TonExchange from "./pages/TonExchange/TonExchange";

const API_BASE = "https://oneback-d62p.onrender.com";

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log("Telegram WebApp object:", window.Telegram?.WebApp);

    if (!tg) {
      console.error("❌ Telegram WebApp not found");
      setUserData({ error: true });
      return;
    }

    tg.ready();

    const waitForInitData = async () => {
      let tries = 0;
      while (!tg.initData && tries < 10) {
        console.log(`⏳ Waiting for initData... (${tries + 1}/10)`);
        await new Promise(res => setTimeout(res, 300));
        tries++;
      }

      if (!tg.initData) {
        console.error("❌ initData still missing after 10 tries");
        setUserData({ error: true });
        return;
      }

      try {
        const res = await axios.post(`${API_BASE}/api/auth`, {
          initData: tg.initData,
        });

        localStorage.setItem("authToken", res.data.token);
        setUserData(res.data.user);
        console.log("✅ Auth success:", res.data.user);
      } catch (err) {
        console.error("❌ Auth error:", err.response?.data || err.message);
        setUserData({ error: true });
      }
    };

    waitForInitData();
  }, []);

  if (userData === null) return <div> Завантаження...</div>;
  if (userData?.error) return <div>Запустіть застосунок через Telegram</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap user={userData} />} />
        <Route path="/orders" element={<Orders user={userData} />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/ton" element={<TonExchange />} />
      </Routes>
    </BrowserRouter>
  );
}
