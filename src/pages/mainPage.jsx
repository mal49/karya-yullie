import { useState, useEffect } from "react";
import {Menu, X} from 'lucide-react';


export default function MainPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const newYear = new Date().getFullYear();
            if (newYear !== currentYear) {
                setCurrentYear(newYear);
            }
        }, 1000 * 60 * 60); // Check every hour

        return () => clearInterval(timer);
    }, [currentYear]);

    return(
        <div>
            <div className="flex flex-row-reverse justify-between md:flex-col md:pt-3 px-2 md:px-2 shadow-lg md:shadow-none py-2 md:pb-2"> 
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-ruby">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <ul className={`${isMenuOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100 md:flex flex-col md:flex-row absolute md:static top-10 left-0 right-0 bg-[#FCFFE3] md:bg-transparent shadow-lg md:shadow-none items-center justify-center space-y-4 md:space-y-0 md:space-x-[50px] py-4 md:py-0 text-[12px] text-ruby md:text-black md:font-normal md:text-xs font-medium md:pt-3 transition-all duration-300 ease-in-out overflow-hidden text-center`}>
                        <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Home</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Collaboration</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">About</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Booking</a></li>
                </ul>

                <div className="text-[18px] md:text-3xl md:mt-3 text-ruby text-center font-sail tracking-[1px] md:tracking-[5px]">
                    <a href="#">Karya Yullie</a>
                </div>
            </div>
            <div className="fixed bottom-0 w-full py-4 shadow-lg">
                <ul className="flex flex-row justify-center items-center gap-4 md:gap-8 text-sm text-ruby hover:text-ruby-dark transition-colors duration-300">
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Whatsapp</a></li>
                    <li><a href="#">Threads</a></li>
                </ul>
                <p className="text-center text-xs text-gray-500 mt-2">© {currentYear} Karya Yullie. All rights reserved.</p>
            </div>
        </div>
    );
}