import { useEffect, useState } from "react";
import { UpProgress } from "../Components";

function createBattle(hp: number, maxHp: number, distance: number ) {
  return (
    <>
      <UpProgress width={16} max={maxHp} value={hp} color="#fd3232" bgColor="#F0EFF5"/>
      <div className="flex flex-col h-full">
        <div className="justify-start flex-initial p-1 w-[76px]">{Math.floor(distance*1000)}m / 10m</div>
        <UpProgress className="flex-1" width={76} max={100} value={distance*1000} color="#5539FF" bgColor="#F0EFF5"/>
      </div>
      <div className="flex-1 h-full my-5 rounded-2xl bg-slate-500">

      </div>
    </>
  );
}

export const BattlePage = () => {
  const [data, setData] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("message", function (e) {
      setData(e.data.distance);
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row items-center justify-center w-full gap-4 p-6 h-1/2">
        {createBattle(100, 100, 0.001)}
        </div>
      <div className="flex flex-row-reverse items-center justify-center w-full gap-4 p-6 h-1/2">
        {createBattle(100, 100, data)}
      </div>
    </div>
  );
};
