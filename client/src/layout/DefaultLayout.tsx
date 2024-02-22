import React, { ReactNode } from "react";
import {Header} from "../components/Header";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
}

export default DefaultLayout;

