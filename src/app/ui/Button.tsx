import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { ButtonProps } from '../libs/definitions';

export default function Button({ children, type = "primary", disabled, className, href, onClick, buttonType = "button" }: ButtonProps) {

    const baseStyles = `cursor-pointer text-base rounded-md transition duration-200 ease-in-out`;
    const typeStyles = {
        primary: "bg-[#6559ff] text-white font-medium hover:bg-blue-700 px-4 py-2.5",
        secondary: "bg-white text-[#6559ff] font-medium hover:bg-gray-100 px-4 py-2.5",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: "",
        text: "text-blue-600 font-medium hover:underline! ml-1 px-1 mx-2"
    };

    const classes = clsx(baseStyles, typeStyles[type], className);

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={classes} disabled={disabled} type={buttonType}>
            {children}
        </button>
    );
}
