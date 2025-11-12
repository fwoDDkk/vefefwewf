// import React, { useState, useEffect } from "react";
// import styles from "./Swap.module.css";
// import TokenInput from "../../components/TokenInput/TokenInput";
// import BottomNav from "../../components/BottomNav/BottomNav";
// import DonatelloButton from "../../components/DonatelloButton/DonatelloButton";

// export default function Swap() {
//   const [fromToken, setFromToken] = useState("UAH");
//   const [toToken, setToToken] = useState("STAR");
//   const [fromAmount, setFromAmount] = useState("");
//   const [toAmount, setToAmount] = useState("");
//   const [mode, setMode] = useState("buy"); // "buy" = купівля зірок, "sell" = продаж зірок

//   // === Курси обміну ===
//   const RATES = {
//     BUY: 149.99 / 200, // ≈ 0.75 грн за 1 ⭐
//     SELL: 80 / 200, // ≈ 0.4 грн за 1 ⭐
//   };

//   // === Автоматичне визначення режиму ===
//   useEffect(() => {
//     if (toToken === "STAR") setMode("buy");
//     else if (fromToken === "STAR") setMode("sell");
//   }, [fromToken, toToken]);

//   // === Обчислення курсу ===
//   const getRate = () => (mode === "buy" ? RATES.BUY : RATES.SELL);

//   // === Обробка зміни полів ===
//   const handleFromChange = (value) => {
//     setFromAmount(value);
//     if (!value || isNaN(value)) return setToAmount("");

//     const rate = getRate();
//     const converted =
//       fromToken === "UAH"
//         ? (value / rate).toFixed(2)
//         : (value * rate).toFixed(2);
//     setToAmount(converted);
//   };

//   const handleToChange = (value) => {
//     setToAmount(value);
//     if (!value || isNaN(value)) return setFromAmount("");

//     const rate = getRate();
//     const converted =
//       toToken === "UAH"
//         ? (value / rate).toFixed(2)
//         : (value * rate).toFixed(2);
//     setFromAmount(converted);
//   };

//   // === Обмін місцями валют ===
//   const handleSwap = () => {
//     setFromToken(toToken);
//     setToToken(fromToken);
//     setFromAmount(toAmount);
//     setToAmount(fromAmount);
//   };

//   // === Продаж зірок (через Telegram WebApp) ===
//   const handleSell = async () => {
//     try {
//       const tg = window.Telegram?.WebApp;
//       tg?.ready(); // ✅ ініціалізація Telegram API
  
//       const userId = tg?.initDataUnsafe?.user?.id;       // ✅ правильний шлях
//       const username = tg?.initDataUnsafe?.user?.username;
//       const stars = Number(fromAmount);
  
//       if (!userId) {
//         alert("❌ Не вдалося отримати Telegram ID користувача");
//         return;
//       }
//       if (!stars || stars <= 0) {
//         alert("Вкажіть кількість зірок для продажу");
//         return;
//       }
  
//       const res = await fetch("https://oneback-d62p.onrender.com/api/pay/sell", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ telegramId: userId, username, stars }),
//       });
  
//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Запит на продаж відправлено менеджеру!");
//       } else {
//         alert(`⚠️ Помилка: ${data.message || "Unauthorized"}`);
//       }
//     } catch (err) {
//       console.error("Sell error:", err);
//       alert("❌ Помилка при надсиланні запиту");
//     }
//   };
  

//   return (
//     <div className={styles.container}>
//       <div className={styles.inner}>
//         {/* Поле FROM */}
//         <TokenInput
//           token={fromToken}
//           amount={fromAmount}
//           onChange={handleFromChange}
//           onSelectToken={setFromToken}
//           direction="from"
//         />

//         {/* Кнопка SWAP */}
//         <button className={styles.swapBtn} onClick={handleSwap}>
//           ⇅
//         </button>

