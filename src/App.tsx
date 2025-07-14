
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Visits from "./pages/Visits";
import VisitDetail from "./pages/VisitDetail";
import AttendanceDetail from "./pages/AttendanceDetail";
import ConveyanceDetail from "./pages/ConveyanceDetail";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/lead-detail/:id" element={<LeadDetail />} />
          <Route path="/visits" element={<Visits />} />
          <Route path="/visit/:id" element={<VisitDetail />} />
          <Route path="/attendance" element={<AttendanceDetail />} />
          <Route path="/conveyance" element={<ConveyanceDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
