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
import AttractionDetail from "@/pages/AttractionDetail";
import EventDetail from "@/pages/EventDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/explore" component={Explore} />
      <Route path="/offers" component={Offers} />
      <Route path="/more" component={More} />
      <Route path="/attraction/:id" component={AttractionDetail} />
      <Route path="/event/:id" component={EventDetail} />
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
