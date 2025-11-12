import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Swap.module.css";
import TokenInput from "../../components/TokenInput/TokenInput";
import BottomNav from "../../components/BottomNav/BottomNav";
import DonatelloButton from "../../components/DonatelloButton/DonatelloButton";

const API_BASE = "https://oneback-d62p.onrender.com";
const MANAGER_USERNAME = "StarcManager"; // ⚠️ без @

export default function Swap({ user }) {
  const [fromToken, setFromToken] = useState("UAH");
  const [toToken, setToToken] = useState("STAR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [mode, setMode] = useState("buy");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const RATES = { BUY: 149.99 / 200, SELL: 80 / 200 };

  // === 🔄 Автоматична зміна режиму ===
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

  // === 🔁 Обмін валют ===
  const handleSwap = () => {
    const newFrom = toToken;
    const newTo = fromToken;
    setFromToken(newFrom);
    setToToken(newTo);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    if (newTo === "STAR") setMode("buy");
    else if (newFrom === "STAR") setMode("sell");
  };

  // === 💫 Продаж зірок ===
  const handleSell = async () => {
    try {
      const tg = window.Telegram?.WebApp;
      tg?.ready();

      const stars = Number(fromAmount);
      if (!stars || stars <= 0) return alert("⚠️ Вкажіть кількість зірок");

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

      if (window.Telegram?.WebApp?.openInvoice) {
        window.Telegram.WebApp.openInvoice(link, (status) => {
          console.log("Invoice status:", status);
          if (status === "paid") {
            alert(`✅ Оплата успішна! Продано ${stars}⭐`);
            setPaymentSuccess(true);
          } else if (status === "cancelled") {
            alert("❌ Оплата скасована");
          }
        });
      } else {
        window.open(link, "_blank");
      }
    } catch (err) {
      console.error("Sell error:", err);
      alert("❌ Помилка при створенні інвойсу");
    }
  };

  // === 💬 Кнопка менеджера ===
  const handleContactManager = () => {
    const link = `https://t.me/${MANAGER_USERNAME}`;
    window.open(link, "_blank");
  };

  // === 🪄 Тексти для "Ви віддаєте / отримуєте" ===
  const fromLabel = mode === "buy" ? "Ви віддаєте (₴ гривні)" : "Ви віддаєте (⭐ зірки)";
  const toLabel = mode === "buy" ? "Ви отримуєте (⭐ зірки)" : "Ви отримуєте (₴ гривні)";

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* FROM */}
        <TokenInput
          token={fromToken}
          amount={fromAmount}
          onChange={handleFromChange}
          onSelectToken={setFromToken}
          direction="from"
          label={fromLabel}
        />

        {/* SWAP */}
        <button className={styles.swapBtn} onClick={handleSwap}>
          ⇅
        </button>

        {/* TO */}
        <TokenInput
          token={toToken}
          amount={toAmount}
          onChange={handleToChange}
          onSelectToken={setToToken}
          direction="to"
          label={toLabel}
        />

        {/* Динамічна кнопка */}
        {mode === "buy" ? (
          <DonatelloButton
            amount={fromAmount}
            token={fromToken}
            mode={mode}
            className={styles.submitBtn}
          />
        ) : (
          <>
            <button onClick={handleSell} className={styles.submitBtn}>
              Продати зірки
            </button>

            {paymentSuccess && (
              <button
                onClick={handleContactManager}
                className={styles.managerBtn}
              >
                💬 Написати менеджеру
              </button>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
