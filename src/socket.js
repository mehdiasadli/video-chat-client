import React, { createContext, useState, useRef, useEffect } from "react"
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const socketContext = createContext()

const socket = io('https://chatvyd.herokuapp.com/')

const ContextProvider = ({ children }) => {
    // UseStates
    const [ stream, setStream ] = useState(null)
    const [ me, setMe ] = useState('')
    const [ name, setName ] = useState('')
    const [ call, setCall ] = useState({})
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ callEnded, setCallEnded ] = useState(false)

    // UseRefs
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    
    // UseEffects
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(currentStream => {
                setStream(currentStream)   
                myVideo.current.srcObject = currentStream
            })
            .catch(err => console.error(err))

        socket.on('me', id => setMe(id))
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        })
    }, [])
    
    // Functions
    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', data => {
            socket.emit('answercall', { signal: data, to: call.from })
        })
        peer.on('stream', currentStream => {
            userVideo.current.srcObject = currentStream
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }

    const callUser = id => {
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', data => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name })
        })
        peer.on('stream', currentStream => {
            userVideo.current.srcObject = currentStream
        })
        socket.on('callaccepted', signal => {
            setCallAccepted(true)

            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)

        connectionRef.current.destroy()

        window.location.reload()
    }

    return (
        <socketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }} >
            { children }       
        </socketContext.Provider>
    )
}

export { ContextProvider, socketContext }


