import React from "react";

interface IRadioInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
}

export const RadioInput = (props: IRadioInputProps) => {
    const { id, name, value, label } = props;

    return (
        <div className="flex items-center">
            <input
                type={"radio"}
                id={id}
                name={name}
                value={value}
                className={"hidden peer"}
            />
            <span
                className={"relative flex items-center justify-center w-5 h-5 rounded-full border border-gray-400 peer-checked:border-yellow-400 peer-checked:bg-yellow-100 transition-all duration-300"}>
                <span
                    className={"block w-3 h-3 rounded-full bg-yellow-400 opacity-0 transition-opacity duration-300 peer-checked:opacity-100"}>
                </span>
            </span>

            <label
                htmlFor={id}
                className={"ml-2 cursor-pointer text-black"}
            >
                {label}
            </label>
        </div>
    );
};