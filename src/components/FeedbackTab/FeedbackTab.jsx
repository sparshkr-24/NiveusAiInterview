import React from 'react'

import { useSelector } from 'react-redux'
import { reportDataSelector } from '../../selectors/report'
import styles from './FeedbackTab.module.scss'
import AiLoadingState from '../../ui/AiLoadingState'

const FeedbackTab = () => {
  const { report, isLoading, loadError } = useSelector(reportDataSelector)
  if ( isLoading ) {
    return (
      <div className={styles.container}>
        AI is evaluationg
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
        {report}
      </div>
    )
  }
}

export default FeedbackTab
