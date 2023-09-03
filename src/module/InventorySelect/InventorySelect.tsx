/** @jsxImportSource @emotion/react */

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
                    <button onClick={onClickLeft} className="w-36 h-10 p-2 bg-gray-100 rounded-xl justify-center items-center flex text-zinc-900 text-[13px] font-semibold z-[11] hover:bg-gray-200 hover:scale-90 duration-200 ease-in-out">{leftText}</button>
                    <button onClick={() => {if(selectInvenItem !== undefined) return onClickRight(selectInvenItem)}} disabled={(selectInvenItem === undefined)} className="w-36 h-10 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold z-[11] hover:bg-red-500 hover:scale-90 duration-200 ease-in-out disabled:bg-gray-400 disabled:pointer-events-none">{rightText}</button>
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
    )
}

const inventorySelect = css`
    border: 3px solid red;
`