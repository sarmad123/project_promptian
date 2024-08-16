import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Guard = (WrappedComponent, redirectTo = '/') => {
    return (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();
        const pathName = usePathname();
        useEffect(() => {
            if (typeof window !== 'undefined') {
                if (status === 'loading') return; // Do nothing while loading
                console.log(pathName)
                if (!session && !['/', '/sign-in', '/sign-up'].includes(pathName)) {
                    router.replace('/');
                } else if (session && ['/sign-in', '/sign-up'].includes(pathName)) {
                    router.replace('/');
                }
            }
        }, [session, status, router]);


        // Render the wrapped component if not authenticated
        return <WrappedComponent {...props} />;
    };
};

export default Guard;