import { useState, useEffect } from "react";


export default function MainPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
            <div className="flex flex-row-reverse md:flex-col justify-between md:pt-3 px-2 md:px-2 shadow-lg md:shadow-none py-2 md:pb-2">
                <ul className="flex flex-row items-center justify-center gap-[8px] md:gap-[50px] text-[12px] text-black md:text-xs font-normal">
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Home</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Collaboration</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">About</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Booking</a></li>
                </ul>
                <div className="text-[18px] md:text-3xl text-ruby text-center font-sail tracking-[1px] md:tracking-[5px]"><a href="#">Karya Yullie</a></div>
            </div>
            <div className="fixed bottom-0 w-full py-4 shadow-lg">
                <ul className="flex flex-row justify-center items-center gap-4 md:gap-8 text-sm text-ruby hover:text-ruby-dark transition-colors duration-300">
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Whatsapp</a></li>
                    <li><a href="#">Thread</a></li>
                </ul>
                <p className="text-center text-xs text-gray-500 mt-2">© {currentYear} Karya Yullie. All rights reserved.</p>
            </div>
        </div>
    );
}