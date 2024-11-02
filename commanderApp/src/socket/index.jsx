import socketIO from "socket.io-client";
import { createContext, useState } from "react";
import useSocketServices from "../hooks/useSocketServices";

export const socketContext = createContext()

const hostname = window.location.hostname
const socket = socketIO(`http://${hostname}:3000`)

const Socket = ({ children }) => {
    const [isConnected, setIsConnected] = useState()

    useSocketServices(socket)

    socket.on("connect", () => {
        setIsConnected(true)
    })

    socket.on("disconnect", () => {
        setIsConnected(false)
    })

    const emit = ({ channel, value, cb }) => {
        if (!socket.connected) return
        socket.emit(channel, value, cb)
    }

    return (
        <socketContext.Provider value={{emit, isConnected}}>
            {children}
        </socketContext.Provider>
    );
}

export default Socket;