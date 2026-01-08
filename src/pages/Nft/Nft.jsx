import  { useState } from 'react';
import styles from './Nft.module.css';
import BottomNav from '../../components/BottomNav/BottomNav';

const GIFTS_DATA = [
    { id: 1, name: "Snoop Cigar", image: "/cigar.png", priceTon: 9.2, priceUah: 800 },
    { id: 2, name: "Snoop Dog", image: "/snoopDog.png", priceTon: 4.22, priceUah: 400 },
    { id: 3, name: "Sakura Flower", image: "/Sakura Flower.png", priceTon: 7.47, priceUah: 650 },
  { id: 4, name: "Stellar Rocket", image: "/Stellar Rocket.png", priceUah: 355, priceTon: 3.66 },
  { id: 4, name: "Input Key", image: "/input Key.png", priceUah: 383, priceTon: 4.15 },
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
            <img src={gift.image} alt={gift.name} className={styles.imagePlaceholder} />
            {/* <div className={styles.imagePlaceholder}>{gift.image}</div> */}
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
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './Nft.module.css';
// import BottomNav from '../../components/BottomNav/BottomNav';

// // Офіційна адреса колекції подарунків Telegram
// const COLLECTION_ADDR = "0:82d78a35f955a14b66ae9c2fe140663c5019ef2e688fbd69635bd2e8ae49f9be";
// const TON_TO_UAH = 215; // Курс TON до гривні (можна теж брати через API)

// export default function Gifts() {
//   const [gifts, setGifts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [offset, setOffset] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // Функція завантаження даних
// const fetchGifts = async (currentOffset) => {
//     setLoading(true);
//     try {
//       // Спробуйте змінити URL на цей, якщо попередній не працював:
//       const response = await axios.get(
//         `https://tonapi.io/v2/nfts/collections/${COLLECTION_ADDR}/items`,
//         {
//           params: {
//             limit: 10,
//             offset: currentOffset,
//           },
//         }
//       );

//       if (!response.data.nft_items) throw new Error("No data");

//       const newItems = response.data.nft_items.map((item) => {
//         const priceTon = item.sale?.price?.value 
//           ? (parseInt(item.sale.price.value) / 1000000000).toFixed(2) 
//           : "1.5"; // Дефолтна ціна для тесту

//         return {
//           id: item.address,
//           name: item.metadata?.name?.replace("Gift ", "") || "NFT Gift",
//           image: item.metadata?.image || (item.previews && item.previews[1]?.url),
//           priceTon: parseFloat(priceTon),
//           priceUah: Math.round(priceTon * TON_TO_UAH),
//         };
//       });

//       setGifts((prev) => [...prev, ...newItems]);
//     } catch (error) {
//       console.error("API Error:", error.response?.data || error.message);
      
//       // ТИМЧАСОВО: Якщо API лежить, покажемо тестові дані, щоб ви могли бачити дизайн
//       if (gifts.length === 0) {
//         setGifts([
//           { id: '1', name: "Lollipop", image: "https://cache.fragment.com/obj/gift/lollipop-1.png", priceTon: 0.8, priceUah: 180 },
//           { id: '2', name: "Rose", image: "https://cache.fragment.com/obj/gift/rose-1.png", priceTon: 2.5, priceUah: 540 }
//         ]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Перше завантаження
//   useEffect(() => {
//     fetchGifts(0);
//   }, []);

//   const loadMore = () => {
//     const nextOffset = offset + 10;
//     setOffset(nextOffset);
//     fetchGifts(nextOffset);
//   };

//   const filteredGifts = gifts.filter((gift) =>
//     gift.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleBuy = (giftName) => {
//     const managerUsername = "StarcSupport";
//     const text = `Вітаю! Хочу купити NFT Gift: ${giftName}`;
//     window.open(`https://t.me/${managerUsername}?text=${encodeURIComponent(text)}`, '_blank');
//   };

//   return (
//     <div className={styles.container}>
//       <input
//         type="text"
//         className={styles.searchBar}
//         placeholder="Пошук подарунків..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className={styles.grid}>
//         {filteredGifts.map((gift) => (
//           <div key={gift.id} className={styles.giftCard}>
//             <div className={styles.imageContainer}>
//               <img src={gift.image} alt={gift.name} className={styles.giftImage} />
//             </div>
//             <div className={styles.giftName}>{gift.name}</div>

//             <div className={styles.priceContainer}>
//               <span className={styles.priceUah}>{gift.priceUah} UAH</span>
//               <span className={styles.priceTon}>≈ {gift.priceTon} TON</span>
//             </div>

//             <button
//               className={styles.buyButton}
//               onClick={() => handleBuy(gift.name)}
//             >
//               Купити
//             </button>
//           </div>
//         ))}
//       </div>


//       {gifts.length > 0 && (
//         <button 
//           className={styles.loadMoreBtn} 
//           onClick={loadMore} 
//           disabled={loading}
//         >
//           {loading ? "Завантаження..." : "Показати ще"}
//         </button>
//       )}

//       <BottomNav />
//     </div>
//   );
// }