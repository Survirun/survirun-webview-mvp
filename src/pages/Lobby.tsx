import { useState } from "react";
import { useTypingEffect } from "../hooks"

export const Lobby = () => {
    const [clickCharacter, setClickCharacter] = useState(false);
    
    const messages = ["안녕하세요?", "다음에 봐요."];
    const { typedText, startTyping, nextMessage } = useTypingEffect(messages, 50);

    const handleClickCharacter = () => {
        setClickCharacter(true);
        startTyping();
    }
    const handleClickBG = () => {
        const hasMoreMessages = nextMessage();
        if (!hasMoreMessages) {
            setClickCharacter(false);
        }
    }

    return (
        <div className="absolute w-screen h-screen bg-[url('https://i.pinimg.com/564x/54/59/cd/5459cdf629146ad9710fdd9dab0a562f.jpg')] bg-no-repeat bg-cover">
            <div className="flex items-center justify-start w-full h-full">
                <img onClick={handleClickCharacter} className="absolute right-0 w-[300px] bottom-10" 
                    src="/img/여성.png"/>
                {clickCharacter ? null :
                <button className="w-36 h-10 ml-8 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold active:bg-red-500 active:scale-90 duration-150 ease-out">
                    모험 떠나기
                </button>
                }
            </div>
                {clickCharacter ? 
                    <div onClick={handleClickBG} className="absolute top-0 z-10 w-screen h-screen">
                    <div className="absolute bottom-0 w-screen h-[400px] bg-gradient-to-b from-transparent to-black"/>
                    <div className="absolute bottom-0 h-[200px] p-6 text-white">
                            <p className="text-xl font-bold">테스트</p>
                            {typedText}
                        </div>
                    </div> : null
                }
        </div>
    )
}