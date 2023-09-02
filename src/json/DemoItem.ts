export interface ItemProps {
    [key: string]: {
        name: string;
        id: number;
        kind: "item" | "useItem";
        img: string;
    };
}

const Item: ItemProps = {
    "통조림": {
        name: "통조림",
        id: 1,
        kind: "item",
        img: "/img/통조림.jpg",
    },
    "도끼": {
        name: "도끼",
        id: 2,
        kind: "item",
        img: "/img/도끼.jpg",
    },
    "알루미늄 배트": {
        name: "알루미늄 배트",
        id: 3,
        kind: "item",
        img: "/img/알루미늄 배트.jpg",
    },
    "백신": {
        name: "백신",
        id: 4,
        kind: "item",
        img: "/img/백신.jpg",
    },
    "보석": {
        name: "보석",
        id: 5,
        kind: "item",
        img: "/img/보석.jpg",
    },
    "가죽": {
        name: "가죽",
        id: 6,
        kind: "item",
        img: "/img/통조림.jpg",
    },
    "물": {
        name: "물",
        id: 7,
        kind: "item",
        img: "/img/물.jpg",
    },
    "녹슨 식칼": {
        name: "녹슨 식칼",
        id: 8,
        kind: "item",
        img: "/img/녹슨 식칼.jpg",
    },
    "편지": {
        name: "편지",
        id: 9,
        kind: "item",
        img: "/img/편지.jpg",
    },
    "테스트": {
        name: "테스트",
        id: 10,
        kind: "item",
        img: "/img/테스트.jpg",
    },
    "사용 아이템": {
        name: "사용 테스트 아이템",
        id: 11,
        kind: "useItem",
        img: "/img/테스트.jpg",
    }
}
export default Item;