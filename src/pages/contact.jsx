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
<<<<<<< Updated upstream
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-elegant p-8 text-center">
                        {/* Profile Image with Instagram-style border */}
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1">
                                <div className="bg-white rounded-full p-1">
                                    <img 
                                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" 
                                        alt="Yullie's profile" 
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
=======
            <div className="flex-1 flex items-center px-4 ipad:px-8 py-12 ipad:py-16">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-center">
                        {/* Profile Card */}
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
>>>>>>> Stashed changes
                                </div>

<<<<<<< Updated upstream
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
=======
                                {/* Username with verification */}
                                <div className="mb-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <h1 className="text-lg ipad:text-xl font-semibold text-gray-900">karyayullie</h1>
                                        <BadgeCheck className="w-4 h-4 ipad:w-5 ipad:h-5 text-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-sm ipad:text-base text-gray-600">Makeup Artist</span>
                                    </div>
>>>>>>> Stashed changes
                                </div>

<<<<<<< Updated upstream
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
=======
                                {/* Website link */}
                                <div className="mb-4 ipad:mb-6">
                                    <a href="#" className="flex items-center justify-center gap-1 text-sm ipad:text-base text-blue-600 hover:text-blue-700 transition-colors">
                                        <span>karyayullie.com</span>
                                        <ExternalLink className="w-3 h-3 ipad:w-4 ipad:h-4" />
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
                        {/* Form Section */}
                        <div className="w-full max-w-xl ipad:max-w-2xl lg:max-w-4xl mb-8">
                            <div className="bg-white rounded-xl p-4 ipad:p-6 border border-black-200">
                                <div className="text-center mb-6">
                                    <h2 className="text-lg ipad:text-xl font-playfair text-gray-800 mb-2">
                                        Book Your Makeup Session
                                    </h2>
                                    <p className="text-sm text-gray-600">Please provide the following details for your booking</p>
                                </div>

                                <form className="space-y-3 ipad:space-y-4">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            What's your name? <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                            placeholder="e.g. Yullie"
                                        />
                                    </div>

                                    {/* Type of Event */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            What's the occasion? <span className="text-red-500">*</span>
                                        </label>
                                        <select 
                                            required
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Choose your event type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="photoshoot">Photoshoot</option>
                                            <option value="party">Party/Celebration</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="other">Other special occasion</option>
                                        </select>
                                    </div>

                                    {/* Event Date & Time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            When is your event? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                                                <input 
                                                    type="date" 
                                                    required
                                                    className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Preferred start time</label>
                                                <select 
                                                    required
                                                    className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                                >
                                                    <option value="">Select time</option>
                                                    <option value="06:00">6:00 AM</option>
                                                    <option value="06:30">6:30 AM</option>
                                                    <option value="07:00">7:00 AM</option>
                                                    <option value="07:30">7:30 AM</option>
                                                    <option value="08:00">8:00 AM</option>
                                                    <option value="08:30">8:30 AM</option>
                                                    <option value="09:00">9:00 AM</option>
                                                    <option value="09:30">9:30 AM</option>
                                                    <option value="10:00">10:00 AM</option>
                                                    <option value="10:30">10:30 AM</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="11:30">11:30 AM</option>
                                                    <option value="12:00">12:00 PM</option>
                                                    <option value="12:30">12:30 PM</option>
                                                    <option value="13:00">1:00 PM</option>
                                                    <option value="13:30">1:30 PM</option>
                                                    <option value="14:00">2:00 PM</option>
                                                    <option value="14:30">2:30 PM</option>
                                                    <option value="15:00">3:00 PM</option>
                                                    <option value="15:30">3:30 PM</option>
                                                    <option value="16:00">4:00 PM</option>
                                                    <option value="16:30">4:30 PM</option>
                                                    <option value="17:00">5:00 PM</option>
                                                    <option value="17:30">5:30 PM</option>
                                                    <option value="18:00">6:00 PM</option>
                                                    <option value="flexible">I'm flexible with timing</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Makeup Venue */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Where will the makeup session take place? <span className="text-red-500">*</span>
                                        </label>
                                        <textarea 
                                            required
                                            rows="3"
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
                                            placeholder="e.g. Petaling Jaya, Selangor or specific venue name and address"
                                        ></textarea>
                                    </div>

                                    {/* Are you the bride */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Are you the bride? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-6">
                                            <label className="flex items-center cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name="is_bride" 
                                                    value="yes" 
                                                    required
                                                    className="mr-2 text-pink-500 focus:ring-gray-500"
                                                />
                                                <span className="text-base text-gray-700">Yes, I am</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name="is_bride" 
                                                    value="no" 
                                                    required
                                                    className="mr-2 text-pink-500 focus:ring-gray-500"
                                                />
                                                <span className="text-base text-gray-700">No, someone else</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* How many pax */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            How many people need makeup? <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            required
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                            placeholder="e.g. 3 people"
                                        />
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            What's your budget range? <span className="text-red-500">*</span>
                                        </label>
                                        <select 
                                            required
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Please select your budget range</option>
                                            <option value="under-500">Under RM 500</option>
                                            <option value="500-1000">RM 500 - RM 1,000</option>
                                            <option value="1000-2000">RM 1,000 - RM 2,000</option>
                                            <option value="2000-3000">RM 2,000 - RM 3,000</option>
                                            <option value="3000-5000">RM 3,000 - RM 5,000</option>
                                            <option value="above-5000">Above RM 5,000</option>
                                            <option value="flexible">I'm flexible with pricing</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button 
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-lg text-base font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                        >
                                            Send My Booking Request
                                        </button>
                                        <p className="text-xs text-gray-500 text-center mt-2">
                                            We'll get back to you within 24 hours
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
>>>>>>> Stashed changes
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}