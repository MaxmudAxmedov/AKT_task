import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";


export default function MainLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full">
                <header className="w-full">
                    <Header />
                </header>
                <main className="flex-1 p-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
