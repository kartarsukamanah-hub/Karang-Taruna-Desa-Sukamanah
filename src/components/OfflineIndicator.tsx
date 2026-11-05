import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-amber-500/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-slate-950 shadow-lg border border-amber-300">
      <WifiOff className="w-3.5 h-3.5 animate-pulse text-slate-950" />
      <span>Mode Offline — Data tersimpan tetap bisa diakses</span>
    </div>
  );
};
