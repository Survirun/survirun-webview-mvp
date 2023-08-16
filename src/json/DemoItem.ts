export interface UserItemProps {
    [key: string]: {
        name: string;
        id: number;
        kind: string;
        img: string;
    };
}

const Item: UserItemProps = {
    "도끼": {
        name: "도끼",
        id: 1,
        kind: "item",
        img: "/test",
    },
    "백신": {
        name: "백신",
        id: 2,
        kind: "item",
        img: "/test",
    },
    "테스트": {
        name: "테스트",
        id: 3,
        kind: "item",
        img: "/test",
    },
}
export default Item;