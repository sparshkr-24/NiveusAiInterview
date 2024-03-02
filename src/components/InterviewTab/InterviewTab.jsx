import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getQuestion } from '../../store/session';
import {interviewDataSelector} from '../../selectors/interview'
import ChatBubble from '../../ui/ChatBubble/ChatBubble';
import HintIcon from '../../images/hint-icon.png';
import styles from './InterviewTab.module.scss';
import AudioRecorder from '../../ui/AudioRecorder';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { sessionDataSelector } from '../../selectors/session';

const InterviewTab = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { sessionToken } = useSelector(interviewDataSelector)
  const { questions } = useSelector(sessionDataSelector)

  useEffect(() => {
    if (!sessionToken) {
      history.push('/');
    }

    const timerId = setTimeout(() => {
      dispatch(getQuestion());
    }, 4000);

    return () => clearTimeout(timerId);
  }, [sessionToken, history, dispatch]);

  return (
    <div className={styles.container}>
      <textarea className={styles.codeEditor} placeholder="Write your code here"></textarea>
      <div className={styles.inputArea}>
        <div className={styles.chatBox}>
          {questions.map((message, i) => (
            <ChatBubble key={i} message={message} />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.voiceSection}>
            <AudioRecorder len={questions.length} />
          </div>
          <div className={styles.submitSection}>
            <div className={styles.hint}>
              <img src={HintIcon} alt='hint-icon' width={20} height={20} />
              3 hints left
            </div>
            <div className={styles.submit}>
              <button className={styles.skipButton}>Skip</button>
              <button className={styles.submitButton}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewTab;
