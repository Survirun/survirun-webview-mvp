import styled from "@emotion/styled"
import Item, { ItemProps } from "../json/DemoItem";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
//@ts-ignore
interface Window {
  Android?: {
    showToast: (message: string) => void | undefined;
    getItem: () => void | undefined;
    userGetItem: (item: ItemProps[string]) => void | undefined;
    userLoseItem: (item: ItemProps[string]) => void | undefined;
    zombie: () => void | undefined;
    checkUserHP: () => number;
    moveToLobby: ()=> void | undefined;
  }
}

const SERVER_URL = 'http://survirun-single-socket-3d68a52dcb76.herokuapp.com';

export const Test = () => {
  const [userData, setUserData] = useState({
    hp: 10,
    hungry: 10,
    maxHp: 10,
    maxHungry: 10,
  });
    //const [userHP, setUserHP] = useState<number>();
    // const sendMessageToRN = () => {
    //   const message = 'Hello from React!';
    //   window.Android?.showToast(message);
    // };

    const socket = io(SERVER_URL);

    const userId = 'test'; // 원하는 유저 고유 값
    const clientType = 2; // 클라이언트 종류 (상수에 따라 수정 필요)

    const startGame = () => {
      socket.emit('start', { userId, clientType });
      socket.on('changedData', (data) => {
        setUserData(data);
      });
    };

    const handleClick = () => {
      socket.on('changedData', (data) => {
        setUserData(data);
      });
    }

    const handleClickRest = () => {
      socket.emit('reset');
      socket.on('changedData', (data) => {
        setUserData(data);
      });
    }

    const handleClickHP = () => {
      socket.emit('updateHp', {
        value: 12
      }
      );
    }
  

  const sendGetItemToAndroid = () => {
    try {
      window.Android?.userGetItem(Item["도끼"]);   
    } catch (error) {
      console.error("Error: sendHPDownToAndroid"+error)
    }
  }
  const sendLoseItemToAndroid = () => {
    try {
      window.Android?.userLoseItem(Item["도끼"]);   
    } catch (error) {
      console.error("Error: sendHPDownToAndroid"+error)
    }
  }

    useEffect(() => {
      console.log("실행 됨");

      sendMoveToLobbyAndroid();
      

      
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
        <Frame>
            <Button onClick={sendGetItemToAndroid}>도끼 획득</Button>
            <Button onClick={sendLoseItemToAndroid}>도끼 삭제</Button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={startGame}>게임 시작</button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={handleClickRest}>초기화</button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={handleClick}>값 수신</button>
            <button className="p-3 font-bold text-white rounded-3xl bg-slate-400 active:scale-95 active:opacity-80" onClick={handleClickHP}>hp 보내기</button>
            <p>체력 (HP): {userData.hp}</p>
            <p>공복 (Hungry): {userData.hungry}</p>
            <p>최대 체력 (Max HP): {userData.maxHp}</p>
            <p>최대 공복 (Max Hungry): {userData.maxHungry}</p>
        </Frame>
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

const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
`

const Button = styled.button`
  position: block;
  width: 100px;
  height: 50px;
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
  background-color: #ff5f5f;
  color: #fff;
  border-radius: 60px;
  text-align: center;
  font-size: 20px;
`
