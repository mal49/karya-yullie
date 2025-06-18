import { createContext, useContext, useState, useEffect } from 'react';

// Create a React Context for managing page navigation
// This will allow any component in the app to access and update the current page
const PageContext = createContext();

export function PageProvider({ children }) {
  // Function to extract the current page from the URL hash
  // For example: if URL is "website.com#about", this returns "about"
  // If there's no hash, it defaults to "home"
  const getPageFromURL = () => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    return hash || 'home'; // Default to 'home' if no hash
  };

  // Initialize the current page state based on what's in the URL when the app loads
  // This ensures the app shows the correct page if someone visits a direct link
  const [currentPage, setCurrentPage] = useState(getPageFromURL);

  // Function to navigate to a new page
  // This updates both the internal state AND the browser URL
  // So users can bookmark pages and use browser back/forward buttons
  const navigateToPage = (page) => {
    setCurrentPage(page); // Update React state
    // Update browser URL: if going to 'home', clear the hash, otherwise set it to the page name
    window.location.hash = page === 'home' ? '' : page;
  };

  // Listen for browser navigation events (back/forward buttons, manual URL changes)
  // This keeps our React state in sync with the browser URL
  useEffect(() => {
    // Handler function that runs when the URL hash changes
    const handleHashChange = () => {
      setCurrentPage(getPageFromURL()); // Update state to match new URL
    };

    // Subscribe to hash change events
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup: remove the event listener when component unmounts
    // This prevents memory leaks
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array means this effect only runs once on mount

  // Provide the context value to all child components
  // Any component wrapped by this provider can access currentPage and navigateToPage
  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage: navigateToPage }}>
      {children}
    </PageContext.Provider>
  );
}

// Custom hook to use the page context
// This provides a clean way for components to access the page navigation functionality
export function usePage() {
  const context = useContext(PageContext);
  // Error handling: make sure this hook is only used inside a PageProvider
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}

/* 
HOW TO USE THIS CONTEXT:

1. Wrap your app with PageProvider:
   <PageProvider>
     <App />
   </PageProvider>

2. In any component, use the usePage hook:
   const { currentPage, setCurrentPage } = usePage();

3. Navigate programmatically:
   setCurrentPage('about'); // Goes to #about

4. Check current page:
   if (currentPage === 'home') { ... }

This creates a single-page application with URL-based routing using hash fragments.
*/ 