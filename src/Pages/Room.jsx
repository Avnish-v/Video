// Room.js
import React, { useEffect, useCallback, useMemo,useRef, useState } from 'react';
import { useSocket } from '../Provider/Socket';
import { usePeer } from '../Provider/peer';
import ReactPlayer from 'react-player'
const Room = () => {
    const videoRef = useRef(null);
    const [camera ,  setCamera] =  useState();
  const { createOffer,createAnswer ,SetRemote } = usePeer();
  const { socket } = useSocket();

  const HandleNewUser = useCallback(async (data) => {
    try {
        const { emailId } = data;
        const offer = await createOffer();
        socket.emit('call', { emailId, offer });
    } catch (error) {
        console.log(error);
    }
  }, [ socket]);

  const HandleIncoming = useCallback(async (data) => {
    try {
      const { from, offer } = data;
      console.log("this is the offer" ,  from  , offer);
      const answer = await createAnswer(offer); 
      socket.emit("call-accept", { emailId: from, ans: answer });
    } catch (error) {
      console.error("Error handling incoming offer:", error);
    }
  }, [socket]);
  

  const AcceptCall = async(data)=>{
    console.log(data)
    
  }

//   useEffect(() => {
//     const getMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         console.log(stream);
//         setCamera(stream);

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('Error accessing camera and microphone:', error);
//       }
//     };

//     getMedia();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);


//    const AcceptCall  =  async (data)=>{
//     try {
//         console.log(data); 
//         const {ans} =   data;
//         await SetRemote(ans);
//     } catch (error) {
//         console.log(error);
//     }
//    }


const getMedia  =  useMemo(async()=>{
    let stream  =  await navigator.mediaDevices.getUserMedia({audio : false , video:true});
    setCamera(stream);
})

  useEffect(() => {
    
    socket.on('user-joined', HandleNewUser);
    socket.on('incoming', HandleIncoming);
    socket.on('call-accepted' , AcceptCall);
    return () => {
        socket.off('user-joined', HandleNewUser);
        socket.off('incoming', HandleIncoming);
        socket.off('call-accepted' ,  AcceptCall)
    };
  }, [socket,  HandleIncoming , HandleNewUser,  AcceptCall]);
console.log("this is the video ref" , camera);
  return (
   <div>
  <ReactPlayer url={camera}  playing muted/>
   </div>
  );
};

export default Room;
