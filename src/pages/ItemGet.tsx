/** @jsxImportSource @emotion/react */

import { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled'
import { css } from "@emotion/react"
import Item, { ItemProps }  from '../json/DemoItem';
import { InventorySelectContext, AlertContext } from '../module/index';
import { DeletItemToInventory, AddItemToInventory } from "../hooks";

interface OpacityProps {
    active: boolean;
}

//@ts-ignore
interface Window {
    Android?: {
        getItem: () => string | undefined;
        webViewIsVisible: () => void | undefined;
    }
}

export const ItemGet = () => {
    const [item, setItem] = useState<string>();
    const [isOpacity, setIsOpacity] = useState(false);
    const [userItem, setUserItem] = useState<ItemProps[]>(JSON.parse(localStorage.getItem('userData') || '[]').userItem);

    const { alert } = useContext(AlertContext)
    const { invenSelect } = useContext(InventorySelectContext)

    const SendAndroidItem = () => {
        try{
            return `${window.Android?.getItem()}`;
        } catch(e) {
            console.error("Error: SendAndroidItem");
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
    
    const GetItems = () => {
        try{
            const item = SendAndroidItem();
            //const item = "도끼"
            console.log(item+" 아이템을 얻었습니다.");
            if(userItem.length >= 8 && item) {
                onAlertDeletItem(Item[item.toString()])
            } else if (item !== null && item !== undefined) {              
                AddItemToInventory(Item[item]);
                setItem(item)
            }
        } catch(e){
            console.error("Error: GetItems");
            console.error(e);
        }
    }

    useEffect(() => {
        GetItems();
        setIsOpacity(false);
    }, [0])

    const onClickButton = () => {
        SendAndroidEndStory();
    }

    const SendAndroidEndStory = () => {
        try{
            console.log("test");
            return window.Android?.webViewIsVisible();
        } catch(e) {
            console.error("ItemGet - Error: window.Android.webViewIsVisible()")
            console.error(e);
        }
    }
    
    return(
        <ItemGetStyle active={isOpacity}>
            {item} 얻음
            <Button onClick={onClickButton}>확인</Button>
        </ItemGetStyle>
    )
}

const ItemGetStyle = styled.div<OpacityProps>`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
    ${({active}) => 
        active ?
        css`opacity: 0;` :
        css`opacity: 1;`
    };
`
const Button = styled.button`
    width: 100px;
    height: 50px;
    background-color: #ff4d4d;
`