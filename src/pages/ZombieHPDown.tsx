import { useEffect } from "react"

export const ZombieHPDown = () => {
    useEffect(() => {
        const hp = Number(localStorage.getItem("hp"));
        localStorage.setItem("hp", (hp-10).toString());
    }, [])

    return(
        <></>
    )
}