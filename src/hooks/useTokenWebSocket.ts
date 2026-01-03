import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  initializeTokens, 
  initializeTokensSuccess, 
  applyPriceUpdate, 
  applyBatchUpdates,
  addToken,
  clearOldFlashes
} from '@/store/tokensSlice';
import { generateInitialTokens } from '@/lib/mockData';
import { webSocketService } from '@/lib/webSocket';
import { TokenUpdate, WebSocketMessage } from '@/types/token';

export function useTokenWebSocket() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.tokens.byCategory);
  const isInitialized = useRef(false);
  const flashCleanupInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize tokens
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    dispatch(initializeTokens());
    
    // Simulate loading delay
    setTimeout(() => {
      const initialTokens = generateInitialTokens();
      dispatch(initializeTokensSuccess(initialTokens));
    }, 800);
  }, [dispatch]);

  // WebSocket connection
  useEffect(() => {
    const handleMessage = (message: WebSocketMessage) => {
      switch (message.type) {
        case 'price_update':
          dispatch(applyPriceUpdate(message.payload as TokenUpdate));
          break;
        case 'batch_update':
          dispatch(applyBatchUpdates(message.payload as TokenUpdate[]));
          break;
        case 'new_token':
          // Determine category based on bondingProgress
          const token = message.payload as any;
          let category = 'new-pairs';
          if (token.bondingProgress === undefined) {
            category = 'migrated';
          } else if (token.bondingProgress >= 70) {
            category = 'final-stretch';
          }
          dispatch(addToken({ category, token }));
          break;
      }
    };

    const unsubscribe = webSocketService.subscribe(handleMessage);
    webSocketService.connect();

    return () => {
      unsubscribe();
      webSocketService.disconnect();
    };
  }, [dispatch]);

  // Update WebSocket with current token IDs
  useEffect(() => {
    Object.entries(tokens).forEach(([category, tokenList]) => {
      webSocketService.setTokenIds(category, tokenList.map(t => t.id));
    });
  }, [tokens]);

  // Cleanup old flash effects
  useEffect(() => {
    flashCleanupInterval.current = setInterval(() => {
      dispatch(clearOldFlashes());
    }, 200);

    return () => {
      if (flashCleanupInterval.current) {
        clearInterval(flashCleanupInterval.current);
      }
    };
  }, [dispatch]);
}
