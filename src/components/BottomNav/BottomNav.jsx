import React from 'react'
import styles from './BottomNav.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => navigate('/')}
        className={location.pathname === '/' ? styles.active : ''}
      >
        Обмін
      </button>
      <button
        onClick={() => navigate('/gifts')}
        className={location.pathname === '/gifts' ? styles.active : ''}
      >
        NFT Gifts
      </button>
      <button
        onClick={() => navigate('/orders')}
        className={location.pathname === '/orders' ? styles.active : ''}
      >
        Історія
      </button>
    </nav>
  )
}
