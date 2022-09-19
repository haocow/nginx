import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/home/Home";
import { NotFound } from "./routes/NotFound";
import { Plateses } from "./routes/plateses/Plateses";
import { TopBar } from "./components/top-bar";

export const AppRouter: React.FC = () => {
    return (
        <>
            <TopBar />
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/plateses" element={ <Plateses /> } />
                    <Route path="/*" element={ <NotFound /> } />
                </Routes>
            </main>
        </>
    );
}