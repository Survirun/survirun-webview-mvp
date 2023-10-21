import { useEffect, useState } from "react";

export const BattlePage = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        console.log("dddsad");
        window.addEventListener('message', function(event) {
            var receivedData = event.data;
            console.log('받은 메시지:', receivedData);
            setData(receivedData)
        });
    },[])
    
    return(
        <>data: {data}</>
    )
} 