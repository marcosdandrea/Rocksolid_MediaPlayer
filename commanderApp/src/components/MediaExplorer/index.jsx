import { useState } from "react";
import useGetAllMediaFiles from "../../hooks/useGetAllMediaFiles";
import usePostMediaFile from "../../hooks/usePostMediaFile";
import MediaItem from "../MediaItem";
import "./style.css"
import { useEffect } from "react";
import useDeleteMediaFile from "../../hooks/useDeleteMediaFile";

const MediaExplorer = () => {

    const {mediaFiles, updateMedia} = useGetAllMediaFiles()
    const {postMediaFile, isPosting, failed} = usePostMediaFile()
    const {deleteMediaFile, success} = useDeleteMediaFile()

    useEffect(()=>{
        if (!failed && !isPosting && success) 
            updateMedia()

    },[isPosting, failed, success])

    const handleOnPostMediafile = (e) => {
        const file = e.target.files[0]
        postMediaFile(file)
    }

    const handleOnDelete = (filename) => {
        deleteMediaFile(filename)
    }

    return ( 
    <div className="mediaExplorer">
        <div>
            <input 
                type="file" 
                accept=".webm .mp4"
                onChange={handleOnPostMediafile}/>
        </div>
        <div className="fileList">
        {
            mediaFiles.map (fileName => 
                <MediaItem 
                    onDelete={()=>handleOnDelete(fileName)}
                    key={fileName}
                    filename={fileName}/>)
        }
        </div>
    </div> );
}
 
export default MediaExplorer;