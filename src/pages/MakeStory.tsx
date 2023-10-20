import React, { useState, useContext, Dispatch } from "react";
import { MakeStoryInput, MakeStoryOptionInput, Input } from "../Components";

import { AlertContext } from "../module/index";

export interface resultItemInterface {
  kind: 'hp' | 'item' | 'hunger';
  getOrLose: 'get' | 'lose';
  number: number | string;
}
export interface OptionInterface {
  optionID: string;
  optionText: string;
  nextProgressStory?: string | undefined;
  resultItem?: resultItemInterface[] | undefined;
}

export interface Story {
  id: string;
  text: string;
  options: OptionInterface[];
}

function CreateInputIDText(
  id: string,
  text: string,
  setID: (id: string) => void,
  setText: (text: string) => void,
  textPlaceholder: string = "제목을 입력하세요",
) {
  return (
    <>
      <Input text={id} placeholder="ID를 입력하세요" setState={setID} />
      <Input text={text} placeholder={textPlaceholder} setState={setText} />
    </>
  );
}

function CreateOptionAddtionInput(
  nextProgressStory: string | undefined,
  setNextProgressStory: (nextProgressStor: string) => void
) {
  return (
    <>
      <Input text={nextProgressStory || ""} placeholder="다음 스토리 ID를 입력하세요" setState={setNextProgressStory} />
    </>
  )
}

