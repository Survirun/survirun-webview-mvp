import React, { useState } from "react";
import { resultItemInterface } from "../pages";

interface MakeStoryOptionInputProps {
  nextProgressStory?: string;
  resultItem?: resultItemInterface,
  onNextProgressStoryChange: (
    nextProgressStory?: string
  ) => void;
  onResultItemChange: (
    resultItem?: resultItemInterface,
  ) => void;
}

export const MakeStoryOptionInput: React.FC<MakeStoryOptionInputProps> = ({
  resultItem,
  onNextProgressStoryChange,
  onResultItemChange
}) => {
  const handleKindChange = (kind: 'hp' | 'item' | 'hunger') => {
    onResultItemChange({ ...resultItem, kind });
  };

  const handleGetOrLostChange = (getOrLost: 'get' | 'lose') => {
    onResultItemChange({ ...resultItem, getOrLost });
  };

  const handleNumberChange = (number: number|string) => {
    onResultItemChange({ ...resultItem, number });
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
          <button className="text-lg text-red-500">삭제</button>
        </h1>
        <form>
        <select
          id="kind"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={resultItem?.kind}
          onChange={(e) => handleKindChange(e.target.value as "hp" | "item" | "hunger")}
        >
          <option value="hp">체력</option>
          <option value="item">아이템</option>
          <option value="hunger">공복</option>
        </select>
        <select
          id="getOrLost"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={resultItem?.getOrLost}
          onChange={(e) => handleGetOrLostChange(e.target.value as 'get' | 'lose')}
        >
          <option value="get">얻음</option>
          <option value="lose">잃음</option>
        </select>
        <input
          type="text"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="숫자 및 이름을 입력하세요"
          value={resultItem?.number}
          onChange={(e) => handleNumberChange(e.target.value)}
        />
      </form>
      </div>
    </div>
  );
};