import { useContext, useEffect, useRef, useState } from "react";
import { socketContext } from "../socket";

const useGetSystemVersion = () => {

    const [systemVersion, setSystemVersion] = useState("0.0.0")

    const {emit, isConnected} = useContext(socketContext)

    const handleOnGetSystemVersion = (data) => {
        console.log ("System version", data)
        setSystemVersion(data)
    }

    const getSystemVersion = () => {
        emit({
            channel: "getSystemVersion",
            cb: handleOnGetSystemVersion
        })
    }

    useEffect(()=>{
        getSystemVersion()
    },[isConnected])

    return ({
        systemVersion,
        getSystemVersion,
    })


}
 
export default useGetSystemVersion;