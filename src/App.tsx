import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrandSelector from "./pages/BrandSelector";
import Dashboard from "./pages/Dashboard";
import ContractUpload from "./pages/ContractUpload";
import EvolutionMap from "./pages/EvolutionMap";
import Chatbot from "./pages/Chatbot";
import RiskHeatmap from "./pages/RiskHeatmap";
import CrossBrandComparison from "./pages/CrossBrandComparison";
import Simulator from "./pages/Simulator";
import Leaderboard from "./pages/Leaderboard";
import NegotiationPlaybook from "./pages/NegotiationPlaybook";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/brand-selector" element={<BrandSelector />} />
          <Route path="/dashboard/:brand" element={<Dashboard />} />
          <Route path="/contract-upload" element={<ContractUpload />} />
          <Route path="/evolution-map" element={<EvolutionMap />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/risk-heatmap" element={<RiskHeatmap />} />
          <Route path="/cross-brand-comparison" element={<CrossBrandComparison />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/negotiation-playbook" element={<NegotiationPlaybook />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
