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

import { StoryTop } from "../module/Story";
import Storys from "../json/Storys";

export const StoryPage3 = () => {
  const [storyNumber, setStoryNumber] = useState<number>(Math.floor(Math.random() * Storys.length));
  const [storyTitle, setStoryTitle] = useState("");
  const [storyOptionCount, setStoryOptionCount] = useState(0);
  const [storyParts, setStoryParts] = useState(1);
  const [storyOptionStory, setStoryOptionStory] = useState<string[]>([]);
  const [storyOptionNum, setStoryOptionNum] = useState<number[]>([]);

  const [userMoney, setUserMoney] = useState(0);
  const [userItems, setUserItems] = useState<string[]>([]);
  const [userCharateristic, setUserCharateristic] = useState<string[]>([]);
  const [__, setUserItem] = useState<ItemProps[]>([]);

  const [story, setStory] = useState<JSX.Element[]>([]);

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
      const money = Number(localStorage.getItem("money"));
      setUserMoney(money);
      const item = localStorage.getItem("item");
      setUserItems(item ? JSON.parse(item) : []);
      const charateristic = localStorage.getItem("charateristic");
      setUserCharateristic(charateristic ? JSON.parse(charateristic) : []);
      setUserItem(
        JSON.parse(localStorage.getItem("userData") || "[]").userItem
      );
    } catch (e) {
      console.error("Error: GetUserData()");
      console.error(e);
    }
  };
  const ResultCheck = async (optionNumber: number, resultOption: number) => {
    try {
      if (storyNumber === undefined || progressNumber === undefined) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionResult = option.result[resultOption].resultItem;

      if (optionResult === null || optionResult === undefined) {
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userData") || "[]");
      let userDataItem = userData.userItem;

      const HPResult = (getOrLose: string, num: number) => {

        const getHP = (num:  number) => {
          socket.emit('updateHp', {
            value: num
          });
        }
        const loseHP = (num:  number) => {
          socket.emit('updateHp', {
            value: -num
          });

          socket.on('changedHp', (data) => {
            console.log(data);
          });
        }
        getOrLose === "get"
          ? getHP(num)
          : loseHP(num)
      };
      const MoneyResult = (getOrLose: string, num: number) => {
        const money = Number(localStorage.getItem("money"));
        getOrLose === "get"
          ? localStorage.setItem("money", (money + num).toString())
          : localStorage.setItem("money", (money - num).toString());
      };
      const ItemResult = async (getOrLose: string, num: number) => {
        const existingArray = JSON.parse(localStorage.getItem("item") || "[]");
        //const userDataItem = JSON.parse(localStorage.getItem('userData') || '[]').userItem;
        const itemName = ItemData.items[num - 1].name;
        const addInven = () => {
          userDataItem = AddItemToInventory(Item[itemName]);
          setUserItem(userDataItem);
        };
        const deleteInven = () => {
          userDataItem = DeletItemToInventory(Item[itemName]);
          setUserItem(userDataItem);
        };
        getOrLose === "get"
          ? localStorage.setItem(
              "item",
              JSON.stringify([...existingArray, itemName])
            )
          : userItems.indexOf(itemName) > -1 &&
            localStorage.setItem(
              "item",
              JSON.stringify(
                existingArray.filter((item: string) => item !== itemName)
              )
            );
        getOrLose === "get"
          ? userDataItem.length >= 8
            ? await onAlertDeletItem(Item[itemName])
            : addInven()
          : deleteInven();
      };
      const HungerResult = (getOrLose: string, num: number) => {
        
        const getHunger = (num:  number) => {
          socket.emit('updateHungry ', {
            value: num
          });
        }
        const loseHunger = (num:  number) => {
          socket.emit('updateHungry ', {
            value: -num
          });
        }
        getOrLose === "get"
        ? getHunger(num)
        : loseHunger(num)
      };
      const CharateristicResult = (getOrLose: string, num: number) => {
        const existingArray = JSON.parse(
          localStorage.getItem("charateristic") || "[]"
        );
        const charaterName = CharateristicData.charaters[num - 1].name;
        getOrLose === "get"
          ? localStorage.setItem(
              "charateristic",
              JSON.stringify([...existingArray, charaterName])
            )
          : userCharateristic.indexOf(charaterName) > -1 &&
            localStorage.setItem(
              "charateristic",
              JSON.stringify(
                existingArray.filter((item: string) => item !== charaterName)
              )
            );
      };
      (async () => {
        for (const result of optionResult) {
          switch (result.kind) {
            case "hp":
              HPResult(result.getOrLose, result.number);
              break;
            case "money":
              MoneyResult(result.getOrLose, result.number);
              break;
            case "item":
              await ItemResult(result.getOrLose, result.number);
              break;
            case "charateristic":
              CharateristicResult(result.getOrLose, result.number);
              break;
            case "hunger":
              HungerResult(result.getOrLose, result.number);
              break;
            default:
              console.log("Error: ResultCheck result.kind undifinded");
          }
        }
      })();
    } catch (e) {
      console.error("Error: ResultCheck()");
      console.error(e);
    }
  };
  function roulette(arr: OptionResult[]): number {
    const totalWeight = arr.reduce((acc, val) => acc + (typeof val.random === 'number' ? val.random : 0), 0);
    const randomNum = Math.random() * 100; 

    let cumulativeWeight = 0;
    let defaultOption: OptionResult | null = null;
  
    for (let i = 0; i < arr.length; i++) {
      const option = arr[i];
      if (typeof option.random === 'number') {
        cumulativeWeight += option.random;
        if (randomNum < cumulativeWeight) {
          return i;
        }
      } else if (option.random === 'default') {
        defaultOption = option; 
      }
    }
  
    if (randomNum >= totalWeight && defaultOption !== null) {
      return arr.indexOf(defaultOption);
    }
  
    return -1;
  }
  const NextStory = (optionNumber: number, resultOption: number) => {
    try {
      if (storyNumber === undefined || progressNumber === undefined) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      if (option.result[resultOption].nextProgress === undefined) {
        SendMapEndStory();
        NextStoryPart();
      } else {
        const optionNextStory = Number(
          option.result[resultOption].nextProgress?.split("-")[1]
        );
        setProgressNumber(optionNextStory - 1);
      }

      const optionZombie = option.result[resultOption].zombie;
      if (optionZombie === undefined) {
        return;
      } else {
        //SendAndroidZombie(optionZombie);
      }
    } catch (e) {
      console.error("Error: NextStory()");
      console.error(e);
    }
  };
  const SendMapEndStory = () => {
    try {
      return window.parent.postMessage(true, '*');
    } catch (e) {
      console.error("Error: StoryPage - window.Android.webViewIsVisible()");
      console.error(e);
    }
  };
  const AddItemStory = (optionNumber: number, resultOption: number) => {
    try {
      if (storyNumber === undefined || progressNumber === undefined) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionResult = option.result[resultOption].resultItem;
      if (optionResult === null || optionResult === undefined) {
        return;
      }
      const contents:React.ReactNode[] = [];
      optionResult.map((result, i) => {
        let list = "";
        const optionGetOrLose = result.getOrLose;
        const optionNumber = result.number;
        const optionKind = result.kind;

        if (i > 0) {
          contents.push(<>&nbsp;</>)
        }
        if(optionResult[i-1]?.kind !== optionKind) {
          switch (optionKind) {
            case "hp":
              list += "체력 ";
              break;
            case "money":
              list += "돈 ";
              break;
            case "item":
              list += "";
              break;
            case "charateristic":
              list += "";
              break;
            default:
              console.error("Error: AddItemStory() unfinded optionKind");
          }
        }
        switch (optionGetOrLose) {
          case "get":
            list += "+";
            break;
          case "lose":
            list += "-";
            break;
          default:
            console.error("Error: AddItemStory() unfinded optionGetOrLose");
        }
        switch (optionKind) {
          case "hp":
            const hp = optionNumber.toString(10);
            list += hp;
            break;
          case "money":
            const money = optionNumber.toString(10);
            list += money;
            break;
          case "item":
            if (
              optionNumber - 1 >= 0 &&
              optionNumber - 1 < ItemData.items.length
            ) {
              const itemName = ItemData.items[optionNumber - 1].name;
              list += itemName;
            } else {
              console.error("Error: AddItemStory() invalid item optionNumber");
            }
            break;
          case "charateristic":
            if (
              optionNumber - 1 >= 0 &&
              optionNumber - 1 < CharateristicData.charaters.length
            ) {
              const charateristicName =
                CharateristicData.charaters[optionNumber - 1].name;
              list += charateristicName;
            } else {
              console.error(
                "Error: AddItemStory() invalid charateristic optionNumber"
              );
            }
            break;
          default:
            console.error("Error: AddItemStory() unfinded optionKind");
        }
        switch (optionGetOrLose) {
          case "get":
            contents.push(<p className="text-green-500">{list}</p>)
            break;
          case "lose":
            contents.push(<p className="text-red-500">{list}</p>)
            break;
          default:
            console.error("Error: AddItemStory() unfinded optionGetOrLose");
        }
      });
      const keyValue = optionNumber * 1000;
      // return <div key={keyValue} className="flex rounded-md items-center justify-center mx-10 font-bold bg-gray-300 w-[9/10] h-[50px] rounded-6 mb-1">
      // {list}</div>
      return <span key={keyValue}  className="flex ">
        {contents.map((list, index) => (
          <React.Fragment key={index}>{list}</React.Fragment>
        ))}
      </span>
    } catch (e) {
      console.error("Error: AddItemStory()");
      console.error(e);
    }
  };
  const AddStoryUser = (optionNumber: number) => {
    try {
      if (storyNumber === undefined || progressNumber === undefined) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionName = option.text;
      return <p className="pb-1 text-base font-medium text-zinc-900" key={optionNumber}>나: {optionName}</p>;
    } catch (e) {
      console.error("Error: AddStoryUser()");
      console.error(e);
    }
  };
  const OpenStroy = (optionNumber: number, resultOption: number) => {
    try {
      if (storyNumber === undefined || progressNumber === undefined) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionOpenStory = option.result[resultOption].openStroy;
      if (optionOpenStory === null || optionOpenStory === undefined) {
        return;
      }
      const storyNum = Number(optionOpenStory.split("-")[1]);
      const existingArray = JSON.parse(
        localStorage.getItem("readAbleStory") || "[]"
      );
      !existingArray.find((item: number) => item === storyNum) &&
        localStorage.setItem(
          "readAbleStory",
          JSON.stringify([...existingArray, storyNum])
        );
    } catch (e) {
      console.error("Error: OpenStroy()");
      console.error(e);
    }
  };
  const NextStoryPart = () => {
    try {
      const storyRead = JSON.parse(localStorage.getItem("readStory") || "[]");
      const storyReadNum = storyRead.length;
      if (storyReadNum > 2) {
        const storyPart = Number(localStorage.getItem("storyParts"));
        if (jsonStory.length > storyPart + 1) {
          localStorage.setItem("storyParts", (storyPart + 1).toString(10));
          setStoryParts(storyPart + 1);
        } else {
          localStorage.setItem("storyParts", (1).toString(10));
          setStoryParts(1);
        }
        localStorage.setItem("readStory", JSON.stringify([]));
      }
    } catch (e) {
      console.error("Error: NextStoryPart()");
      console.error(e);
    }
  };
  const RandomResult = (optionNumber: number) => {
    if (storyNumber === undefined || progressNumber === undefined) {
      return 0;
    }

    let option;
    if (storyOptionStory[optionNumber] === "next") {
      option = jsonOption[0][0][0];
    } else {
      option =
        jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
    }

    const optionResult = option.result;
    const result = roulette(optionResult);
    if(result === undefined || result === -1)
      return 0;
    return result;
  }

  const onAlertDeletItem = async (item: ItemProps[string]) => {
    const AlertLeftButton = async () => {
      await onInventorySelect(item);
    };
    const AlertRightButton = () => {};

    const result = await alert(
      `가방에 ${item.name}${ChooseParticle(item.name)} 넣을 자리가 없다`,
      "가방이 가득 찼어요\n아이템을 버려야 해요",
      `가방에서 교체한다`,
      `${item.name}${ChooseParticle(item.name)} 포기한다`
    );
    result ? AlertRightButton() : await AlertLeftButton();
  };
  const onInventorySelect = async (item: ItemProps[string]) => {
    const CancleToDeleteItem = async () => {
      await onAlertDeletItem(item);
    };
    const DeleteSelectItem = () => {
      const userData = JSON.parse(localStorage.getItem("userData") || "[]");
      let userDataItem = userData.userItem;

      const deleItem: ItemProps[string] =
        Item[userDataItem[result].name.toString()];
      setUserItem(DeletItemToInventory(deleItem, result));
      AddItemToInventory(item);
    };

    const result = await invenSelect("취소", "버리기");
    result === -1 ? await CancleToDeleteItem() : DeleteSelectItem();
  };

  useEffect(() => {
    sendSocket();

    GetStoryData();
    GetUserData();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white"> 
      <StoryTop story={Storys[storyNumber]}/>
    </div>
  );
};