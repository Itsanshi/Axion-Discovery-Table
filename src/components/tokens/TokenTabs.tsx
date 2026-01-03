import React, { memo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type TabId = 'new-pairs' | 'final-stretch' | 'migrated';

interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

interface TokenTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  tabs: Tab[];
  className?: string;
}

export const TokenTabs = memo<TokenTabsProps>(({ 
  activeTab, 
  onTabChange, 
  tabs,
  className 
}) => {
  return (
    <div className={cn('relative flex border-b border-table-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative px-4 py-3 text-sm font-medium transition-colors duration-200',
            activeTab === tab.id
              ? 'text-foreground'
              : 'text-foreground-muted hover:text-foreground-secondary'
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'px-1.5 py-0.5 text-xs rounded-full',
                activeTab === tab.id 
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-foreground-muted'
              )}>
                {tab.count}
              </span>
            )}
          </span>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
});

TokenTabs.displayName = 'TokenTabs';
