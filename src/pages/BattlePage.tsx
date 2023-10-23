import { useEffect, useState } from "react";

export const BattlePage = () => {
    const [data, setData] = useState();
    useEffect(() => {
        window.addEventListener("message", function (e) {
            alert(e.data.distance)
            setData(e.data.distance);
        });
    }, []);

    
    
    return(
        <>data: {data}</>
    )
} 