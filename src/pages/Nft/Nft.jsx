import React, { useState } from 'react';
import styles from './Nft.module.css';
import BottomNav from '../../components/BottomNav/BottomNav';

const GIFTS_DATA = [
  { id: 1, name: "Льодяник", emoji: "🍭", priceUah: 120, priceTon: 0.8 },
  { id: 2, name: "Червона Ружа", emoji: "🌹", priceUah: 450, priceTon: 3.1 },
  { id: 3, name: "Діамант", emoji: "💎", priceUah: 2500, priceTon: 18.5 },
  { id: 4, name: "Ракета", emoji: "🚀", priceUah: 1800, priceTon: 12.4 },
];

export default function Gifts()  {
  const [search, setSearch] = useState('');

  const filteredGifts = GIFTS_DATA.filter(gift => 
    gift.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (giftName) => {
    const managerUsername = "StarcSupport"; // ЗАМІНІТЬ НА ВАШ
    const text = `Вітаю! Хочу купити NFT Gift: ${giftName}`;
    window.open(`https://t.me/${managerUsername}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        className={styles.searchBar} 
        placeholder="Пошук подарунків..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.grid}>
        {filteredGifts.map(gift => (
          <div key={gift.id} className={styles.giftCard}>
            <div className={styles.imagePlaceholder}>{gift.emoji}</div>
            <div className={styles.giftName}>{gift.name}</div>
            
            <div className={styles.priceContainer}>
              <span className={styles.priceUah}>{gift.priceUah} UAH</span>
              <span className={styles.priceTon}>≈ {gift.priceTon} TON</span>
            </div>

            <button 
              className={styles.buyButton}
              onClick={() => handleBuy(gift.name)}
            >
              Купити
            </button>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

// export default Gifts;