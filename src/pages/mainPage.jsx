import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ImageIcon, Loader2, X } from 'lucide-react';

export default function MainPage() {
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
                    '/public/images/*.jpg',
                    '/public/images/*.jpeg',
                    '/public/images/*.png',
                    '/public/images/*.gif',
                    '/public/images/*.webp',
                    '/public/images/*.bmp'
                ],
                { eager: true, as: 'url' }
            );

            // const assetsImageModules = import.meta.glob(
            //     [
            //         '/src/assets/**/*.jpg',
            //         '/src/assets/**/*.jpeg', 
            //         '/src/assets/**/*.png',
            //         '/src/assets/**/*.gif',
            //         '/src/assets/**/*.webp',
            //         '/src/assets/**/*.bmp'
            //     ],
            //     { eager: true, as: 'url' }
            // );

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

            // if (imageList.length === 0 && Object.keys(assetsImageModules).length > 0) {
            //     for (const path in assetsImageModules) {
            //         const url = assetsImageModules[path];
            //         imageList.push({
            //             id: currentId++,
            //             url: url,
            //             name: path.split('/').pop(),
            //             path: path,
            //             folder: 'src/assets'
            //         });
            //     }
            // }

            imageList.sort((a, b) => a.name.localeCompare(b.name));

            setImage(imageList);

            if (imageList.length === 0) {
                setMessages('No images found. Please place images in your /public or /src/assets/ folders.');
            } else {
                setMessages(`Discover ${imageList.length} beautiful creations`);
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

    const closeModal = () => {
        setSelectedImages(null);
    };

    useEffect(() => {
        const handleKeyPressed = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        if (selectedImages) {
            document.addEventListener('keydown', handleKeyPressed);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyPressed);
        };
    }, [selectedImages]);

    return (
        <div className="min-h-screen gradient-bg font-inter">
            <Header />
            
            {/* Hero Section */}
            <section className="relative py-12 ipad:py-20 ipad-pro:py-24 px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl ipad:text-5xl lg:text-7xl font-playfair font-bold text-gradient mb-4 ipad:mb-6 fade-in-up leading-tight pb-2">
                        Welcome to Karya Yullie ✨
                    </h1>
                    <p className="text-base ipad:text-lg ipad-pro:text-xl text-neutral-600 max-w-xl ipad:max-w-2xl mx-auto mb-6 ipad:mb-8 fade-in-up px-4 ipad:px-0">
                        Experience the art of beauty transformation through expert makeup artistry and personalized styling.
                    </p>
                    
                    {/* Stats or Message */}
                    {message && (
                        <div className="inline-flex items-center gap-2 px-4 ipad:px-6 py-2 ipad:py-3 rounded-full backdrop-blur-glass border border-neutral-200/20 text-neutral-700 font-medium shadow-soft text-sm ipad:text-base">
                            <ImageIcon size={18} className="text-ruby ipad:w-5 ipad:h-5" />
                            {message}
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto pb-12 ipad:pb-16">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 ipad:py-20">
                        <Loader2 className="w-6 h-6 ipad:w-8 ipad:h-8 animate-spin text-ruby mb-4" />
                        <p className="text-neutral-600 text-sm ipad:text-base">Loading your gallery...</p>
                    </div>
                ) : image.length > 0 ? (
                    <div className="columns-1 tablet:columns-2 ipad:columns-3 ipad-pro:columns-4 xl:columns-4 gap-4 ipad:gap-6">
                        {image.map((img, index) => (
                            <div
                                key={img.id}
                                className="masonry-item"
                                onClick={() => openModal(img)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <img 
                                    src={img.url} 
                                    alt={img.name} 
                                    className="w-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error('Failed to load image:', img.url);
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJpbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                                    }}
                                />
                                <div className="absolute bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 ipad:py-20">
                        <ImageIcon className="w-12 h-12 ipad:w-16 ipad:h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg ipad:text-xl font-playfair text-neutral-600 mb-2">No Images Found</h3>
                        <p className="text-neutral-500 text-sm ipad:text-base">Add some images to your /public or /src/assets folder to get started.</p>
                    </div>
                )}
            </section>

            {/* Image Modal */}
            {selectedImages && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ipad:p-8">
                    <div className="relative max-w-3xl ipad:max-w-5xl max-h-full">
                        <button
                            onClick={closeModal}
                            className="absolute -top-8 ipad:-top-12 mt-3 -right-1 text-white hover:text-neutral-300 transition-colors duration-200 z-10"
                            aria-label="Close modal"
                        >
                            <X size={28} className="ipad:w-8 ipad:h-8" />
                        </button>
                        <img
                            src={selectedImages.url}
                            alt={selectedImages.name}
                            className="max-w-full max-h-[85vh] ipad:max-h-[90vh] object-contain shadow-elegant"
                        />
                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                            
                        </div> */}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}