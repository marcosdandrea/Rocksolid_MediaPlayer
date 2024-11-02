import { useState } from "react";
import { useContext } from "react";
import { socketContext } from "../socket";
import { useEffect } from "react";

const useGetAllMediaFiles = () => {
   const { emit, isConnected } = useContext(socketContext)
   const [mediaFiles, setMediaFiles] = useState([])

   const handleOnGetMediaFiles = (files) => {
      setMediaFiles(files)
   }

   const fetchMedia = () => {
      emit({
         channel: "getAllMediaFiles",
         cb: handleOnGetMediaFiles
      })
   }

   useEffect(fetchMedia, [isConnected])

   return ({
      mediaFiles,
      updateMedia: fetchMedia
   })
}

export default useGetAllMediaFiles;