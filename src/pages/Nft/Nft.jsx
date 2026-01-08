import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Nft.module.css';
import BottomNav from '../../components/BottomNav/BottomNav';

// Офіційна адреса колекції подарунків Telegram
const COLLECTION_ADDR = "EQCA14o1-VWhS2asqC_0WBMtMFAZ7y5og_9pY1vS6KIn9S-6";
const TON_TO_UAH = 215; // Курс TON до гривні (можна теж брати через API)

export default function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // Функція завантаження даних
  const fetchGifts = async (currentOffset) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://tonapi.io/v2/nfts/collections/${COLLECTION_ADDR}/items`,
        {
          params: {
            limit: 10,
            offset: currentOffset,
          },
        }
      );

      const newItems = response.data.nft_items.map((item) => {
        // Пробуємо дістати ціну (вона не завжди є в загальному списку, ставимо дефолт якщо порожньо)
        const priceTon = item.sale?.price?.value 
          ? (parseInt(item.sale.price.value) / 1000000000).toFixed(2) 
          : (Math.random() * 5 + 1).toFixed(1); // Тимчасово рандом для візуалізації, якщо немає лістингу

        return {
          id: item.address,
          name: item.metadata.name.replace("Gift ", ""),
          image: item.metadata.image || item.previews?.[1]?.url,
          priceTon: parseFloat(priceTon),
          priceUah: Math.round(priceTon * TON_TO_UAH),
        };
      });

      setGifts((prev) => [...prev, ...newItems]);
    } catch (error) {
      console.error("Помилка при завантаженні NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  // Перше завантаження
  useEffect(() => {
    fetchGifts(0);
  }, []);

  const loadMore = () => {
    const nextOffset = offset + 10;
    setOffset(nextOffset);
    fetchGifts(nextOffset);
  };

  const filteredGifts = gifts.filter((gift) =>
    gift.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (giftName) => {
    const managerUsername = "StarcSupport";
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
        {filteredGifts.map((gift) => (
          <div key={gift.id} className={styles.giftCard}>
            <div className={styles.imageContainer}>
              <img src={gift.image} alt={gift.name} className={styles.giftImage} />
            </div>
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


      {gifts.length > 0 && (
        <button 
          className={styles.loadMoreBtn} 
          onClick={loadMore} 
          disabled={loading}
        >
          {loading ? "Завантаження..." : "Показати ще"}
        </button>
      )}

      <BottomNav />
    </div>
  );
}