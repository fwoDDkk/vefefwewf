import  { useState } from 'react';
import styles from './TonExchange.module.css';
import BottomNav from '../../components/BottomNav/BottomNav';

const TON_PRICE_USD = 2.5;
const USD_TO_UAH = 41.5; // Можна міняти вручну або брати з API

export default function TonExchange() {
  const [tonAmount, setTonAmount] = useState('');
  const [uahAmount, setUahAmount] = useState('');

  // Курс 1 TON в гривнях
  const currentRate = TON_PRICE_USD * USD_TO_UAH;

  const handleTonChange = (value) => {
    setTonAmount(value);
    if (value && value > 0) {
      const result = (parseFloat(value) * currentRate).toFixed(2);
      setUahAmount(result);
    } else {
      setUahAmount('');
    }
  };

  const handleCreateTicket = () => {
    const managerUsername = "StarcSupport";
    const message = `💎 КУПІВЛЯ TON\n\nКількість: ${tonAmount} TON\nСума до сплати: ${uahAmount} UAH\nКурс: $${TON_PRICE_USD}`;
    
    // Відкриваємо чат з менеджером
    window.open(`https://t.me/${managerUsername}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Секція введення TON */}
      <div className={styles.card}>
        <span className={styles.label}>Ви отримуєте (💎 TON)</span>
        <div className={styles.inputGroup}>
          <input 
            type="number" 
            className={styles.input} 
            placeholder="0.00"
            value={tonAmount}
            onChange={(e) => handleTonChange(e.target.value)}
          />
          <div className={styles.badge}>TON</div>
        </div>
      </div>

      <div className={styles.swapIcon}>⇅</div>

      {/* Секція виводу грн */}
      <div className={styles.card}>
        <span className={styles.label}>Ви віддаєте (₴ гривні на карту)</span>
        <div className={styles.inputGroup}>
          <input 
            type="number" 
            className={styles.input} 
            placeholder="0.00"
            value={uahAmount}
            readOnly // Розрахунок автоматичний
          />
          <div className={styles.badge}>UAH</div>
        </div>
      </div>

      <div className={styles.rateInfo}>
        💰 Курс: 1 TON ≈ {currentRate.toFixed(2)} грн ($2.5)
      </div>

      <button 
        className={styles.mainButton}
        disabled={!tonAmount || tonAmount <= 0}
        onClick={handleCreateTicket}
      >
        Купити TON через менеджера
      </button>

      <BottomNav />
    </div>
  );
}