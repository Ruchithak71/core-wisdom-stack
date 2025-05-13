
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import DocumentDetail from "./pages/DocumentDetail";
import CategoryView from "./pages/CategoryView";
import Upload from "./pages/Upload";
import Analytics from "./pages/Analytics";
import MyFiles from "./pages/MyFiles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/document/:id" element={<DocumentDetail />} />
            <Route path="/category/:id" element={<CategoryView />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/my-files" element={<MyFiles />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* Additional routes would go here */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
