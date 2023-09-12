import { useEffect, useState } from "react";
import { useTypingEffect2 } from "../hooks"
import { SetUserData } from "../hooks";

//@ts-ignore
interface Window {
    Android?: {
      selectDeathToRevival: () => void | undefined;
    }
}

interface Message {
    type: "talk" | "select";
    state?: "normal";
    text: string;
    animation?: string | null;
    option?: Option[];
    nextProgress?: number;
  }
  
  interface Option {
    name: string;
    nextProgress: number;
  }
  
export const Lobby = () => {
    const [clickCharacter, setClickCharacter] = useState(false);
    
    //const [messages, setMessage] = useState(["안녕하세요?", "다음에 봐요.", "훗"]);
    //const { typedText, startTyping, nextProgress } = useTypingEffect(messages);
    
    const [messages, setMessage] = useState<string>("");
    const [story, setStory] = useState<Message[]>([]);
    const [progress, setProgress] = useState(0);
    const [selectTime, setSelectTiem] = useState(false);
    const { typedText, startTyping } = useTypingEffect2(messages);
    const handleClickCharacter = () => {
        setClickCharacter(true);
        startTyping();     
    }
    const handleClickBG = () => {
        // const hasMoreMessages = nextProgress();
        // if (!hasMoreMessages) {
        //     setClickCharacter(false);
        // }
        console.log(progress);

        if(story[progress+1] === undefined || story[progress]?.nextProgress === -1) {
            setClickCharacter(false);
            return
        }

        if (story[progress+1]?.type === "talk") {
            startTyping();
        } else if (story[progress+1]?.type === "select") {
            setSelectTiem(true);
        }
        
        const nextProgress = story[progress]?.nextProgress;
        if (nextProgress !== undefined) {
            console.log(nextProgress)
            setProgress(nextProgress);
            setMessage(story[nextProgress].text)
        } else {
            setProgress(pre => pre+1);
            setMessage(story[progress+1].text)
        }
    }
    const sendRevivalToAndroid = () => {
        SetUserData();
        try {
          window.Android?.selectDeathToRevival();   
        } catch (error) {
          console.error("Error: sendRevivalToAndroid"+error)
        }
    }
    const clickEvent = (optionNumber: number) => {
        console.log(progress);
        startTyping();
        setSelectTiem(false);
        const nextProgress = story[progress]?.option?.[optionNumber]?.nextProgress || progress + 1;
        if (nextProgress !== undefined) {
            setProgress(nextProgress);
            setMessage(story[nextProgress].text)
        } else {
            setProgress(pre => pre+1);
            setMessage(story[progress+1].text)
        }
    }

    useEffect(() => {
        const message: Message[][] = [
            [
            {type: "talk", state: "normal", text: "안녕", animation: null},
            {type: "select", state: "normal", text: "", option: [{name: "그래 안녕", nextProgress: 2}, {name: "ㅇㅇ", nextProgress: 3}]},
            {type: "talk", state: "normal", text: "반가워", animation: null, nextProgress: 4},
            {type: "talk", state: "normal", text: "뭐래", animation: null},
            {type: "talk", state: "normal", text: "헷", animation: null},
            ],
            [
                {type: "talk", state: "normal", text: "1+1은?", animation: null},
                {type: "select", state: "normal", text: "", option: [{name: "2", nextProgress: 2}, {name: "창문", nextProgress: 3}]},
                {type: "talk", state: "normal", text: "틀렸어 정답은 창문이야.", animation: null, nextProgress: -1},
                {type: "talk", state: "normal", text: "틀렸어 정답은 2이야.", animation: null},
            ],
            [
                {type: "talk", state: "normal", animation: null, text: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세."},
                {type: "talk", state: "normal", animation: null, text: "남산 위에 저 소나무 철갑을 두른 긋 바람 서리 불변함은 우리기상일세 무궁화 삼환천리 화려강산 대한사람 대한으로 길이 보전하세."},
                {type: "talk", state: "normal", animation: null, text: "가을 하능 공활한게 높고 구름없이 밝은 달은 우리 가슴 일편 단심일세. 무궁화 삼천리 화려강산 대한사람 대한으로 길이보전하세."},
                {type: "talk", state: "normal", animation: null, text: "이기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라사랑하세. 무궁화 삼천리 화여강산 대한사람 대한으로 길이보전하세."},
            ],
        ]
        
        const number = Math.floor(Math.random() * message.length);
        setStory(message[number]);
        const textToSet = message[number][progress]?.text;

        if (textToSet && message[number][progress].type === "talk") {
            setMessage(textToSet);
        }
    }, [])

    return (
        <div className="absolute w-screen h-screen bg-[url('https://i.pinimg.com/564x/54/59/cd/5459cdf629146ad9710fdd9dab0a562f.jpg')] bg-no-repeat bg-cover">
            <div className="flex items-center justify-start w-full h-full">
                <img onClick={handleClickCharacter} className="absolute right-0 w-[300px] bottom-10" 
                    src="/img/여성.png"/>
                {clickCharacter ? null :
                <button onClick={sendRevivalToAndroid}className="w-36 h-10 ml-8 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold active:bg-red-500 active:scale-90 duration-150 ease-out">
                    모험 떠나기
                </button>
                }
            </div>
            {clickCharacter ? 
                <div onClick={handleClickBG} className="absolute top-0 z-10 w-screen h-screen">
                    <div className="absolute bottom-0 w-screen h-[400px] bg-gradient-to-b from-transparent to-black"/>
                    <div className="w-full absolute bottom-0 h-[200px] p-6 text-white">
                        <p className="text-xl font-bold">테스트</p>
                        {typedText}
                    </div>
                </div> : null
            }
            {
                selectTime ?
                <div className="absolute top-0 z-20 flex flex-col items-center justify-center w-screen h-screen gap-6"> 
                    {story[progress]?.option?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => clickEvent(index)}
                            className="w-96 p-3.5 bg-gray-100 rounded-xl active:bg-gray-200 active:scale-95 duration-150 ease-out"
                        >
                            {option.name}
                        </button>
                    ))}
                </div> : null
            }
        </div>
    )
}