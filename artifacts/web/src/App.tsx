import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/landing";
import ThankYou from "@/pages/thank-you";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import NotAffiliated from "@/pages/not-affiliated-with-va";

import AdminLogin from "@/pages/admin/login";
import AdminLeads from "@/pages/admin/leads";
import AdminLeadDetail from "@/pages/admin/leads/[id]";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/not-affiliated-with-va" component={NotAffiliated} />
      
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/leads" component={AdminLeads} />
      <Route path="/admin/leads/:id" component={AdminLeadDetail} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
