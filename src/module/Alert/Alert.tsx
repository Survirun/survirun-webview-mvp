import styled from "@emotion/styled";
import { AlertState } from "./AlertDialog";

export const Alert = ({message, leftText, rightText, onClickLeft, onClickRight}: AlertState) => {
    return(
        <Frame>
            <Background/>
            <AlertStyle>
                <AlertMessage>{message}</AlertMessage>
                <AlertButtons>
                    <Button onClick={onClickLeft}>{leftText}</Button>
                    <Button onClick={onClickRight}>{rightText}</Button>
                </AlertButtons>
            </AlertStyle>
        </Frame>
    );
}

const Frame = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`
const AlertStyle = styled.div`
    background-color: white;
    border-radius: 8px;
    width: 250px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 11;
`
const AlertMessage = styled.h2`
    margin-bottom: 20px;
    font-size: 16px;
`
const AlertButtons = styled.div`
    
`
const Button = styled.button`
    width: 50%;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-of-type{
        background-color: #ccc;
    }
    &:last-child{
        background-color: #007bff;
        color: white;
    }
    &:hover{
        opacity: 0.8;
    }
`