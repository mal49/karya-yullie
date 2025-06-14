import { useState, useEffect, useRef } from "react";
import {Menu, X} from 'lucide-react';


export default function MainPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessages] = useState('');
    const [selectedImages, setSelectedImages] = useState(null);

    const loadAllImages = async () => {
        setIsLoading(true);
        setMessages('');
        setImage([]);

        try {
            const publicImageModules = import.meta.glob(
                [
                    '/public/**/*.jpg',
                    '/public/**/*.jpeg',
                    '/public/**/*.png',
                    '/public/**/*.gif',
                    '/public/**/*.webp',
                    '/public/**/*.bmp'
                ],
                { eager: true, as: 'url' } // get direct URLs
            );

            const assetsImageModules = import.meta.glob(
                [
                    '/src/assets/**/*.jpg',
                    '/src/assets/**/*.jpeg',
                    '/src/assets/**/*.png',
                    '/src/assets/**/*.gif',
                    '/src/assets/**/*.webp',
                    '/src/assets/**/*.bmp'
                ],
                { eager: true, as: 'url' }
            );

            let imageList = [];
            let currentId = 0;

            for (const path in publicImageModules) {
                const url = publicImageModules[path];
                imageList.push({
                    id: currentId++,
                    url: url,
                    name: path.split('/').pop(),
                    path: path,
                    folder: path.replace('/public', '').split('/').slice(0, -1).join('/') || '/'
                });
            }

            if (imageList.length === 0 && Object.keys(assetsImageModules).length > 0) {
                for (const path in assetsImageModules) {
                    const url = assetsImageModules[path];
                    imageList.push({
                    id: currentId++,
                    url: url,
                    name: path.split('/').pop(),
                    path: path,
                    folder: 'src/assets' // Indicate source folder
                    });
                }
            }

            imageList.sort((a, b) => a.name.localeCompare(b.name));

            setImage(imageList);
            setCurrentIndex(0);

            if (imageList.length === 0) {
                setMessages('No images found. Please place images in your /public or /src/assets/ folders.');
            } else {
                setMessages(`Found ${imageList.length} images.`);
            }
        } catch (error) {
            console.error('Error loading images', error);
            setMessages('Error loading images. Please check your console for details');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAllImages();
    }, []);

    const openModal = (image) => {
        setSelectedImages(image);
    };

    const closeModal = (image) => {
        setSelectedImages(null);
    };

    useEffect(() => {
        const handelKeyPressed = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        if (selectedImages) {
            document.addEventListener('keydown', handelKeyPressed);
        }
        return () => {
            document.addEventListener('keydown', handelKeyPressed);
        };
    }, [selectedImages]);

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
            {/* header */}
            <div className="flex flex-row-reverse justify-between md:flex-row-reverse px-2 md:px-2 shadow-lg md:shadow-none py-2 md:pb-2"> 
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-ruby">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <ul className={`${isMenuOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100 md:flex flex-col md:flex-row absolute md:static top-10 left-0 right-0 bg-[#FCFFE3] md:bg-transparent shadow-lg md:shadow-none items-center justify-center space-y-4 md:space-y-0 md:space-x-[50px] py-4 md:py-0 text-[12px] text-ruby md:text-black md:font-normal md:text-xs font-medium transition-all duration-300 ease-in-out overflow-hidden text-center z-10`}>
                        <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Home</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Collaboration</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">About</a></li>
                    <li><a href="#" className="hover:text-ruby-dark transition-colors duration-300">Booking</a></li>
                </ul>
                <div className="text-[18px] md:text-3xl text-ruby text-center font-sail tracking-[1px] md:tracking-[5px]">
                    <a href="#">Karya Yullie</a>
                </div>
            </div>

            {/* body */}
            <div className="min-h-screen"> {/* Min height screen */}
                {image.length > 0 && !isLoading && (
                    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 p-4 rounded-x1 shadow-2x1 border-gray-200">
                        {image.map((image) => (
                            <div
                                key={image.id}
                                className="mb-4 break-inside-avoid-column cursor-pointer"
                                onClick={() => openModal(image)}
                            >
                                <img 
                                src={image.url} 
                                alt={image.name} 
                                className="w-full shadow-md hover-shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] object-cover"
                                onError={(e) => {
                                    console.error('Failed to load image:', error);
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48rectIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9ImludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                                }}
                                />
                            </div>
                        ))}
                    </div>
                )} 

                {/* footer */}
                <div className="bg-[#FCFFE3] py-4 shadow-lg mt-8">
                    <ul className="flex flex-row justify-center items-center gap-4 md:gap-8 text-sm text-ruby hover:text-ruby-dark transition-colors duration-300">
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Whatsapp</a></li>
                        <li><a href="#">Threads</a></li>
                    </ul>
                    <p className="text-center text-xs text-gray-500 mt-2">© {currentYear} Karya Yullie. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}