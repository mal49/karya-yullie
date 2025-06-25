import Header from "../components/Header";
import Footer from "../components/Footer";
import { Instagram, MessageCircle, AtSign, BadgeCheck, ExternalLink } from 'lucide-react';

export default function Contact() {
    const socialLinks = [
        {
            name: 'Instagram',
            icon: Instagram,
            href: '#',
            color: 'bg-gradient-to-r from-purple-500 to-pink-500',
            textColor: 'text-white'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: '#',
            color: 'bg-green-500',
            textColor: 'text-white'
        },
        {
            name: 'Threads',
            icon: AtSign,
            href: '#',
            color: 'bg-black',
            textColor: 'text-white'
        }
    ];

    const stats = [
        { number: '100+', label: 'Jobs' },
        { number: '100+', label: 'Clients' },
        { number: '3+', label: 'Years' }
    ];
    
    return(
        <div className="min-h-screen gradient-bg font-inter flex flex-col">
            <Header />
            
            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-elegant p-8 text-center">
                        {/* Profile Image with Instagram-style border */}
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1">
                                <div className="bg-white rounded-full p-1">
                                    <img 
                                        src="./img/yullie.jpeg"
                                        alt="Yullie's profile" 
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Username with verification */}
                        <div className="mb-2">
                            <div className="flex items-center justify-center gap-2">
                                <h1 className="text-xl font-semibold text-gray-900">karyayullie</h1>
                                <BadgeCheck className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="text-sm text-gray-600">Makeup Artist</span>
                            </div>
                        </div>

                        {/* Website link */}
                        <div className="mb-6">
                            <a href="#" className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                                <span>karyayullie.com</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around mb-8 py-4 border-t border-b border-gray-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-lg font-semibold text-gray-900">{stat.number}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            {socialLinks.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl ${link.color} ${link.textColor} font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <IconComponent size={18} />
                                        <span>{link.name === 'WhatsApp' ? 'Chat on Whatsapp' : `Follow on ${link.name}`}</span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Message Button */}
                        <div className="mt-4">
                            <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02]">
                                Send Message
                            </button>
                        </div>

                        {/* Bio/Description */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ✨ Professional makeup artist<br/>
                                📍 Available in Selangor/KL<br/>
                                💄 Beauty • Fashion • Events<br/>
                                📧 karyayullie@email.com
                            </p>
                        </div>
                    </div>

                    {/* Additional Contact Info */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-600">
                            Ready to create something beautiful? Let's connect! 💫
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}