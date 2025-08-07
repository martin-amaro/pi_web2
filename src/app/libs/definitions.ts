export interface ButtonProps {
    children: React.ReactNode;
    type?: "primary" | "secondary" | "danger" | "outline";
    className?: string;
    href?: string;
    onClick?: () => void;
}

export interface CategoryItem {
    title: string;
    src: string;
    href?: string;
    className?: string;
}
