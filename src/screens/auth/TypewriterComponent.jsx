import React,{memo} from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

function TypewriterComponent() {
    const [text]=useTypewriter({
        words:['Doctor','Professor','Engineer','Marketing'],
        loop:{},
        typeSpeed:120,
        deleteSpeed:80,
    })
  return (
    <h3>
        Welcome back ,{' '}
        <span style={{fontWeight:'bole',color:'rgb(152, 0, 76)'}}>
            {text}
        </span>
        <span>
            <Cursor cursorStyle='|'/>
        </span>
    </h3>
  )
}

export default memo(TypewriterComponent)