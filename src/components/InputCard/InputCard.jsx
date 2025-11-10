import React from 'react'
import styles from './InputCard.module.css'
import TokenSelector from '../TokenSelector/TokenSelector'

export default function InputCard({
  label,
  token,
  amount,
  onAmountChange,
  onTokenChange,
  direction = 'from',
  disabled = false,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.labelRow}>
        <label>{label}</label>
        {!disabled && <button className={styles.maxBtn} onClick={() => onAmountChange('100')}>MAX</button>}
      </div>

      <div className={styles.inputRow}>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={disabled}
        />
        <TokenSelector token={token} onChange={onTokenChange} direction={direction} />
      </div>
    </div>
  )
}
