import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Users = lazy(() => import("../page/Users/Users"));
const Map = lazy(() => import("../page/Map/Map"));

export default function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Users />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </Suspense>
    );
}
