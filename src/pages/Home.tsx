import styled from "@emotion/styled"
import { Link } from "react-router-dom";

const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
`

const Survirun = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -120px;
    color: #000;
    font-size: 64px;
`

const Button = styled.button`
  position: absolute;
  width: 100px;
  height: 50px;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -25px;
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
  background-color: #606060;
  color: #fff;
  border-radius: 60px;
  text-align: center;
  font-size: 24px;
`

const LinkStyle = styled(Link)({
    color: "inherit",
    textDecoration: "none"
})

export const Home = () => {
    //@ts-ignore
    function handleButtonClick() {
        // 웹뷰 인터페이스를 통해 네이티브 코드 호출
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('Hello from React!');
        }
    }

    return(
        <Frame>
            <Survirun>Survirun</Survirun>
            <Button onClick={handleButtonClick}><LinkStyle to="/story">Start</LinkStyle></Button>
        </Frame>
    )
}