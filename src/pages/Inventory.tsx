import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Item, {ItemProps} from "../json/DemoItem";

//@ts-ignore
interface Window { 
    Android?: {
        webViewIsVisible: () => void | undefined;
        zombie: (zombieNumber: number) => void | undefined;
    }
}
  

export const Inventory = () => {
    const [userItem, setUserItem] = useState<ItemProps[]>([]);

    const GetInvenItem = () => {
        setUserItem(JSON.parse(localStorage.getItem('userData') || '[]').userItem)
    }
    const SetUserData = () => {
        localStorage.setItem('hp', "3");
        localStorage.setItem('money', "3");
        localStorage.setItem('item', JSON.stringify([]));
        localStorage.setItem('charateristic', JSON.stringify(["위협"]));
        localStorage.setItem('readAbleStory', JSON.stringify([]));
        localStorage.setItem('readStory', JSON.stringify([]));
        localStorage.setItem('storyParts', "1");
        localStorage.setItem('userData', JSON.stringify({userItem: []}));
    }
    const AddItemToInventory = (itemName: string) => {
        const item = Item[itemName];
        console.log(userItem)
        if(item) {
            const userData = JSON.parse(localStorage.getItem('userData') || '[]');
            userData.userItem.push(item);
            localStorage.setItem("userData", JSON.stringify(userData));
            setUserItem(userData.userItem);
            console.log(`"${item.name} 아이템을 인벤토리에 추가했습니다."`);
        } else {
            console.log("해당 아이템이 없습니다.");
        }
    }
    const CreateInventoryName = (index: number) => {
        try{
            if(userItem[index] === undefined) {
                return " "
            }
            return `${userItem[index].name}`
        } catch(err) {
            console.error("Error: CreateInventoryName ", err);
        }
    }
    useEffect(() => {
        GetInvenItem();
    }, [])
    return(
        <Frame>
            <TestButtonStyled>
                <button onClick={() => AddItemToInventory("도끼")}>도끼 획득</button>
                <button onClick={() => AddItemToInventory("백신")}>백신 획득</button>
                <button onClick={SetUserData}>아아템 초기화</button>
            </TestButtonStyled>
            <ItemBoxStyle>
                {Array.from({ length: 8 }).map((_, index) => (
                    <ItemBox key={index}>{CreateInventoryName(index)}</ItemBox>
                ))}
            </ItemBoxStyle>
        </Frame>
    )
}

const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
    background-color: #eee;
`
const ItemBoxStyle = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #4f0b0b;
    flex-wrap: wrap;
`
const ItemBox = styled.div`
    width: 80px;
    height: 80px;
    margin: 10px 10px;
    background-color: #eee;
`
const TestButtonStyled = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    border-color: #aaa;
`