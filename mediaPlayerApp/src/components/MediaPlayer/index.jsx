import { useEffect, useRef, useState } from "react";

const MediaPlayer = ({ layerIndex, canPlay, file, onMediaEnd, onError, onMediaLoaded, onPlaying, loop, opacity }) => {
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
        onError?.(e)
        console.error("Error loading video:", e.target)
    }

    useEffect(()=>{
        if (!canPlay) return
        videoRef.current.play()
    },[canPlay])

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.addEventListener('ended', () => onMediaEnd(layerIndex))
        videoRef.current.addEventListener('error', (e) => handleOnError(e, layerIndex))
        videoRef.current.addEventListener('canplaythrough', () => onMediaLoaded(layerIndex))
        videoRef.current.addEventListener('play', () => onPlaying(layerIndex))

        return () => {
            videoRef.current.removeEventListener('ended', () => onMediaEnd(layerIndex))
            videoRef.current.removeEventListener('error', (e) => handleOnError(e, layerIndex))
            videoRef.current.removeEventListener('canplaythrough', () => onMediaLoaded(layerIndex))
            videoRef.current.removeEventListener('play', () => onPlaying(layerIndex))

        }
    }, [])

    return (
        <video
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundColor: "black",
                position: "absolute",
                opacity: opacity ? 1 : 0
            }}
            className="media-player"
            ref={videoRef}
            src={videoPath}
            muted
            loop={loop}
        />
    );
}

export default MediaPlayer;