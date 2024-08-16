import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import ToastProvider from "@components/ToastProvider";
import { LoadingProvider } from './loadingProvider';
import React from "react";
import { Session } from 'next-auth'; // Adjust based on your session type

export const metadata = {
    title: 'Promptian',
    description: 'Discover & Share The Best Prompts',
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
        <Provider>
            <body>

            <div className="main">
                <div className="gradient" />
            </div>
            <main className="app">
                <Nav />
                <ToastProvider>
                    <LoadingProvider>
                        {children}
                    </LoadingProvider>
                </ToastProvider>
            </main>
            </body>
        </Provider>
        </html>
    );
};

export default RootLayout;
