import { HeaderGuest } from "./components/HeaderGuest";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <HeaderGuest />
        {children}
    </div>

  );
}
