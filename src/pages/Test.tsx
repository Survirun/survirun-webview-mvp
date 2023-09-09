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
  }
}

const SendAndroidZombie = () => {
  try {
    for(let i=0; i<4; i++){
      window.Android?.zombie();
    }
  } catch (e) {
    console.error("Error: window.Android.zombie()");
    console.error(e);
  }
};

export const Test = () => {
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
    useEffect(() => {
      SendAndroidZombie();
      console.log("실행 됨");
    },[])

    return(
        <Frame>
            <Button onClick={sendGetItemToAndroid}>도끼 획득</Button>
            <Button onClick={sendLoseItemToAndroid}>도끼 삭제</Button>
            <Button onClick={SendAndroidZombie}>좀비 4마리 생성</Button>
        </Frame>
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
