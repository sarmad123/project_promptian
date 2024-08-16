import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import ToastProvider from "@components/ToastProvider";
import { LoadingProvider } from './loadingProvider';
import React, {ReactNode} from "react";

export const metadata = {
    title: 'Promptian',
    description: 'Discover & Share The Best Prompts',
};
interface RootLayoutProps {
    children?: ReactNode;
    session: never;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
    return (
        <html lang="en">
        <Provider session={session}>
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
