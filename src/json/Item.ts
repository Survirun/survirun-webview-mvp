interface ResultItem {
    kind: "hp" | "money" | "hunger" | "charateristic";
    getOrLose: "get" | "lose";
    number: number;
};

export interface ItemProps {
    [key: string]: {
        name: string;
        id: number;
        kind: "item" | "useItem";
        img: string;
        resultItem?: ResultItem[],
    };
}

const Item: ItemProps = {"통조림":{"name":"통조림","id":2,"kind":"item","img":"/img/통조림.jpg"},"도끼":{"name":"도끼","id":3,"kind":"item","img":"/img/도끼.jpg"},"알루미늄 배트":{"name":"알루미늄 배트","id":4,"kind":"item","img":"/img/알루미늄 배트.jpg"},"백신":{"name":"백신","id":5,"kind":"item","img":"/img/백신.jpg"},"보석":{"name":"보석","id":6,"kind":"item","img":"/img/보석.jpg"},"가죽":{"name":"가죽","id":7,"kind":"item","img":"/img/가죽.jpg"},"물":{"name":"물","id":8,"kind":"item","img":"/img/물.jpg"},"녹슨 식칼":{"name":"녹슨 식칼","id":9,"kind":"item","img":"/img/녹슨 식칼.jpg"},"편지":{"name":"편지","id":10,"kind":"item","img":"/img/편지.jpg"},"사용 아이템":{"name":"사용 아이템","id":11,"kind":"useItem","img":"/img/사용 아이템.jpg","resultItem":[{"kind":"hp","getOrLose":"get","number":10}]},"사용 아이템2":{"name":"사용 아이템2","id":12,"kind":"useItem","img":"/img/사용 아이템2.jpg","resultItem":[{"kind":"hunger","getOrLose":"get","number":10}]},"개사료":{"name":"개사료","id":13,"kind":"useItem","img":"/img/개사료.jpg","resultItem":[{"kind":"hp","getOrLose":"get","number":10}]},"연습용 팽이":{"name":"연습용 팽이","id":14,"kind":"item","img":"/img/연습용 팽이.jpg"}}

export default Item