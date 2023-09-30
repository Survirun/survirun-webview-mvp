/** @jsxImportSource @emotion/react */

import { useEffect, useState, useContext } from 'react';
import Item, { ItemProps }  from '../json/DemoItem';
import { InventorySelectContext, AlertContext } from '../module/index';
import { DeletItemToInventory, AddItemToInventory } from "../hooks";

//@ts-ignore
interface Window {
    Android?: {
        getItem: () => string | undefined;
        webViewIsVisible: () => void | undefined;
    }
}

export const ItemGet = () => {
    const [item, setItem] = useState<string>();
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
        <div className="relative w-screen h-screen bg-white">
            <div className="flex flex-col items-center justify-center">
                <div className="h-[260px] w-full flex-col justify-start items-start flex">
                    <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
                        현재 있는 위치
                    </h3>
                    <div className="w-full px-5 pb-3">
                        <div className="pb-1 text-base font-medium text-zinc-900">
                            그에 대한 설명
                        </div>
                    </div>
                    <div className="w-full h-[500px] px-5 pb-3 ">
                        <img width={360} height={300} className='m-auto'/>
                        <div className="pb-1 text-base font-medium text-zinc-900">
                            {item}을 얻었다
                        </div>
                    </div>
                </div>
            </div>

        
        <div className="absolute bottom-0">
            <div className="w-screen h-3 bg-gray-100 border-b"/>
            <div className="flex flex-col items-start justify-start w-screen gap-3 px-5 py-4">
                <button onClick={onClickButton} className="inline-flex items-center self-stretch justify-end p-3 duration-150 ease-out bg-gray-100 rounded-xl active:bg-gray-200 active:scale-95">
                    <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                        확인
                        <span className="m-1 text-gray-500 text-[15px] font-semibold">
                            
                        </span>
                    </p>
                    
                    <div className="relative w-5 h-5 origin-top-left rotate-180">
                        <svg className="absolute top-0 left-0 w-5 h-5 origin-top-left rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <mask id="mask0_1118_8405" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1118_8405)">
                                <path d="M10.7533 15.9071L16.1331 10.5272C16.2111 10.4493 16.2661 10.367 16.2981 10.2805C16.3302 10.1939 16.3462 10.1005 16.3462 10C16.3462 9.89959 16.3302 9.80611 16.2981 9.71958C16.2661 9.63304 16.2111 9.55078 16.1331 9.47279L10.7453 4.08498C10.6299 3.96959 10.4883 3.90976 10.3206 3.90548C10.1528 3.90121 10.0043 3.96371 9.87507 4.09298C9.7458 4.2137 9.67903 4.35793 9.67475 4.52567C9.67049 4.69339 9.73299 4.84189 9.86225 4.97117L14.2661 9.37504H4.59303C4.41568 9.37504 4.26718 9.43487 4.14753 9.55452C4.02787 9.67417 3.96805 9.82267 3.96805 10C3.96805 10.1774 4.02787 10.3259 4.14753 10.4455C4.26718 10.5652 4.41568 10.625 4.59303 10.625H14.2661L9.85423 15.0369C9.73886 15.1523 9.67903 15.296 9.67475 15.468C9.67049 15.64 9.73299 15.7863 9.86225 15.9071C9.98298 16.0363 10.1293 16.101 10.3013 16.101C10.4734 16.101 10.624 16.0363 10.7533 15.9071Z" fill="#1C1B1F"/>
                            </g>
                        </svg>
                    </div>
                </button> 
            </div>
        </div>
    </div>
    )
}
