import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Explore from "@/pages/Explore";
import Offers from "@/pages/Offers";
import More from "@/pages/More";
import DetailPage from "@/pages/DetailPage";
import EventDetail from "@/pages/EventDetail";
import CategoryPage from "@/pages/CategoryPage";
import LocalGuide from "@/pages/LocalGuide";
import TravelRewards from "@/pages/TravelRewards";
import OfficialGuides from "@/pages/OfficialGuides";
import RedeemRewards from "@/pages/RedeemRewards";
import TravelAgencies from "@/pages/TravelAgencies";
import ListAgency from "@/pages/ListAgency";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/explore" component={Explore} />
      <Route path="/offers" component={Offers} />
      <Route path="/more" component={More} />
      <Route path="/category/:category/:id" component={DetailPage} />
      <Route path="/event/:id" component={EventDetail} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/local-guide" component={LocalGuide} />
      <Route path="/rewards" component={TravelRewards} />
      <Route path="/official-guides" component={OfficialGuides} />
      <Route path="/redeem-rewards" component={RedeemRewards} />
      <Route path="/travel-agencies" component={TravelAgencies} />
      <Route path="/list-agency" component={ListAgency} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
