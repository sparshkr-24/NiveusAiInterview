import React from 'react';
import InterviewTab from '../../components/InterviewTab';
import FeedbackTab from '../../components/FeedbackTab';
import styles from './NiveusInterviewTabsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { interviewActiveTabSelector } from '../../selectors/interview';
import { updateTab } from '../../store/interview';

const NiveusInterviewTabsPage = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector(interviewActiveTabSelector)

  const handleTabChange = (tab) => {
    dispatch(updateTab({activeTab: tab}))
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${activeTab === 'interview' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('interview')}
        >
          Interview
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'feedback' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('feedback')}
        >
          Feedback
        </div>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'interview' && <InterviewTab />}
        {activeTab === 'feedback' && <FeedbackTab />}
      </div>
    </div>
  );
};

export default NiveusInterviewTabsPage;
