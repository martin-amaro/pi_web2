import { Panel } from "./components/Panel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] middle:h-screen">
        <Panel />

        <main className="mt-14 middle:mt-0 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
}
