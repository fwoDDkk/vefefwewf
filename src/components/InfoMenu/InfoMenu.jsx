import { useState } from "react"
import Modal from 'react-modal'
import styles from './InfoMenu.module.css'

Modal.setAppElement('#root');

export default function InfoMenu() {
  const [show, setShow] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const closeModal = () => setShow(false);

  return (
    <div onClick={openModal} className={styles.container}>
      <button type="button" className={styles.btn} >?</button>

      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        overlayClassName={styles.modalOverlay}
        className={styles.modalContent}
        contentLabel="Інформація про сервіс"
      >
        <h2 className={styles.title}>Про наш сервіс</h2>
        
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <span className={styles.icon}>⭐</span>
            <div><strong>Stars:</strong> Продаж та купівля зірок Telegram за грн.</div>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.icon}>💎</span>
            <div><strong>TON:</strong> Обмін TON на карту за вигідним курсом.</div>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.icon}>🎁</span>
            <div><strong>NFT Gifts:</strong> Купівля та продаж NFT подарунків за грн/TON.</div>
          </li>
        </ul>

        <div className={styles.supportBox}>
          <span className={styles.icon}>👨‍💻</span>
          <div className={styles.supportText}>
            <strong>Техпідтримка:</strong><br/>
            З усіх питань пишіть: <a href="https://t.me/StarcSupport" target="_blank" rel="noreferrer" className={styles.link}>@StarcSupport</a>
          </div>
        </div>

        <button type='button' className={styles.closeBtn} onClick={closeModal}>Зрозуміло</button>
      </Modal>
    </div>
  )
}