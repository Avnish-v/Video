import React,{createContext , useMemo ,  useContext} from "react";
import { io } from "socket.io-client";
const socketContext  =  createContext(null);

export const SocketProvider = (props)=>{
    const data  = "hello"
    const socket = useMemo( () => {
        return  io('http://localhost:8001');
    }, []);
   const values = {
        socket,
        data,
    }
    return (
        <socketContext.Provider value={values}>{props.children}</socketContext.Provider>
    )

}

export const useSocket  = ()=> useContext(socketContext);