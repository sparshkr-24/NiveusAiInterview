import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { masterResetStore } from '../../store/interview';
import ScalerLogo from '../../images/scaler-logo.svg';
import styles from './Header.module.scss'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(masterResetStore())
    history.push('/')
  }
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
      <img src={ScalerLogo} alt="scaler-logo" className={styles.scalerLogo} />
      </button>
    </div>
  )
}

export default Header
