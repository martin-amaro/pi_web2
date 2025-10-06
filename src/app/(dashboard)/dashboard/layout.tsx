
import { BusinessProvider } from "@/app/context/BusinessContext";
import { Message } from "./components/Message";
import { Panel } from "./components/Panel";
import SessionSync from "./components/SessionSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BusinessProvider>
      <div className="bg-white text-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] middle:h-screen">
          <Panel />
          <SessionSync />
          <main className="mt-14 middle:mt-0 overflow-y-auto relative">
            {children}
          </main>
        </div>
      </div>
    </BusinessProvider>
  );
}
