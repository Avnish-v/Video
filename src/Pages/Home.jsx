import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../Provider/Socket'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate   =  useNavigate();
    const[email , setEmail] =  useState();
    const [id  , setId] =  useState();
    const {socket}  =  useSocket();
    const HandleJoinRoom= useCallback(({id})=>{
        navigate(`/room/${id}`);
        })
    const HandleJoin = async()=>{
        socket.emit("join-room", {id , emailId:email});
    }
    useEffect(()=>{
        socket.on("join-on" , HandleJoinRoom)
        return ()=>{
            socket.off("join-on" ,  HandleJoin);
            
        }
    },[socket])
  return (
    <div style={{display:"flex" ,  flexDirection:"column" , gap:"5px", width:"100%" , height :"100vh" , justifyContent:"center" ,alignItems:"center"}}>
      <label >Email</label>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Number</label>
        <input type='number' value={id}  onChange={(e)=>setId(e.target.value)} />
        <button type='button' onClick={HandleJoin}>Join</button>
    </div>
  )
}
export default Home