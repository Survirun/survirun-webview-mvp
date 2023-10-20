interface InputProps {
    text: string | number;
    placeholder: string;
    type?: string;
    setState: (id: string | number) => void;
}

const onChange = (e: React.ChangeEvent<HTMLInputElement>, setState: (id: string | number) => void, isNumber: boolean) => {
    const value = isNumber ? parseFloat(e.target.value) : e.target.value;
    setState(value);
 };
  
 export const Input = ({ text, placeholder, type="text", setState }: InputProps) => {
    const isNumberInput = type === "number";

    return (
        <input
          type={type}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder={placeholder}
          value={text}
          onChange={(e) => onChange(e, setState, isNumberInput)}
        />
    );
};