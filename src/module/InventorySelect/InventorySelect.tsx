/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { InventorySelectProps } from "./InventoryDialog";
import { ItemProps } from "../../json/DemoItem";

export const InventorySelect = ({leftText, rightText, onClickLeft, onClickRight}: InventorySelectProps) => {
    const [selectInvenItem, setSelectInvenItem] = useState<number>();
    const [userItem, _] = useState<ItemProps>(JSON.parse(localStorage.getItem('userData') || '[]').userItem);

    useEffect(() => {

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
                if(userItem[index].img === undefined) {
                    return "/img/테스트.jpg"
                }
                return `${userItem[index].img}`
            } catch(err) {
                console.error("Error: CreateInventoryName ", err);
            }
    }
    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <div className="fixed w-full h-full bg-black bg-opacity-30"></div>
            <div className="flex items-center justify-center flex-col gap-3">
                <div className="w-72 justify-center items-start gap-2 inline-flex">
                    <button onClick={onClickLeft} className="w-36 h-10 p-2 bg-gray-100 rounded-xl justify-center items-center flex text-zinc-900 text-[13px] font-semibold hover:opacity-80 z-[11]">{leftText}</button>
                    <button onClick={() => {if(selectInvenItem !== undefined) return onClickRight(selectInvenItem)}} className="w-36 h-10 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold hover:opacity-80 z-[11]">{rightText}</button>
                </div>
                <div className="w-[25rem] h-52 p-4 bg-white rounded-lg flex-wrap justify-center items-center gap-3 inline-flex z-[11]">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div onClick={() => HandleInventoryItemClick(index)} css={(selectInvenItem === index) && inventorySelect} key={index} className="w-20 h-20 bg-red-500 rounded-md border-2 border-solid border-neutral-500">
                            <img src={CreateInventoryName(index)} className="w-full h-full rounded-md"></img>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
        // <>
        //     <Background/>
        //     <CancleDeleteButton onClick={onClickLeft}>{leftText}</CancleDeleteButton>
        //     <DeleteButton disabled={(selectInvenItem === undefined)} onClick={() => {if(selectInvenItem !== undefined) return onClickRight(selectInvenItem)}}>{rightText}</DeleteButton>
        //     <InventoryStyle>
        //     {Array.from({ length: 8 }).map((_, index) => (
        //         <InventorySlot key={index}>
        //             <InventoryItem onClick={() => HandleInventoryItemClick(index)} css={(selectInvenItem === index) && inventorySelect}>{CreateInventoryName(index)}</InventoryItem>
        //         </InventorySlot>
        //     ))}  
        //     </InventoryStyle>
        // </>
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