//         {/* Поле TO */}
//         <TokenInput
//           token={toToken}
//           amount={toAmount}
//           onChange={handleToChange}
//           onSelectToken={setToToken}
//           direction="to"
//         />

//         {/* Кнопка оплати / продажу */}
//         {mode === "buy" ? (
//           <DonatelloButton
//             amount={fromAmount}
//             token={fromToken}
//             mode={mode}
//             className={styles.submitBtn}
//           />
//         ) : (
//           <button onClick={handleSell} className={styles.submitBtn}>
//             Продати зірки
//           </button>
//         )}
//       </div>

//       <BottomNav />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Swap.module.css";
import TokenInput from "../../components/TokenInput/TokenInput";
import BottomNav from "../../components/BottomNav/BottomNav";
import DonatelloButton from "../../components/DonatelloButton/DonatelloButton";

const API_BASE = "https://oneback-d62p.onrender.com";

export default function Swap({ user }) {
  const [fromToken, setFromToken] = useState("UAH");
  const [toToken, setToToken] = useState("STAR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [mode, setMode] = useState("buy");

  const RATES = { BUY: 149.99 / 200, SELL: 80 / 200 };

  useEffect(() => {
    if (toToken === "STAR") setMode("buy");
    else if (fromToken === "STAR") setMode("sell");
  }, [fromToken, toToken]);

  const getRate = () => (mode === "buy" ? RATES.BUY : RATES.SELL);

  const handleFromChange = (v) => {
    setFromAmount(v);
    if (!v || isNaN(v)) return setToAmount("");
    const r = getRate();
    setToAmount(fromToken === "UAH" ? (v / r).toFixed(2) : (v * r).toFixed(2));
  };

  const handleToChange = (v) => {
    setToAmount(v);
    if (!v || isNaN(v)) return setFromAmount("");
    const r = getRate();
    setFromAmount(toToken === "UAH" ? (v / r).toFixed(2) : (v * r).toFixed(2));
  };

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // === 🪙 Продаж зірок через Telegram ===
  const handleSell = async () => {
    try {
      const tg = window.Telegram?.WebApp;
      tg?.ready();

      const stars = Number(fromAmount);
      if (!stars || stars <= 0) return alert("⚠️ Вкажіть кількість зірок");

      // 🔹 Запит до бекенду
      const res = await axios.post(`${API_BASE}/api/pay/sell`, {
        telegramId: user.telegramId,
        username: user.username,
        stars,
      });

      if (!res.data.success) {
        alert(`❌ Помилка: ${res.data.message}`);
        return;
      }

      const link = res.data.invoice_link;
      if (!link) {
        alert("⚠️ Інвойс не отримано від сервера");
        return;
      }

      // 🔹 Відкриваємо оплату через Telegram API
      if (window.Telegram?.WebApp?.openInvoice) {
        window.Telegram.WebApp.openInvoice(link, (status) => {
          console.log("Invoice status:", status);
          if (status === "paid") {
            alert(`✅ Оплата успішна! Продано ${stars}⭐`);
          } else if (status === "cancelled") {
            alert("❌ Оплата скасована");
          }
        });
      } else {
        // якщо Telegram API не доступний (тест у браузері)
        window.open(link, "_blank");
      }
    } catch (err) {
      console.error("Sell error:", err);
      alert("❌ Помилка при створенні інвойсу");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <TokenInput
          token={fromToken}
          amount={fromAmount}
          onChange={handleFromChange}
          onSelectToken={setFromToken}
          direction="from"
        />
        <button className={styles.swapBtn} onClick={handleSwap}>
          ⇅
        </button>
        <TokenInput
          token={toToken}
          amount={toAmount}
          onChange={handleToChange}
          onSelectToken={setToToken}
          direction="to"
        />

        {mode === "buy" ? (
          <DonatelloButton
            amount={fromAmount}
            token={fromToken}
            mode={mode}
            className={styles.submitBtn}
          />
        ) : (
          <button onClick={handleSell} className={styles.submitBtn}>
            Продати зірки
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
