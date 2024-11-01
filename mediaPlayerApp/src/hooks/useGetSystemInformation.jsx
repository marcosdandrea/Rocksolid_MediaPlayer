import { useContext, useEffect, useRef, useState } from "react";
import { socketContext } from "../socket";

const useGetSystemInformation = () => {

    const [systemVersion, setSystemVersion] = useState("0.0.0")
    const [mediaFilePath, setMediaFilePath] = useState("")
    const [ip, setIp] = useState("127.0.0.1")

    const {emit, isConnected} = useContext(socketContext)

    const handleOnGetSystemVersion = ({version, path, ip}) => {
        setSystemVersion(version)
        setMediaFilePath(path)
        setIp(ip)
    }

    const getSystemVersion = () => {
        emit({
            channel: "getSystemInformation",
            cb: handleOnGetSystemVersion
        })
    }

    useEffect(()=>{
        getSystemVersion()
    },[isConnected])

    return ({
        ip,
        systemVersion,
        mediaFilePath,
        getSystemVersion,
    })


}
 
export default useGetSystemInformation;