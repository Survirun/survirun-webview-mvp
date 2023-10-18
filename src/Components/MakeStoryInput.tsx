interface MakeStoryInputProps {
    id: string;
    text: string;
    onChange: (id: string, text: string) => void;
  }
  
 export const MakeStoryInput = ({ id, text, onChange }: MakeStoryInputProps) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="ID를 입력하세요"
          value={id}
          onChange={(e) => onChange(text, e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="텍스트를 입력하세요"
          value={text}
          onChange={(e) => onChange(id, e.target.value)}
        />
      </div>
    );
  };