import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from '@/components/ScrollToTop';

// GLINFICO FOD pages
import GlinficoLayout from '@/components/glinfico/GlinficoLayout';
import GlinficoHome from '@/pages/GlinficoHome';
import GlinficoPlatform from '@/pages/GlinficoPlatform';
import GlinficoSolutions from '@/pages/GlinficoSolutions';
import GlinficoProducts from '@/pages/GlinficoProducts';
import GlinficoPricing from '@/pages/GlinficoPricing';
import GlinficoContact from '@/pages/GlinficoContact';
import GlinficoPortal from '@/pages/GlinficoPortal';
import GlinficoSignup from '@/pages/GlinficoSignup';
import GlinficoDemo from '@/pages/GlinficoDemo';
import GlinficoSubmit from '@/pages/GlinficoSubmit';
import GlinficoDashboard from '@/pages/GlinficoDashboard';
import GlinficoDealRoom from '@/pages/GlinficoDealRoom';

// FinVenturePro Magazine
import Home from '@/pages/Home';

const AuthenticatedApp = () => {
  return (
    <Routes>
      {/* GLINFICO FOD Platform */}
      <Route element={<GlinficoLayout />}>
        <Route path="/" element={<GlinficoHome />} />
        <Route path="/platform" element={<GlinficoPlatform />} />
        <Route path="/solutions" element={<GlinficoSolutions />} />
        <Route path="/products" element={<GlinficoProducts />} />
        <Route path="/pricing" element={<GlinficoPricing />} />
        <Route path="/contact" element={<GlinficoContact />} />
        <Route path="/portal" element={<GlinficoPortal />} />
        <Route path="/signup" element={<GlinficoSignup />} />
        <Route path="/demo" element={<GlinficoDemo />} />
        <Route path="/submit" element={<GlinficoSubmit />} />
        <Route path="/dashboard" element={<GlinficoDashboard />} />
        <Route path="/deal-room" element={<GlinficoDealRoom />} />
      </Route>

      {/* FinVenturePro Magazine */}
      <Route path="/magazine" element={<Home />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App