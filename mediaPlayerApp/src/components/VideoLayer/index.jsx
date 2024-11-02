import "./style.css";
import { useEffect, useState } from "react";
import MediaPlayer from "../MediaPlayer";

const layerStates = Object.freeze({
    playing: "playing",
    ended: "ended",
    loaded: "loaded",
})

const VideoLayers = ({ mediaFiles }) => {

    const [currentPlayIndex, setCurrentPlayIndex] = useState(0)

    const [layer0MediaToPlay, setLayer0MediaToPlay] = useState(null)
    const [layer1MediaToPlay, setLayer1MediaToPlay] = useState(null)
    const [layer0State, setLayer0State] = useState(layerStates.ended)
    const [layer1State, setLayer1State] = useState(layerStates.ended)

    const changeIndex = () => {
        setCurrentPlayIndex(current => current == mediaFiles.length - 1
            ? 0
            : current + 1)
    }

    useEffect(() => {
        if (mediaFiles.length === 0 || layer0MediaToPlay) return
        setLayer0MediaToPlay({media: mediaFiles[currentPlayIndex], rand: performance.now()})
    }, [mediaFiles])

    useEffect(() => {
        const file = mediaFiles[currentPlayIndex]
        
        if (layer0State == layerStates.playing) {
            resetLayer(1)
            setLayer1MediaToPlay({media: mediaFiles[currentPlayIndex], rand: performance.now()})
        }
        else {
            if (layer0MediaToPlay == file) return
            setLayer0MediaToPlay({media: mediaFiles[currentPlayIndex], rand: performance.now()})
        }

    }, [currentPlayIndex])

    const handleOnMediaEnd = (layerIndex) => {

        if (layerIndex == 0) 
            setLayer0State(layerStates.ended)
        else 
            setLayer1State(layerStates.ended)

    }

    const handleOnMediaLoaded = (layerIndex) => {

        if (layerIndex == 0)
            setLayer0State(layerStates.loaded)
        else
            setLayer1State(layerStates.loaded)
    }

    const handleOnPlaying = (layerIndex) => {

        if (layerIndex == 0)
            setLayer0State(layerStates.playing)
        else
            setLayer1State(layerStates.playing)

        if (mediaFiles.length > 1)
            changeIndex()
    }

    const resetLayer = (layerIndex) => {
        if (layerIndex == 0){
            setLayer0State(layerStates.ended)
            setLayer0MediaToPlay(null)
        }
        else{
            setLayer1State(layerStates.ended)
            setLayer1MediaToPlay(null)
        }
    }

    return (
        <div className="videoLayer">
            <MediaPlayer
                layerIndex={0}
                canPlay={layer0State == layerStates.loaded && layer1State == layerStates.ended}
                onMediaEnd={handleOnMediaEnd}
                onMediaLoaded={handleOnMediaLoaded}
                onPlaying={handleOnPlaying}
                loop={mediaFiles.length == 1}
                file={layer0MediaToPlay} />
            <MediaPlayer
                layerIndex={1}
                canPlay={layer1State == layerStates.loaded && layer0State == layerStates.ended && mediaFiles.length > 1}
                onMediaEnd={handleOnMediaEnd}
                onMediaLoaded={handleOnMediaLoaded}
                onPlaying={handleOnPlaying}
                loop={mediaFiles.length == 1}
                file={layer1MediaToPlay} />
        </div>
    );
}

export default VideoLayers;