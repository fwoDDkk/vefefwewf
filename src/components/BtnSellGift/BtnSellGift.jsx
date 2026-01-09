import  { useState, useEffect } from 'react';
import styles from './BtnSellGift.module.css';

const BtnSellGift = () => {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    // Функція для запуску анімації
    const triggerAnimation = () => {
      setIsBouncing(true);
      // Прибираємо клас анімації після її завершення (800мс), 
      // щоб її можна було запустити знову через інтервал
      setTimeout(() => {
        setIsBouncing(false);
      }, 400);
    };

    // Запускаємо кожні 10 секунд
    const interval = setInterval(triggerAnimation, 10000);

    // Очищення таймера при видаленні компонента
    return () => clearInterval(interval);
  }, []);

  const handleSellClick = () => {
    const managerUsername = "StarcSupport";
    const text = "Вітаю! Я хочу продати свій NFT Gift за гривні.";
    window.open(`https://t.me/${managerUsername}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={styles.wrapper}>
      <button 
        className={`${styles.sellButton} ${isBouncing ? styles.bounce : ''}`}
        onClick={handleSellClick}
      >
        Продати NFT подарунок за грн/ton
      </button>
    </div>
  );
};

export default BtnSellGift;