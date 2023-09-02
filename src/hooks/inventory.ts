import {ItemProps} from "../json/DemoItem";

export const AddItemToInventory = (item: ItemProps[string]) => {
    if(item) {
        const userData = JSON.parse(localStorage.getItem('userData') || '[]');
        const userDataItem = userData.userItem
        userDataItem.push(item);
        localStorage.setItem("userData" , JSON.stringify(userData));
        console.log(`"${item.name} 아이템을 인벤토리에 추가했습니다."`);
        
        return userDataItem
    } else {
        alert("해당 아이템이 존재하지 않습니다.");
    }
}
export const DeletItemToInventory = (item: ItemProps[string], index?: number) => {
    if(item){
        const userData = JSON.parse(localStorage.getItem('userData') || '[]');
        const userDataItem = userData.userItem;
        
        if(index) {
            userDataItem.splice(index, 1);
        } else {
            const indexToRemove = userDataItem.findIndex((item:ItemProps[string]) => item.id === item.id);
            if (indexToRemove !== -1) {
                userDataItem.splice(indexToRemove, 1);
            }
        }
        
        localStorage.setItem("userData" , JSON.stringify(userData));
        console.log(`"${item.name} 아이템을 인벤토리에 버렸습니다."`);

        return userDataItem;
    } else {
        alert("해당 아이템이 존재하지 않습니다.");
    }
} 