import { useState } from "react";
import "./style.css"
import { useEffect } from "react";
import Text from "../Text";
import { forwardRef } from "react";

const MediaItem = forwardRef((props, ref) => {

    const host = window.location.hostname
    const [mediaFilePath, setMediaFilePath] = useState("")

    useEffect(() => {
        if (!props?.filename) return
        setMediaFilePath(`http://${host}:3000/media/${props.filename}`)
    }, [mediaFilePath, props])

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", props.filename);
    }

    return (
        <div
            ref={ref}
            draggable
            onDragStart={handleDragStart}
            className="mediaItem">
            <video src={mediaFilePath} />
            <div className="footer">
                <Text color={"var(--cardBackground)"}>
                    {props.filename}
                </Text>
                <button onClick={props.onDelete}>
                    Delete
                </button>
            </div>

        </div>);
})

export default MediaItem;