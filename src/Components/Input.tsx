import { Dispatch } from 'react'

interface InputProps {
    text: string;
    placeholder: string;
    setState: Dispatch<React.SetStateAction<string>>;
}

const onChange = ( e: React.ChangeEvent<HTMLInputElement>, setState: Dispatch<React.SetStateAction<string>>) => {
   setState(e.target.value);
};
  
 export const Input = ({ text, placeholder, setState }: InputProps) => {
    return (
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder={placeholder}
          value={text}
          onChange={(e) => onChange(e, setState)}
        />
    );
};