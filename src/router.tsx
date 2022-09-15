import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from "./routes/App";
import { NotFound } from "./routes/NotFound";
// import { Plateses } from "./components/pages/Plateses";
import { TopBar } from "./components/top-bar";

export const AppRouter: React.FC = () => {
    return (
        <>
            <TopBar />
            <Routes>
                <Route path="/" element={ <App /> } />
                {/* <Route path="/plateses" element={<Plateses />} /> */}
                <Route path="/*" element={ <NotFound /> } />
            </Routes>
        </>
    );
}
