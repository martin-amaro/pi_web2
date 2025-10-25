"use client";
import React from "react";

type SimpleInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SimpleInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}: SimpleInputProps) => {
  return (
    <div>
      <label className="font-medium text-base text-slate-800 mb-1 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
      />
    </div>
  );
};

export default SimpleInput;
