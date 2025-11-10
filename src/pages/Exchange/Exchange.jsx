import React, { useState } from 'react'
import styles from './Exchange.module.css'

import TokenSelector from '../../components/TokenSelector/TokenSelector'
import InputCard from '../../components/InputCard/InputCard'
import BottomNav from '../../components/BottomNav/BottomNav'

export default function Exchange() {
  const [mode, setMode] = useState('buy') // 'buy' | 'sell'
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken, setFromToken] = useState('UAH')
  const [toToken, setToToken] = useState('STAR')

  const exchangeRates = {
    UAH: 10,
    USD: 0.25,
    RUB: 25,
  }

  const calculateExchange = (value, type) => {
    const rate = exchangeRates[fromToken]
    if (!rate || !value) {
      setFromAmount('')
      setToAmount('')
      return
    }

    if (type === 'from') {
      setFromAmount(value)
      setToAmount((value / rate).toFixed(2))
    } else {
      setToAmount(value)
      setFromAmount((value * rate).toFixed(2))
    }
  }

  const handleSwap = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount('')
    setToAmount('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={mode === 'buy' ? styles.activeTab : ''}
          onClick={() => setMode('buy')}
        >
          Купити
        </button>
        <button
          className={mode === 'sell' ? styles.activeTab : ''}
          onClick={() => setMode('sell')}
        >
          Продати
        </button>
      </div>

      <div className={styles.cards}>
        <InputCard
          label={mode === 'buy' ? 'Ви платите' : 'Ви отримуєте'}
          token={fromToken}
          amount={fromAmount}
          onAmountChange={(v) => calculateExchange(v, 'from')}
          onTokenChange={setFromToken}
          direction="from"
        />

        <div className={styles.swapBtn} onClick={handleSwap}>⇅</div>

        <InputCard
          label={mode === 'buy' ? 'Ви отримуєте (зірки)' : 'Ви віддаєте (зірки)'}
          token={toToken}
          amount={toAmount}
          onAmountChange={(v) => calculateExchange(v, 'to')}
          onTokenChange={setToToken}
          direction="to"
          disabled
        />
      </div>

      <button className={styles.exchangeBtn}>Обміняти</button>

      <BottomNav />
    </div>
  )
}
