import { Token, TokenUpdate, WebSocketMessage } from '@/types/token';
import { generateMockToken } from './mockData';

type WebSocketCallback = (message: WebSocketMessage) => void;

class MockWebSocketService {
  private callbacks: Set<WebSocketCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;
  private tokenIds: Map<string, string[]> = new Map();
  
  connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    this.startSimulation();
    console.log('[WebSocket] Connected to mock price feed');
  }
  
  disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('[WebSocket] Disconnected from price feed');
  }
  
  subscribe(callback: WebSocketCallback) {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }
  
  setTokenIds(category: string, ids: string[]) {
    this.tokenIds.set(category, ids);
  }
  
  private broadcast(message: WebSocketMessage) {
    this.callbacks.forEach(callback => callback(message));
  }
  
  private startSimulation() {
    // Price updates every 500-1500ms for realistic feel
    const simulatePriceUpdate = () => {
      if (!this.isConnected) return;
      
      // Get all token IDs from all categories
      const allIds: string[] = [];
      this.tokenIds.forEach(ids => allIds.push(...ids));
      
      if (allIds.length === 0) {
        this.scheduleNextUpdate();
        return;
      }
      
      // Randomly select 2-5 tokens to update for faster activity
      const numUpdates = Math.floor(Math.random() * 4) + 2;
      const updates: TokenUpdate[] = [];
      
      for (let i = 0; i < numUpdates; i++) {
        const randomId = allIds[Math.floor(Math.random() * allIds.length)];
        const updateType = Math.random();
        
        if (updateType < 0.4) {
          // Market cap change
          const change = (Math.random() - 0.45) * 0.05; // -2.25% to +2.75% bias towards up
          updates.push({
            id: randomId,
            field: 'marketCap',
            value: change,
            direction: change > 0 ? 'up' : 'down',
          });
        } else if (updateType < 0.7) {
          // 5min price change update
          const newChange = (Math.random() - 0.5) * 100;
          const previousChange = Math.random() * 50 - 25;
          updates.push({
            id: randomId,
            field: 'priceChange5m',
            value: newChange,
            direction: newChange > previousChange ? 'up' : 'down',
          });
        } else if (updateType < 0.85) {
          // Holder count change
          const holderChange = Math.floor(Math.random() * 5) + 1;
          updates.push({
            id: randomId,
            field: 'holders',
            value: holderChange,
            direction: 'up',
          });
        } else {
          // Volume change
          const volumeChange = Math.floor(Math.random() * 1000) + 100;
          updates.push({
            id: randomId,
            field: 'volume',
            value: volumeChange,
            direction: 'up',
          });
        }
      }
      
      if (updates.length === 1) {
        this.broadcast({
          type: 'price_update',
          payload: updates[0],
        });
      } else {
        this.broadcast({
          type: 'batch_update',
          payload: updates,
        });
      }
      
      this.scheduleNextUpdate();
    };
    
    this.scheduleNextUpdate = () => {
      const delay = 10 + Math.random() * 30; // 10-40ms for ultra-fast updates
      setTimeout(simulatePriceUpdate, delay);
    };
    
    // Start the simulation loop immediately
    setTimeout(simulatePriceUpdate, 50);
    
    // Occasionally add new tokens (every 10-30 seconds)
    this.scheduleNewToken();
  }
  
  private scheduleNextUpdate: () => void = () => {};
  
  private scheduleNewToken() {
    const addNewToken = () => {
      if (!this.isConnected) return;
      
      const categories = ['new-pairs', 'final-stretch', 'migrated'] as const;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const newToken = generateMockToken(category);
      
      this.broadcast({
        type: 'new_token',
        payload: newToken,
      });
      
      // Schedule next new token
      const delay = 10000 + Math.random() * 20000; // 10-30 seconds
      setTimeout(addNewToken, delay);
    };
    
    setTimeout(addNewToken, 15000); // First new token after 15 seconds
  }
}

// Singleton instance
export const webSocketService = new MockWebSocketService();
