import React, { useState } from "react";
import { resultItemInterface } from "../pages";

interface MakeStoryOptionInputProps {
  nextProgressStory?: string;
  resultItems?: resultItemInterface[]; // resultItem을 배열로 변경
  onNextProgressStoryChange: (nextProgressStory?: string) => void;
  onResultItemsChange: (resultItems?: resultItemInterface[]) => void; // onResultItemChange를 onResultItemsChange로 변경
}

export const MakeStoryOptionInput: React.FC<MakeStoryOptionInputProps> = ({
  resultItems = [], // 초기 상태를 빈 배열로 설정
  onNextProgressStoryChange,
  onResultItemsChange,
}) => {
  const handleKindChange = (kind: "hp" | "item" | "hunger", index: number) => {
    const updatedResultItems = [...resultItems];
    updatedResultItems[index] = { ...resultItems[index], kind };
    onResultItemsChange(updatedResultItems);
  };

  const handleGetOrLostChange = (getOrLost: "get" | "lose", index: number) => {
    const updatedResultItems = [...resultItems];
    updatedResultItems[index] = { ...resultItems[index], getOrLost };
    onResultItemsChange(updatedResultItems);
  };

  const handleNumberChange = (number: number | string, index: number) => {
    const updatedResultItems = [...resultItems];
    updatedResultItems[index] = { ...resultItems[index], number };
    onResultItemsChange(updatedResultItems);
  };

  const handleAddResultItem = (index: number) => {
    const updatedResultItems = [...resultItems];
    updatedResultItems.push({ kind: "hp", getOrLost: "get", number: "0" });
    console.log(updatedResultItems);
    onResultItemsChange(updatedResultItems);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="다음 스토리ID를 입력하세요"
        onChange={(e) => onNextProgressStoryChange(e.target.value)}
      />
      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="flex items-center justify-between mb-4 text-lg font-semibold">
          선택 결과
          <button
            className="text-lg text-red-500"
            onClick={() => handleAddResultItem(resultItems.length + 1)}
          >
            추가
          </button>
        </h1>
        {resultItems.map((resultItem, index) => (
          <form key={index}>
            <select
              id={`kind-${index}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={resultItem.kind}
              onChange={(e) =>
                handleKindChange(
                  e.target.value as "hp" | "item" | "hunger",
                  index
                )
              }
            >
              <option value="hp">체력</option>
              <option value="item">아이템</option>
              <option value="hunger">공복</option>
            </select>
            <select
              id={`getOrLost-${index}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={resultItem.getOrLost}
              onChange={(e) =>
                handleGetOrLostChange(e.target.value as "get" | "lose", index)
              }
            />
            <input
              type="text"
              id={`number-${index}`}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="숫자 및 이름을 입력하세요"
              value={resultItem.number}
              required
              onChange={(e) => handleNumberChange(e.target.value, index)}
            />
          </form>
        ))}
      </div>
    </div>
  );
};
