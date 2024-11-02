import { useState } from "react";
import { useContext } from "react";
import { socketContext } from "../socket";
import { useEffect } from "react";

const useGetSystemDisplays = () => {
   const { emit, isConnected } = useContext(socketContext)
   const [systemDisplays, setSystemDisplays] = useState([])

   const handleOnGetSystemDisplays = (displays) => {
      setSystemDisplays(displays)
   }

   useEffect(() => {
      emit({
         channel: "getSystemDisplays",
         cb: handleOnGetSystemDisplays
      })
   }, [isConnected])

   return ({
      systemDisplays
   })
}

export default useGetSystemDisplays;