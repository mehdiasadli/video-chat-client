import { useState, useContext } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { socketContext } from '../socket'

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(socketContext)
  const [ idToCall, setIdToCall ] = useState('')

  return (
    <div className='options' >
      <div>
      { children }
        <form noValidate onSubmit={e => e.preventDefault()}>
          <div className="left-form">
            <h6>Account Info</h6>
            <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            <CopyToClipboard text={me} >
              <button className='btn'>Copy Your Id</button>
            </CopyToClipboard>
          </div>
          <div className="right-form">
            <h6>Make A Call</h6>
            <input placeholder='ID to call' value={idToCall} onChange={e => setIdToCall(e.target.value)} />
            { callAccepted && !callEnded ? (
              <button className="btn hangup-btn" onClick={leaveCall} >Hang Up</button>
            ) : (
              <button className="btn call-btn" onClick={() => callUser(idToCall)} >Call</button>
            ) }
          </div>
        </form>
      </div>
    </div>
  )
}

export default Options