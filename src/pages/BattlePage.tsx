import { useEffect, useState, useContext } from "react";
import { UpProgress } from "../Components";
import { useSocket } from "../hooks";

import { AlertContext } from "../module/index";

function createBattle(hp: number, maxHp: number, distance: number) {
  return (
    <>
      <UpProgress
        width={16}
        max={maxHp}
        value={hp}
        color="#fd3232"
        bgColor="#F0EFF5"
      />
      <div className="flex flex-col h-full">
        <div className="justify-start flex-initial p-1 w-[76px]">
          {Math.floor(distance * 1000)}m / 10m
        </div>
        <UpProgress
          className="flex-1"
          width={76}
          max={100}
          value={distance * 10000}
          color="#5539FF"
          bgColor="#F0EFF5"
        />
      </div>
      <div className="flex-1 h-full my-5 rounded-2xl bg-slate-500"></div>
    </>
  );
}

export const BattlePage = () => {
  const [data, setData] = useState<number>(0);
  const [userDistance, setUserDistance] = useState<number>(0);
  const [userStartDistance, setUserStartDistance] = useState<number>(0);
  const [enemyDistance, setEnemyDistance] = useState<number>(0);
  const [userHp, setUserHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);

  const { alert } = useContext(AlertContext);

  useEffect(() => {
    setInterval(() => {
      setEnemyDistance((prev) => prev + 0.0001);
    }, 500);
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      setUserDistance(e.data.distance);
    };

    window.addEventListener("message", (e) => handleMessage(e));

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (userStartDistance === 0) {
      setUserStartDistance(userDistance);
    } else {
      setData(userDistance - userStartDistance);
    }
  }, [userDistance]);

  useEffect(() => {
    if (Math.floor(data * 1000) >= 5) {
      setEnemyHp((pre) => pre - 10);
      setUserStartDistance((pre) => pre && pre + 0.005);
      setData(0);
    }
    if (Math.floor(enemyDistance * 1000) >= 10) {
      setUserHp((pre) => pre - 10);
      setEnemyDistance(0);
    }
  }, [userDistance, enemyDistance]);

  useEffect(() => {
    const sendSocket = () => {
      try {
        const socket = useSocket();
        socket.emit("UpdateHp", {
          value: -10,
        });
      } catch (err) {
        console.error("Error Socket: " + err);
      }
    };
    const sendWebBattleEnd = () => {
      const data = {
        battleEnd: true,
      };
      try {
        return window.parent.postMessage(data, "*");
      } catch (err) {
        console.error("Error: sendMapPosstMassage" + err);
      }
    };
    if (userHp <= 0) {
      alert("좀비에지고 말았다.", "이런", "확인");
      sendSocket();
      sendWebBattleEnd();
    }
    if (enemyHp <= 0) {
      alert("좀비를 잡았다.", "나이스", "확인");
      sendWebBattleEnd();
    }
  }, [userHp, enemyHp]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row items-center justify-center w-full gap-4 p-6 h-1/2">
        {createBattle(enemyHp, 100, enemyDistance)}
      </div>
      <div className="flex flex-row-reverse items-center justify-center w-full gap-4 p-6 h-1/2">
        {createBattle(userHp, 100, data)}
      </div>
    </div>
  );
};
