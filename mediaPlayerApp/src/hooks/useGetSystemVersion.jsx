import { useContext, useEffect, useRef, useState } from "react";
import { socketContext } from "../socket";

const useGetSystemVersion = () => {

    const [systemVersion, setSystemVersion] = useState("0.0.0")
    const [mediaFilePath, setMediaFilePath] = useState("")

    const {emit, isConnected} = useContext(socketContext)

    const handleOnGetSystemVersion = ({version, path}) => {
        setSystemVersion(version)
        setMediaFilePath(path)
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
        mediaFilePath,
        getSystemVersion,
    })


}
 
export default useGetSystemVersion;