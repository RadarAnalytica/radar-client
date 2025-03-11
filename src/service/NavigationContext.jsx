import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [iconVisible, setIconVisible] = useState(window.innerWidth >= 1080);
    const location = useLocation();

    const updateIconVisibility = () => {
        setIconVisible(window.innerWidth >= 1080);
    };

    useEffect(() => {
        updateIconVisibility();
        window.addEventListener('resize', updateIconVisibility);
        return () => window.removeEventListener('resize', updateIconVisibility);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleNavigation = () => setIsOpen((prev) => !prev);
    const openNavigation = () => setIsOpen(true);
    const closeNavigation = () => setIsOpen(false);

    return (
        <NavigationContext.Provider value={{ isOpen, iconVisible, toggleNavigation, openNavigation, closeNavigation }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
