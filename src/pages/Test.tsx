import styled from "@emotion/styled"
import Item, { ItemProps } from "../json/DemoItem";
import { useEffect } from "react";
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

export const Test = () => {
    //const [userHP, setUserHP] = useState<number>();
    // const sendMessageToRN = () => {
    //   const message = 'Hello from React!';
    //   window.Android?.showToast(message);
    // };

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

    
    // const sendCheckUserHPToAndroid = () => {
    //   try {
    //     const userHP: number = window.Android?.checkUserHP() || 0;
    //     setUserHP(userHP);
    //     const hp = Number(localStorage.getItem("hp"));
    //     localStorage.setItem("hp", (hp-10).toString());
    //   } catch (error) {
    //     console.error("Error: sendCheckUserHPToAndroid"+error)
    //   }
    // }
    useEffect(() => {
      sendMoveToLobbyAndroid();
      console.log("실행 됨");
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
