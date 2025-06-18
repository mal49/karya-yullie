import { useState } from "react";
import { Menu, X } from 'lucide-react';
import { usePage } from "../context/PageContext";

export default function Header() {
    const { setCurrentPage } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-row-reverse justify-between md:flex-row-reverse px-2 md:px-2 shadow-lg md:shadow-none py-2 md:pb-2"> 
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-ruby">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <ul className={`${isMenuOpen ? 'max-h-[200px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'} md:max-h-none md:opacity-100 md:translate-y-0 md:flex flex-col md:flex-row absolute md:static top-10 left-0 right-0 bg-[#FCFFE3] md:bg-transparent shadow-lg md:shadow-none items-center justify-center space-y-4 md:space-y-0 md:space-x-[50px] py-4 md:py-0 md:pr-3 text-[12px] text-ruby md:text-black md:font-normal md:text-xs font-medium transition-all duration-500 ease-in-out overflow-hidden text-center z-10`}>
                <li>
                    <button onClick={() => setCurrentPage('home')} className="hover:text-ruby-dark transition-colors duration-300">Home</button>
                </li>
                <li>
                    <button onClick={() => setCurrentPage('collaboration')} className="hover:text-ruby-dark transition-colors duration-300">Collaboration</button>
                </li>
                <li>
                    <button onClick={() => setCurrentPage('about')} className="hover:text-ruby-dark transition-colors duration-300">About</button>
                </li>
                <li>
                    <button onClick={() => setCurrentPage('booking')} className="hover:text-ruby-dark transition-colors duration-300">Booking</button>
                </li>
            </ul>
            <div className="text-[18px] md:text-3xl text-ruby text-center font-sail tracking-[1px] md:tracking-[5px] md:pl-3">
                <button onClick={() => setCurrentPage('home')} className="hover:text-ruby-dark transition-colors duration-300">Karya Yullie</button>
            </div>
        </div>
    );
} 