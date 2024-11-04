import { useEffect, useRef, useState } from "react";
import useGetSystemInformation from "../../hooks/useGetSystemInformation";
import OSD from "../OSD";
import useGetDisplayID from "../../hooks/useGetDisplayID";

const ShowIPOSD = ({ timeout }) => {

    const timerRef = useRef(null)
    const [showIPOSD, setShowIPOSD] = useState(true)
    const { ip, systemVersion } = useGetSystemInformation()
    const {displayID} = useGetDisplayID()

    const year = new Date().getFullYear()

    useEffect(() => {
        setShowIPOSD(true)
        if (!timeout) return
        timerRef.current = setTimeout(() => {
            clearTimeout(timerRef.current)
            setShowIPOSD(false)
        }, timeout)

        return () => {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }, [])

    if (showIPOSD)
        return (
            <OSD
                text={`Prodigi ${year}  | ID ${displayID} | ${ip}  |  v${systemVersion}`}
            />
        );
    else
        return (<></>)
}

export default ShowIPOSD;