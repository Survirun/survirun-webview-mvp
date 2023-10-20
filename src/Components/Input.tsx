import { Dispatch } from 'react'
import { Story } from '../pages/MakeStory';
interface InputProps {
    index: number;
    text: string;
    placeholder: string;
    setState: (id: string, number?: number) => void
}

const onChange = (index: number,  e: React.ChangeEvent<HTMLInputElement>, setState: (id: string, number?: number) => void) => {
   setState(e.target.value, index);
};
  
 export const Input = ({ index, text, placeholder, setState }: InputProps) => {
    return (
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder={placeholder}
          value={text}
          onChange={(e) => onChange(index, e, setState)}
        />
    );
};