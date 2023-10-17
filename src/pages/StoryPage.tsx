import React, { Fragment, useEffect, useState, useContext } from "react";
import { DeletItemToInventory, AddItemToInventory, useSocket } from "../hooks";
//Demo Data
//import StoryData from '../json/DemoStory4.json';
import { jsonOption, OptionResult } from "../json/DemoOption";
import { jsonStory } from "../json/DemoStory";
import Item, { ItemProps } from "../json/DemoItem";

import { AlertContext, InventorySelectContext } from "../module/index";

import ItemData from "../json/DemoItem2.json";
import CharateristicData from "../json/DemoCharateristic.json";

import { ChooseParticle, SetUserData, useButtonDelay } from "../hooks";
import { ProgressBar } from "../Components";
import { StoryTop } from "../module/Story";
import Storys from "../json/Storys";

export const StoryPage = () => {
  const [storyNumber, setStoryNumber] = useState<number>(
    Math.floor(Math.random() * Storys.length)
  );

  const { alert } = useContext(AlertContext);
  const { invenSelect } = useContext(InventorySelectContext);

  const sendSocket = () => {
    try {
      const socket = useSocket();

      const userId = "test";
      const clientType = 1;

      socket.emit("start", { userId, clientType });
    } catch (err) {
      console.error("Error Socket: " + err);
    }
  };

  const GetStoryData = () => {
    console.log(Storys);
    // setStoryOptionNum(
    //   jsonStory[storyParts][storyNumber].progressStory[
    //     progressNumber
    //   ].optionNumber.map((option) => Number(option.split("-")[1]) - 1)
    // );
    // setStoryOptionStory(
    //   jsonStory[storyParts][storyNumber].progressStory[
    //     progressNumber
    //   ].optionNumber.map((option) => option.split("-")[0])
    // );
    // setStoryOptionCount(
    //   jsonStory[storyParts][storyNumber].progressStory[progressNumber]
    //     .optionNumber.length
    // );
    // const storyList = [...story];
    // const keyValue = storyNumber * 100 + progressNumber;
    // // setMessage(jsonStory[storyParts][storyNumber].progressStory[progressNumber].storyText)
    // // setTestStory(
    // //   {img: jsonStory[storyParts][storyNumber].progressStory[progressNumber].img,
    // //     story: jsonStory[storyParts][storyNumber].progressStory[progressNumber].storyText
    // //   } as Test)
    // storyList.push(
    //   <p className="pb-1 text-base font-medium text-zinc-900" key={keyValue}>
    //       {
    //           jsonStory[storyParts][storyNumber].progressStory[progressNumber]
    //           .storyText
    //       }
    //   </p>
    // );
    // setStory(storyList);
  };
  const GetUserData = () => {
    try {
    } catch (e) {
      console.error("Error: GetUserData()");
      console.error(e);
    }
  };

  return (
    <div className="relative flex flex-col w-screen h-screen bg-white">
      <button
        onClick={SetUserData}
        className="absolute right-0 p-1.5 bg-black rounded-[100px] shadow justify-start items-start gap-[5.71px] flex"
      >
        <svg
          className="relative w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
        >
          <path
            d="M2.25642 15.9165C1.84215 15.9165 1.48752 15.7707 1.19252 15.479C0.897507 15.1874 0.75 14.8391 0.75 14.4342V4.83486C0.75 4.0934 0.986111 3.44463 1.45833 2.88854C1.93056 2.33245 2.52778 1.98122 3.25 1.83486V0.836461C3.25 0.623059 3.32219 0.444176 3.46656 0.299815C3.61092 0.15544 3.78981 0.083252 4.00321 0.083252H4.5801C4.79352 0.083252 4.97241 0.15544 5.11677 0.299815C5.26113 0.444176 5.33331 0.623059 5.33331 0.836461V1.74992H8.66665V0.836461C8.66665 0.623059 8.73883 0.444176 8.88319 0.299815C9.02755 0.15544 9.20644 0.083252 9.41985 0.083252H9.99675C10.2102 0.083252 10.389 0.15544 10.5334 0.299815C10.6778 0.444176 10.75 0.623059 10.75 0.836461V1.83486C11.4722 1.98122 12.0694 2.33245 12.5416 2.88854C13.0138 3.44463 13.25 4.0934 13.25 4.83486V14.4342C13.25 14.8391 13.1025 15.1874 12.8074 15.479C12.5124 15.7707 12.1578 15.9165 11.7435 15.9165H2.25642ZM2.25642 14.6666H11.7435C11.8183 14.6666 11.8798 14.6439 11.9279 14.5985C11.9759 14.553 12 14.4983 12 14.4342V4.83486C12 4.33025 11.8164 3.89827 11.4492 3.53892C11.082 3.17957 10.6406 2.9999 10.125 2.9999H3.875C3.35936 2.9999 2.91795 3.17957 2.55077 3.53892C2.18358 3.89827 1.99998 4.33025 1.99998 4.83486V14.4342C1.99998 14.4983 2.02402 14.553 2.0721 14.5985C2.12019 14.6439 2.18163 14.6666 2.25642 14.6666ZM9.33975 9.52232V10.532C9.33975 10.709 9.39967 10.8575 9.5195 10.9773C9.63935 11.097 9.78785 11.1569 9.965 11.1569C10.1422 11.1569 10.2906 11.097 10.4102 10.9773C10.5299 10.8575 10.5897 10.709 10.5897 10.532V9.02554C10.5897 8.81214 10.5175 8.63326 10.3732 8.4889C10.2288 8.34454 10.0499 8.27236 9.83652 8.27236H4.03523C3.85815 8.27236 3.70972 8.33228 3.58994 8.45213C3.47015 8.57196 3.41025 8.72046 3.41025 8.89763C3.41025 9.07478 3.47015 9.22318 3.58994 9.34284C3.70972 9.46249 3.85815 9.52232 4.03523 9.52232H9.33975Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="h-10 " />
      <div className="inline-flex flex-col items-start justify-center w-full gap-1 px-5">
        <ProgressBar max={100} value={70} className="w-40 h-4 pr-4" />
        <ProgressBar
          max={100}
          value={70}
          color="#EBF0CE"
          className="w-40 h-4 pr-4"
        />
      </div>
      <StoryTop story={Storys[storyNumber]} />
    </div>
  );
};
