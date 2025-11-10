import React from 'react'
import styles from './TokenSelector.module.css'

import usdIcon from '../../assets/usd.svg'
import uahIcon from '../../assets/uah.svg'
import rubIcon from '../../assets/rub.svg'
import starIcon from '../../assets/star.svg'

const tokenOptions = {
  UAH: { label: 'UAH', icon: uahIcon },
  USD: { label: 'USD', icon: usdIcon },
  RUB: { label: 'RUB', icon: rubIcon },
  STAR: { label: '⭐', icon: starIcon },
}

export default function TokenSelector({ token, onChange, direction }) {
  return (
    <div className={styles.selector}>
      <img src={tokenOptions[token]?.icon} alt={token} />
      <select
        value={token}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
        disabled={direction === 'to'}  // блокувати вибір для поля "зірки"
      >
        {Object.entries(tokenOptions).map(([key, { label }]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  )
}
