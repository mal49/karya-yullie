import { Instagram, MessageCircle, AtSign } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Instagram',
            icon: Instagram,
            href: 'https://www.instagram.com/karyayullie?utm_source=ig_web_button_share_sheet&igsh=MThsYnBlaWJraWN2cg==',
            color: 'hover:text-pink-500'
        },
        {
            name: 'Whatsapp',
            icon: MessageCircle,
            href: '#',
            color: 'hover:text-green-500'
        },
        {
            name: 'Threads',
            icon: AtSign,
            href: 'https://www.threads.com/@karyayullie',
            color: 'hover:text-blue-500'
        }
    ];

    return (
        <footer className="backdrop-blur-glass border-t border-neutral-200/20 mt-12 ipad:mt-16">
            <div className="max-w-7xl mx-auto px-4 ipad:px-8 ipad-pro:px-12 py-6 ipad:py-8">
                <div className="flex flex-col items-center space-y-4 ipad:space-y-6">

                    <div className='text-xl ipad:text-2xl font-sail text-ruby'>
                        <p>Karya Yullie</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 ipad:gap-6">
                        {socialLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`group flex items-center gap-2 text-neutral-600 ${link.color} transition-all duration-300 hover:scale-110`}
                                    aria-label={link.name}
                                    target='blank'
                                >
                                    <IconComponent size={18} className="ipad:w-5 ipad:h-5" />
                                    <span className="text-sm ipad:text-base font-medium group-hover:text-inherit transition-colors duration-300">
                                        {link.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-xs ipad:text-sm text-neutral-500">
                            © {currentYear} Karya Yullie. All rights reserved.
                        </p>
                        <p className="text-2xs ipad:text-xs text-neutral-400 mt-1">
                            Crafted with ❤️ and creativity
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
} 