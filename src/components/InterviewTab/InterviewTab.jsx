import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { askHint, getQuestion, submitAnswer } from '../../store/session';
import { chatDataSelector } from '../../selectors/chatMessage';
import { interviewDataSelector } from '../../selectors/interview'
import { 
  sessionAnswersSelector, 
  sessionHintsSelector, 
  sessionQuestionsSelector 
} from '../../selectors/session';
import { AUDIO_ANSWER_CODES } from '../../data/answerType';
import AudioRecorder from '../AudioRecorder';
import ChatBubble from '../../ui/ChatBubble/ChatBubble';
import HintIcon from '../../images/hint-icon.png';
import styles from './InterviewTab.module.scss';
import AudioLoadingState from '../../ui/AudioLoadingState';

const InterviewTab = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { sessionToken } = useSelector(interviewDataSelector)
  const { data: questionData, isLoading: isQuestionLoading } = useSelector(sessionQuestionsSelector)
  const { isLoading: isAnswerLoading } = useSelector(sessionAnswersSelector)
  const { data: hintData, isLoading: isHintLoading } = useSelector(sessionHintsSelector)
  const { chat } = useSelector(chatDataSelector)
  const [codeValue, setCodeValue] = useState('');
  const [audioURL, setAudioURL] = useState(null);
  const [isAudioIput, setIsAudioInput] = useState(true)
  const len = questionData.length;
  const chatBoxRef = useRef(null)

  const isLoading = isQuestionLoading || isAnswerLoading || isHintLoading

  const handleCodeValueChange = (event) => {
    setCodeValue(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(submitAnswer({userCode: codeValue, audioFile: audioURL}))
    setAudioURL(null)
  }

  const handleGetHint = () => {
    dispatch(askHint({code: codeValue}))
  }

  useEffect(() => {
    if (!sessionToken) {
      history.push('/');
    }

    let timeout;
    if(questionData.length === 1){
      timeout = setTimeout(() => {
        dispatch(getQuestion());
      }, 1000);
    }

    return () => {
      if(timeout){
        return clearTimeout(timeout);
      }
    }
  }, [sessionToken, history, dispatch, questionData]);

  useEffect(()=>{
    if(AUDIO_ANSWER_CODES.includes(len)){
      setIsAudioInput(true)
    } else {
      setIsAudioInput(false)
    }
  }, [len])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chat]);  

  return (
    <div className={styles.container}>
      <textarea
        className={styles.codeEditor}
        placeholder="Write your code here"
        value={codeValue}
        onChange={handleCodeValueChange}
      ></textarea>
      <div className={styles.inputArea}>
        <div className={styles.chatBox} ref={chatBoxRef}>
          {chat.map((item, i) => (
            <ChatBubble key={i} item={item} />
          ))}
          {isLoading && <AudioLoadingState />}
        </div>
        <div className={styles.footer}>
          <div className={styles.voiceSection}>
            <AudioRecorder audioURL={audioURL} setAudioURL={setAudioURL} />
          </div>
          <div className={styles.submitSection}>
            <button onClick={handleGetHint} className={styles.hint}>
              <img src={HintIcon} alt='hint-icon' width={20} height={20} />
              {hintData ? hintData[hintData.length - 1]?.hint_count: 3} hints left
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
