import { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setFilterConfig, clearFilters, setSortConfig } from '@/store/tokensSlice';
import { Token, FilterConfig, SortConfig } from '@/types/token';

export function useTokenFilters() {
  const dispatch = useAppDispatch();
  const { byCategory, activeCategory, filterConfig, sortConfig } = useAppSelector(
    state => state.tokens
  );

  const tokens = byCategory[activeCategory] || [];

  const filteredTokens = useMemo(() => {
    let result = [...tokens];

    // Apply filters
    if (filterConfig.minMarketCap) {
      result = result.filter(t => t.marketCap >= filterConfig.minMarketCap!);
    }
    if (filterConfig.maxMarketCap) {
      result = result.filter(t => t.marketCap <= filterConfig.maxMarketCap!);
    }
    if (filterConfig.minHolders) {
      result = result.filter(t => t.holders >= filterConfig.minHolders!);
    }
    if (filterConfig.minVolume) {
      result = result.filter(t => t.volume >= filterConfig.minVolume!);
    }
    if (filterConfig.hideUnverified) {
      result = result.filter(t => t.isVerified);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'desc' ? bVal - aVal : aVal - bVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'desc' 
          ? bVal.localeCompare(aVal) 
          : aVal.localeCompare(bVal);
      }
      return 0;
    });

    return result;
  }, [tokens, filterConfig, sortConfig]);

  const setFilter = useCallback((filter: Partial<FilterConfig>) => {
    dispatch(setFilterConfig(filter));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const setSort = useCallback((config: SortConfig) => {
    dispatch(setSortConfig(config));
  }, [dispatch]);

  const toggleSort = useCallback((field: keyof Token) => {
    dispatch(setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, [dispatch, sortConfig]);

  return {
    tokens: filteredTokens,
    totalCount: tokens.length,
    filteredCount: filteredTokens.length,
    filterConfig,
    sortConfig,
    setFilter,
    resetFilters,
    setSort,
    toggleSort,
  };
}
