import styled from "@emotion/styled";

import { Fragment, useEffect, useState, useContext } from "react";
import { DeletItemToInventory, AddItemToInventory } from "./Inventory";
//Demo Data
//import StoryData from '../json/DemoStory4.json';
import { jsonOption } from "../json/DemoOption";
import { jsonStory } from '../json/DemoStory';
import { jsonSubCharacter } from "../json/DemoSubCharacter";
import Item, {ItemProps} from "../json/DemoItem"
import { Option } from "../json/DemoSubCharacter";

import { AlertContext, InventorySelectContext } from "../module/index";

import ItemData from '../json/DemoItem2.json';
import CharateristicData from '../json/DemoCharateristic.json';

//@ts-ignore
interface Window { 
    Android?: {
        webViewIsVisible: () => void | undefined;
        zombie: (zombieNumber: number) => void | undefined;
    }
}

export const SubCharacter = () => {
    const [subCharacterStory, setSubCharaterStory] = useState<string>()
    const [storyNumber, setStoryNumber] = useState<number>();
    const [storyTitle, setStoryTitle] = useState("");
    const [storyOptionCount, setStoryOptionCount] = useState(0);
    const [storyParts, setStoryParts] = useState(1);
    const [storyOptionStory,setStoryOptionStory] = useState<string[]>([]);
    const [storyOptionNum, setStoryOptionNum] = useState<number[]>([]);
    const [storyOption, setStoryOption] = useState<Option[]>();
    const [storyProgress, setStoryProgress] = useState<number>(0);

    const [userHp, setUserHp] = useState(0);
    const [userMoney, setUserMoney] = useState(0);
    const [userItems, setUserItems] = useState<string[]>([]);
    const [userCharateristic, setUserCharateristic] = useState<string[]>([]);
    const [userItem, setUserItem] = useState<ItemProps[]>([]);

    const [story, setStory] = useState<JSX.Element[]>([]);

    const { alert } = useContext(AlertContext);
    const { invenSelect } = useContext(InventorySelectContext)

    const SetUserData = () => {
        try {
            localStorage.setItem('hp', "3");
            localStorage.setItem('money', "3");
            localStorage.setItem('item', JSON.stringify([]));
            localStorage.setItem('charateristic', JSON.stringify(["위협"]));
            localStorage.setItem('readAbleStory', JSON.stringify([]));
            localStorage.setItem('readStory', JSON.stringify([]));
            localStorage.setItem('storyParts', "1");
            const subCharater = {
                "테스트 캐릭터1": {
                    "open": false,
                    "progress": 0,
                },
                "테스트 캐릭터2": {
                    "open": false,
                    "progress": 0,
                }
            }
            localStorage.setItem('userData', JSON.stringify({userItem: [], subCharater: subCharater}));
            GetUserData();
        } catch(e) {
            console.error("Error: SetUserData()")
            console.error(e);
        }
    }
    const GetRanDomStoryNumber = () => {
        try {
            setStory([]);
            const keys = Object.keys(jsonSubCharacter);
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = keys[randomIndex];
            const userDataSub = JSON.parse(localStorage.getItem('userData') || '{}').subCharater;
            
            setSubCharaterStory(randomKey)
            setStoryNumber(userDataSub[randomKey].progress);
            
        } catch(e) {
            console.error("Error: GetRanDomStoryNumber()")
            console.error(e);
        }
    }
    const GetStoryData = () => {
        try {
            if(subCharacterStory === undefined || storyNumber === undefined) {
                return;
            }
            
            setStoryTitle(jsonSubCharacter[subCharacterStory].story[storyNumber].storyTitle);
            setStoryOptionNum(jsonSubCharacter[subCharacterStory].story[storyNumber].storys[storyProgress].option.map(option => Number(option.optionID.split('-')[1])-1));
            setStoryOptionStory(jsonSubCharacter[subCharacterStory].story[storyNumber].storys[storyProgress].option.map(option => option.text))
            setStoryOptionCount(jsonSubCharacter[subCharacterStory].story[storyNumber].storys[storyProgress].option.length);
            setStoryOption(jsonSubCharacter[subCharacterStory].story[storyNumber].storys[storyProgress].option)
            const storyList = [...story];
            const keyValue = storyNumber
            storyList.push(<StoryText key={keyValue}>{jsonSubCharacter[subCharacterStory].story[storyNumber].storys[storyProgress].storyText}</StoryText>);
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
            setUserItems(item ? JSON.parse(item) : []);
            const charateristic = localStorage.getItem('charateristic');
            setUserCharateristic(charateristic ? JSON.parse(charateristic) : [])
            setUserItem(JSON.parse(localStorage.getItem('userData') || '[]').userItem)
        } catch(e) {
            console.error("Error: GetUserData()");
            console.error(e)
        }
    }
    const ButtonOptionName = (optionNumber: number) => {
        try {
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]
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
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]
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
                return (userItems.indexOf(itemName) > -1) ?
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
                    default: console.error("Error: ButtonDisable condition.kind undifinded");
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
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]
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
                    (userItems.indexOf(itemName) > -1) && localStorage.setItem('item', JSON.stringify(existingArray.filter((item: string) => item !== itemName)));
                (getOrLose === "get") ? 
                    ((userItem.length >= 8) ? onAlertDeletItem(Item[itemName]) : AddItemToInventory(Item[itemName])) :
                    DeletItemToInventory(Item[itemName])
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
                    default: console.error("Error: ResultCheck result.kind undifinded");
                }
            })
        } catch(e) {
            console.error("Error: ResultCheck()")
            console.error(e);
        }
    }
    const NextStory = (optionNumber: number) => {
        try{
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]

            if(option.addition.nextProgress === null) {
                SendAndroidEndStory();
                NextStoryPart();
            } else {
                const optionNextStory = Number(option.addition.nextProgress?.split('-')[1]);
                setStoryProgress(optionNextStory-1);
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
            console.error("Error: StoryPage - window.Android.webViewIsVisible()")
            console.error(e);
        }
    }
    const SendAndroidZombie = (optionZombie: number) => {
        try{
            window.Android?.zombie(optionZombie);
        } catch(e) {
            console.error("Error: window.Android.zombie()")
            console.error(e);
        }
    }
    const AddItemStory = (optionNumber: number) => {
        try{
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]

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
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]
            const optionName = option.text;

            return <StoryText key={optionNumber}>나: {optionName}</StoryText>;
        } catch(e) {
            console.error("Error: AddStoryUser()")
            console.error(e);
        }
    }
    const OpenStroy = (optionNumber: number) => {
        try {
            if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
                return;
            }

            const option = storyOption[optionNumber]

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
    const UpSubProgress = async (optionNumber: number) => {
        if(subCharacterStory === undefined || storyNumber === undefined || storyOption === undefined) {
            return;
        }

        const userData = JSON.parse(localStorage.getItem('userData') || '[]');
        const userDataSubCharacter = userData.subCharater;

        const option = storyOption[optionNumber];

        if(option.addition.toUpSubProgess === true) {
            userDataSubCharacter[subCharacterStory].progress += 1;
        }
        if(option.addition.togetherSubCharacter === true) {
            const result = await onAlertGetSubCharater();
            if(result) {
                userDataSubCharacter[subCharacterStory].progress += 1;
                userDataSubCharacter[subCharacterStory].open = true;

                const existingArray = JSON.parse(localStorage.getItem('charateristic') || '[]');
                const charaterName = jsonSubCharacter[subCharacterStory].property;
                localStorage.setItem('charateristic', JSON.stringify([...existingArray, charaterName]))
                GetUserData();
            }
        }
        localStorage.setItem("userData" , JSON.stringify(userData));
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
            UpSubProgress(optionNumber);
            setStoryProgress(pre => pre++);
        } catch(e) {
            console.error("Error: ClickEvent()");
            console.error(e);
        }
    }
    const onAlertDeletItem = async (item: ItemProps[string]) => {
        const AlertLeftButton = () => {
            onInventorySelect(item);
        }
        const AlertRightButton = () => {
            
        }

        const result = await alert(`가방에 ${item.name}을/를 넣을 자리가 없다.`, "가방 속 물건을 버린다.", `${item.name}을/를 버린다.`);
        result ? AlertRightButton() : AlertLeftButton();
    }
    const onInventorySelect = async (item: ItemProps[string]) => {
        const CancleToDeleteItem = () => {
            onAlertDeletItem(item);
        }
        const DeleteSelectItem = () => {
            const deleItem: ItemProps[string] = Item[userItem[result].name.toString()]
            setUserItem(DeletItemToInventory(deleItem, result))
            AddItemToInventory(item)
        }
        
        const result = await invenSelect("취소", "버리기");
        (result === -1) ? CancleToDeleteItem() : DeleteSelectItem();
    }
    const onAlertGetSubCharater = async () => {
        const AlertLeftButton = () => {
            
        }
        const AlertRightButton = () => {
            
        }

        const result = await alert(`${subCharacterStory}와 함께 모험하시겠습니까?`, "거절한다", `수락한다`);
        result ? AlertRightButton() : AlertLeftButton();
        return result;
    }
    
    useEffect(() => {
        GetStoryData();
    }, [subCharacterStory, storyNumber, storyProgress])

    useEffect(() => {
        //SetUserData();
        
        GetRanDomStoryNumber();
        GetUserData();
    }, [])

    return (
        <Frame>
            <ResetButton onClick={SetUserData}>
                아이템 리셋
            </ResetButton>
            <User>
                <ItemBox>체력: {userHp}</ItemBox>
                <ItemBox>돈: {userMoney}</ItemBox>
                <ItemBox>아이템: {userItems.join(", ")}</ItemBox>
                <ItemBox>특성: {userCharateristic.join(", ")}</ItemBox>
            </User>
            <StoryTextBox>
                <Title>{storyTitle}</Title>
                    {story.map((story, index) => (
                        <Fragment key={index}>{story}</Fragment>
                    ))}
            </StoryTextBox>
            <SelectBox>
                {Array.from({ length: storyOptionCount }).map((_, index) => (
                    <SelectButton key={index} onClick={() => ClickEvent(index)}disabled={ButtonDisable(index)}>
                        {ButtonOptionName(index)}
                    </SelectButton>
                ))}
            </SelectBox>
        </Frame>
    )
}

const User = styled.div`
    position: relative;
    margin: 5px 30px;
`
const ItemBox = styled.div`
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
const ResetButton = styled.button`
    position: absolute;
    right: 0;
    width: 80px;
    height: 40px;
    border-radius: 4px;
    background-color: #eee;
    font-size: 12px;
`