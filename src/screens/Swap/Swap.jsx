import React, { useState, useEffect } from 'react'
import styles from './Swap.module.css'
import TokenInput from '../../components/TokenInput/TokenInput'
import BottomNav from '../../components/BottomNav/BottomNav'
import DonatelloButton from '../../components/DonatelloButton/DonatelloButton'

const rate = 10 // курс: 1 STAR = 10 UAH

export default function Swap() {
  const [fromToken, setFromToken] = useState('UAH')
  const [toToken, setToToken] = useState('STAR')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [mode, setMode] = useState('buy') // buy або sell

  // визначаємо режим автоматично при зміні токенів
  useEffect(() => {
    if (toToken === 'STAR') setMode('buy')
    else if (fromToken === 'STAR') setMode('sell')
  }, [fromToken, toToken])

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromChange = (value) => {
    setFromAmount(value)
    if (!value || isNaN(value)) {
      setToAmount('')
      return
    }

    const converted =
      fromToken === 'UAH' ? (value / rate).toFixed(2) : (value * rate).toFixed(2)
    setToAmount(converted)
  }

  const handleToChange = (value) => {
    setToAmount(value)
    if (!value || isNaN(value)) {
      setFromAmount('')
      return
    }

    const converted =
      toToken === 'UAH' ? (value / rate).toFixed(2) : (value * rate).toFixed(2)
    setFromAmount(converted)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <TokenInput
          token={fromToken}
          amount={fromAmount}
          onChange={handleFromChange}
          onSelectToken={setFromToken}
          direction="from"
        />

        <button className={styles.swapBtn} onClick={swapTokens}>
          ⇅
        </button>

        <TokenInput
          token={toToken}
          amount={toAmount}
          onChange={handleToChange}
          onSelectToken={setToToken}
          direction="to"
        />

        <div className={styles.rate}>
          Курс: <strong>1 STAR = {rate} UAH</strong>
        </div>

        {/* кнопка/меню змінюється динамічно */}
        <DonatelloButton
          amount={fromAmount}
          token={fromToken}
          mode={mode}
          className={styles.submitBtn}
        />
      </div>

      <BottomNav />
    </div>
    
  )
}
