"use client"

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
interface LoadingProviderProps {
    children?: ReactNode;
}
interface LoadingContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}
const LoadingContext = createContext<LoadingContextProps | null>(null);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export const LoadingProvider : React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            <Backdrop open={loading} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingContext.Provider>
    );
};