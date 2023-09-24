import { useEffect, useState } from "react";
import { io } from "socket.io-client";
//@ts-ignore
interface Window {
  Android?: {
    showToast: (message: string) => void | undefined;
    getItem: () => void | undefined;
    zombie: () => void | undefined;
    checkUserHP: () => number;
    moveToLobby: ()=> void | undefined;
  }
}



export const Test = () => {
  const SERVER_URL = 'http://survirun-single-socket-3d68a52dcb76.herokuapp.com';
  
  const [userData, setUserData] = useState({
    hp: 0,
    hungry: 0,
    maxHp: 0,
    maxHungry: 0,
  });

    const [socket, setSocket] = useState(io(SERVER_URL));
    console.log(socket)

    const userId = 'test';
    const clientType = 2; 

    socket.on('changedData', (data) => {
      setUserData(data);
      console.log(data);
    });

    const startGame = () => {
      socket.emit('start', { userId, clientType });
    };

    const handleClickRest = () => {
      socket.emit('reset');
    }

    const handleClickHP = () => {
      socket.emit('updateHp', {
        value: -10
      });
    }


    useEffect(() => {
      console.log("실행 됨");

      sendMoveToLobbyAndroid();
      
      startGame();
      
    },[])
    const sendMoveToLobbyAndroid = () => {
        try {
          window.Android?.moveToLobby();   
        } catch (error) {
          console.error("Error: moveToLobby"+error)
        }
    }
    

    // const [story, setStory] = useState<string[]>(["안녕"]);
    // const [storyIndex, setStoryIndex] = useState<number>(0);
    // const [choices, setChoices] = useState<string[]>(["나도 안녕"]);
  
    // const handleNextStory = () => {
    //   if (storyIndex < story.length - 1) {
    //     // 다음 스토리로 이동합니다.
    //     setStoryIndex(storyIndex + 1);
    //   } else {
    //     // 다음 스토리를 추가합니다.
    //     if (storyIndex === 0) {
    //       setStory([...story, "반가워"]);
    //       setChoices(["그래"]);
    //     } else if (storyIndex === 1) {
    //       setStory([...story, "히히"]);
    //       setChoices([]);
    //     }
    //     setStoryIndex(storyIndex + 1);
    //   }
    // };
  
    // const getImagePath = (text: string) => `/img/${text}.jpg`;
  
    return(
        <div className="absolute w-screen h-screen">
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={startGame}>게임 시작</button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={handleClickRest}>초기화</button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={handleClickHP}>hp 보내기</button>
            <p>체력 (HP): {userData.hp}</p>
            <p>공복 (Hungry): {userData.hungry}</p>
            <p>최대 체력 (Max HP): {userData.maxHp}</p>
            <p>최대 공복 (Max Hungry): {userData.maxHungry}</p>
        </div>
    //     <div className="flex flex-col items-start h-screen pl-4">
    //   {story.map((paragraph, index) => (
    //     <div key={index} className="text-left">
    //       <img
    //         src={getImagePath(paragraph)}
    //         alt={`${paragraph} 이미지`}
    //         className="mx-auto my-4 w-[300px]"
    //       />
    //       <p>{paragraph}</p>
    //     </div>
    //   ))}
    //   {choices.length > 0 && (
    //     <button
    //       onClick={handleNextStory}
    //       className="self-stretch p-3.5 bg-gray-100 rounded-xl inline-flex active:bg-gray-200 active:scale-95 duration-150 ease-out mt-auto"
    //     >
    //       {choices[0]}
    //     </button>
    //   )}
    // </div>
    )
}
