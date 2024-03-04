import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { askHint, getQuestion, submitAnswer } from '../../store/session';
import { interviewDataSelector } from '../../selectors/interview'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { 
  sessionAnswersSelector, 
  sessionHintsSelector, 
  sessionQuestionsSelector 
} from '../../selectors/session';
import AudioRecorder from '../AudioRecorder';
import { AUDIO_ANSWER_CODES } from '../../data/answerType';
import ChatBubble from '../../ui/ChatBubble/ChatBubble';
import HintIcon from '../../images/hint-icon.png';
import styles from './InterviewTab.module.scss';
import AiLoadingState from '../../ui/AiLoadingState';

const InterviewTab = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { sessionToken } = useSelector(interviewDataSelector)
  const { data, isLoading: isQuestionLoading } = useSelector(sessionQuestionsSelector)
  const { isLoading: isAnswerLoading } = useSelector(sessionAnswersSelector)
  const { isLoading: isHintLoading } = useSelector(sessionHintsSelector)
  const [codeValue, setCodeValue] = useState('');
  const [audioURL, setAudioURL] = useState(null);
  const [isAudioIput, setIsAudioInput] = useState(true)
  const len = data.length;

  const isLoading = isQuestionLoading || isAnswerLoading || isHintLoading

  const handleCodeValueChange = (event) => {
    setCodeValue(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(submitAnswer({userCode: codeValue, audioFile: audioURL}))
    setAudioURL(null)
    if(!isAnswerLoading){
      dispatch(getQuestion())
    }
  }

  const handleGetHint = () => {
    dispatch(askHint({code: codeValue}))
  }

  useEffect(() => {
    if (!sessionToken) {
      history.push('/');
    }

    let timeout;
    if(data.length === 1){
      timeout = setTimeout(() => {
        dispatch(getQuestion());
      }, 1000);
    }

    return () => {
      if(timeout){
        return clearTimeout(timeout);
      }
    }
  }, [sessionToken, history, dispatch, data]);

  useEffect(()=>{
    if(AUDIO_ANSWER_CODES.includes(len)){
      setIsAudioInput(true)
    } else {
      setIsAudioInput(false)
    }
  }, [len])

  return (
    <div className={styles.container}>
      <textarea
        className={styles.codeEditor}
        placeholder="Write your code here"
        value={codeValue}
        onChange={handleCodeValueChange}
      ></textarea>
      <div className={styles.inputArea}>
        <div className={styles.chatBox}>
          {data.map((message, i) => (
            <ChatBubble key={i} message={message} />
          ))}
          {isLoading && <AiLoadingState />}
        </div>
        <div className={styles.footer}>
          <div className={styles.voiceSection}>
            <AudioRecorder audioURL={audioURL} setAudioURL={setAudioURL} />
          </div>
          <div className={styles.submitSection}>
            <button onClick={handleGetHint} className={styles.hint}>
              <img src={HintIcon} alt='hint-icon' width={20} height={20} />
              3 hints left
            </button>
            <button 
              onClick={handleSubmit} 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isAudioIput ? 'Submit Audio': 'Submit Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewTab;
