import styled from "@emotion/styled";

import { Fragment, useEffect, useState, useContext } from "react";
import { DeletItemToInventory, AddItemToInventory } from "../hooks";
//Demo Data
//import StoryData from '../json/DemoStory4.json';
import { jsonOption } from "../json/DemoOption";
import { jsonStory } from "../json/DemoStory";
import Item, { ItemProps } from "../json/DemoItem";

import { AlertContext, InventorySelectContext } from "../module/index";

import ItemData from "../json/DemoItem2.json";
import CharateristicData from "../json/DemoCharateristic.json";

import { chooseParticle } from "../hooks";

//@ts-ignore
interface Window {
  Android?: {
    webViewIsVisible: () => void | undefined;
    zombie: (zombieNumber: number) => void | undefined;
  };
}

export const StoryPage3 = () => {
  const [storyNumber, setStoryNumber] = useState<null | number>(null);
  const [progressNumber, setProgressNumber] = useState<null | number>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyOptionCount, setStoryOptionCount] = useState(0);
  const [storyParts, setStoryParts] = useState(1);
  const [storyOptionStory, setStoryOptionStory] = useState<string[]>([]);
  const [storyOptionNum, setStoryOptionNum] = useState<number[]>([]);

  const [_, setUserHP] = useState(0);
  const [userMoney, setUserMoney] = useState(0);
  const [userItems, setUserItems] = useState<string[]>([]);
  const [userCharateristic, setUserCharateristic] = useState<string[]>([]);
  const [__, setUserItem] = useState<ItemProps[]>([]);

  const [story, setStory] = useState<JSX.Element[]>([]);

  const { alert } = useContext(AlertContext);
  const { invenSelect } = useContext(InventorySelectContext);

  const SetUserData = () => {
    try {
      localStorage.setItem("hp", "3");
      localStorage.setItem("money", "3");
      localStorage.setItem("item", JSON.stringify([]));
      localStorage.setItem("charateristic", JSON.stringify(["위협"]));
      localStorage.setItem("readAbleStory", JSON.stringify([]));
      localStorage.setItem("readStory", JSON.stringify([]));
      localStorage.setItem("storyParts", "1");
      const subCharater = {
        "테스트 캐릭터1": {
          open: false,
          progress: 0,
        },
        "테스트 캐릭터2": {
          open: false,
          progress: 0,
        },
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({ userItem: [], subCharater: subCharater })
      );
    } catch (e) {
      console.error("Error: SetUserData()");
      console.error(e);
    }
  };
  const GetRanDomStoryNumber = () => {
    try {
      setStory([]);
      let number = Math.floor(Math.random() * jsonStory[storyParts].length);
      let storyOpenCheck = jsonStory[storyParts][number].addition?.open;
      let storyOnce = jsonStory[storyParts][number].addition?.once;
      const readAbleStory = JSON.parse(
        localStorage.getItem("readAbleStory") || "[]"
      );
      const readStory = JSON.parse(localStorage.getItem("readStory") || "[]");

      while (
        (!storyOpenCheck && !readAbleStory.includes(number + 1)) ||
        (storyOnce === true && readStory.includes(number + 1))
      ) {
        number = Math.floor(Math.random() * jsonStory[storyParts].length);
        storyOpenCheck = jsonStory[storyParts][number].addition?.open;
        storyOnce = jsonStory[storyParts][number].addition?.once;
      }

      setStoryNumber(number);
      setProgressNumber(0);
    } catch (e) {
      console.error("Error: GetRanDomStoryNumber()");
      console.error(e);
    }
  };
  const GetStoryData = () => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }
      const existingArray: number[] = JSON.parse(
        localStorage.getItem("readStory") || "[]"
      );
      const isStoryNumberExists = existingArray.some(
        (item) => item === storyNumber
      );

      if (!isStoryNumberExists) {
        existingArray.push(storyNumber);
        localStorage.setItem("readStory", JSON.stringify(existingArray));
      }

      setStoryTitle(jsonStory[storyParts][storyNumber].storyTitle);
      setStoryOptionNum(
        jsonStory[storyParts][storyNumber].progressStory[
          progressNumber
        ].optionNumber.map((option) => Number(option.split("-")[1]) - 1)
      );
      setStoryOptionStory(
        jsonStory[storyParts][storyNumber].progressStory[
          progressNumber
        ].optionNumber.map((option) => option.split("-")[0])
      );
      setStoryOptionCount(
        jsonStory[storyParts][storyNumber].progressStory[progressNumber]
          .optionNumber.length
      );
      const storyList = [...story];
      const keyValue = storyNumber * 100 + progressNumber;
      storyList.push(
        <p className="pb-1 text-zinc-900 text-base font-medium" key={keyValue}>
            {
                jsonStory[storyParts][storyNumber].progressStory[progressNumber]
                .storyText
            }
        </p>
      );
      setStory(storyList);
    } catch (e) {
      console.error("Error: GetStoryData()");
      console.error(e);
    }
  };
  const GetUserData = () => {
    try {
      const hp = Number(localStorage.getItem("hp"));
      setUserHP(hp);
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
  const ButtonOptionName = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
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

      let text = optionName;
        return text;
    
    } catch (e) {
      console.error("Error: ButtonOptionName()");
      console.error(e);
    }
  };
  const ButtonOptionConditionName = (optionNumber: number) => {
    if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionCondition = option.addition.condition;

      let text = "";

      if (optionCondition === undefined || optionCondition === null) {
        return text;
      }

      text += "("
      
      optionCondition.map((condition, index) => {
        condition.kind === "item"
          ? (text =
              text +
              (index === 0 ? "" : ", ") +
              ItemData.items[Number(condition.number) - 1].name)
          : (text =
              text +
              (index === 0 ? "" : ", ") +
              CharateristicData.charaters[Number(condition.number) - 1].name);
      });
      return text + " 필요)";
  }
  const ButtonDisable = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }
      const optionCondition = option.addition.condition;

      if (optionCondition === undefined || optionCondition === null)
        return false;

      let result = false;

      const MoneyDisable = (num: number) => {
        return userMoney >= num ? false : true;
      };
      const ItemDisable = (num: number) => {
        const itemName = ItemData.items[num - 1].name;
        return userItems.indexOf(itemName) > -1
          ? (result = false)
          : (result = true);
      };
      const CharateristicDisable = (num: number) => {
        const charateristicName = CharateristicData.charaters[num - 1].name;
        return userCharateristic.indexOf(charateristicName) > -1
          ? (result = false)
          : (result = true);
      };
      optionCondition.map((condition) => {
        switch (condition.kind) {
          case "money":
            result = result || MoneyDisable(condition.number);
            break;
          case "item":
            result = result || ItemDisable(condition.number);
            break;
          case "charateristic":
            result = result || CharateristicDisable(condition.number);
            break;
          default:
            console.log("Error: ButtonDisable condition.kind undifinded");
        }
      });
      return result;
    } catch (e) {
      console.error("Error: ButtonDisable()");
      console.error(e);
    }
  };
  const ResultCheck = async (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionResult = option.addition.result;

      if (optionResult === null || optionResult === undefined) {
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userData") || "[]");
      let userDataItem = userData.userItem;

      const HPResult = (getOrLose: string, num: number) => {
        const hp = Number(localStorage.getItem("hp"));
        getOrLose === "get"
          ? localStorage.setItem("hp", (hp + num).toString())
          : localStorage.setItem("hp", (hp - num).toString());
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
  const NextStory = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      if (option.addition.nextProgress === null) {
        SendAndroidEndStory();
        NextStoryPart();
      } else {
        const optionNextStory = Number(
          option.addition.nextProgress?.split("-")[1]
        );
        setProgressNumber(optionNextStory - 1);
      }

      const optionZombie = option.addition.zombie;
      if (optionZombie === null || optionZombie === undefined) {
        return;
      } else {
        SendAndroidZombie(optionZombie);
      }
    } catch (e) {
      console.error("Error: NextStory()");
      console.error(e);
    }
  };
  const SendAndroidEndStory = () => {
    try {
      return window.Android?.webViewIsVisible();
    } catch (e) {
      console.error("Error: StoryPage - window.Android.webViewIsVisible()");
      console.error(e);
    }
  };
  const SendAndroidZombie = (optionZombie: number) => {
    try {
      window.Android?.zombie(optionZombie);
    } catch (e) {
      console.error("Error: window.Android.zombie()");
      console.error(e);
    }
  };
  const AddItemStory = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionResult = option.addition.result;
      if (optionResult === null || optionResult === undefined) {
        return;
      }
      let list = "";
      optionResult.map((result, i) => {
        const optionGetOrLose = result.getOrLose;
        const optionNumber = result.number;
        const optionKind = result.kind;

        if (i > 0) {
          list += ", ";
        }
        switch (optionGetOrLose) {
          case "get":
            list += "+ ";
            break;
          case "lose":
            list += "- ";
            break;
          default:
            console.error("Error: AddItemStory() unfinded optionGetOrLose");
        }
        switch (optionKind) {
          case "hp":
            list += "체력: ";
            break;
          case "money":
            list += "돈: ";
            break;
          case "item":
            list += "아아템: ";
            break;
          case "charateristic":
            list += "특성: ";
            break;
          default:
            console.error("Error: AddItemStory() unfinded optionKind");
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
      });
      const keyValue = optionNumber * 1000;
      return <GetItemBox key={keyValue}>{list}</GetItemBox>;
    } catch (e) {
      console.error("Error: AddItemStory()");
      console.error(e);
    }
  };
  const AddStoryUser = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
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
      return <p className="pb-1 text-zinc-900 text-base font-medium" key={optionNumber}>나: {optionName}</p>;
    } catch (e) {
      console.error("Error: AddStoryUser()");
      console.error(e);
    }
  };
  const OpenStroy = (optionNumber: number) => {
    try {
      if (storyNumber === null || progressNumber === null) {
        return;
      }

      let option;
      if (storyOptionStory[optionNumber] === "next") {
        option = jsonOption[0][0][0];
      } else {
        option =
          jsonOption[storyParts][storyNumber][storyOptionNum[optionNumber]];
      }

      const optionOpenStory = option.addition.openStroy;
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
  const ClickEvent = (optionNumber: number) => {
    try {
      const userStoryList = AddStoryUser(optionNumber) || <></>;
      const itemStoryList = AddItemStory(optionNumber) || <></>;

      setStory([...story, userStoryList, itemStoryList]);
      ResultCheck(optionNumber);
      GetUserData();
      OpenStroy(optionNumber);
      NextStory(optionNumber);
    } catch (e) {
      console.error("Error: ClickEvent()");
      console.error(e);
    }
  };
  const onAlertDeletItem = async (item: ItemProps[string]) => {
    const AlertLeftButton = async () => {
      await onInventorySelect(item);
    };
    const AlertRightButton = () => {};

    const result = await alert(
      `가방에 ${item.name}${chooseParticle(item.name)} 넣을 자리가 없다`,
      "가방이 가득 찼어요\n아이템을 버려야 해요",
      `가방에서 교체한다`,
      `${item.name}${chooseParticle(item.name)} 포기한다`
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
    GetStoryData();
  }, [storyNumber, progressNumber]);

  useEffect(() => {
    //SetUserData();

    GetRanDomStoryNumber();
    GetUserData();
  }, []);

  return (
    <div className="w-screen h-screen relative bg-white">
        <div className="w-full px-5 py-4 flex gap-2">
            <div className="grow shrink basis-0 h-8 bg-stone-300 rounded-[100px] justify-start items-center flex">
                <div className="w-1/2 bg-red-600 rounded-full flex-col justify-start items-start gap-1.5 inline-flex">
                    <img
                        className="w-8 h-8 rounded-full border border-white"
                        src="https://i.pinimg.com/564x/1c/cf/f0/1ccff0a256a5dfd24bf32782326582f7.jpg"
                    />
                </div>
                <p className="right-20 absolute text-white text-[13px] font-semibold">
                    50/100
                </p>
            </div>
            <button onClick={SetUserData} className="p-1.5 bg-black rounded-[100px] shadow justify-start items-start gap-[5.71px] flex">
                <svg className="w-5 h-5 relative" xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                    <path d="M2.25642 15.9165C1.84215 15.9165 1.48752 15.7707 1.19252 15.479C0.897507 15.1874 0.75 14.8391 0.75 14.4342V4.83486C0.75 4.0934 0.986111 3.44463 1.45833 2.88854C1.93056 2.33245 2.52778 1.98122 3.25 1.83486V0.836461C3.25 0.623059 3.32219 0.444176 3.46656 0.299815C3.61092 0.15544 3.78981 0.083252 4.00321 0.083252H4.5801C4.79352 0.083252 4.97241 0.15544 5.11677 0.299815C5.26113 0.444176 5.33331 0.623059 5.33331 0.836461V1.74992H8.66665V0.836461C8.66665 0.623059 8.73883 0.444176 8.88319 0.299815C9.02755 0.15544 9.20644 0.083252 9.41985 0.083252H9.99675C10.2102 0.083252 10.389 0.15544 10.5334 0.299815C10.6778 0.444176 10.75 0.623059 10.75 0.836461V1.83486C11.4722 1.98122 12.0694 2.33245 12.5416 2.88854C13.0138 3.44463 13.25 4.0934 13.25 4.83486V14.4342C13.25 14.8391 13.1025 15.1874 12.8074 15.479C12.5124 15.7707 12.1578 15.9165 11.7435 15.9165H2.25642ZM2.25642 14.6666H11.7435C11.8183 14.6666 11.8798 14.6439 11.9279 14.5985C11.9759 14.553 12 14.4983 12 14.4342V4.83486C12 4.33025 11.8164 3.89827 11.4492 3.53892C11.082 3.17957 10.6406 2.9999 10.125 2.9999H3.875C3.35936 2.9999 2.91795 3.17957 2.55077 3.53892C2.18358 3.89827 1.99998 4.33025 1.99998 4.83486V14.4342C1.99998 14.4983 2.02402 14.553 2.0721 14.5985C2.12019 14.6439 2.18163 14.6666 2.25642 14.6666ZM9.33975 9.52232V10.532C9.33975 10.709 9.39967 10.8575 9.5195 10.9773C9.63935 11.097 9.78785 11.1569 9.965 11.1569C10.1422 11.1569 10.2906 11.097 10.4102 10.9773C10.5299 10.8575 10.5897 10.709 10.5897 10.532V9.02554C10.5897 8.81214 10.5175 8.63326 10.3732 8.4889C10.2288 8.34454 10.0499 8.27236 9.83652 8.27236H4.03523C3.85815 8.27236 3.70972 8.33228 3.58994 8.45213C3.47015 8.57196 3.41025 8.72046 3.41025 8.89763C3.41025 9.07478 3.47015 9.22318 3.58994 9.34284C3.70972 9.46249 3.85815 9.52232 4.03523 9.52232H9.33975Z" fill="white"/>
                </svg>
            </button>
        </div>

        <div className="flex flex-col justify-center items-center">
            <img className="w-[360px] h-[300px] min-w-[360px] bg-black text-white" src="https://i.pinimg.com/564x/7e/90/73/7e907320c11886615f0756dd11bc0354.jpg"/>
            <div className="h-[260px] w-full flex-col justify-start items-start flex">
                <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
                    {storyTitle}
                </h3>
                <div className="overflow-y-scroll px-5 pb-3">
                    <div className="pb-1 text-zinc-900 text-base font-medium">
                        {story.map((story, index) => (
                            <Fragment key={index}>{story}</Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        
        <div className="absolute bottom-0">
            <div className="h-3 w-screen bg-gray-100 border-b"/>
            <div className="w-screen px-5 py-4 flex-col justify-start items-start gap-3 flex">
                {Array.from({ length: storyOptionCount }).map((_, index) => (
                    (ButtonDisable(index)) ?
                    <button key={index} onClick={() => ClickEvent(index)} disabled={ButtonDisable(index)} className="self-stretch p-3.5 bg-stone-300  rounded-xl justify-between items-center inline-flex">
                        <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                            {ButtonOptionName(index)}
                            <span className="m-1 text-gray-500 text-[15px] font-semibold">
                                {ButtonOptionConditionName(index)}
                            </span>
                        </p>
                    </button> :
                    <button key={index} onClick={() => ClickEvent(index)} disabled={ButtonDisable(index)} className="self-stretch p-3.5 bg-gray-100 rounded-xl justify-between items-center inline-flex">
                        <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                            {ButtonOptionName(index)}
                            <span className="m-1 text-gray-500 text-[15px] font-semibold">
                                {ButtonOptionConditionName(index)}
                            </span>
                        </p>
                        
                        <div className="origin-top-left rotate-180 w-5 h-5 relative">
                            <svg className="w-5 h-5 left-0 top-0 absolute origin-top-left rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <mask id="mask0_1118_8405" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                    <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1118_8405)">
                                    <path d="M10.7533 15.9071L16.1331 10.5272C16.2111 10.4493 16.2661 10.367 16.2981 10.2805C16.3302 10.1939 16.3462 10.1005 16.3462 10C16.3462 9.89959 16.3302 9.80611 16.2981 9.71958C16.2661 9.63304 16.2111 9.55078 16.1331 9.47279L10.7453 4.08498C10.6299 3.96959 10.4883 3.90976 10.3206 3.90548C10.1528 3.90121 10.0043 3.96371 9.87507 4.09298C9.7458 4.2137 9.67903 4.35793 9.67475 4.52567C9.67049 4.69339 9.73299 4.84189 9.86225 4.97117L14.2661 9.37504H4.59303C4.41568 9.37504 4.26718 9.43487 4.14753 9.55452C4.02787 9.67417 3.96805 9.82267 3.96805 10C3.96805 10.1774 4.02787 10.3259 4.14753 10.4455C4.26718 10.5652 4.41568 10.625 4.59303 10.625H14.2661L9.85423 15.0369C9.73886 15.1523 9.67903 15.296 9.67475 15.468C9.67049 15.64 9.73299 15.7863 9.86225 15.9071C9.98298 16.0363 10.1293 16.101 10.3013 16.101C10.4734 16.101 10.624 16.0363 10.7533 15.9071Z" fill="#1C1B1F"/>
                                </g>
                            </svg>
                        </div>
                    </button> 
                 ))}
            </div>
        </div>
    </div>
  );
};

const GetItemBox = styled.div`
  position: block;
  width: 90%;
  height: 50px;
  background-color: #fff;
  border: none;
  border: 1px solid #000;
  margin: 0 10px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
