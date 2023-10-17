import React, { useState } from "react";

interface MakeStoryOptionInputProps {
  optionID: string;
  optionText: string;
  nextProgressStory: string | null; // nextProgressStory를 string | undefined로 변경
  onChange: (id: string, text: string, nextProgressStory: string | null) => void; // 타입 변경
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
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="다음 스토리ID를 입력하세요"
        onChange={(e) => onChange(optionID, optionText, e.target.value)}
      />
    </div>
  );
};