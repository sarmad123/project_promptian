import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

// Define a type for the WrappedComponent
type WrappedComponentType<P = {}> = React.ComponentType<P>;

const Guard = <P extends object>(WrappedComponent: WrappedComponentType<P>, redirectTo = '/') => {
    // Define the props type for the ComponentWithGuard
    const ComponentWithGuard: React.FC<P> = (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                if (status === 'loading') return; // Do nothing while loading
                if (!session && !['/', '/sign-in', '/sign-up'].includes(window.location.pathname)) {
                    router.replace(redirectTo);
                } else if (session && ['/sign-in', '/sign-up'].includes(window.location.pathname)) {
                    router.replace('/');
                }
            }
        }, [session, status, router]);

        // Render the wrapped component with the passed props
        return <WrappedComponent {...props} />;
    };

    ComponentWithGuard.displayName = `Guard(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithGuard;
};

export default Guard;
