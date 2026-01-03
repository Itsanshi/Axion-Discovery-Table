import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { TokenTable } from '@/components/tokens/TokenTable';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useTokenWebSocket } from '@/hooks/useTokenWebSocket';
import { Zap } from 'lucide-react';

function TokenDashboard() {
  useTokenWebSocket();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background-elevated">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-foreground">AXIOM</span>
              <span className="text-foreground-muted text-sm ml-1">Pro</span>
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-foreground-muted hover:text-foreground transition-colors">Discover</a>
            <a href="#" className="text-foreground font-medium">Pulse</a>
            <a href="#" className="text-foreground-muted hover:text-foreground transition-colors">Portfolio</a>
            <a href="#" className="text-foreground-muted hover:text-foreground transition-colors">Swap</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 px-4">
        <ErrorBoundary>
          <TokenTable />
        </ErrorBoundary>
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <Provider store={store}>
      <TokenDashboard />
    </Provider>
  );
};

export default Index;
