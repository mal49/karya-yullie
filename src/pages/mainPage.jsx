import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CloudinaryImage from "../components/cloudinaryImage";
import { fetchCloudinaryImages } from "../utils/cloudinary";
import { ImageIcon, Loader2, X, Plus, ChevronUp } from 'lucide-react';

export default function MainPage() {
    const [allImages, setAllImages] = useState([]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [message, setMessages] = useState('');
    const [selectedImages, setSelectedImages] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(''); // New state for selected folder
    
    const IMAGES_PER_LOAD = 12; // Number of images to load per batch

    const loadAllImages = async (folder = '') => { // Add folder parameter
        setIsLoading(true);
        setMessages('');
        setAllImages([]);
        setDisplayedImages([]);
        setCurrentIndex(0);

        try {
            const imageList = await fetchCloudinaryImages(folder); // Use folder parameter

            setAllImages(imageList);

            if (imageList.length === 0) {
                setMessages('No images found in Cloudinary folder.');
            } else {
                const initialBatch = imageList.slice(0, IMAGES_PER_LOAD);
                setDisplayedImages(initialBatch);
                setCurrentIndex(IMAGES_PER_LOAD);
                setMessages(`Discover ${imageList.length} beautiful creations`);
            }
        } catch (error) {
            console.error('Error loading images', error);
            setMessages('Error loading images from Cloudinary. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreImages = () => {
        setIsLoadingMore(true);
        
        // Simulate a small delay for better UX
        setTimeout(() => {
            const nextBatch = allImages.slice(currentIndex, currentIndex + IMAGES_PER_LOAD);
            setDisplayedImages(prev => [...prev, ...nextBatch]);
            setCurrentIndex(prev => prev + IMAGES_PER_LOAD);
            setIsLoadingMore(false);
        }, 500);
    };

    const hasMoreImages = currentIndex < allImages.length;

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Handle scroll event to show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowScrollTop(scrollTop > 400); // Show button after scrolling 400px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        loadAllImages(selectedFolder); // Use selectedFolder when loading all images
    }, [selectedFolder]); // Re-run when selectedFolder changes

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
        <div className="min-h-screen w-full gradient-bg font-inter">
            <Header />
            
            {/* Hero Section */}
            <section className="relative py-12 ipad:py-20 ipad-pro:py-24 px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl ipad:text-5xl lg:text-7xl font-playfair font-bold text-gradient mb-4 ipad:mb-6 fade-in-up leading-tight pb-2">
                        Welcome to Karya Yullie
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

            {/* Filter Buttons Section */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto mb-8 ipad:mb-12 flex justify-center gap-4 flex-wrap">
                <button
                    onClick={() => setSelectedFolder('')}
                    className={`inline-flex items-center gap-2 px-2 ipad:px-4 py-0.5 ipad:py-1.5 rounded-full backdrop-blur-glass font-medium text-sm ipad:text-base transition-all duration-300 ease-in-out shadow-soft ${selectedFolder === '' 
                            ? 'bg-white/20 text-neutral-700 border border-white/20' 
                            : 'bg-neutral-200 text-ruby border border-neutral-300 hover:bg-neutral-300 hover:shadow-md hover:border-neutral-300'
                    }`}
                >
                    <ImageIcon size={18} className={`${selectedFolder === '' ? 'text-white' : 'text-ruby'} ipad:w-5 ipad:h-5`} />
                    All
                </button>
                <button
                    onClick={() => setSelectedFolder('folder1')}
                    className={`inline-flex items-center gap-2 px-2 ipad:px-4 py-0.5 ipad:py-1.5 rounded-full backdrop-blur-glass font-medium text-sm ipad:text-base transition-all duration-300 ease-in-out shadow-soft ${selectedFolder === 'folder1' 
                            ? 'bg-white/20 text-neutral-700 border border-white/20' 
                            : 'bg-neutral-200 text-ruby border border-neutral-300 hover:bg-neutral-300 hover:shadow-md hover:border-neutral-300'
                    }`}
                >
                    <ImageIcon size={18} className={`${selectedFolder === 'folder1' ? 'text-white' : 'text-ruby'} ipad:w-5 ipad:h-5`} />
                    Folder 1
                </button>
                <button
                    onClick={() => setSelectedFolder('folder2')}
                    className={`inline-flex items-center gap-2 px-2 ipad:px-4 py-0.5 ipad:py-1.5 rounded-full backdrop-blur-glass font-medium text-sm ipad:text-base transition-all duration-300 ease-in-out shadow-soft ${selectedFolder === 'folder2' 
                            ? 'bg-white/20 text-neutral-700 border border-white/20' 
                            : 'bg-neutral-200 text-ruby border border-neutral-300 hover:bg-neutral-300 hover:shadow-md hover:border-neutral-300'
                    }`}
                >
                    <ImageIcon size={18} className={`${selectedFolder === 'folder2' ? 'text-white' : 'text-ruby'} ipad:w-5 ipad:h-5`} />
                    Folder 2
                </button>
            </section>

            {/* Gallery Section */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto pb-12 ipad:pb-16">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 ipad:py-20">
                        <Loader2 className="w-6 h-6 ipad:w-8 ipad:h-8 animate-spin text-ruby mb-4" />
                        <p className="text-neutral-600 text-sm ipad:text-base">Loading your gallery...</p>
                    </div>
                ) : displayedImages.length > 0 ? (
                    <>
                        <div className="columns-2 tablet:columns-2 ipad:columns-3 ipad-pro:columns-4 xl:columns-4 gap-4 ipad:gap-6">
                            {displayedImages.map((img, index) => (
                                <div
                                    key={img.id}
                                    className="masonry-item"
                                    onClick={() => openModal(img)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <CloudinaryImage
                                        publicId={img.publicId}
                                        alt={img.name}
                                        className="w-full object-cover"
                                        useTransformation={false}
                                    />
                                    <div className="absolute bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMoreImages && (
                            <div className="flex justify-center mt-8 ipad:mt-12">
                                <button
                                    onClick={loadMoreImages}
                                    disabled={isLoadingMore}
                                    className="inline-flex items-center gap-2 px-6 ipad:px-8 py-3 ipad:py-4 bg-gradient-to-r from-ruby to-rose-500 text-white font-medium rounded-full hover:from-ruby/90 hover:to-rose-500/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm ipad:text-base"
                                >
                                    {isLoadingMore ? (
                                        <>
                                            <Loader2 className="w-4 h-4 ipad:w-5 ipad:h-5 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 ipad:w-5 ipad:h-5" />
                                            Load More ({allImages.length - displayedImages.length} remaining)
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 ipad:py-20">
                        <ImageIcon className="w-12 h-12 ipad:w-16 ipad:h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg ipad:text-xl font-playfair text-neutral-600 mb-2">No Images Found</h3>
                        <p className="text-neutral-500 text-sm ipad:text-base">No images found in your Cloudinary folder.</p>
                    </div>
                )}
            </section>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 ipad:bottom-8 ipad:right-8 z-40 p-3 ipad:p-4 bg-gradient-to-r from-ruby to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-5 h-5 ipad:w-6 ipad:h-6 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
            )}

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
                        <CloudinaryImage
                            publicId={selectedImages.publicId}
                            alt={selectedImages.name}
                            className="max-w-full max-h-[85vh] ipad:max-h-[90vh] object-contain shadow-elegant"
                            useTransformation={true}
                            width="1200"
                            quality="auto:best"
                        />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}