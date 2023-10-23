import { useEffect, useState } from "react";

export const BattlePage = () => {
    const [data, setData] = useState<number>();
    useEffect(() => {
        setInterval(() => {
            window.addEventListener('message', (event) => {
                console.log(event)
                setData(event.data)
                console.log('자식 페이지에서 메시지 받음: ' + event.data);
            });
        }, 100)
    },[])

    
    
    return(
        <>data: {data}</>
    )
} 