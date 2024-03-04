import React from 'react'

import styles from './ChatBubble.module.scss'

const ChatBubble = ({item}) => {
  return (
    <>
      {item && ( 
        <div className={`${styles.bubble} ${item.type === 'hint' ? styles.hintBubble: styles.chatBubble}`}>
          {item.message}
        </div>
      )}
    </>
  )
}

export default ChatBubble
