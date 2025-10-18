export interface ButtonProps {
    children: React.ReactNode;
    type?: "primary" | "secondary" | "danger" | "outline" | "text";
    className?: string;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
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
