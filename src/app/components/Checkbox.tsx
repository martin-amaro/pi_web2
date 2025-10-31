import { Checkbox as Chbx} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import { generatePassword } from "../utils/misc";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"


interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  const id = props.id || generatePassword(10);

  return (
    <div className="flex items-center gap-2">
      <Chbx
        id={id}
        className="cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 size-[19px]!"
        {...props}
      />
      {label && <Label htmlFor={id} className="cursor-pointer">{label}</Label>}

      {/* <label className="cursor-pointer inline-flex items-center space-x-2">
        <input
          type="checkbox"
          className="cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 size-[19px]!"
          {...props}
        />
        {label && <span className="font-a3 font-medium text-sm">{label}</span>}
      </label> */}
    </div>
  );
};
