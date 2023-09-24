import { useState } from "react";
import { io } from "socket.io-client";

export function useSocket () {
    const [socket, _] = useState(io(import.meta.env.VITE_SERVER_URL || ""));
    
    return socket 
}

