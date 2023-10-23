import { useEffect, useState } from "react";
import { UpProgress } from "../Components";

function createBattle() {
  return (
    <>
      <UpProgress width={50} height={400} max={100} value={80} color="#fd3232" bgColor="#fff"/>
      <UpProgress width={100} height={400} max={100} value={80} color="#fd3232" bgColor="#fff"/>
    </>
  );
}

export const BattlePage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    window.addEventListener("message", function (e) {
      setData(e.data.distance);
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex-row w-full bg-black h-1/2">
        {createBattle()}
        </div>
      <div className="flex-row-reverse w-full h-1/2 bg-slate-400">
        {createBattle()}
      </div>
    </div>
  );
};
