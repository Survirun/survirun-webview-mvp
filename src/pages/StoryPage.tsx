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
    // setStoryTitle(jsonStory[storyParts][storyNumber].storyTitle);
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
  // const ResultCheck = async (optionNumber: number, resultOption: number) => {
  //   try {
  //     if (storyNumber === undefined || progressNumber === undefined) {
  //       return;
  //     }

  //     let option;
  //     if (storyOptionStory[optionNumber] === "next") {
  //       option = jsonOption[0][0][0];
  //     } else {
  //       option =
  //         jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //     }

  //     const optionResult = option.result[resultOption].resultItem;

  //     if (optionResult === null || optionResult === undefined) {
  //       return;
  //     }

  //     const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  //     let userDataItem = userData.userItem;

  //     const HPResult = (getOrLose: string, num: number) => {

  //       const getHP = (num:  number) => {
  //         socket.emit('updateHp', {
  //           value: num
  //         });
  //       }
  //       const loseHP = (num:  number) => {
  //         socket.emit('updateHp', {
  //           value: -num
  //         });

  //         socket.on('changedHp', (data) => {
  //           console.log(data);
  //         });
  //       }
  //       getOrLose === "get"
  //         ? getHP(num)
  //         : loseHP(num)
  //     };
  //     const MoneyResult = (getOrLose: string, num: number) => {
  //       const money = Number(localStorage.getItem("money"));
  //       getOrLose === "get"
  //         ? localStorage.setItem("money", (money + num).toString())
  //         : localStorage.setItem("money", (money - num).toString());
  //     };
  //     const ItemResult = async (getOrLose: string, num: number) => {
  //       const existingArray = JSON.parse(localStorage.getItem("item") || "[]");
  //       //const userDataItem = JSON.parse(localStorage.getItem('userData') || '[]').userItem;
  //       const itemName = ItemData.items[num - 1].name;
  //       const addInven = () => {
  //         userDataItem = AddItemToInventory(Item[itemName]);
  //         setUserItem(userDataItem);
  //       };
  //       const deleteInven = () => {
  //         userDataItem = DeletItemToInventory(Item[itemName]);
  //         setUserItem(userDataItem);
  //       };
  //       getOrLose === "get"
  //         ? localStorage.setItem(
  //             "item",
  //             JSON.stringify([...existingArray, itemName])
  //           )
  //         : userItems.indexOf(itemName) > -1 &&
  //           localStorage.setItem(
  //             "item",
  //             JSON.stringify(
  //               existingArray.filter((item: string) => item !== itemName)
  //             )
  //           );
  //       getOrLose === "get"
  //         ? userDataItem.length >= 8
  //           ? await onAlertDeletItem(Item[itemName])
  //           : addInven()
  //         : deleteInven();
  //     };
  //     const HungerResult = (getOrLose: string, num: number) => {

  //       const getHunger = (num:  number) => {
  //         socket.emit('updateHungry ', {
  //           value: num
  //         });
  //       }
  //       const loseHunger = (num:  number) => {
  //         socket.emit('updateHungry ', {
  //           value: -num
  //         });
  //       }
  //       getOrLose === "get"
  //       ? getHunger(num)
  //       : loseHunger(num)
  //     };
  //     const CharateristicResult = (getOrLose: string, num: number) => {
  //       const existingArray = JSON.parse(
  //         localStorage.getItem("charateristic") || "[]"
  //       );
  //       const charaterName = CharateristicData.charaters[num - 1].name;
  //       getOrLose === "get"
  //         ? localStorage.setItem(
  //             "charateristic",
  //             JSON.stringify([...existingArray, charaterName])
  //           )
  //         : userCharateristic.indexOf(charaterName) > -1 &&
  //           localStorage.setItem(
  //             "charateristic",
  //             JSON.stringify(
  //               existingArray.filter((item: string) => item !== charaterName)
  //             )
  //           );
  //     };
  //     (async () => {
  //       for (const result of optionResult) {
  //         switch (result.kind) {
  //           case "hp":
  //             HPResult(result.getOrLose, result.number);
  //             break;
  //           case "money":
  //             MoneyResult(result.getOrLose, result.number);
  //             break;
  //           case "item":
  //             await ItemResult(result.getOrLose, result.number);
  //             break;
  //           case "charateristic":
  //             CharateristicResult(result.getOrLose, result.number);
  //             break;
  //           case "hunger":
  //             HungerResult(result.getOrLose, result.number);
  //             break;
  //           default:
  //             console.log("Error: ResultCheck result.kind undifinded");
  //         }
  //       }
  //     })();
  //   } catch (e) {
  //     console.error("Error: ResultCheck()");
  //     console.error(e);
  //   }
  // };
  // function roulette(arr: OptionResult[]): number {
  //   const totalWeight = arr.reduce((acc, val) => acc + (typeof val.random === 'number' ? val.random : 0), 0);
  //   const randomNum = Math.random() * 100;

  //   let cumulativeWeight = 0;
  //   let defaultOption: OptionResult | null = null;

  //   for (let i = 0; i < arr.length; i++) {
  //     const option = arr[i];
  //     if (typeof option.random === 'number') {
  //       cumulativeWeight += option.random;
  //       if (randomNum < cumulativeWeight) {
  //         return i;
  //       }
  //     } else if (option.random === 'default') {
  //       defaultOption = option;
  //     }
  //   }

  //   if (randomNum >= totalWeight && defaultOption !== null) {
  //     return arr.indexOf(defaultOption);
  //   }

  //   return -1;
  // }
  // const NextStory = (optionNumber: number, resultOption: number) => {
  //   try {
  //     if (storyNumber === undefined || progressNumber === undefined) {
  //       return;
  //     }

  //     let option;
  //     if (storyOptionStory[optionNumber] === "next") {
  //       option = jsonOption[0][0][0];
  //     } else {
  //       option =
  //         jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //     }

  //     if (option.result[resultOption].nextProgress === undefined) {
  //       SendMapEndStory();
  //       NextStoryPart();
  //     } else {
  //       const optionNextStory = Number(
  //         option.result[resultOption].nextProgress?.split("-")[1]
  //       );
  //       setProgressNumber(optionNextStory - 1);
  //     }

  //     const optionZombie = option.result[resultOption].zombie;
  //     if (optionZombie === undefined) {
  //       return;
  //     } else {
  //       //SendAndroidZombie(optionZombie);
  //     }
  //   } catch (e) {
  //     console.error("Error: NextStory()");
  //     console.error(e);
  //   }
  // };
  // const SendMapEndStory = () => {
  //   try {
  //     return window.parent.postMessage(true, '*');
  //   } catch (e) {
  //     console.error("Error: StoryPage - window.Android.webViewIsVisible()");
  //     console.error(e);
  //   }
  // };
  // const AddItemStory = (optionNumber: number, resultOption: number) => {
  //   try {
  //     if (storyNumber === undefined || progressNumber === undefined) {
  //       return;
  //     }

  //     let option;
  //     if (storyOptionStory[optionNumber] === "next") {
  //       option = jsonOption[0][0][0];
  //     } else {
  //       option =
  //         jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //     }

  //     const optionResult = option.result[resultOption].resultItem;
  //     if (optionResult === null || optionResult === undefined) {
  //       return;
  //     }
  //     const contents:React.ReactNode[] = [];
  //     optionResult.map((result, i) => {
  //       let list = "";
  //       const optionGetOrLose = result.getOrLose;
  //       const optionNumber = result.number;
  //       const optionKind = result.kind;

  //       if (i > 0) {
  //         contents.push(<>&nbsp;</>)
  //       }
  //       if(optionResult[i-1]?.kind !== optionKind) {
  //         switch (optionKind) {
  //           case "hp":
  //             list += "체력 ";
  //             break;
  //           case "money":
  //             list += "돈 ";
  //             break;
  //           case "item":
  //             list += "";
  //             break;
  //           case "charateristic":
  //             list += "";
  //             break;
  //           default:
  //             console.error("Error: AddItemStory() unfinded optionKind");
  //         }
  //       }
  //       switch (optionGetOrLose) {
  //         case "get":
  //           list += "+";
  //           break;
  //         case "lose":
  //           list += "-";
  //           break;
  //         default:
  //           console.error("Error: AddItemStory() unfinded optionGetOrLose");
  //       }
  //       switch (optionKind) {
  //         case "hp":
  //           const hp = optionNumber.toString(10);
  //           list += hp;
  //           break;
  //         case "money":
  //           const money = optionNumber.toString(10);
  //           list += money;
  //           break;
  //         case "item":
  //           if (
  //             optionNumber - 1 >= 0 &&
  //             optionNumber - 1 < ItemData.items.length
  //           ) {
  //             const itemName = ItemData.items[optionNumber - 1].name;
  //             list += itemName;
  //           } else {
  //             console.error("Error: AddItemStory() invalid item optionNumber");
  //           }
  //           break;
  //         case "charateristic":
  //           if (
  //             optionNumber - 1 >= 0 &&
  //             optionNumber - 1 < CharateristicData.charaters.length
  //           ) {
  //             const charateristicName =
  //               CharateristicData.charaters[optionNumber - 1].name;
  //             list += charateristicName;
  //           } else {
  //             console.error(
  //               "Error: AddItemStory() invalid charateristic optionNumber"
  //             );
  //           }
  //           break;
  //         default:
  //           console.error("Error: AddItemStory() unfinded optionKind");
  //       }
  //       switch (optionGetOrLose) {
  //         case "get":
  //           contents.push(<p className="text-green-500">{list}</p>)
  //           break;
  //         case "lose":
  //           contents.push(<p className="text-red-500">{list}</p>)
  //           break;
  //         default:
  //           console.error("Error: AddItemStory() unfinded optionGetOrLose");
  //       }
  //     });
  //     const keyValue = optionNumber * 1000;
  //     // return <div key={keyValue} className="flex rounded-md items-center justify-center mx-10 font-bold bg-gray-300 w-[9/10] h-[50px] rounded-6 mb-1">
  //     // {list}</div>
  //     return <span key={keyValue}  className="flex ">
  //       {contents.map((list, index) => (
  //         <React.Fragment key={index}>{list}</React.Fragment>
  //       ))}
  //     </span>
  //   } catch (e) {
  //     console.error("Error: AddItemStory()");
  //     console.error(e);
  //   }
  // };
  // const AddStoryUser = (optionNumber: number) => {
  //   try {
  //     if (storyNumber === undefined || progressNumber === undefined) {
  //       return;
  //     }

  //     let option;
  //     if (storyOptionStory[optionNumber] === "next") {
  //       option = jsonOption[0][0][0];
  //     } else {
  //       option =
  //         jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //     }

  //     const optionName = option.text;
  //     return <p className="pb-1 text-base font-medium text-zinc-900" key={optionNumber}>나: {optionName}</p>;
  //   } catch (e) {
  //     console.error("Error: AddStoryUser()");
  //     console.error(e);
  //   }
  // };
  // const OpenStroy = (optionNumber: number, resultOption: number) => {
  //   try {
  //     if (storyNumber === undefined || progressNumber === undefined) {
  //       return;
  //     }

  //     let option;
  //     if (storyOptionStory[optionNumber] === "next") {
  //       option = jsonOption[0][0][0];
  //     } else {
  //       option =
  //         jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //     }

  //     const optionOpenStory = option.result[resultOption].openStroy;
  //     if (optionOpenStory === null || optionOpenStory === undefined) {
  //       return;
  //     }
  //     const storyNum = Number(optionOpenStory.split("-")[1]);
  //     const existingArray = JSON.parse(
  //       localStorage.getItem("readAbleStory") || "[]"
  //     );
  //     !existingArray.find((item: number) => item === storyNum) &&
  //       localStorage.setItem(
  //         "readAbleStory",
  //         JSON.stringify([...existingArray, storyNum])
  //       );
  //   } catch (e) {
  //     console.error("Error: OpenStroy()");
  //     console.error(e);
  //   }
  // };
  // const NextStoryPart = () => {
  //   try {
  //     const storyRead = JSON.parse(localStorage.getItem("readStory") || "[]");
  //     const storyReadNum = storyRead.length;
  //     if (storyReadNum > 2) {
  //       const storyPart = Number(localStorage.getItem("storyParts"));
  //       if (jsonStory.length > storyPart + 1) {
  //         localStorage.setItem("storyParts", (storyPart + 1).toString(10));
  //         setStoryParts(storyPart + 1);
  //       } else {
  //         localStorage.setItem("storyParts", (1).toString(10));
  //         setStoryParts(1);
  //       }
  //       localStorage.setItem("readStory", JSON.stringify([]));
  //     }
  //   } catch (e) {
  //     console.error("Error: NextStoryPart()");
  //     console.error(e);
  //   }
  // };
  // const RandomResult = (optionNumber: number) => {
  //   if (storyNumber === undefined || progressNumber === undefined) {
  //     return 0;
  //   }

  //   let option;
  //   if (storyOptionStory[optionNumber] === "next") {
  //     option = jsonOption[0][0][0];
  //   } else {
  //     option =
  //       jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
  //   }

  //   const optionResult = option.result;
  //   const result = roulette(optionResult);
  //   if(result === undefined || result === -1)
  //     return 0;
  //   return result;
  // }

  // const onAlertDeletItem = async (item: ItemProps[string]) => {
  //   const AlertLeftButton = async () => {
  //     await onInventorySelect(item);
  //   };
  //   const AlertRightButton = () => {};

  //   const result = await alert(
  //     `가방에 ${item.name}${ChooseParticle(item.name)} 넣을 자리가 없다`,
  //     "가방이 가득 찼어요\n아이템을 버려야 해요",
  //     `가방에서 교체한다`,
  //     `${item.name}${ChooseParticle(item.name)} 포기한다`
  //   );
  //   result ? AlertRightButton() : await AlertLeftButton();
  // };
  // const onInventorySelect = async (item: ItemProps[string]) => {
  //   const CancleToDeleteItem = async () => {
  //     await onAlertDeletItem(item);
  //   };
  //   const DeleteSelectItem = () => {
  //     const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  //     let userDataItem = userData.userItem;

  //     const deleItem: ItemProps[string] =
  //       Item[userDataItem[result].name.toString()];
  //     setUserItem(DeletItemToInventory(deleItem, result));
  //     AddItemToInventory(item);
  //   };

  //   const result = await invenSelect("취소", "버리기");
  //   result === -1 ? await CancleToDeleteItem() : DeleteSelectItem();
  // };

  // useEffect(() => {
  //   sendSocket();

  //   GetStoryData();
  //   GetUserData();
  // }, []);

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
