// Token Types
export interface Token {
  id: string;
  address: string;
  name: string;
  ticker: string;
  imageUrl: string;
  createdAt: string;
  age: string;
  
  // Social Links
  socials: {
    twitter?: string;
    website?: string;
    telegram?: string;
    discord?: string;
  };
  
  // Metrics
  marketCap: number;
  volume: number;
  holders: number;
  transactions: number;
  replies: number;
  
  // Price Changes
  priceChange5m: number;
  priceChange1h: number;
  devHolding: number;
  topHolders: number;
  snipers: number;
  
  // Progress (for Final Stretch)
  bondingProgress?: number;
  
  // Verification
  isVerified: boolean;
  
  // Quick Buy Amount
  quickBuyAmount: number;
}

export interface TokenUpdate {
  id: string;
  field: keyof Token;
  value: number | string;
  direction?: 'up' | 'down';
}

export interface TokenCategory {
  id: 'new-pairs' | 'final-stretch' | 'migrated';
  label: string;
  description: string;
}

export interface SortConfig {
  field: keyof Token;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  minMarketCap?: number;
  maxMarketCap?: number;
  minHolders?: number;
  minVolume?: number;
  hideUnverified?: boolean;
}

// UI State Types
export interface PriceFlash {
  tokenId: string;
  field: string;
  direction: 'up' | 'down';
  timestamp: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface TableState {
  category: TokenCategory['id'];
  tokens: Token[];
  loading: LoadingState;
  error: string | null;
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  priceFlashes: Record<string, PriceFlash>;
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'price_update' | 'new_token' | 'token_removed' | 'batch_update';
  payload: TokenUpdate | Token | TokenUpdate[];
}
