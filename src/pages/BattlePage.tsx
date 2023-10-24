import { useEffect, useState } from "react";
import { UpProgress } from "../Components";

function createBattle(hp: number, maxHp: number, distance: number ) {
  return (
    <>
      <UpProgress width={16} max={maxHp} value={hp} color="#fd3232" bgColor="#F0EFF5"/>
      <div className="flex flex-col h-full">
        <div className="justify-start flex-initial p-1 w-[76px]">{Math.floor(distance*1000)}m / 10m</div>
        <UpProgress className="flex-1" width={76} max={100} value={distance*10000} color="#5539FF" bgColor="#F0EFF5"/>
      </div>
      <div className="flex-1 h-full my-5 rounded-2xl bg-slate-500">

      </div>
    </>
  );
}

export const BattlePage = () => {
  const [data, setData] = useState<number>(0);
  const [userDistance, setUserDistance] = useState<number>(0);
  const [enemyDistance, setEnemyDistance] = useState<number>(0)
  const [userHp, setUserHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);
  useEffect(() => {
    window.addEventListener("message", function (e) {
      if(userDistance !== 0) {
        setUserDistance(e.data.distance);
      } else {
        setData(e.data.distance - userDistance);
      }
    });

    setInterval(() => {
      setEnemyDistance((pre)=> pre+0.0001);
    }, 500)
  }, []);

  useEffect(() => {
    if(Math.floor(data*1000) >= 10){
      setEnemyHp((pre) => pre-10);
      setUserDistance((pre) => pre+0.01)
      setData(0);
    }
    if(Math.floor(enemyDistance*1000) >= 10){
      setUserHp((pre) => pre-10);
      setEnemyDistance(0);
    }
  }, [data, enemyDistance]);

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
