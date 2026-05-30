import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }: { children?: React.ReactNode }) {   
    return (
        <div className="main-layout">
            <Header />
            <main className="content">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    )
}