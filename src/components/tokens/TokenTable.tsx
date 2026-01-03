import React, { memo, useMemo, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Token, SortConfig } from '@/types/token';
import { TokenRow } from './TokenRow';
import { TokenTabs } from './TokenTabs';
import { TokenTableSkeleton } from './TokenRowSkeleton';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveCategory, setSortConfig } from '@/store/tokensSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ArrowUpDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { TokenDetailModal } from './TokenDetailModal';

interface TokenTableProps {
  className?: string;
}

export const TokenTable = memo<TokenTableProps>(({ className }) => {
  const dispatch = useAppDispatch();
  const { byCategory, activeCategory, loading, sortConfig } = useAppSelector(
    state => state.tokens
  );
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tokens = byCategory[activeCategory] || [];

  const tabs = useMemo(() => [
    { id: 'new-pairs' as const, label: 'New Pairs', count: byCategory['new-pairs']?.length || 0 },
    { id: 'final-stretch' as const, label: 'Final Stretch', count: byCategory['final-stretch']?.length || 0 },
    { id: 'migrated' as const, label: 'Migrated', count: byCategory['migrated']?.length || 0 },
  ], [byCategory]);

  const handleTabChange = useCallback((tab: 'new-pairs' | 'final-stretch' | 'migrated') => {
    dispatch(setActiveCategory(tab));
  }, [dispatch]);

  const handleSort = useCallback((field: keyof Token) => {
    dispatch(setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, [dispatch, sortConfig]);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const sortedTokens = useMemo(() => {
    const sorted = [...tokens];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'desc' ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
    return sorted;
  }, [tokens, sortConfig]);

  const showProgress = activeCategory === 'final-stretch';

  return (
    <div className={cn('flex flex-col bg-card rounded-xl border border-card-border overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-table-header border-b border-table-border">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">Pulse</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-success/20 text-success animate-pulse">
            Live
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
              <DropdownMenuLabel className="text-xs text-foreground-muted">Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('marketCap')}>
                Market Cap {sortConfig.field === 'marketCap' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('volume')}>
                Volume {sortConfig.field === 'volume' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('holders')}>
                Holders {sortConfig.field === 'holders' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('priceChange5m')}>
                5m Change {sortConfig.field === 'priceChange5m' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
              <DropdownMenuLabel className="text-xs text-foreground-muted">Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Auto-refresh: On</DropdownMenuItem>
              <DropdownMenuItem>Sound alerts: Off</DropdownMenuItem>
              <DropdownMenuItem>Compact mode: Off</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <TokenTabs
        activeTab={activeCategory}
        onTabChange={handleTabChange}
        tabs={tabs}
      />

      {/* Table Content */}
      <div className="flex-1 overflow-auto custom-scrollbar max-h-[600px]">
        {loading === 'loading' ? (
          <TokenTableSkeleton rows={10} />
        ) : (
          <AnimatePresence mode="popLayout">
            {sortedTokens.map((token, index) => (
              <TokenRow
                key={token.id}
                token={token}
                showProgress={showProgress}
                onClick={handleTokenClick}
              />
            ))}
          </AnimatePresence>
        )}

        {loading === 'success' && sortedTokens.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-foreground-muted">
            <p className="text-sm">No tokens found</p>
            <p className="text-xs mt-1">Tokens will appear here when available</p>
          </div>
        )}
      </div>

      {/* Token Detail Modal */}
      <TokenDetailModal
        token={selectedToken}
        open={!!selectedToken}
        onOpenChange={(open) => !open && setSelectedToken(null)}
      />
    </div>
  );
});

TokenTable.displayName = 'TokenTable';
