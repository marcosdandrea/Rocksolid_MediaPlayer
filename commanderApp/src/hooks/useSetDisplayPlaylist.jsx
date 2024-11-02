import { useContext } from "react";
import { socketContext } from "../socket";
import { useState } from "react";

const useSetDisplayPlaylist = (displayID) => {
    
    const [isFetching, setIsFetching] = useState(false)
    const {emit} = useContext(socketContext)
    
    const handleOnSetCompleted = () => {
        setIsFetching(false)
    }

    const updateDisplayPlaylist = (playlist) => {
        setIsFetching(true)
        emit({
            channel: "setDisplayPlaylist",
            value: {displayID, playlist},
            cb: handleOnSetCompleted
        })
    }

    return({
        isFetching,
        updateDisplayPlaylist
    })

}
 
export default useSetDisplayPlaylist;