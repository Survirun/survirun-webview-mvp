import React from 'react';

interface SelectProps<T> {
  value: T,
  options: {
    value: T,
    view: string
  }[],
  setState: (id: T) => void
}

const onChange = <T extends string | number>(e: React.ChangeEvent<HTMLSelectElement>, setState: (id: T) => void) => {
    setState(e.target.value as T);
};
  

export function Select<T extends string | number>({ value, options, setState }: SelectProps<T>) {
    return (
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value as string}
        onChange={(e) => onChange(e, setState)}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>{option.view}</option>
        ))}
      </select>
    );
  }