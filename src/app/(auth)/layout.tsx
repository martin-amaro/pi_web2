import { HeaderGuest } from "./components/HeaderGuest";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <HeaderGuest />
        <div className='flex-grow flex items-center justify-center mx-auto w-full h-screen' >
          {children}
        </div>
    </>

  );
}
