import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenUpdate, PriceFlash, SortConfig, FilterConfig, LoadingState } from '@/types/token';
import { generateInitialTokens } from '@/lib/mockData';

interface TokensState {
  byCategory: Record<string, Token[]>;
  activeCategory: 'new-pairs' | 'final-stretch' | 'migrated';
  loading: LoadingState;
  error: string | null;
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  priceFlashes: Record<string, PriceFlash>;
}

const initialState: TokensState = {
  byCategory: {
    'new-pairs': [],
    'final-stretch': [],
    'migrated': [],
  },
  activeCategory: 'new-pairs',
  loading: 'idle',
  error: null,
  sortConfig: {
    field: 'marketCap',
    direction: 'desc',
  },
  filterConfig: {},
  priceFlashes: {},
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // Initialize with mock data
    initializeTokens: (state) => {
      state.loading = 'loading';
    },
    
    initializeTokensSuccess: (state, action: PayloadAction<Record<string, Token[]>>) => {
      state.byCategory = action.payload;
      state.loading = 'success';
      state.error = null;
    },
    
    initializeTokensError: (state, action: PayloadAction<string>) => {
      state.loading = 'error';
      state.error = action.payload;
    },
    
    // Set active category
    setActiveCategory: (state, action: PayloadAction<'new-pairs' | 'final-stretch' | 'migrated'>) => {
      state.activeCategory = action.payload;
    },
    
    // Apply price update from WebSocket
    applyPriceUpdate: (state, action: PayloadAction<TokenUpdate>) => {
      const { id, field, value, direction } = action.payload;
      
      // Find and update token across all categories
      for (const category of Object.keys(state.byCategory)) {
        const tokenIndex = state.byCategory[category].findIndex(t => t.id === id);
        if (tokenIndex !== -1) {
          const token = state.byCategory[category][tokenIndex];
          
          if (field === 'marketCap' && typeof value === 'number') {
            // Apply percentage change
            token.marketCap = Math.max(0, token.marketCap * (1 + value));
          } else if (field === 'volume' && typeof value === 'number') {
            token.volume = token.volume + value;
          } else if (field === 'holders' && typeof value === 'number') {
            token.holders = token.holders + value;
          } else if (field === 'priceChange5m' && typeof value === 'number') {
            token.priceChange5m = value;
          } else if (field === 'priceChange1h' && typeof value === 'number') {
            token.priceChange1h = value;
          }
          
          // Add price flash effect
          if (direction) {
            state.priceFlashes[`${id}-${field}`] = {
              tokenId: id,
              field: String(field),
              direction,
              timestamp: Date.now(),
            };
          }
          
          break;
        }
      }
    },
    
    // Apply batch updates
    applyBatchUpdates: (state, action: PayloadAction<TokenUpdate[]>) => {
      action.payload.forEach(update => {
        const { id, field, value, direction } = update;
        
        for (const category of Object.keys(state.byCategory)) {
          const tokenIndex = state.byCategory[category].findIndex(t => t.id === id);
          if (tokenIndex !== -1) {
            const token = state.byCategory[category][tokenIndex];
            
            if (field === 'marketCap' && typeof value === 'number') {
              token.marketCap = Math.max(0, token.marketCap * (1 + value));
            } else if (field === 'volume' && typeof value === 'number') {
              token.volume = token.volume + value;
            } else if (field === 'holders' && typeof value === 'number') {
              token.holders = token.holders + value;
            } else if (field === 'priceChange5m' && typeof value === 'number') {
              token.priceChange5m = value;
            }
            
            if (direction) {
              state.priceFlashes[`${id}-${field}`] = {
                tokenId: id,
                field: String(field),
                direction,
                timestamp: Date.now(),
              };
            }
            
            break;
          }
        }
      });
    },
    
    // Add new token
    addToken: (state, action: PayloadAction<{ category: string; token: Token }>) => {
      const { category, token } = action.payload;
      if (state.byCategory[category]) {
        // Add to beginning
        state.byCategory[category].unshift(token);
        // Keep max 50 tokens per category
        if (state.byCategory[category].length > 50) {
          state.byCategory[category].pop();
        }
      }
    },
    
    // Remove token
    removeToken: (state, action: PayloadAction<{ category: string; tokenId: string }>) => {
      const { category, tokenId } = action.payload;
      if (state.byCategory[category]) {
        state.byCategory[category] = state.byCategory[category].filter(t => t.id !== tokenId);
      }
    },
    
    // Clear price flash
    clearPriceFlash: (state, action: PayloadAction<string>) => {
      delete state.priceFlashes[action.payload];
    },
    
    // Clear all old flashes
    clearOldFlashes: (state) => {
      const now = Date.now();
      const flashDuration = 600; // 600ms
      Object.keys(state.priceFlashes).forEach(key => {
        if (now - state.priceFlashes[key].timestamp > flashDuration) {
          delete state.priceFlashes[key];
        }
      });
    },
    
    // Set sort config
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    
    // Set filter config
    setFilterConfig: (state, action: PayloadAction<Partial<FilterConfig>>) => {
      state.filterConfig = { ...state.filterConfig, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filterConfig = {};
    },
  },
});

export const {
  initializeTokens,
  initializeTokensSuccess,
  initializeTokensError,
  setActiveCategory,
  applyPriceUpdate,
  applyBatchUpdates,
  addToken,
  removeToken,
  clearPriceFlash,
  clearOldFlashes,
  setSortConfig,
  setFilterConfig,
  clearFilters,
} = tokensSlice.actions;

export default tokensSlice.reducer;
