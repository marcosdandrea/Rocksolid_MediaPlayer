import { useEffect, useState } from "react";

const useGetDisplayID = () => {
    const [displayID, setDisplayID] = useState(null) 
    
    useEffect(() => {
        const url = window.location.href.split("/")
        setDisplayID(url.pop())
    }, [])

    return {displayID}
}
 
export default useGetDisplayID;