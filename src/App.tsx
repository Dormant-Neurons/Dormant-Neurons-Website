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
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import MemberDashboard from "./pages/MemberDashboard";
import AddNews from "./pages/AddNews";
import AddPublication from "./pages/AddPublication";
import AddGallery from "./pages/AddGallery";
import AddMember from "./pages/admin/AddMember";
import ReorderMembers from "./pages/admin/ReorderMembers";
import EditNews from "./pages/admin/EditNews";
import EditMembers from "./pages/admin/EditMembers";
import EditPublications from "./pages/admin/EditPublications";
import EditGallery from "./pages/admin/EditGallery";

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
          <Route path="/login" element={<Login />} />
          <Route 
            path="/edit-profile" 
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-news" 
            element={
              <ProtectedRoute>
                <AddNews />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-publication" 
            element={
              <ProtectedRoute>
                <AddPublication />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-gallery" 
            element={
              <ProtectedRoute>
                <AddGallery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/add-member" 
            element={
              <ProtectedRoute>
                <AddMember />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reorder-members" 
            element={
              <ProtectedRoute>
                <ReorderMembers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit-news" 
            element={
              <ProtectedRoute>
                <EditNews />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit-members" 
            element={
              <ProtectedRoute>
                <EditMembers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit-publications" 
            element={
              <ProtectedRoute>
                <EditPublications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit-gallery" 
            element={
              <ProtectedRoute>
                <EditGallery />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
