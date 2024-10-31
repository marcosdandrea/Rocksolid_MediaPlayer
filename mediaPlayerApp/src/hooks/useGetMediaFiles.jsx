import { useContext, useEffect, useState } from "react";
import { socketContext } from "../socket";

const useGetMediaFiles = (displayID) => {

    const [mediaFiles, setMediaFiles] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const {emit, isConnected} = useContext(socketContext)

    const handleOnGetMediaFiles = (data) => {
        setMediaFiles(data)
        setIsFetching(false)
    }

    const getMediaFiles = () => {
        setIsFetching(true)
        emit({
            channel: "getMediaFiles",
            value: displayID,
            cb: handleOnGetMediaFiles
        })
    }

    useEffect(()=>{
        if(!isConnected) return;
        getMediaFiles()
    },[isConnected])

    return ({
        isFetching,
        mediaFiles,
        updateFiles: getMediaFiles,
    })


}
 
export default useGetMediaFiles;