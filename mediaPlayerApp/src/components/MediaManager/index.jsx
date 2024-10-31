import "./style.css"
import { useEffect, useRef, useState } from "react";
import useGetMediaFiles from "../../hooks/useGetMediaFiles";
import Text from "../Text";
import ScreenMessage from "../ScreenMessage";
import VideoLayers from "../VideoLayer";

const MediaManager = () => {

    const displayID = window.location.pathname.substring(1)
    const showScreenIDTime = 1000

    const showScreenIDTimerRef = useRef(null)
    const { isFetching, mediaFiles } = useGetMediaFiles(displayID)

    const [showScreenID, setShowScreenID] = useState(true)

    useEffect(() => {
        showScreenIDTimerRef.current = setTimeout(() => {
            setShowScreenID(false)
            clearTimeout(showScreenIDTimerRef.current)
            showScreenIDTimerRef.current = null
        }, showScreenIDTime)

        return () => {
            if (showScreenIDTimerRef.current) {
                clearTimeout(showScreenIDTimerRef.current)
                showScreenIDTimerRef.current = null
            }
        }
    }, [mediaFiles])

    if (showScreenID)
        return (<ScreenMessage />)

    return (
        <div className="mediaManager">
            {
                isFetching
                    ? <Text>Cargando...</Text>
                    : mediaFiles.length > 0
                        ? <VideoLayers mediaFiles={mediaFiles} />
                        : <ScreenMessage text={`No hay videos para reproducir`} />
            }
        </div>);
}

export default MediaManager;