import { useEffect, useState } from "react";
import styled from "@emotion/styled"

//@ts-ignore
declare global {
    interface Window {
      Andriod?: {
        postMessage: (message: string) => void;
      },
      ReactToAndroidBridge?: {
        postMessage: (message: string) => void;
      },
      ReactNativeWebView?: {
        postMessage: (message: string) => void;
      }
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
  const [messageFromRN, setMessageFromRN] = useState('Test');
  
  const sendMessageToRN = () => {
    const message = 'Hello from React!';
    window.ReactNativeWebView?.postMessage(message);
  };
    
    // 웹뷰에서 메시지 수신 시 처리
    useEffect(() => {
      const handleRNMessage = (event: MessageEvent) => {
        const message = event.data;
        console.log("RN에서 받은 메세지: "+ message);
        setMessageFromRN(message);
      };
  
      // 이벤트 리스너 등록
      window.addEventListener('message', handleRNMessage);
  
      // 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener('message', handleRNMessage);
      };
    }, [])

    return(
        <Frame>
            <Button onClick={sendMessageToRN}>Test</Button>
            <div>{messageFromRN}</div>
        </Frame>
    )
}