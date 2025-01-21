import { useLocation, useNavigate } from 'react-router-dom';
import React, {ReactNode, useEffect} from "react";

interface NavigationWatcherProps {
    children: ReactNode;
}

const NavigationWatcher: React.FC<NavigationWatcherProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const access = localStorage.getItem('access');
        if (!access && location.pathname !== '/') {
            // If 'access' is not available and the user is not on the login page,
            // navigate the user back to the login page.
            // You can adjust the condition or redirection based on your app's logic.
            navigate('/');
        }
    }, [location, navigate]);

    return <>{children}</>;
};

export default NavigationWatcher
