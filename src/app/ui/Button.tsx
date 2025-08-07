import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

type ButtonProps = {
    children: React.ReactNode;
    type?: "primary" | "secondary" | "danger" | "outline";
    className?: string;
    href?: string;
    onClick?: () => void;
};


export default function Button({ children, type = "primary", className, href, onClick }: ButtonProps) {

    const baseStyles = `cursor-pointer text-base px-4 py-2.5 rounded-md transition duration-200 ease-in-out`;
    const typeStyles = {
        primary: "bg-[#6559ff] text-white font-medium hover:bg-blue-700",
        secondary: "",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: ""
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
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
