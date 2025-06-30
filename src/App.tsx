import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Research from "./pages/Research";
import News from "./pages/News";
import Team from "./pages/Team";
import TeamMember from "./pages/TeamMember";
import Publications from "./pages/Publications";
import Publication from "./pages/Publication";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ScrollToTop component that will scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also try smooth scroll after a small delay to ensure it works
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);

    // Additional scroll reset after a longer delay to catch any late renders
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/research" element={<Research />} />
          <Route path="/news" element={<News />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamMember />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:slug" element={<Publication />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
