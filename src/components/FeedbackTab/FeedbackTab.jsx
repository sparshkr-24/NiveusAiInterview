import React from 'react'

import { useSelector } from 'react-redux'
import { reportDataSelector } from '../../selectors/report'
import styles from './FeedbackTab.module.scss'
import AiLoadingState from '../../ui/AiLoadingState'

const FeedbackTab = () => {
  const { report, isLoading, loadError } = useSelector(reportDataSelector)
  let cleanFeedback
  
  const separateParagraphIntoPoints = (paragraph) => {
    const points = paragraph.split(/\*\*(.*?)\*\*/g).filter(point => point.trim() !== '');
    return points;
  }

  if (!isLoading || report){
    cleanFeedback = separateParagraphIntoPoints(report)
  }

  if ( isLoading ) {
    return (
      <div className={styles.container}>
        AI is evaluating
        {' '}
        <AiLoadingState />
      </div>
    )
  } else if (loadError){
    return (
      <div className={styles.container}>
        {loadError}
      </div>
    )
  } 
  else {
    return (
      <div className={styles.container}>
        {cleanFeedback.map((point, i) => {
          return (
            <div key={i} className={styles.pointItems}>
              {point}
            </div>
          )
        })}
      </div>
    )
  }
}

export default FeedbackTab
