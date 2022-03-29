import { useContext } from 'react'
import { socketContext } from '../socket'

const Nots = () => {
  const { answerCall, call, callAccepted } = useContext(socketContext)
  
  return (
    <>
      { call.isReceivedCall && !callAccepted && (
        <div className="not" style={{display: 'flex', justifyContent: 'center'}} >
          <h2>{call.name ? call.name : 'Someone'} is Calling</h2>
          <button className='btn' onClick={answerCall} >Answer</button>
        </div>
      ) }
    </>
  )
}

export default Nots