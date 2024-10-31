import { useEffect, useState } from "react";

const useGetDisplayID = () => {
    const [displayID, setDisplayID] = useState(null) 
    
    useEffect(() => {
        setDisplayID(window.location.pathname.replaceAll("/", ""))
    }, [])

    return {displayID}
}
 
export default useGetDisplayID;