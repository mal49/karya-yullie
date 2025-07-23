import { useState } from "react";
import { Menu, X } from 'lucide-react';
import { usePage } from "../context/PageContext";

export default function Header() {
    const { setCurrentPage, currentPage } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { key: 'home', label: 'Home' },
        // { key: 'collaboration', label: 'Collaboration' },
        { key: 'about', label: 'About' },
        { key: 'service', label: 'Services & Rates' },
        { key: 'contact', label: 'Contact' }
    ];

    return (
        <div className="header-footer-bg sticky top-0 z-50 border-b border-neutral-200/20 w-full">
            <div className="flex justify-between items-center gap-8 h-14 ipad:h-16 px-4 ipad:px-8 ipad-pro:px-12 py-4 w-full max-w-none"> 
                {/* Logo/Brand - Left Side */}
                <div className="flex items-center">
                    <button 
                        onClick={() => {
                            setCurrentPage('home');
                            setIsMenuOpen(false);
                        }}
                        className="text-2xl ipad:text-3xl ipad-pro:text-4xl font-sail text-gradient hover:scale-105 transition-all duration-300 tracking-wider ipad:tracking-widest"
                    >
                        Karya Yullie
                    </button>
                </div>

                {/* Desktop Navigation - Right Side */}
                <nav className="hidden ipad:flex items-center space-x-4 ipad-pro:space-x-8">
                    {navItems.map((item, index) => (
                        <button
                            key={item.key}
                            onClick={() => setCurrentPage(item.key)}
                            className={`relative px-3 ipad-pro:px-4 py-2 text-sm ipad:text-base font-medium transition-all duration-300 rounded-lg group ${
                                currentPage === item.key
                                    ? 'text-ruby bg-ruby/5 shadow-soft'
                                    : 'text-neutral-700 hover:text-ruby hover:bg-ruby/5'
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="relative z-10">{item.label}</span>
                            {currentPage === item.key && (
                                <div className="absolute inset-0 bg-gradient-to-r from-ruby/10 to-ruby-light/10 rounded-lg"></div>
                            )}
                            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-ruby to-ruby-light transition-all duration-300 group-hover:w-full"></div> */}
                        </button>
                    ))}
                </nav>

                {/* Mobile Menu Button - Right Side */}
                <div className="ipad:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="text-ruby hover:text-ruby-light transition-all duration-300 p-2 rounded-lg hover:bg-ruby/5"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <nav className={`ipad:hidden ${
                isMenuOpen 
                    ? 'max-h-80 opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 -translate-y-4'
                } header-footer-bg border-t border-neutral-200/20 shadow-lg 
                transition-all duration-500 ease-in-out overflow-hidden`}>
                <div className="px-4 py-4 space-y-2">
                    {navItems.map((item, index) => (
                        <button
                            key={item.key}
                            onClick={() => {
                                setCurrentPage(item.key);
                                setIsMenuOpen(false);
                            }}
                            className={`w-full text-center px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                                currentPage === item.key
                                    ? 'text-ruby bg-ruby/5 shadow-soft'
                                    : 'text-neutral-700 hover:text-ruby hover:bg-ruby/5'
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
} 