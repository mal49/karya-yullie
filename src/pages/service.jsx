import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle, Palette, Sparkles, Heart, Crown, ArrowLeft, MessageCircle, Star, Users, Clock } from 'lucide-react';

// Move services array outside component to prevent recreation on every render
const services = [
    {
        id: 1,
        icon: Heart,
        title: "BRIDAL MAKEUP",
        price: "RM 200.00 - RM 300.00",
        features: [
            "Hair trial free",
            "Long-lasting makeup",
            "Professional products",
            "Touch-up kit included",
            "Photo-ready finish"
        ],
        description: "Perfect makeup for your special day. Whether you want spectacular bridal look or day-time fresh & natural tone, Yullie's experienced craftsmanship for your best and less stressful approach for a beautiful finish. Create natural beauty that goes from day to night with a professional finish.",
        popular: true
    },
    {
        id: 2,
        icon: Sparkles,
        title: "PARTY MAKEUP",
        price: "RM 60.00 - RM 100.00",
        features: [
            "Bold night look",
            "Long-lasting makeup",
            "Glamorous finish",
            "Custom color palette",
            "Professional application"
        ],
        description: "Dah berhama' lama sangat dekat office loh muka tak di-makeup properly. Now time to give yourself a treat! Get ready to rock your night with our glamorous party makeup that complements you from sunset and lets you glow all night long. Create lasting impact from day to night with perfect blend."
    },
    {
        id: 3,
        icon: Palette,
        title: "EVERYDAY MAKEUP",
        price: "RM 40.00 - RM 80.00",
        features: [
            "Natural daily look",
            "Quick application",
            "Lightweight formula",
            "Office-appropriate",
            "Fresh appearance"
        ],
        description: "Dah berhama' lama sangat dekat office loh muka tak di-makeup properly. Allow us to make you look fresh and natural everyday. We use lightweight formulas that enhance your natural beauty without looking overdone. Perfect for daily wear, office meetings, and casual outings."
    },
    {
        id: 4,
        icon: Crown,
        title: "CONVOCATION MAKEUP",
        price: "RM 70.00 - RM 120.00",
        features: [
            "Graduation special",
            "Camera-ready look",
            "Long-lasting wear",
            "Professional finish",
            "Memorable photos"
        ],
        description: "Your graduation day deserves the perfect look! Our convocation makeup service ensures you look stunning in all your photos and feel confident during your special ceremony. We create a polished, camera-ready look that will make your achievement shine even brighter."
    },
    {
        id: 5,
        icon: Sparkles,
        title: "MAKEUP STYLE",
        price: "RM 50.00 - RM 90.00",
        features: [
            "Chair test free",
            "Long test free",
            "Chair test free",
            "Long test free",
            "Chair test free"
        ],
        description: "Dah berhama' lama sangat dekat office toh muka tak di-makeup properly. Amcing foto keje lah semua nak dok ampit. Ohh! Amazing photo keje lah semua nak dok ampit ohh! Create natural beauty that looks great on social media for a beautiful finish."
    },
    {
        id: 6,
        icon: Heart,
        title: "MAKEUP STYLE",
        price: "RM 65.00 - RM 105.00",
        features: [
            "Chair test free",
            "Long test free",
            "Chair test free",
            "Long test free",
            "Chair test free"
        ],
        description: "Dah berhama' lama sangat dekat office toh muka tak di-makeup properly. Amcing foto keje lah semua nak dok ampit. Ohh! Amazing photo keje lah semua nak dok ampit ohh! Create natural beauty that looks great on social media for a beautiful finish."
    }
];

