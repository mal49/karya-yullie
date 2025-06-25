import Header from "../components/Header";
import Footer from "../components/Footer";
import { BookCheck, Heart, Star, Award } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { icon: BookCheck, value: '100+', label: 'Completed Jobs' },
        { icon: Heart, value: '100+', label: 'Happy Clients' },
        { icon: Star, value: '5★', label: 'Average Rating' },
        { icon: Award, value: '3+', label: 'Years Experience' }
    ];

    const skills = [
        'Bridal Makeup',
        'Editorial Makeup',
        'Eye Makeup',
        'Convocation',
        'Skin Care & Prep',
        'Color Theory'
    ];

    return (
        <div className="min-h-screen gradient-bg font-inter">
            <Header />
            
            {/* Hero Section */}
            <section className="relative py-12 ipad:py-20 ipad-pro:py-24 px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl ipad:text-5xl ipad-pro:text-6xl lg:text-7xl font-playfair font-bold text-gradient mb-4 ipad:mb-6 fade-in-up">
                        About Yullie
                    </h1>
                    <p className="text-base ipad:text-lg ipad-pro:text-xl text-neutral-600 max-w-xl ipad:max-w-2xl mx-auto fade-in-up px-4 ipad:px-0">
                        Passionate makeup artist transforming faces into works of art through expert techniques and creative vision.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 ipad:px-8 ipad-pro:px-12 max-w-7xl mx-auto pb-12 ipad:pb-16">
                <div className="grid ipad-pro:grid-cols-2 gap-12 ipad:gap-16 items-center mb-16 ipad:mb-20">
                    {/* Profile Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                            <img 
                                src="./img/yullie.jpeg" 
                                alt="Yullie's portrait" 
                                className="w-full h-80 ipad:h-96 ipad-pro:h-[500px] object-cover image-hover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ruby/20 to-transparent"></div>
                        </div>
                        {/* Floating decoration */}
                        <div className="absolute -top-4 ipad:-top-6 -right-4 ipad:-right-6 w-16 h-16 ipad:w-24 ipad:h-24 bg-gradient-to-br from-ruby-light to-ruby rounded-full opacity-20 floating-animation"></div>
                        <div className="absolute -bottom-3 ipad:-bottom-4 -left-3 ipad:-left-4 w-12 h-12 ipad:w-16 ipad:h-16 bg-gradient-to-br from-cream-400 to-cream-600 rounded-full opacity-30 floating-animation" style={{ animationDelay: '2s' }}></div>
                    </div>

                    {/* About Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl ipad:text-3xl ipad-pro:text-4xl font-playfair font-bold text-neutral-800">
                                Hi, I'm Yullie
                            </h2>
                            <p className="text-base ipad:text-lg text-neutral-600 leading-relaxed">
                                Welcome to my creative world. I'm a passionate makeup artist who believes that every face 
                                tells a unique story worth enhancing. Through my artistry, I aim to bring out your natural 
                                beauty and create stunning transformations that make you feel confident and radiant.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-lg ipad:text-xl font-playfair font-semibold text-neutral-800">What I Do</h3>
                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3">
                                {skills.map((skill, index) => (
                                    <div 
                                        key={skill}
                                        className="flex items-center gap-2 p-3 rounded-lg backdrop-blur-glass border border-neutral-200/20 shadow-soft hover:shadow-elegant transition-all duration-300"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-ruby to-ruby-light rounded-full"></div>
                                        <span className="text-sm ipad:text-base font-medium text-neutral-700">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 ipad:grid-cols-4 gap-4 ipad:gap-6 mb-16 ipad:mb-20">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div 
                                key={stat.label}
                                className="text-center p-4 ipad:p-6 rounded-xl backdrop-blur-glass border border-neutral-200/20 shadow-soft hover:shadow-elegant transition-all duration-300 card-hover"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <IconComponent className="w-6 h-6 ipad:w-8 ipad:h-8 text-ruby mx-auto mb-2 ipad:mb-3" />
                                <div className="text-xl ipad:text-2xl ipad-pro:text-3xl font-playfair font-bold text-neutral-800 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs ipad:text-sm text-neutral-600">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Philosophy Section */}
                <div className="text-center max-w-3xl ipad:max-w-4xl mx-auto px-4 ipad:px-0">
                    <div className="space-y-6 text-base ipad:text-lg text-neutral-600 leading-relaxed">
                        <p className="italic">
                            "Makeup is not about masking yourself. It's about revealing your true beauty and enhancing what nature has already blessed you with."
                        </p>
                        <div className="pt-4 ipad:pt-6">
                            <div className="w-16 ipad:w-24 h-px bg-gradient-to-r from-transparent via-ruby to-transparent mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}