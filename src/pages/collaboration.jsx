import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Collaboration() {
    return(
        <div className="min-h-screen w-full gradient-bg font-inter flex flex-col">
            {/* header */}
            <Header />

            {/* body */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 ipad:px-8 py-12 ipad:py-16">
                <img 
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3prN2l0aWxnandwN2FuOWtyaTFxODgyaTQwdnN1OXJ0MTgyZDJhdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif" 
                    alt="Under construction animation" 
                    className="w-full max-w-xs ipad:max-w-md ipad-pro:max-w-lg h-auto rounded-lg shadow-soft"
                />
                <div className="text-center mt-4 ipad:mt-6 space-y-2">
                    <h1 className="text-2xl ipad:text-3xl ipad-pro:text-4xl font-playfair font-bold text-gradient">
                        Coming Soon
                    </h1>
                    <p className="text-base ipad:text-lg ipad-pro:text-xl text-neutral-600 max-w-xs ipad:max-w-md px-4 ipad:px-0">
                        This page is currently under construction. Check back soon for exciting collaboration opportunities!
                    </p>
                </div>
            </div>

            {/* footer - stays at bottom */}
            <Footer />
        </div>
    );
}