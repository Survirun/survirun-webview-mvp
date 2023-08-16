import { useEffect } from "react"

//@ts-ignore
interface Window {
    Android?: {
        zombie: (zombieNumber: number) => void | undefined;
    }
}

export const Zombie = () => {
    const SendAndroidZombie = (optionZombie: number) => {
        try{
            window.Android?.zombie(optionZombie);
            console.log("실행 됨")
        } catch(e) {
            console.error("Error: window.Android.zombie()")
            console.error(e);
        }
    }
    useEffect(() => {
        SendAndroidZombie(4);
    }, [])
    return(
        <div>좀비 테스트</div>
    )
}