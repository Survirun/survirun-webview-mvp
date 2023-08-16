import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import jsonEnemy from '../json/DemoEnemy.json';

interface UserInterface{
    userHP: number, 
    playerATK: number, 
    itemATK: number,
    playerDEF: number,
    itemDEF: number,
    playerSPD: number,
    itemSPD: number,
    playerCTP: number,
    itemCTP: number,
    userItem: string[],
}

const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
`
const User = styled.div`
    position: relative;
    margin: 5px 30px;
`
const Item = styled.div`
    position: block;
`
const Button = styled.button`
    position: absolute;
    background-color: #fc7878;
    width: 100px;
    height: 50px;
`

class BattleClass {
    HP: number;
    ATK: number;
    DEF: number;
    SPD: number;
    CTP: number;
    Item: string[];

    // 생성자(Constructor) 함수
    constructor({userHP, playerATK, itemATK, playerDEF, itemDEF, playerSPD, itemSPD, playerCTP, itemCTP, userItem}: UserInterface) { 
        this.HP = userHP;
        this.ATK = playerATK + itemATK;
        this.DEF = playerDEF + itemDEF;
        this.SPD = playerSPD + itemSPD;
        this.CTP = playerCTP + itemCTP;
        this.Item = userItem;
    }
}

export const Battle = () => {
    const [userStatus, setUserStatus] = useState(new BattleClass({
        userHP: 1,
        playerATK: 0,
        itemATK: 0,
        playerDEF: 0,
        itemDEF: 0,
        playerSPD: 0,
        itemSPD: 0,
        playerCTP: 0,
        itemCTP: 0,
        userItem: [],
    }));
    const [enemyStatus] = useState(new BattleClass({
        userHP: jsonEnemy.enemys[0].HP ,
        playerATK: jsonEnemy.enemys[0].ATK,
        itemATK: 200,
        playerDEF: jsonEnemy.enemys[0].DEF,
        itemDEF: 0,
        playerSPD: jsonEnemy.enemys[0].SPD,
        itemSPD: 10,
        playerCTP: 0,
        itemCTP: 0,
        userItem: [],
    }));
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isGameEnded, setIsGameEnded] = useState(false);

    const SetUserData = () => {
        try{
            const hp = Number(localStorage.getItem('hp')) || 0;
            const playerATK = 100;
            const itemATK = 1;
            const playerDEF = 1;
            const itemDEF = 1;
            const playerSPD = 1;
            const itemSPD = 10;
            const playerCTP = 1;
            const itemCTP = 100;
            const userItem = JSON.parse(localStorage.getItem('item') || '[]');
            
            setUserStatus(new BattleClass({
                userHP: hp,
                playerATK: playerATK,
                itemATK: itemATK,
                playerDEF: playerDEF,
                itemDEF: itemDEF,
                playerSPD: playerSPD,
                itemSPD: itemSPD,
                playerCTP: playerCTP,
                itemCTP: itemCTP,
                userItem: userItem,
            }));
        } catch(e) {
            console.error(e);
            console.error("Error: Battle()");
        }
    }
    const Attack = (attacker: BattleClass, defender: BattleClass) => {
        if (isGameEnded) 
            return;

        const attackerName = attacker === userStatus ? "유저" : "적";
        const defenderName = defender === userStatus ? "유저" : "적";

        setTimeout(() => {
            setBattleLog((prevLog) => [
                ...prevLog,
                `${attackerName}의 공격`,
            ]);
        }, 0);

        const critical = Math.floor(Math.random() * 101);
        let damage = Math.max(0, attacker.ATK - defender.DEF);

        if(attacker.CTP >= critical) {
            damage = Math.max(0, attacker.ATK*2 - defender.DEF);
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    '크리티컬!',
                ]);
            }, 500);
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    `${damage}의 데미지를 입혔다.`,
                ]);
            }, 1500);
        }
        else {
            damage = Math.max(0, attacker.ATK - defender.DEF);
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    `${damage}의 데미지를 입혔다.`,
                ]);
                
            }, 1000);
        }
        defender.HP -= damage;

        if (defender.HP <= 0) {
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    `${defenderName}의 HP가 0이다.`
                ]);
            }, 2000);
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    `${defenderName}가 사망했습니다.`,
                ]);
            }, 3000);
            setTimeout(() => {
                setBattleLog((prevLog) => [
                    ...prevLog,
                    "배틀을 종료합니다.",
                ]);
            }, 4000);
        }
    } 
    const OnBattle = () => {
        try {
          if (isGameEnded) return;
    
          if (userStatus.SPD >= enemyStatus.SPD) {
            console.log("선공");
            Attack(userStatus, enemyStatus);
    
            if (!isGameEnded && enemyStatus.HP > 0) {
              setTimeout(() => {
                Attack(enemyStatus, userStatus);
                if (userStatus.HP <= 0) {
                  setIsGameEnded(true);
                }
              }, 2000);
            }
          } else {
            console.log("후공");
            Attack(enemyStatus, userStatus);
    
            if (!isGameEnded && userStatus.HP > 0) {
              setTimeout(() => {
                Attack(userStatus, enemyStatus);
                if (enemyStatus.HP <= 0) {
                  setIsGameEnded(true);
                }
              }, 2000);
            }
          }
        } catch (e) {
          console.error(e);
          console.error("Error: OnBattle()");
        }
      };

    useEffect(() => {
        SetUserData();
    }, [])

    useEffect(() => {
        if (userStatus.HP <= 0 || enemyStatus.HP <= 0) {
            setIsGameEnded(true);
        } else {
            setIsGameEnded(false);
        }
    }, [userStatus.HP, enemyStatus.HP]);

    return(
        <Frame>
            <User>
                <Item>HP: {userStatus.HP}</Item>
                <Item>공격력: {userStatus.ATK}</Item>
                <Item>방어력: {userStatus.DEF}</Item>
                <Item>속도: {userStatus.SPD}</Item>
                <Item>치명타 확률: {userStatus.CTP}</Item>
                <Item>아이템: {userStatus.Item.join(", ")}</Item>
                <br/><br/>
                <Item>적 HP: {enemyStatus.HP}</Item>
                <Item>적 공격력: {enemyStatus.ATK}</Item>
                <Item>적 방어력: {enemyStatus.DEF}</Item>
                <Item>적 속도: {enemyStatus.SPD}</Item>
                <Item>적 치명타 확률: {enemyStatus.CTP}</Item>
                <Item>적 아이템: {enemyStatus.Item.join(", ")}</Item>
            </User>
            {Array.from({ length: battleLog.length }).map((_, index) => (
                <div key={index}>{battleLog[index]}<br/></div>
            ))}
            
            <Button onClick={OnBattle}>공격하기</Button>
        </Frame>
    )
}