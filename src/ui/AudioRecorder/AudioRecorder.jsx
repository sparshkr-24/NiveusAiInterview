import React, { useEffect, useState } from 'react';

import MicEnabled from '../../images/microphone.svg'
import MicDisabled from '../../images/mic-off.svg'
import styles from './AudioRecorder.module.scss'

const AudioRecorder = ({len}) => {
  const [isMicRequired, setIsMicRequired] = useState(false)
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

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
    console.log('len: ', len);
    if(len === 2 || 4 || 5){
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
      >
        {recording ? <img src={MicEnabled} className={styles.micIcon} alt='mic-enabled' width={20} height={20} /> : 
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
