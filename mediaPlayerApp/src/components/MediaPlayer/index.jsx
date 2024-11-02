import { useEffect, useRef, useState } from "react";

const MediaPlayer = ({ layerIndex, canPlay, file, onMediaEnd, onError, onMediaLoaded, onPlaying, loop }) => {
    const videoRef = useRef(null)
    const [videoPath, setVideoPath] = useState(undefined)
    const [opacity, setOpacity] = useState(false)

    const serverProtocol = window.location.protocol
    const serverURL = window.location.host.split(":")[0]
    const serverPort = 3000

    useEffect(() => {
        if (!file?.media) return
        const filePath = `${serverProtocol}//${serverURL}:${serverPort}/media/${file.media}`

        if (filePath && filePath == videoPath) {
            videoRef.current.currentTime = 0
            onMediaLoaded()
        } else {
            setVideoPath(filePath)
        }
    }, [file])

    const handleOnError = (e) => {
        onError?.(e)
        console.error("Error loading video:", e.target)
    }

    useEffect(() => {
        if (!canPlay) return
        videoRef.current.play()
    }, [canPlay])

    
    const handleOnMediaEnd = () => {
        onMediaEnd(layerIndex)
        setOpacity(0)
        
    }

    const handleOnPlaying = () => {
        onPlaying(layerIndex)
        setOpacity(1)
    }

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.addEventListener('ended', handleOnMediaEnd)
        videoRef.current.addEventListener('error', (e) => handleOnError(e, layerIndex))
        videoRef.current.addEventListener('canplaythrough', () => onMediaLoaded(layerIndex))
        videoRef.current.addEventListener('play', handleOnPlaying)

        return () => {
            videoRef.current.removeEventListener('ended', handleOnMediaEnd)
            videoRef.current.removeEventListener('error', (e) => handleOnError(e, layerIndex))
            videoRef.current.removeEventListener('canplaythrough', () => onMediaLoaded(layerIndex))
            videoRef.current.removeEventListener('play', handleOnPlaying)

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