import React, { useState, useEffect } from 'react'
import styles from './Swap.module.css'
import TokenInput from '../../components/TokenInput/TokenInput'
import BottomNav from '../../components/BottomNav/BottomNav'
import DonatelloButton from '../../components/DonatelloButton/DonatelloButton'

export default function Swap() {
  const [fromToken, setFromToken] = useState('UAH')
  const [toToken, setToToken] = useState('STAR')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [mode, setMode] = useState('buy') // buy або sell

  // === Курси ===
  const buyRate = 149.99 / 200 // 0.75 грн за 1 зірку
  const sellRate = 80 / 200 // 0.4 грн за 1 зірку
  const handleSell = async () => {
    const tg = window.Telegram.WebApp
    const userId = tg.initDataUnsafe.user?.id
    const username = tg.initDataUnsafe.user?.username
    const stars = Number(toAmount)
  
    await fetch("https://your-backend-domain.com/api/pay/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username, stars })
    })
  }
  
  // Визначення режиму залежно від напрямку
  useEffect(() => {
    if (toToken === 'STAR') setMode('buy')
    else if (fromToken === 'STAR') setMode('sell')
  }, [fromToken, toToken])

  const getRate = () => (mode === 'buy' ? buyRate : sellRate)

  const handleFromChange = (value) => {
    setFromAmount(value)
    if (!value || isNaN(value)) {
      setToAmount('')
      return
    }

    const rate = getRate()
    const converted =
      fromToken === 'UAH'
        ? (value / rate).toFixed(2)
        : (value * rate).toFixed(2)
    setToAmount(converted)
  }

  const handleToChange = (value) => {
    setToAmount(value)
    if (!value || isNaN(value)) {
      setFromAmount('')
      return
    }

    const rate = getRate()
    const converted =
      toToken === 'UAH'
        ? (value / rate).toFixed(2)
        : (value * rate).toFixed(2)
    setFromAmount(converted)
  }

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
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

        {/* <div className={styles.rate}>
          💰 Курс: <strong>
            200 ⭐ = {mode === 'buy' ? '149.99 грн' : '80 грн'}
          </strong>
        </div> */}

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
