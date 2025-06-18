import MainPage from "./pages/mainPage";
import AboutPage from "./pages/aboutPage";
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
        return <MainPage />; // Temporary, replace with CollaborationPage when created
      case 'booking':
        return <MainPage />; // Temporary, replace with BookingPage when created
      default:
        return <MainPage />;
    }
  }

  return(
    <div className="min-h-screen bg-[#FCFFE3] font-roboto m-0 p-0 dark:bg-[#FCFFE3]">
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