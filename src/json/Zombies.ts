

export interface ZombiesInterface {
    [key: string]: {
        name: string;
        id: number;
        kind: "item" | "useItem";
        img: string;
    };
}

const Zombies: ZombiesInterface = {
    "none": {
        name: "없음",
        id: 0,
        kind: "item",
        img: "/img/통조림.jpg",
    },
    "좀비1": {
        name: "좀비1",
        id: 1,
        kind: "item",
        img: "/img/통조림.jpg",
    },
    "좀비2": {
        name: "좀비2",
        id: 2,
        kind: "item",
        img: "/img/도끼.jpg",
    },
}
export default Zombies;