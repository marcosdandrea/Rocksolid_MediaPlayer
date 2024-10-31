import { useEffect, useRef, useState } from "react";

const MediaPlayer = ({ file, onMediaEnd, onError, loop }) => {
    const videoRef = useRef(null)
    const [videoPath, setVideoPath] = useState(undefined)

    const serverProtocol = window.location.protocol
    const serverURL = window.location.host.split(":")[0]
    const serverPort = 3000

    useEffect(() => {
        if (!file) return
        const filePath = `${serverProtocol}//${serverURL}:${serverPort}/media/${file}`
        setVideoPath(filePath)
    }, [file])

    const handleOnError = (e) => {
        onError(e)
        console.error("Error loading video:", e.target)
    }

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.addEventListener('ended', onMediaEnd)
        videoRef.current.addEventListener('error', handleOnError)

        return () => {
            videoRef.current.removeEventListener('ended', onMediaEnd)
            videoRef.current.removeEventListener('error', handleOnError)

        }
    }, [])

    return (<video
        className="media-player"
        ref={videoRef}
        src={videoPath}
        autoPlay
        muted
        loop={loop}
        />
    );
}

export default MediaPlayer;