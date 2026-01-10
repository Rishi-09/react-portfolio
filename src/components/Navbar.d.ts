import React from 'react';
interface NavbarProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}
export declare const Navbar: React.FC<NavbarProps>;
export {};
