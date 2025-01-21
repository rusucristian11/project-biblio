import React from 'react'
interface DropdownInputProps {
    options: { id: number, name: string }[],
    value: number,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    inputName: string
}

const DropdownInput: React.FC<DropdownInputProps> = ({ options, value, onChange, inputName }) => {
    return (
        <select className="drop-down" value={value} onChange={onChange} name={inputName}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {options.map((option, index) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default DropdownInput
