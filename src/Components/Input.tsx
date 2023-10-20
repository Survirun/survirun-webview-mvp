interface InputProps<T> {
    text: T;
    placeholder: string;
    type?: string;
    setState: (id: T) => void;
}

const onChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: (id: T) => void,
    isNumber: boolean
) => {
    const value = isNumber ? parseFloat(e.target.value) : e.target.value;
    setState(value as T);
};

export const Input = <T extends string | number>({
    text,
    placeholder,
    type = "text",
    setState,
}: InputProps<T>) => {
    const isNumberInput = type === "number";

    return (
        <input
            type={type}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder={placeholder}
            value={text as string}
            onChange={(e) => onChange(e, setState, isNumberInput)}
        />
    );
};
