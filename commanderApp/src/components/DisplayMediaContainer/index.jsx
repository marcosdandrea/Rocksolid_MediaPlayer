import "./style.css"
import { v4 as uuidv4 } from "uuid"
import SortableList, { SortableItem } from 'react-easy-sort'
import {arrayMoveImmutable} from 'array-move';
import useGetMediaFiles from '../../hooks/useGetMediaFiles';
import MediaItem from '../MediaItem';
import { useState } from 'react';
import { useEffect } from 'react';
import useSetDisplayPlaylist from "../../hooks/useSetDisplayPlaylist";

const DisplayMediaContainer = ({ displayID }) => {

    const [files, setFiles] = useState([])

    const { mediaFiles, updateFiles } = useGetMediaFiles(displayID)
    const { updateDisplayPlaylist} = useSetDisplayPlaylist(displayID)

    useEffect(() => {
        setFiles(mediaFiles)
    }, [mediaFiles])

    const onSortEnd = (oldIndex, newIndex) => {
        const newFiles = arrayMoveImmutable(files, oldIndex, newIndex)
        setFiles(newFiles)
        updateDisplayPlaylist(newFiles)
    }

    const handleOnDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.getData("text/plain")
        if (!file) return
        setFiles(prev => [...prev, file])
        updateDisplayPlaylist([...files, file])
    }

    const handleDragOver = (e) => {
        e.preventDefault(); 
      };

    const handleOnDeleteItem = (index) => {
        files.splice(index, 1)
        setFiles(files)
        updateDisplayPlaylist(files)
    }

    return (
        <SortableList
            onSortEnd={onSortEnd}
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            className="mediaContainer"
            draggedItemClassName="dragged">
            {files.map((filename, index) => (
                <SortableItem key={`${filename}_${uuidv4()}`}>
                    <MediaItem
                        onDelete={()=>handleOnDeleteItem(index)}
                        enableDelete={true}
                        key={`${filename}_${uuidv4()}`}
                        filename={filename}/>
                </SortableItem>
            ))}
        </SortableList>
    );
}

export default DisplayMediaContainer;