/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { InventorySelectProps } from "./InventoryDialog";
import { ItemProps } from "../../json/DemoItem";

export const InventorySelect = ({leftText, rightText, onClickLeft, onClickRight}: InventorySelectProps) => {
    const [selectInvenItem, setSelectInvenItem] = useState<number>();
    const [userItem, setUserItem] = useState<ItemProps>();

    useEffect(() => {
        setUserItem(JSON.parse(localStorage.getItem('userData') || '[]').userItem)
    }, [])

    const HandleInventoryItemClick = (index: number) => {
        if(index === selectInvenItem) {
            setSelectInvenItem(undefined);
        } else {
            setSelectInvenItem(index);
        }
    }
    const CreateInventoryName = (index: number) => {
        if(userItem)
            try{
                if(userItem[index] === undefined) {
                    return ""
                }
                return `${userItem[index].name}`
            } catch(err) {
                console.error("Error: CreateInventoryName ", err);
            }
    }
    return(
        <>
            <Background/>
            <CancleDeleteButton onClick={onClickLeft}>{leftText}</CancleDeleteButton>
            <DeleteButton disabled={!selectInvenItem} onClick={() => {if(selectInvenItem) return onClickRight(selectInvenItem)}}>{rightText}</DeleteButton>
            <InventoryStyle>
            {Array.from({ length: 8 }).map((_, index) => (
                <InventorySlot key={index}>
                    <InventoryItem onClick={() => HandleInventoryItemClick(index)} css={(selectInvenItem === index) && inventorySelect}>{CreateInventoryName(index)}</InventoryItem>
                </InventorySlot>
            ))}  
            </InventoryStyle>
        </>
    )
}

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
`
const CancleDeleteButton = styled.button`
    position: absolute;
    left: 30%;
    top: 40%;
    width: 80px;
    height: 40px;
    border-radius: 4px;
    background-color: #eee;
    font-size: 12px;
    z-index: 11;
`
const DeleteButton = styled.button`
    position: absolute;
    left: 50%;
    top: 40%;
    width: 80px;
    height: 40px;
    border-radius: 4px;
    background-color: #eee;
    font-size: 12px;
    z-index: 11;
`
const InventoryStyle = styled.div`
    position: absolute;
    top: 50%;
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    background-color: #4f0b0b;
    flex-wrap: wrap;
    z-index: 11;
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
const inventorySelect = css`
    border: 3px solid red;
`