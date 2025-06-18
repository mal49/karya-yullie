import Header from "../components/Header";

export default function AboutPage() {
    const currentYear = new Date().getFullYear();

    return(
        <div>
            <Header />

            {/* About content */}
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">About Yullie</h1>
                <img src="https://placehold.co/250" alt="Yullie's picture here" />
                <p className="text-gray-700 md:mt-1">
                    Welcome to Karya Yullie. This is a place where creativity meets passion.
                </p>
            </div>
            {/* footer */}
            <div className="bg-[#FCFFE3] py-4 shadow-lg mt-auto fixed bottom-0 left-0 right-0">
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