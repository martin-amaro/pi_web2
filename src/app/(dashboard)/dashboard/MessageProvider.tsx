// app/dashboard/MessageProvider.tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Message } from "./components/Message";

type MessageType = "success" | "error";

interface MessageContextType {
  showMessage: (message: string, type?: MessageType, duration?: number) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<MessageType>("success");
  const [duration, setDuration] = useState<number>(3000);

  const showMessage = useCallback(
    (message: string, type: MessageType = "success", duration = 3000) => {
      setMsg(message);
      setType(type);
      setDuration(duration);
    },
    []
  );

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Message
        message={msg}
        type={type}
        duration={duration}
        onClose={() => setMsg(null)}
      />
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error("useMessage must be used inside MessageProvider");
  return context;
};
