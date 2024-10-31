import "./style.css"
import { useEffect, useRef, useState } from "react";
import useGetMediaFiles from "../../hooks/useGetMediaFiles";
import Text from "../Text";
import MediaPlayer from "../MediaPlayer";
import ScreenMessage from "../ScreenMessage";

const MediaManager = () => {

    const displayID = window.location.pathname.substring(1)
    const showScreenIDTime = 15000

    const showScreenIDTimerRef = useRef(null)
    const { isFetching, mediaFiles } = useGetMediaFiles(displayID)

    const [mediaToPlay, setMediaToPlay] = useState(undefined)
    const [currentPlayIndex, setCurrentPlayIndex] = useState(0)
    const [showScreenID, setShowScreenID] = useState(true)
    const [mediaError, setMediaError] = useState(false)

    useEffect(() => {
        showScreenIDTimerRef.current = setTimeout(() => {
            setShowScreenID(false)
            clearTimeout(showScreenIDTimerRef.current)
            showScreenIDTimerRef.current = null
            setCurrentPlayIndex(0)
            setMediaToPlay(mediaFiles[0])
        }, showScreenIDTime)

        return () => {
            if (showScreenIDTimerRef.current) {
                clearTimeout(showScreenIDTimerRef.current)
                showScreenIDTimerRef.current = null
            }
        }
    }, [mediaFiles])

    const handleOnMediaEnd = () => {
        console.log ("MediaEnded")
        setCurrentPlayIndex(currentPlayIndex == mediaFiles.length - 1
            ? 0
            : currentPlayIndex + 1)
        setMediaToPlay(mediaFiles[currentPlayIndex])
    }

    const handleOnMediaError = (e) => {
        setMediaError(true)
    }


    if (showScreenID)
        return (<ScreenMessage />)

    return (
        <div className="mediaManager">
            {
                isFetching
                    ? <Text>Cargando...</Text>
                    : mediaToPlay || mediaError
                        ? <MediaPlayer
                            onError={handleOnMediaError}
                            onMediaEnd={handleOnMediaEnd}
                            loop={mediaFiles.length == 1}
                            file={mediaToPlay} />
                        : <ScreenMessage
                            text={`No hay videos para reproducir`} />

            }
        </div>);
}

export default MediaManager;