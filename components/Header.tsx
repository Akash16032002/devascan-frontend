
import React from 'react';
import { View } from '../App';
import { FileIcon, UploadIcon, LibraryIcon, SettingsIcon, HelpIcon } from './icons';

interface HeaderProps {
    onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="border-b border-brand-border backdrop-blur-sm sticky top-0 z-50 bg-brand-dark/80">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div 
                    className="flex items-center gap-2 cursor-pointer" 
                    onClick={() => onNavigate('home')}
                >
                    <div className="bg-gradient-to-br from-brand-orange to-amber-500 p-2 rounded-lg">
                         <FileIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">DevaScan</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-gray-400">
                    <NavItem icon={<UploadIcon />} text="Upload" onClick={() => onNavigate('ocr')} />
                    <NavItem icon={<LibraryIcon />} text="Library" onClick={() => onNavigate('library')} />
                    <NavItem icon={<SettingsIcon />} text="Settings" onClick={() => onNavigate('settings')} />
                    <NavItem icon={<HelpIcon />} text="Help" onClick={() => onNavigate('help')} />
                </div>
            </nav>
        </header>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, onClick }) => (
    <a 
        href="#"
        onClick={(e) => { e.preventDefault(); onClick?.(); }}
        className="flex items-center gap-2 hover:text-white transition-colors duration-200"
    >
        {icon}
        <span>{text}</span>
    </a>
);


export default Header;
