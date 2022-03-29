import { useContext } from 'react';
import { socketContext } from '../socket'

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(socketContext)
  return (
    <div className='video-player' >
      { stream && (
          <div className="my-video">
            <h3 className="my-name" >{ name || 'Name' }</h3>
            <video playsInline muted ref={myVideo} autoPlay className="video" />
          </div>
      ) }
      {
        callAccepted && !callEnded && (
          <div className="users-video">
            <h3 className="users-name" >{ call.name || 'Name' }</h3>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
        )
      }
    </div>
  )
}

export default VideoPlayer