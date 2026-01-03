import { Token } from '@/types/token';

// Utility functions for generating mock data
const generateRandomAddress = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getRandomAge = (maxMinutes: number): string => {
  const minutes = Math.floor(Math.random() * maxMinutes);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Token name generators
const tokenPrefixes = [
  'Unreal', 'Mega', 'Super', 'Ultra', 'Hyper', 'Cosmic', 'Quantum', 'Cyber',
  'Neo', 'Meta', 'Degen', 'Moon', 'Rocket', 'Diamond', 'Golden', 'Silver',
  'Pepe', 'Doge', 'Shiba', 'Cat', 'Dog', 'Frog', 'Bear', 'Bull', 'Whale'
];

const tokenSuffixes = [
  'Coin', 'Token', 'Cash', 'Finance', 'Protocol', 'Network', 'Chain', 'Swap',
  'DAO', 'AI', 'Labs', 'X', 'Pro', 'Plus', 'Max', 'Prime', 'Elite'
];

const generateTokenName = (): { name: string; ticker: string } => {
  const prefix = tokenPrefixes[Math.floor(Math.random() * tokenPrefixes.length)];
  const suffix = tokenSuffixes[Math.floor(Math.random() * tokenSuffixes.length)];
  const name = `${prefix} ${suffix}`;
  const ticker = (prefix.slice(0, 3) + suffix.slice(0, 2)).toUpperCase();
  return { name, ticker };
};

const generateAvatarUrl = (seed: string): string => {
  // Using DiceBear API for consistent avatars
  const styles = ['identicon', 'shapes', 'rings', 'bauhaus'];
  const style = styles[Math.floor(Math.random() * styles.length)];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=1a1a2e,16213e,0f3460,1a1a40`;
};

// Generate a single mock token
export const generateMockToken = (category: 'new-pairs' | 'final-stretch' | 'migrated'): Token => {
  const { name, ticker } = generateTokenName();
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  let maxAge: number;
  let bondingProgress: number | undefined;
  let marketCapRange: [number, number];
  
  switch (category) {
    case 'new-pairs':
      maxAge = 30; // Max 30 minutes old
      bondingProgress = Math.random() * 50; // 0-50%
      marketCapRange = [5000, 50000];
      break;
    case 'final-stretch':
      maxAge = 120; // Max 2 hours old
      bondingProgress = 70 + Math.random() * 30; // 70-100%
      marketCapRange = [20000, 200000];
      break;
    case 'migrated':
      maxAge = 1440; // Max 24 hours old
      bondingProgress = undefined;
      marketCapRange = [50000, 5000000];
      break;
  }
  
  const marketCap = Math.floor(marketCapRange[0] + Math.random() * (marketCapRange[1] - marketCapRange[0]));
  
  return {
    id,
    address: generateRandomAddress(),
    name,
    ticker,
    imageUrl: generateAvatarUrl(id),
    createdAt: new Date(Date.now() - Math.random() * maxAge * 60 * 1000).toISOString(),
    age: getRandomAge(maxAge),
    
    socials: {
      twitter: Math.random() > 0.3 ? `https://twitter.com/${ticker.toLowerCase()}` : undefined,
      website: Math.random() > 0.4 ? `https://${ticker.toLowerCase()}.io` : undefined,
      telegram: Math.random() > 0.5 ? `https://t.me/${ticker.toLowerCase()}` : undefined,
      discord: Math.random() > 0.7 ? `https://discord.gg/${ticker.toLowerCase()}` : undefined,
    },
    
    marketCap,
    volume: Math.floor(marketCap * (0.1 + Math.random() * 0.5)),
    holders: Math.floor(10 + Math.random() * 500),
    transactions: Math.floor(50 + Math.random() * 2000),
    replies: Math.floor(Math.random() * 20),
    
    priceChange5m: (Math.random() - 0.5) * 100,
    priceChange1h: (Math.random() - 0.5) * 200,
    devHolding: Math.random() * 10,
    topHolders: Math.random() * 50,
    snipers: Math.floor(Math.random() * 40),
    
    bondingProgress,
    isVerified: Math.random() > 0.7,
    quickBuyAmount: 2,
  };
};

// Generate initial mock data for all categories
export const generateInitialTokens = (): Record<string, Token[]> => ({
  'new-pairs': Array.from({ length: 15 }, () => generateMockToken('new-pairs')),
  'final-stretch': Array.from({ length: 12 }, () => generateMockToken('final-stretch')),
  'migrated': Array.from({ length: 20 }, () => generateMockToken('migrated')),
});

// Format helpers
export const formatMarketCap = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

export const formatVolume = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(0)}%`;
};

export const formatHolders = (value: number): string => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

export const formatSOL = (value: number): string => {
  return `${value.toFixed(9)} SOL`;
};
