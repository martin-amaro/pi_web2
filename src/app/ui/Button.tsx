import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { ButtonProps } from "../libs/definitions";
import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  disabled,
  className,
  href,
  onClick,
  buttonType = "button",
  loading = false,
  ...props
}: ButtonProps) {
  const baseStyles = `flex justify-center items-center cursor-pointer text-base rounded-md transition duration-200 ease-in-out`;
  const typeStyles = {
    primary:
      "bg-[#6559ff] text-white font-medium hover:bg-blue-700 px-4 py-2.5",
    secondary:
      "bg-white text-[#6559ff] font-medium hover:bg-gray-100 px-4 py-2.5",
    alternative:
      "font-medium px-4 py-2.5 bg-[#f2f2f2] text-[#6559ff] hover:bg-[#e6f0ff] active:bg-[#cce1ff]",
    danger:
      "bg-[#cc0023] text-white hover:bg-[#b2001e] active:bg-[#99001a] px-4 py-2.5 font-medium",
    outline:
      " border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2.5 font-medium bg-transparent",
    text: "text-blue-600 font-medium hover:underline! ml-1 px-1 mx-2",
    circle: "bg-white border border-gray-300 rounded-full! p-1",
  };

  const classes = clsx(baseStyles, typeStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} >
        {loading ? <LoaderCircle className="animate-spin size-5 " /> : children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      type={buttonType}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin size-5" /> : children}
    </button>
  );
}
