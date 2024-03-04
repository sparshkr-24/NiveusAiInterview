import React from 'react'

import styles from './ChatBubble.module.scss'

const ChatBubble = ({message}) => {
  return (
    <>
      {message && ( 
        <div className={styles.chatBubble}>
          {message}
        </div>
      )}
    </>
  )
}

export default ChatBubble
