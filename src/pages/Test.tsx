import styled from "@emotion/styled"
import Item, { ItemProps } from "../json/DemoItem";
//@ts-ignore
interface Window {
  Android?: {
    showToast: (message: string) => void | undefined;
    getItem: () => void | undefined;
    userHPUp: (num: number) => void | undefined;
    userHPDown: (num: number) => void | undefined;
    userGetItem: (item: ItemProps[string]) => void | undefined;
    userLoseItem: (item: ItemProps[string]) => void | undefined;
  }
}
  
declare var Android: any;

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

export const Test = () => {
    // const sendMessageToRN = () => {
    //   const message = 'Hello from React!';
    //   window.Android?.showToast(message);
    // };

    const sendHPUpToAndroid = () => {
      try {
        window.Android?.userHPUp(10);   
      } catch (error) {
        console.error("Error: sendHPUpToAndroid"+error)
      }
    }
    const sendHPDownToAndroid = () => {
      try {
        window.Android?.userHPDown(10);   
      } catch (error) {
        console.error("Error: sendHPDownToAndroid"+error)
      }
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

    
    // // 웹뷰에서 메시지 수신 시 처리
    // useEffect(() => {
    //   const handleRNMessage = (event: MessageEvent) => {
    //     const message = event.data;
    //     console.log("RN에서 받은 메세지: "+ message);
    //     setMessageFromRN(message);
    //   };
  
    //   // 이벤트 리스너 등록
    //   window.addEventListener('message', handleRNMessage);
      
    //   // 언마운트 시 이벤트 리스너 제거
    //   return () => {
    //     window.removeEventListener('message', handleRNMessage);
    //   };
    // }, [])

    return(
        <Frame>
            <Button onClick={sendHPUpToAndroid}>HP 10 올리기</Button>
            <Button onClick={sendHPDownToAndroid}>HP 10 내리기</Button>
            <Button onClick={sendGetItemToAndroid}>도끼 획득</Button>
            <Button onClick={sendLoseItemToAndroid}>도끼 삭제</Button>
        </Frame>
    )
}