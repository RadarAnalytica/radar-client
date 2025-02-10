import { createContext, useState, useContext, useEffect } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [iconVisible, setIconVisible] = useState(window.innerWidth >= 1080);


    const updateIconVisibility = () => {
        setIconVisible(window.innerWidth >= 1080);
    };

    useEffect(() => {
        updateIconVisibility();

        window.addEventListener('resize', updateIconVisibility);
        return () => window.removeEventListener('resize', updateIconVisibility);
    }, []);

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
