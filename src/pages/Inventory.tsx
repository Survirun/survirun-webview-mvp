import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";

import Item, {ItemProps} from "../json/DemoItem";

//@ts-ignore
interface Window { 
    Android?: {
        webViewIsVisible: () => void | undefined;
        zombie: (zombieNumber: number) => void | undefined;
    }
}
interface ActionButtonsProps {
    onEquip: () => void;
    onDiscard: () => void;
}
  

const ActionButtons = ({ onEquip, onDiscard }: ActionButtonsProps) => {
    return(
        <ActionButtonsStyle>
            <ActionButtonsButton onClick={onEquip}>장착하기</ActionButtonsButton>
            <ActionButtonsButton onClick={onDiscard}>버리기</ActionButtonsButton>
        </ActionButtonsStyle>
    )
}

export const Inventory = () => {
    const [userItem, setUserItem] = useState<ItemProps[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const inventoryRef = useRef<HTMLDivElement | null>(null);

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
        if(item) {
            const userData = JSON.parse(localStorage.getItem('userData') || '[]');
            userData.userItem.push(item);
            localStorage.setItem("userData", JSON.stringify(userData));
            setUserItem(userData.userItem);
            console.log(`"${item.name} 아이템을 인벤토리에 추가했습니다."`);
        } else {
            alert("해당 아이템이 존재하지 않습니다.");
        }
    }
    const DeletItemToInventory = (itemName: string) => {
        const item = Item[itemName];
        if(item){
            const userDataItem = JSON.parse(localStorage.getItem('userData') || '[]').userItem;

            if(selectedSlot) {
                userDataItem.splice(selectedSlot, 1);
            } else {
                const indexToRemove = userDataItem.findIndex((item:ItemProps[string]) => item.name === itemName);
                if (indexToRemove !== -1) {
                    userDataItem.splice(indexToRemove, 1);
                }
            }
            
            localStorage.setItem("userData" , JSON.stringify({userItem: userDataItem}));
            setUserItem(userDataItem);
            console.log(`"${item.name} 아이템을 인벤토리에 버렸습니다."`);
        } else {
            alert("해당 아이템이 존재하지 않습니다.");
        }
    } 
    const CreateInventoryName = (index: number) => {
        try{
            if(userItem[index] === undefined) {
                return ""
            }
            return `${userItem[index].name}`
        } catch(err) {
            console.error("Error: CreateInventoryName ", err);
        }
    }
    const HandleInventoryItemClick = (index: number) => {
        if(userItem[index] === undefined) {
            setSelectedSlot(null);
        } else if(selectedSlot === index) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(index);
        }
    }
    const HandleInventoryEquip = () => {
        setSelectedSlot(null);
    }
    const HandleInventoryDiscard = () => {
        setSelectedSlot(null);
        if(selectedSlot !== null)
            DeletItemToInventory(userItem[selectedSlot].name.toString());
    }
    const RenderActionButtons = () => {
        if(selectedSlot !== null) {
            return (
                <ActionButtons
                    onEquip={HandleInventoryEquip}
                    onDiscard={HandleInventoryDiscard}
                />
            )
        }
        return null;
    }
    useEffect(() => {
        GetInvenItem();
    }, [])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inventoryRef.current && !inventoryRef.current.contains(event.target as Node)) {
              setSelectedSlot(null);
            }
        };
      
        window.addEventListener('click', handleClickOutside);
      
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return(
        <Frame>
            <TestButtonStyled>
                <button onClick={() => AddItemToInventory("도끼")}>도끼 획득</button>
                <button onClick={() => AddItemToInventory("백신")}>백신 획득</button>
                <button onClick={SetUserData}>아아템 초기화</button>
            </TestButtonStyled>
            <InventoryStyle ref={inventoryRef}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <InventorySlot key={index}>
                        {selectedSlot === index && RenderActionButtons()}
                        <InventoryItem onClick={() => HandleInventoryItemClick(index)}>{CreateInventoryName(index)}</InventoryItem>
                    </InventorySlot>
                ))}  
            </InventoryStyle>
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
const InventoryStyle = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    background-color: #4f0b0b;
    flex-wrap: wrap;
`
const InventorySlot = styled.div`
    position: relative;
    width: 25%;
    padding: 10px;
    box-sizing: border-box;
`
const InventoryItem = styled.div`
    width: 100%;
    height: 80px;
    background-color: #ccc;
    cursor: pointer;
`
const TestButtonStyled = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    border-color: #aaa;
`
const ActionButtonsStyle = styled.div`
    position: absolute;
    top: -50px;
    z-index: 3;
    justify-content: space-between;
    margin-top: 5px;
`
const ActionButtonsButton = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
`