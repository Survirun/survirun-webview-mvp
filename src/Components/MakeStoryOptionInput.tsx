import React, { useState } from "react";

interface MakeStoryOptionInputProps {
  optionID: string;
  optionText: string;
  nextProgressStory: string | undefined;
  onChange: (
    id: string,
    text: string,
    nextProgressStory: string | undefined
  ) => void;
}

export const MakeStoryOptionInput: React.FC<MakeStoryOptionInputProps> = ({
  optionID,
  optionText,
  nextProgressStory,
  onChange,
}) => {
  return (
    <div>
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="다음 스토리ID를 입력하세요"
        onChange={() => onChange(optionID, optionText, nextProgressStory)}
      />
      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="flex items-center justify-between mb-4 text-lg font-semibold">
          선택 결과
          <button className="text-lg text-red-500">삭제</button>
        </h1>
        <select
          id="kind"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="hp">체력</option>
          <option value="item">아이템</option>
          <option value="hunger">공복</option>
        </select>
        <select
          id="kind"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="get">얻음</option>
          <option value="lose">잃음</option>
        </select>
        <input
          type="text"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="숫자 및 이름을 입력하세요"
          onChange={() => onChange(optionID, optionText, nextProgressStory)}
        />
      </div>
    </div>
  );
};
