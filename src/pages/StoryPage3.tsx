import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";

//Demo Data
//import StoryData from '../json/DemoStory4.json';
import { jsonOption } from "../json/DemoOption";
import { jsonStory } from '../json/DemoStory';

import ItemData from '../json/DemoItem.json';
import CharateristicData from '../json/DemoCharateristic.json';

//@ts-ignore
interface Window { 
    Android?: {
        webViewIsVisible: () => void | undefined;
        zombie: (zombieNumber: number) => void | undefined;
    }
}

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
const StoryTextBox = styled.div`
    color: #000;
    margin: 5px 10px;
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
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
const GetItemBox = styled.div`
    position: block;
    width: 90%;
    height: 50px;
    background-color: #fff;
    border: none;
    border: 1px solid #000;
    margin: 0 10px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StoryPage3 = () => {
    const [storyNumber, setStoryNumber] = useState<null | number>(null);
    const [progressNumber, setProgressNumber] = useState<null | number>(null);
    const [storyTitle, setStoryTitle] = useState("");
    const [storyOptionCount, setStoryOptionCount] = useState(0);
    const [storyParts, setStoryParts] = useState(1);
    const [storyOptionStory,setStoryOptionStory] = useState<string[]>([]);
    const [storyOptionNum, setStoryOptionNum] = useState<number[]>([]);

    const [userHp, setUserHp] = useState(0);
    const [userMoney, setUserMoney] = useState(0);
    const [userItem, setUserItem] = useState<string[]>([]);
    const [userCharateristic, setUserCharateristic] = useState<string[]>([]);

    const [story, setStory] = useState<JSX.Element[]>([]);

    const SetUserData = () => {
        try {
            localStorage.setItem('hp', "3");
            localStorage.setItem('money', "3");
            localStorage.setItem('item', JSON.stringify([]));
            localStorage.setItem('charateristic', JSON.stringify(["위협"]));
            localStorage.setItem('readAbleStory', JSON.stringify([]));
            localStorage.setItem('readStory', JSON.stringify([]));
            localStorage.setItem('storyParts', "1");
            localStorage.setItem('userData', JSON.stringify({userItem: []}));
            GetUserData();  //나중에 지우기
        } catch(e) {
            console.error("Error: SetUserData()")
            console.error(e);
        }
    }
    const GetRanDomStoryNumber = () => {
        try {
           setStory([]);
            let number = Math.floor(Math.random() * jsonStory[storyParts].length);
            let storyOpenCheck = jsonStory[storyParts][number].addition?.open;
            let storyOnce = jsonStory[storyParts][number].addition?.once;
            const readAbleStory = JSON.parse(localStorage.getItem('readAbleStory') || '[]');
            const readStory = JSON.parse(localStorage.getItem('readStory') || '[]');
            
            while(!storyOpenCheck && !(readAbleStory.includes(number + 1)) || (storyOnce === true && readStory.includes(number + 1))) {
                number = Math.floor(Math.random() * jsonStory[storyParts].length);
                storyOpenCheck = jsonStory[storyParts][number].addition?.open;
                storyOnce = jsonStory[storyParts][number].addition?.once;
            };

            setStoryNumber(number)
            setProgressNumber(0);
        } catch(e) {
            console.error("Error: GetRanDomStoryNumber()")
            console.error(e);
        }
    }
    const GetStoryData = () => {
        try {
            if(storyNumber === null || progressNumber === null) {
                return;
            }
            const existingArray: number[] = JSON.parse(localStorage.getItem('readStory') || '[]');
            const isStoryNumberExists = existingArray.some((item) => item === storyNumber);

            if (!isStoryNumberExists) {
                existingArray.push(storyNumber);
                localStorage.setItem('readStory', JSON.stringify(existingArray));
            }
            
            setStoryTitle(jsonStory[storyParts][storyNumber].storyTitle);
            setStoryOptionNum(jsonStory[storyParts][storyNumber].progressStory[progressNumber].optionNumber.map(option => Number(option.split('-')[1])-1));
            setStoryOptionStory(jsonStory[storyParts][storyNumber].progressStory[progressNumber].optionNumber.map(option => option.split('-')[0]))
            setStoryOptionCount(jsonStory[storyParts][storyNumber].progressStory[progressNumber].optionNumber.length);
            const storyList = [...story];
            const keyValue = storyNumber*100+progressNumber
            storyList.push(<StoryText key={keyValue}>{jsonStory[storyParts][storyNumber].progressStory[progressNumber].storyText}</StoryText>);
            setStory(storyList)
        } catch(e) {
            console.error("Error: GetStoryData()")
            console.error(e);
        }
    }
    const GetUserData = () => {
        try {
            const hp = Number(localStorage.getItem('hp'));
            setUserHp(hp)
            const money = Number(localStorage.getItem('money'));
            setUserMoney(money);
            const item = localStorage.getItem('item');
            setUserItem(item ? JSON.parse(item) : []);
            const charateristic = localStorage.getItem('charateristic');
            setUserCharateristic(charateristic ? JSON.parse(charateristic) : [])
        } catch(e) {
            console.error("Error: GetUserData()");
            console.error(e)
        }
    }
    const ButtonOptionName = (optionNumber: number) => {
        try {
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }

            const optionName = option.text;
            const optionCondition = option.addition.condition;

            let text = optionName;
    
            if(optionCondition === undefined || optionCondition === null) {
                return text;
            }
            text += " - "
            optionCondition.map((condition, index) => {
                (condition.kind === "item") ?
                    (text = text +((index === 0) ? " " : ", ")+ ItemData.items[Number(condition.number)-1].name) :
                    (text = text +((index === 0) ? " " : ", ")+ CharateristicData.charaters[Number(condition.number)-1].name);
            })
            return (text+" 필요")
        } catch(e) {
            console.error("Error: ButtonOptionName()");
            console.error(e)
        }
    }
    const ButtonDisable = (optionNumber: number) => {
        try {
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }
            const optionCondition = option.addition.condition;

            if(optionCondition === undefined || optionCondition === null)
                return false;
            
            let result = false;

            const MoneyDisable = (num: number) => {
                return (userMoney >= num) ?
                    false :
                    true;
            }
            const ItemDisable = (num: number) => {
                const itemName = ItemData.items[num-1].name;
                return (userItem.indexOf(itemName) > -1) ?
                    result = false :
                    result = true;
            }
            const CharateristicDisable = (num: number) => {
                const charateristicName = CharateristicData.charaters[num-1].name;
                return (userCharateristic.indexOf(charateristicName) > -1) ?
                    result = false :
                    result = true;
            }
            optionCondition.map((condition) => {
                switch(condition.kind) {
                    case "money":
                        result = result || MoneyDisable(condition.number)
                        break;
                    case "item":
                        result = result || ItemDisable(condition.number)
                        break;
                    case "charateristic":
                        result = result || CharateristicDisable(condition.number)
                        break;
                    default: console.log("Error: ButtonDisable condition.kind undifinded");
                }
            })
            return result;
        } catch(e) {
            console.error("Error: ButtonDisable()")
            console.error(e);
        }
    }
    const ResultCheck = (optionNumber: number) => {
        try {
            if(storyNumber === null || progressNumber === null) {
                return
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }

            const optionResult = option.addition.result;
    
            if(optionResult === null || optionResult === undefined) {
                return
            }
            const HPResult = (getOrLose: string, num: number) => {
                const hp = Number(localStorage.getItem('hp'));
                (getOrLose === "get") ? 
                    localStorage.setItem("hp", (hp+num).toString()) :
                    localStorage.setItem("hp", (hp-num).toString());
            }
            const MoneyResult = (getOrLose: string, num: number) => {
                const money = Number(localStorage.getItem("money"));
                (getOrLose === "get") ? 
                    localStorage.setItem("money", (money+num).toString()) :
                    localStorage.setItem("money", (money-num).toString());
            }
            const ItemResult = (getOrLose: string, num: number) => {
                const existingArray = JSON.parse(localStorage.getItem('item') || '[]');
                const itemName = ItemData.items[num-1].name;
                (getOrLose === "get") ? 
                    localStorage.setItem('item', JSON.stringify([...existingArray, itemName])) :
                    (userItem.indexOf(itemName) > -1) && localStorage.setItem('item', JSON.stringify(existingArray.filter((item: string) => item !== itemName)));
            }
            const CharateristicResult = (getOrLose: string, num: number) => {
                const existingArray = JSON.parse(localStorage.getItem('charateristic') || '[]');
                const charaterName = CharateristicData.charaters[num-1].name;
                (getOrLose === "get") ? 
                    localStorage.setItem('charateristic', JSON.stringify([...existingArray, charaterName])) :
                    (userCharateristic.indexOf(charaterName) > -1) && localStorage.setItem('charateristic', JSON.stringify(existingArray.filter((item: string) => item !== charaterName)));
            }
            optionResult.map((result) => {
                switch(result.kind) {
                    case "hp":
                        HPResult(result.getOrLose, result.number);
                        break;
                    case "money":
                        MoneyResult(result.getOrLose, result.number)
                        break;
                    case "item":
                        ItemResult(result.getOrLose, result.number)
                        break;
                    case "charateristic":
                        CharateristicResult(result.getOrLose, result.number)
                        break;
                    default: console.log("Error: ResultCheck result.kind undifinded");
                }
            })
        } catch(e) {
            console.error("Error: ResultCheck()")
            console.error(e);
        }
    }
    const NextStory = (optionNumber: number) => {
        try{
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option;
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }

            if(option.addition.nextProgress === null) {
                SendAndroidEndStory();
                NextStoryPart();
                GetRanDomStoryNumber();
            } else {
                const optionNextStory = Number(option.addition.nextProgress?.split('-')[1]);
                setProgressNumber(optionNextStory-1);
            }

            const optionZombie = option.addition.zombie;
            if(optionZombie === null || optionZombie === undefined){
                return
            } else {
                SendAndroidZombie(optionZombie);
            }
        } catch(e) {
            console.error("Error: NextStory()");
            console.error(e);
        }
    }
    const SendAndroidEndStory = () => {
        try{
            return window.Android?.webViewIsVisible();
        } catch(e) {
            console.error("Error: window.Android.webViewIsVisible()")
            console.error(e);
        }
    }
    const SendAndroidZombie = (optionZombie: number) => {
        try{
            console.log("")
            window.Android?.zombie(optionZombie);
        } catch(e) {
            console.error("Error: window.Android.zombie()")
            console.error(e);
        }
    }
    const AddItemStory = (optionNumber: number) => {
        try{
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }

            const optionResult = option.addition.result;
            if(optionResult === null || optionResult === undefined) {
                return
            }
            let list = "";
            optionResult.map((result, i) => {
                const optionGetOrLose = result.getOrLose;
                const optionNumber = result.number;
                const optionKind = result.kind;

                if(i > 0) {
                    list += ", "
                }
                switch(optionGetOrLose) {
                    case "get":
                        list += "+ ";
                        break;
                    case "lose":
                        list += "- ";
                        break;
                    default: console.error("Error: AddItemStory() unfinded optionGetOrLose");
                }
                switch(optionKind) {
                    case "hp":
                        list += "체력: ";
                        break;
                    case "money":
                        list += "돈: ";
                        break;
                    case "item":
                        list += "아아템: ";
                        break;
                    case "charateristic":
                        list += "특성: ";
                        break;
                    default: console.error("Error: AddItemStory() unfinded optionKind");
                }
                switch(optionKind) {
                    case "hp":
                        const hp = optionNumber.toString(10);
                        list += hp;
                        break;
                    case "money":
                        const money = optionNumber.toString(10);
                        list += money;
                        break;
                    case "item":
                        if (optionNumber - 1 >= 0 && optionNumber - 1 < ItemData.items.length) {
                            const itemName = ItemData.items[optionNumber - 1].name;
                            list += itemName;
                        } else {
                            console.error("Error: AddItemStory() invalid item optionNumber");
                        }
                        break;
                    case "charateristic":
                        if (optionNumber - 1 >= 0 && optionNumber - 1 < CharateristicData.charaters.length) {
                            const charateristicName = CharateristicData.charaters[optionNumber - 1].name;
                            list += charateristicName;
                        } else {
                            console.error("Error: AddItemStory() invalid charateristic optionNumber");
                        }
                        break;
                    default: console.error("Error: AddItemStory() unfinded optionKind");
                }
            })
            const keyValue = optionNumber * 1000;
            return <GetItemBox key={keyValue}>{list}</GetItemBox>;
        } catch(e) {
            console.error("Error: AddItemStory()")
            console.error(e);
        }
    }
    const AddStoryUser = (optionNumber: number) => {
        try{
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }
            
            const optionName = option.text;
            return <StoryText key={optionNumber}>나: {optionName}</StoryText>;
        } catch(e) {
            console.error("Error: AddStoryUser()")
            console.error(e);
        }
    }
    const OpenStroy = (optionNumber: number) => {
        try {
            if(storyNumber === null || progressNumber === null) {
                return;
            }

            let option
            if(storyOptionStory[optionNumber] === 'next'){
                option = jsonOption[0][0][0]; 
            }  else {
                option = jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
            }

            const optionOpenStory = option.addition.openStroy;
            if(optionOpenStory === null || optionOpenStory === undefined) {
                return
            }
            const storyNum = Number(optionOpenStory.split('-')[1]);
            const existingArray = JSON.parse(localStorage.getItem('readAbleStory') || '[]');
            !existingArray.find((item: number) => item === storyNum) &&
                localStorage.setItem('readAbleStory', JSON.stringify([...existingArray, storyNum]));
        } catch(e) {
            console.error("Error: OpenStroy()")
            console.error(e);
        }
    }
    const NextStoryPart = () => {
        try{
            const storyRead = JSON.parse(localStorage.getItem('readStory') || '[]');
            const storyReadNum = storyRead.length;
            if(storyReadNum > 2) {
                const storyPart = Number(localStorage.getItem('storyParts'));
                if(jsonStory.length > storyPart+1){
                    localStorage.setItem('storyParts', (storyPart+1).toString(10));
                    setStoryParts(storyPart+1);
                } else {
                    localStorage.setItem('storyParts', (1).toString(10));
                    setStoryParts(1);
                }
                localStorage.setItem('readStory', JSON.stringify([]));

            }
        } catch(e) {
            console.error("Error: NextStoryPart()")
            console.error(e);
        }
    }
    const ClickEvent = (optionNumber: number) => {
        try{
            const userStoryList = AddStoryUser(optionNumber) || <></>;
            const itemStoryList = AddItemStory(optionNumber) || <></>;

            setStory([...story, userStoryList, itemStoryList]);
            ResultCheck(optionNumber);
            GetUserData();
            OpenStroy(optionNumber);
            NextStory(optionNumber);
        } catch(e) {
            console.error("Error: ClickEvent()");
            console.error(e);
        }
    }
    
    useEffect(() => {
        GetStoryData();
    }, [storyNumber, progressNumber])


    useEffect(() => {
        //SetUserData();
        
        GetRanDomStoryNumber();
        GetUserData();
    }, [])

    return (
        <Frame>
            <User>
                <Item>체력: {userHp}</Item>
                <Item>돈: {userMoney}</Item>
                <Item>아이템: {userItem.join(", ")}</Item>
                <Item>특성: {userCharateristic.join(", ")}</Item>
            </User>
            <StoryTextBox>
                <Title>{storyTitle}</Title>
                    {story.map((story, index) => (
                        <Fragment key={index}>{story}</Fragment>
                    ))}
            </StoryTextBox>
            <SelectBox>
                <SelectButton onClick={SetUserData}>
                    아이템 초기화 버튼
                </SelectButton>
                {Array.from({ length: storyOptionCount }).map((_, index) => (
                    <SelectButton key={index} onClick={() => ClickEvent(index)}disabled={ButtonDisable(index)}>
                        {ButtonOptionName(index)}
                    </SelectButton>
                ))}
            </SelectBox>
        </Frame>
    )
}