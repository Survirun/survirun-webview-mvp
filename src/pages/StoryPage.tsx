import { useState } from "react"
import styled from "@emotion/styled"
import StoryData from '../json/DemoStory.json'

const User = styled.div`
    position: relative;
    margin: 5px 30px;
`
const Item = styled.div`
    position: block;
`
const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
`
const StroyTextBox = styled.div`
    color: #000;
    margin: 5px 10px;
    height: 500px;
`
const Title = styled.h2`
    font-size: 28px;
`
const StoryText = styled.p`
    font-size: 16px;
`
const SelectBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100px;
`
const SelectButton = styled.button`
    position: block;
    width: 90%;
    height: 50px;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid #000;
    margin: 0 20px;
    font-weight: 700;
`

export const StoryPage = () => {
    const [storyNumber, setStoryNumber] = useState(0)
    const optionNumber = StoryData.storys[storyNumber].options.length;
    const [userItem, setUserItem] = useState<string[]>(["야구공"]);
    const [userHealth, setUserHealth] = useState(3);
    const [userMoney, setUserMoney] = useState(3);
    const [userCharateristic, setUserCharacteristic] = useState<string[]>([""]);

    const ClickNextStory = (optionNumber: number) => {
        const [target, plusOrMineus, item] = StoryData.storys[storyNumber].options[optionNumber].result.split("_")
        switch (target) {
            case "health": 
                (plusOrMineus === "+") ?
                    setUserHealth(pre => pre+Number(item)) :
                    setUserHealth(pre => pre-Number(item));
                break;
            case "item": 
                (plusOrMineus === "+") ?
                    setUserItem(pre => [...pre, item]) :
                    (userItem.indexOf(item) > -1) && setUserItem(pre => pre.splice(userItem.indexOf(item), 1))
                break;
            case "money": 
                (plusOrMineus === "+") ?
                    setUserMoney(pre => pre+Number(item)) :
                    setUserMoney(pre => pre-Number(item));
                break;
            case "charateristic": 
                (plusOrMineus === "+") ?
                setUserCharacteristic(pre => [...pre, item]) :
                    (userCharateristic.indexOf(item) > -1) && setUserCharacteristic(pre => pre.splice(userItem.indexOf(item), 1))
                break;
            default: console.log("Error");
        }
        setStoryNumber(pre => ((StoryData.storys[pre+1] === undefined) ? pre=0 : pre+1));
    }

    const ButtonDisable = (condition: string | null):boolean => {
        if(condition === null)
            return false;
        const [target, item, count] = condition.split('_');
        console.log(item)
        let result = false;
        switch (target) {
            case "health": 
                (userHealth >= Number(count)) ? 
                    result = false :
                    result = true;
                break;
            case "item": 
                (userItem.indexOf(item) > -1) ? 
                    result = false :
                    result = true;
                break;
            case "money": 
                (userMoney >= Number(count)) ? 
                    result = false :
                    result = true;
                break;
            case "charateristic": 
                (userCharateristic.indexOf(item) > -1) ? 
                    result = false :
                    result = true;
                break;
            default: console.log("Error");
        }
        return result;
    }

    return(
        <Frame>
            <User>
                <Item>체력: {userHealth}</Item>
                <Item>돈: {userMoney}</Item>
                <Item>아이템: {userItem.join(" ")}</Item>
                <Item>특성: {userCharateristic.join(" ")}</Item>
            </User>
            <StroyTextBox>
                <Title>{StoryData.storys[storyNumber].storyTitle}</Title>
                <StoryText>{StoryData.storys[storyNumber].story}</StoryText>
            </StroyTextBox>
            <SelectBox>
                {Array.from({ length: optionNumber}).map((_, index) => (
                    <SelectButton onClick={() => ClickNextStory(index)} key={index} disabled={ButtonDisable(StoryData.storys[storyNumber].options[index].condition)}>
                        {StoryData.storys[storyNumber].options[index].name}
                        {((StoryData.storys[storyNumber].options[index].condition) !== null) && " "+(StoryData.storys[storyNumber].options[index].condition)+"필요"}
                    </SelectButton>
                ))}
            </SelectBox>
        </Frame>
    )
}