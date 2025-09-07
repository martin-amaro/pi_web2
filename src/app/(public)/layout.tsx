import { Footer } from "../components/Footer";
import Header from "../components/Header";
import BackendTesterWrapper from "../wrappers/BackendTesterWrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <BackendTesterWrapper />
            <Header />
            {children}
            <Footer />
        </div>
    )
}