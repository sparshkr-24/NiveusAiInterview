import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MicEnabled from '../../images/microphone.svg'
import MicDisabled from '../../images/mic-off.svg'
import styles from './AudioRecorder.module.scss'
import { AUDIO_ANSWER_CODES } from '../../data/answerType';
import { sessionQuestionsSelector } from '../../selectors/session';
import AudioLoadingState from '../../ui/AudioLoadingState';

const AudioRecorder = ({ audioURL, setAudioURL }) => {
  const { data } = useSelector(sessionQuestionsSelector)
  const [isMicRequired, setIsMicRequired] = useState(false)
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const len = data.length

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      });

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  useEffect(()=>{
    if(AUDIO_ANSWER_CODES.includes(len)){
      setIsMicRequired(true)
    }
    else{
      setIsMicRequired(false)
    }
  }, [len])

  return (
    <div>
      <button 
        onClick={recording ? stopRecording : startRecording}
        className={styles.buttons}
        disabled={!isMicRequired}
      >
        {recording ? (
          <div className={styles.micOn}>
            <img src={MicEnabled} className={styles.micIcon} alt='mic-enabled' width={20} height={20} />
            <AudioLoadingState />
          </div>
          ) : 
          <img 
            src={MicDisabled} 
            alt='mic-disabled' 
            className={`${styles.micIcon} ${isMicRequired ? styles.iconAnimation: ''}`} 
            width={20} 
            height={20} 
          />
          }
      </button>
      <div>
        <audio 
          controls 
          src={audioURL}
          className={styles.audioController}
        />
      </div>
    </div>
  );
};

export default AudioRecorder;
