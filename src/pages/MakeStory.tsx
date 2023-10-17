import React, { useState, useContext } from "react";
import { MakeStoryInput, MakeStoryOptionInput } from "../Components";

import { AlertContext } from "../module/index";

export interface resultItemInterface {
  kind: 'hp' | 'item' | 'hunger';
  getOrLost: 'get' | 'lose';
  number: number | string;
}
export interface OptionInterface {
  optionID: string;
  optionText: string;
  nextProgressStory?: string | undefined;
  resultItem?: resultItemInterface[] | undefined;
}

interface Story {
  id: string;
  text: string;
  options: OptionInterface[];
}

export const MakeStroy = () => {
  const [title, setTitle] = useState<string>("");
  const [startID, setStartID] = useState<string>("progressStory-1");
  const [stories, setStories] = useState<Story[]>([]);
  const [resultItems, setResultItems] = useState<resultItemInterface[]>([]);

  const { alert } = useContext(AlertContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStartStoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartID(event.target.value);
  };

  const handleStoryChange = (id: string, text: string, index: number) => {
    const updatedStories = JSON.parse(JSON.stringify(stories));
    updatedStories[index] = { id, text, options: stories[index].options };
    setStories(updatedStories);
  };

  const handleOptionChange = (id: string, text: string, index: number, optionIndex: number) => {
    const updatedStories = [...stories];
    updatedStories[index].options[optionIndex] = {
      optionID: id,
      optionText: text,
    };
    setStories(updatedStories);
    setStories(updatedStories);
  }

  const handleNextProgressStoryChange = (nextProgressStory: string | undefined, index: number, optionIndex: number) => {
    const updatedStories = [...stories];
    updatedStories[index].options[optionIndex] = {
      ...updatedStories[index].options[optionIndex],
      nextProgressStory:
        nextProgressStory === undefined
          ? undefined
          : nextProgressStory,
    };
    setStories(updatedStories);
  }

  const handleResultItemChange = (newResultItem: resultItemInterface, index: number, optionIndex: number) => {
    const updatedStories = [...stories];
    updatedStories[index].options[optionIndex] = {
      ...updatedStories[index].options[optionIndex],
      resultItem: [newResultItem] 
    };
    setStories(updatedStories);
  };

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
    console.log(updatedStories)
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

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full p-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">스토리</h1>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="시작 진행 스토리 아이디를 적으세요"
          value={startID}
          onChange={handleStartStoryChange}
        />
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
            <MakeStoryInput
              id={story.id}
              text={story.text}
              onChange={(id, text) => handleStoryChange(id, text, index)}
            />
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
                <MakeStoryInput
                  id={option.optionID}
                  text={option.optionText}
                  onChange={
                    (id, text) => handleOptionChange(id, text, index, optionIndex)
                  }
                />
                <MakeStoryOptionInput
                  nextProgressStory={option.nextProgressStory}
                  resultItem={option.resultItem || []}
                  onNextProgressStoryChange={(nextProgressStory) =>
                    handleNextProgressStoryChange(nextProgressStory, index, optionIndex)
                  }
                  onResultItemChange={(resultItem) => handleResultItemChange(resultItem, index, optionIndex)}
                />
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
