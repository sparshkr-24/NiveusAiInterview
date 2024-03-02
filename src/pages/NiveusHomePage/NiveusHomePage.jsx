import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './NiveusHomePage.module.scss'
import { interviewDataSelector } from '../../selectors/interview'
import { startInterview } from '../../store/interview';
import AiLogo from '../../images/ai-logo.svg'
import { getQuestion } from '../../store/session';

const NiveusHomePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionToken } = useSelector(interviewDataSelector)

  const handleStartInterview = useCallback(()=>{
    dispatch(startInterview())
    
  }, [dispatch])

  useEffect(()=>{
    if(sessionToken){
      dispatch(getQuestion())
      history.push(`/${sessionToken}`)
    }
  }, [history, sessionToken, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Welcome to Niveus
        <img src={AiLogo} alt='ai-logo' className={styles.aiLogo} />
        interview
      </div>
        <button 
          className={styles.startButton}
          onClick={handleStartInterview}>Start Interview</button>
    </div>
  )
}

export default NiveusHomePage
