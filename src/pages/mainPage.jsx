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
            <div className="flex flex-col">
                <ul className="flex flex-row items-center justify-center gap-[50px] mt-5 text-xs text-400 hover:text-ruby-dark transition-colors duration-300">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Collaboration</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Booking</a></li>
                </ul>
                <div className="text-5xl text-ruby text-center mt-5 font-sail"><a href="/">Karya Yullie</a></div>
            </div>
            <div className="fixed bottom-0 w-full py-4 shadow-lg">
                <ul className="flex flex-row justify-center items-center gap-8 text-sm text-ruby hover:text-ruby-dark transition-colors duration-300">
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Whatsapp</a></li>
                    <li><a href="#">Thread</a></li>
                </ul>
                <p className="text-center text-xs text-gray-500 mt-2">© {currentYear} Karya Yullie. All rights reserved.</p>
            </div>
        </div>
    );
}