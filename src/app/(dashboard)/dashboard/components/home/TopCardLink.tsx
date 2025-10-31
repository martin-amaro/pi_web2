"use client";
import { useRouter } from "next/navigation";

export const TopCardLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(to)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};
