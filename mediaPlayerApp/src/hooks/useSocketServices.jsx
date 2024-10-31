import * as services from "../services"

const useSocketServices = (socket) => {

   socket.on("connect", services.handleOnConnect)

}
 
export default useSocketServices;