import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "text"
    | "alternative";
  href?: string;
  loading?: boolean;
  buttonType?: "button" | "submit" | "reset";
}

export interface CategoryItem {
    title: string;
    src: string;
    href?: string;
    className?: string;
}


export interface AuthInputProps {
    label: string;
    name: string;
    value: string;
    type: string;
    action: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    error?: string | undefined;
}