export default function ServicePage() {
    const [selectedService, setSelectedService] = useState(null);
    const [showMobileDetail, setShowMobileDetail] = useState(false);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowMobileDetail(true);
    };

    const handleBackClick = () => {
        setShowMobileDetail(false);
        setSelectedService(null);
    };

    // Mobile Service Detail View Component
    const MobileServiceDetail = ({ service, onBack }) => (
        <div className="min-h-screen w-full gradient-bg font-inter">
            <Header />
            
            {/* Back Button */}
            <div className="px-4 pt-4 pb-2">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-20">
                {/* Large Image */}
                <div className="w-full h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center mb-6">
                    <Palette className="w-16 h-16 text-neutral-400" />
                </div>

                {/* Service Title */}
                <h1 className="text-2xl font-playfair font-bold text-neutral-800 mb-2">
                    {service.title}
                </h1>

                {/* Price */}
                <div className="text-2xl font-playfair font-bold text-gradient mb-6">
                    {service.price}
                </div>

                {/* Features List */}
                <div className="mb-6">
                    <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 text-base text-neutral-600">
                                <div className="w-2 h-2 bg-neutral-400 rounded-full flex-shrink-0"></div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <p className="text-base text-neutral-600 leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Fixed Bottom Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-ruby text-ruby font-semibold py-3 px-4 rounded-xl hover:bg-ruby hover:text-white transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                    Chat Now
                </button>
                <button className="flex-1 bg-gradient-to-r from-ruby to-ruby-light text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300">
                    BOOK NOW!
                </button>
            </div>
        </div>
    );

    // Show mobile detail view if selected
    if (showMobileDetail && selectedService) {
        return <MobileServiceDetail service={selectedService} onBack={handleBackClick} />;
    }

    return(
        <div className="min-h-screen w-full gradient-bg font-inter">
            {/* header */}
            <Header />

            {/* Hero Section */}
            <section className="relative py-12 ipad:py-20 ipad-pro:py-24 px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl ipad:text-5xl lg:text-7xl font-playfair font-bold text-gradient mb-4 ipad:mb-6 fade-in-up leading-tight pb-2">
                        Our Services
                    </h1>
                    <p className="text-base ipad:text-lg ipad-pro:text-xl text-neutral-600 max-w-xl ipad:max-w-2xl mx-auto mb-6 ipad:mb-8 fade-in-up px-4 ipad:px-0">
                        Professional makeup services tailored to enhance your natural beauty for every occasion.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto pb-12 ipad:pb-16">
                <div className="grid grid-cols-2 ipad:grid-cols-1 gap-4 ipad:gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div 
                                key={service.id}
                                className="relative backdrop-blur-glass border border-neutral-200/20 rounded-2xl p-6 ipad:p-8 shadow-soft hover:shadow-elegant transition-all duration-300 card-hover"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Popular Badge */}
                                {service.popular && (
                                    <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-ruby to-ruby-light text-white text-xs font-semibold rounded-full shadow-soft">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex flex-col h-full">
                                    {/* Mobile Layout */}
                                    <div className="ipad:hidden">
                                        {/* Image Placeholder - Mobile */}
                                        <div 
                                            className="w-full h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center mb-3 cursor-pointer"
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            <Palette className="w-8 h-8 text-neutral-400" />
                                        </div>

                                        {/* Title - Mobile */}
                                        <h3 
                                            className="text-sm font-playfair font-bold text-neutral-800 mb-2 cursor-pointer"
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            {service.title}
                                        </h3>

                                        {/* Features List - Mobile */}
                                        <div className="mb-3">
                                            <ul className="space-y-1">
                                                {service.features.slice(0, 4).map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-center gap-1 text-xs text-neutral-600">
                                                        <div className="w-1 h-1 bg-neutral-400 rounded-full flex-shrink-0"></div>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Price - Mobile */}
                                        <div 
                                            className="text-base font-playfair font-bold text-gradient mb-3 cursor-pointer"
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            {service.price.replace(/\.00/g, '').replace(' - ', '-')}
                                        </div>

                                        {/* Book Now Button - Mobile */}
                                        <button 
                                            className="w-full bg-gradient-to-r from-ruby to-ruby-light text-white font-semibold py-2 px-4 rounded-lg text-xs hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle book now action here
                                            }}
                                        >
                                            BOOK NOW
                                        </button>
                                    </div>

                                    {/* Desktop/Tablet Layout */}
                                    <div className="hidden ipad:flex ipad:flex-row ipad:h-full gap-6">
                                        {/* Left Column - Image and Info */}
                                        <div className="flex flex-col gap-4 flex-shrink-0">
                                            {/* Image Placeholder */}
                                            <div className="w-64 h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center">
                                                <Palette className="w-20 h-20 text-neutral-400" />
                                            </div>

                                            {/* Quick Stats */}
                                            <div className="w-64">
                                                <div className="flex flex-col gap-2">
                                                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-neutral-50 to-neutral-100 border border-neutral-200 rounded-full text-xs text-neutral-700 font-medium">
                                                        <Users className="w-3 h-3 text-ruby" />
                                                        <span>50+ booked</span>
                                                    </div>
                                                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-neutral-50 to-neutral-100 border border-neutral-200 rounded-full text-xs text-neutral-700 font-medium">
                                                        <Clock className="w-3 h-3 text-ruby" />
                                                        <span>2-3 hours</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content - Right Side */}
                                        <div className="flex-1 flex flex-col">
                                            {/* Title */}
                                            <div className="mb-4">
                                                <h3 className="text-xl ipad:text-2xl font-playfair font-bold text-neutral-800">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            {/* Features List */}
                                            <div className="mb-4">
                                                <ul className="space-y-2">
                                                    {service.features.map((feature, featureIndex) => (
                                                        <li key={featureIndex} className="flex items-center gap-2 text-sm ipad:text-base text-neutral-600">
                                                            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></div>
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Description */}
                                            <div className="flex-1 mb-6">
                                                <p className="text-sm ipad:text-base text-neutral-600 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Price and Button Row */}
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl ipad:text-3xl font-playfair font-bold text-gradient">
                                                    {service.price}
                                                </div>
                                                <button className="bg-gradient-to-r from-ruby to-ruby-light text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                                                    BOOK NOW
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-4xl mx-auto pb-12 ipad:pb-16">
                <div className="text-center backdrop-blur-glass border border-neutral-200/20 rounded-2xl p-8 ipad:p-12 shadow-soft">
                    <h2 className="text-2xl ipad:text-3xl font-playfair font-bold text-neutral-800 mb-4">
                        Ready to Transform Your Look?
                    </h2>
                    <p className="text-base ipad:text-lg text-neutral-600 mb-6 max-w-2xl mx-auto">
                        Book your makeup session today and let us enhance your natural beauty with our professional expertise.
                    </p>
                    <div className="flex flex-col ipad:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-ruby to-ruby-light text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                            Contact Us
                        </button>
                        <button className="border-2 border-ruby text-ruby font-semibold py-3 px-8 rounded-xl hover:bg-ruby hover:text-white transition-all duration-300">
                            View Portfolio
                        </button>
                    </div>
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div>
    );
}