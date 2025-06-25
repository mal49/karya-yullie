import MainPage from "./pages/mainPage";
import AboutPage from "./pages/aboutPage";
import Collaboration from "./pages/collaboration";
import ServicePage from "./pages/service";
import Contact from "./pages/contact";
import { PageProvider, usePage } from "./context/PageContext";

function AppContent() {
  const { currentPage } = usePage();

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <MainPage />;
      case 'about':
        return <AboutPage />;
      case 'collaboration':
        return <Collaboration />;
      case 'service':
        return <ServicePage />;
      case 'contact':
        return <Contact />;
      default:
        return <MainPage />;
    }
  }

  return(
    <div className="min-h-screen gradient-bg font-inter m-0 p-0">
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <PageProvider>
      <AppContent />
    </PageProvider>
  );
}