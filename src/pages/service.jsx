import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ServicePage() {
    return(
        <div className="min-h-screen gradient-bg font-inter flex flex-col">
            {/* header */}
            <Header />

            {/* body */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <img 
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3prN2l0aWxnandwN2FuOWtyaTFxODgyaTQwdnN1OXJ0MTgyZDJhdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif" 
                    alt="Under construction animation" 
                    className="w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-soft"
                />
                <div className="text-center mt-6 space-y-2">
                    <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gradient">
                        Coming Soon
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 max-w-md">
                        This page is currently under construction. Check back soon for our services and rates!
                    </p>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    );
}