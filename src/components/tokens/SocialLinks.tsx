import React, { memo } from 'react';
import { Twitter, Globe, MessageCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SocialLinksProps {
  twitter?: string;
  website?: string;
  telegram?: string;
  discord?: string;
  className?: string;
}

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon = memo<SocialIconProps>(({ href, icon, label }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex items-center justify-center h-5 w-5 rounded',
          'text-foreground-dim hover:text-foreground',
          'transition-all duration-150 hover:scale-110 hover:bg-background-hover'
        )}
      >
        {icon}
      </a>
    </TooltipTrigger>
    <TooltipContent side="top" className="text-xs">
      {label}
    </TooltipContent>
  </Tooltip>
));

SocialIcon.displayName = 'SocialIcon';

export const SocialLinks = memo<SocialLinksProps>(({ 
  twitter, 
  website, 
  telegram, 
  discord,
  className 
}) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {twitter && (
        <SocialIcon 
          href={twitter} 
          icon={<Twitter className="h-3.5 w-3.5" />} 
          label="Twitter"
        />
      )}
      {website && (
        <SocialIcon 
          href={website} 
          icon={<Globe className="h-3.5 w-3.5" />} 
          label="Website"
        />
      )}
      {telegram && (
        <SocialIcon 
          href={telegram} 
          icon={<MessageCircle className="h-3.5 w-3.5" />} 
          label="Telegram"
        />
      )}
      {discord && (
        <SocialIcon 
          href={discord} 
          icon={<ExternalLink className="h-3.5 w-3.5" />} 
          label="Discord"
        />
      )}
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';
