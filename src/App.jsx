// src/App.jsx
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Swap from './screens/Swap/Swap'
import Orders from './screens/Orders/Orders'
// import BottomNav from './components/BottomNav/BottomNav'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg.ready();

    const u = tg.initDataUnsafe?.user;
    if (!u?.id) return;

    const userData = {
      telegram_id: u.id,
      first_name: u.first_name,
      username: u.username,
      photo_url: u.photo_url,
    };

    axios.post(`${API_BASE}/api/auth/register`, userData)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.error("Auth error:", err));
  }, []);

  if (!user) return <div className="Loading">🔄 Завантаження...</div>;
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap ser={user}  />} />
        <Route path="/orders" element={<Orders  ser={user}  />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