export const MakeStroy = () => {
  const [title, setTitle] = useState<string>("");
  const [startID, setStartID] = useState<string>("progressStory-1");
  const [stories, setStories] = useState<Story[]>([]);

  const { alert } = useContext(AlertContext);

  const addStory = () => {
    const newStoryId = `progressStory-${stories.length + 1}`;
    setStories([
      ...stories,
      {
        id: newStoryId,
        text: "",
        options: [

        ],
      },
    ]);
  };

  const addOption = (index: number) => {
    const updatedStories = JSON.parse(JSON.stringify(stories));
    const newOptionID = `option-${updatedStories[index].options.length + 1}`;
    updatedStories[index].options.push({
      optionID: newOptionID,
      optionText: "",
    });
    setStories(updatedStories);
  };

  const addResultItem = (index: number, optionIndex: number) => {
    setStories(prevStories => {
      const updatedStories = [...prevStories];
      const currentOption = { ...updatedStories[index].options[optionIndex] };
      
      if (!currentOption.resultItem) {
        currentOption.resultItem = [];
      }
  
      currentOption.resultItem.push({
        kind: "hp",
        getOrLose: "get",
        number: 0
      });
  
      updatedStories[index].options[optionIndex] = currentOption;
      return updatedStories;
    });
  };

  const removeStory = (index: number) => {
    const updatedStories = JSON.parse(JSON.stringify(stories));
    updatedStories.splice(index, 1);
    setStories(updatedStories);
  };

  const removeOption = (storyIndex: number, optionIndex: number) => {
    const updatedStories = JSON.parse(JSON.stringify(stories));
    updatedStories[storyIndex].options.splice(optionIndex, 1);
    setStories(updatedStories);
  };

  const downloadJSONFile = () => {
    const textObj: { [key: string]: { text: string; options: OptionInterface[] } } = {};
    stories.forEach((story) => {
      const storyData: { text: string; options: OptionInterface[] } = {
        text: story.text,
        options: story.options.map((option) => ({
          optionID: option.optionID,
          optionText: option.optionText,
          nextProgressStory: option.nextProgressStory || undefined,
          resultItem: option.resultItem || undefined
        })),
      };
      textObj[story.id] = storyData;
    });

    const jsonData = JSON.stringify(
      { title, startID, progressStory: textObj },
      null,
      2
    );
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
  };

  const onAlertDelet = async (
    kind: "story" | "option",
    id: string,
    index: number,
    optionIndex?: number
  ) => {
    const AlertLeftButton = () => { };
    const AlertRightButton = () => {
      switch (kind) {
        case "story":
          removeStory(index);
          break;
        case "option":
          if (typeof optionIndex === "number") {
            removeOption(index, optionIndex);
          }
          break;
        default:
          alert("Error: 지울 수 없어요");
      }
    };

    const result = await alert(
      `${id}을 지우시겠어요?`,
      "지우면 다시는 되돌아갈 수 없어요",
      `취소`,
      `삭제`
    );
    result ? await AlertRightButton() : AlertLeftButton();
  };

  const handleTitleChange = (title: string) => {
    setTitle(title)
  };

  const handleStartIDChange = (id: string) => {
    setStartID(id)
  };

  const handleStoryIdChange = (index: number) => (id: string) => {
    setStories((prevStories) => {
      const updatedStories = [...prevStories];
      console.log(updatedStories[index])
      updatedStories[index].id = id;

      return updatedStories;
    });
  }
  const handleStoryTextChange = (index: number) => (text: string) => {
    setStories((prevStories) => {
      const updatedStories = [...prevStories];
      updatedStories[index].text = text;

      return updatedStories;
    });
  }
  const handleOptionIdChange = (index: number, optionIndex: number) => (id: string) => {
    setStories((prevStories) => {
      const updatedStories = [...prevStories];
      updatedStories[index].options[optionIndex].optionID = id;

      return updatedStories;
    });
  }
  const handleOptionTextChange = (index: number, optionIndex: number) => (text: string) => {
    setStories((prevStories) => {
      const updatedStories = [...prevStories];
      updatedStories[index].options[optionIndex].optionText = text;

      return updatedStories;
    });
  }
  const handleNextProgressStoryChange = (index: number, optionIndex: number) => (text: string) => {
    setStories((prevStories) => {
      const updatedStories = [...prevStories];
      updatedStories[index].options[optionIndex].nextProgressStory = text;

      return updatedStories;
    });
  }

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full p-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">스토리</h1>
        {CreateInputIDText(title, startID, handleTitleChange, handleStartIDChange, "시작 진행 스토리 아이디를 적으세요")}

        {stories.map((story, index) => (
          <div key={index} className="p-4 bg-white rounded shadow-md">
            <h2 className="flex items-center justify-between mb-4 text-xl font-semibold">
              진행 스토리 - {index + 1}
              <button
                className="text-lg text-red-500"
                onClick={() => onAlertDelet("story", story.id, index)}
              >
                삭제
              </button>
            </h2>
            {CreateInputIDText(story.id, story.text, handleStoryIdChange(index), handleStoryTextChange(index))}
            {story.options.map((option, optionIndex) => (
              <div key={optionIndex} className="p-4 bg-white rounded shadow-md">
                <h1 className="flex items-center justify-between mb-4 text-lg font-semibold">
                  옵션 - {optionIndex + 1}
                  <button
                    className="text-lg text-red-500"
                    onClick={() =>
                      onAlertDelet(
                        "option",
                        option.optionID,
                        index,
                        optionIndex
                      )
                    }
                  >
                    삭제
                  </button>
                </h1>
                {CreateInputIDText(option.optionID, option.optionText, handleOptionIdChange(index, optionIndex), handleOptionTextChange(index, optionIndex))}
                {CreateOptionAddtionInput(option.nextProgressStory, handleNextProgressStoryChange(index, optionIndex))}
                {option.resultItem?.map((resultItem, resultIndex) => (
                  <div key={resultIndex} className="p-4 bg-white rounded shadow-md">
                    <h1 className="flex items-center justify-between mb-4 text-lg font-semibold">
                      선택 결과 - {resultIndex + 1}
                      <button
                        className="text-lg text-red-500"
                        onClick={() =>
                          onAlertDelet(
                            "option",
                            option.optionID,
                            index,
                            optionIndex
                          )
                        }
                      >
                        삭제
                      </button>
                    </h1>
                    
                    
                  </div>
                ))}
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                  onClick={() => addResultItem(index, optionIndex)}
                >
                  결과 추가
                </button>
              </div>
            ))}
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => addOption(index)}
            >
              옵션 추가
            </button>
          </div>
        ))}
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => addStory()}
        >
          이야기 추가
        </button>
        <button
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded"
          onClick={downloadJSONFile}
        >
          JSON 다운로드
        </button>
      </div>
    </div>
  );
};
