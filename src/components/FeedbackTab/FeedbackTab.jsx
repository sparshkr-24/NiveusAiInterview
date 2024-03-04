import React from 'react'
import { useSelector } from 'react-redux'
import { reportDataSelector } from '../../selectors/report'

const FeedbackTab = () => {
  const report = useSelector(reportDataSelector)
  return (
    <div>
      {report}
    </div>
  )
}

export default FeedbackTab
