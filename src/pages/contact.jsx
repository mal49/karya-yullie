import Header from "../components/Header";
import Footer from "../components/Footer";
import { Instagram, MessageCircle, AtSign, BadgeCheck, ExternalLink } from 'lucide-react';

export default function Contact() {
    const socialLinks = [
        {
            name: 'Instagram',
            icon: Instagram,
            href: 'https://www.instagram.com/karyayullie?utm_source=ig_web_button_share_sheet&igsh=MThsYnBlaWJraWN2cg==',
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
            href: 'https://www.threads.com/@karyayullie',
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
            <div className="flex-1 flex items-center justify-center px-4 ipad:px-8 py-12 ipad:py-16">
                <div className="w-full max-w-sm ipad:max-w-md">
                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-elegant p-6 ipad:p-8 text-center">
                        {/* Profile Image with Instagram-style border */}
                        <div className="relative inline-block mb-4 ipad:mb-6">
                            <div className="w-20 h-20 ipad:w-28 ipad:h-28 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1">
                                <div className="bg-white rounded-full p-1">
                                    <img 
                                        src="./img/yullie.jpeg"
                                        alt="Yullie's profile" 
                                        className="w-16 h-16 ipad:w-24 ipad:h-24 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Username with verification */}
                        <div className="mb-2">
                            <div className="flex items-center justify-center gap-2">
                                <h1 className="text-lg ipad:text-xl font-semibold text-gray-900">karyayullie</h1>
                                <BadgeCheck className="w-4 h-4 ipad:w-5 ipad:h-5 text-blue-500" />
                            </div>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="text-sm ipad:text-base text-gray-600">Makeup Artist</span>
                            </div>
                        </div>

                        {/* Website link */}
                        <div className="mb-4 ipad:mb-6">
                            <a href="#" className="flex items-center justify-center gap-1 text-sm ipad:text-base text-blue-600 hover:text-blue-700 transition-colors">
                                <span>karyayullie.com</span>
                                <ExternalLink className="w-3 h-3 ipad:w-4 ipad:h-4" />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around mb-6 ipad:mb-8 py-3 ipad:py-4 border-t border-b border-gray-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-base ipad:text-lg font-semibold text-gray-900">{stat.number}</div>
                                    <div className="text-xs ipad:text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
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
                                        className={`w-full flex items-center justify-center gap-3 py-3 ipad:py-4 px-4 ipad:px-6 rounded-xl ${link.color} ${link.textColor} text-sm ipad:text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        target="blank"
                                    >
                                        <IconComponent size={16} className="ipad:w-5 ipad:h-5" />
                                        <span>{link.name === 'WhatsApp' ? 'Chat on Whatsapp' : `Follow on ${link.name}`}</span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Message Button */}
                        <div className="mt-4">
                            <button className="w-full py-3 ipad:py-4 px-4 ipad:px-6 bg-gray-100 text-gray-800 text-sm ipad:text-base font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02]">
                                <a 
                                href="https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fq0hzvl%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAafAgsNN1vppsDnKckMIh-NphflL-OY4uii2W0D3ct4eJ-Ku3x4FUhA-GWc6SA_aem_l8Yc12KLuE-HyzdLa5cr_g&e=AT3LXvaEnlyhwDyrwUSNTCWe5YcB59LJkhD1WhapbdZB6czDKyNAkeitNw4YAyuZE_pbWaYKs6FSHYbXy7XXFCXrt9C6xWNRo3ozOg"
                                target="blank"
                                >
                                    Send Messages
                                </a>
                            </button>
                        </div>

                        {/* Bio/Description */}
                        <div className="mt-4 ipad:mt-6 pt-3 ipad:pt-4 border-t border-gray-100">
                            <p className="text-xs ipad:text-sm text-gray-600 leading-relaxed">
                                ✨ Professional makeup artist<br/>
                                📍 Available in Selangor/KL<br/>
                                💄 Beauty • Fashion • Events<br/>
                                📧 zcyeollie@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Additional Contact Info */}
                    <div className="mt-4 ipad:mt-6 text-center">
                        <p className="text-sm ipad:text-base text-neutral-600">
                            Ready to create something beautiful? Let's connect! 💫
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}