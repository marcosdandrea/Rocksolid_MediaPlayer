import { useContext, useEffect, useRef, useState } from "react";
import { socketContext } from "../socket";

const useGetSystemInformation = () => {
    const retryRef = useRef(null)
    const [systemVersion, setSystemVersion] = useState("0.0.0")
    const [ip, setIp] = useState("127.0.0.1")

    const { emit, isConnected } = useContext(socketContext)

    const handleOnGetSystemVersion = ({ version, path, ip }) => {
        if (!ip || !version) return
        setSystemVersion(version)
        setIp(ip)
        clearTimeout(retryRef.current)
    }

    const getSystemVersion = () => {
        emit({
            channel: "getSystemInformation",
            cb: handleOnGetSystemVersion
        })
    }

    useEffect(() => {
        if (!isConnected) return
        getSystemVersion()
        retryRef.current = setInterval(() => {
            getSystemVersion()
        }, 5000)

        return () => {
            clearInterval(retryRef.current)
        }
    }, [isConnected])

    return ({
        ip,
        systemVersion,
        getSystemVersion,
    })


}

export default useGetSystemInformation;