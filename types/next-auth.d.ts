import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string; // Add this line
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string; // Example of additional fields if needed
        } & DefaultSession['user'];
    }
}