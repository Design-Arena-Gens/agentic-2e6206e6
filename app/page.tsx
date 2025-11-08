'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = display

    if (previousValue !== null && operation !== null && !newNumber) {
      handleEquals()
    }

    setPreviousValue(currentValue)
    setOperation(op)
    setNewNumber(true)
  }

  const handleEquals = () => {
    if (previousValue === null || operation === null) return

    const prev = parseFloat(previousValue)
    const current = parseFloat(display)
    let result = 0

    switch (operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '×':
        result = prev * current
        break
      case '÷':
        result = current !== 0 ? prev / current : 0
        break
      case '%':
        result = prev % current
        break
      default:
        return
    }

    setDisplay(String(result))
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0')
      setNewNumber(true)
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handleSign = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>

      <div className={styles.buttons}>
        <button className={styles.buttonSecondary} onClick={handleClear}>AC</button>
        <button className={styles.buttonSecondary} onClick={handleBackspace}>⌫</button>
        <button className={styles.buttonSecondary} onClick={() => handleOperation('%')}>%</button>
        <button className={styles.buttonOperation} onClick={() => handleOperation('÷')}>÷</button>

        <button className={styles.button} onClick={() => handleNumber('7')}>7</button>
        <button className={styles.button} onClick={() => handleNumber('8')}>8</button>
        <button className={styles.button} onClick={() => handleNumber('9')}>9</button>
        <button className={styles.buttonOperation} onClick={() => handleOperation('×')}>×</button>

        <button className={styles.button} onClick={() => handleNumber('4')}>4</button>
        <button className={styles.button} onClick={() => handleNumber('5')}>5</button>
        <button className={styles.button} onClick={() => handleNumber('6')}>6</button>
        <button className={styles.buttonOperation} onClick={() => handleOperation('-')}>−</button>

        <button className={styles.button} onClick={() => handleNumber('1')}>1</button>
        <button className={styles.button} onClick={() => handleNumber('2')}>2</button>
        <button className={styles.button} onClick={() => handleNumber('3')}>3</button>
        <button className={styles.buttonOperation} onClick={() => handleOperation('+')}>+</button>

        <button className={styles.button} onClick={handleSign}>+/−</button>
        <button className={styles.button} onClick={() => handleNumber('0')}>0</button>
        <button className={styles.button} onClick={handleDecimal}>.</button>
        <button className={styles.buttonEquals} onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}
