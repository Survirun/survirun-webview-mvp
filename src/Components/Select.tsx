interface SelectProps {
    value: string,
    options: {
        value: string,
        view: string
    }[],
    setState: (id: string) => void
}

const onChange = (e: React.ChangeEvent<HTMLSelectElement>, setState: (id: string, number?: number) => void) => {
    setState(e.target.value);
};

export const Select = ({value, options, setState}: SelectProps) => {
    <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={(e) => onChange(e, setState)}
    >
        {options.map((options, index) => (
            <option value={options.value} key={index}>{options.view}</option>
        ))}
    </select>
}