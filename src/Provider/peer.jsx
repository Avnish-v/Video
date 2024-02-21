import React,{createContext,useContext, useMemo } from "react";


const PeerContext = createContext(null);

export const  PeerProvider = (props)=>{
const peer = useMemo(()=>{
 return  new RTCPeerConnection({
        iceServers:[
            {
                urls:[
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                ]
            }
        ]
    })
},[])

const createOffer = async()=>{
    const offer  = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
}

const SetRemote =  async(ans)=>{
    await peer.setRemoteDescription(ans);
}

const createAnswer = async(offer)=>{
    await peer.setRemoteDescription(offer);
    const ans =  await peer.createAnswer(offer);
    await peer.setLocalDescription(ans);
    return ans;
}
const values  = {
    createOffer , 
    peer,
    createAnswer ,
    SetRemote,
}

    return(
        <PeerContext.Provider value={values}>{props.children}</PeerContext.Provider>
    )
}

export const usePeer = ()=>useContext(PeerContext);