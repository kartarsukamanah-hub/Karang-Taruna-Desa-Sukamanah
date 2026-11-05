import React from 'react';
import { 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ImageIcon, 
  Users, 
  Calendar, 
  Briefcase,
  Sparkles
} from 'lucide-react';

interface AdminBarProps {
  isAdmin: boolean;
  onOpenAdminPanel: (tab?: any) => void;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  isAdmin,
  onOpenAdminPanel,
  onLogout,
  onOpenLoginModal
}) => {
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-3 sm:px-4 py-2 border-b border-amber-600 shadow-md sticky top-0 z-[60] text-xs font-bold">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-950 text-amber-300 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="font-extrabold tracking-wide uppercase text-[11px] sm:text-xs text-blue-950">
              Admin Karang Taruna Aktif
            </span>
          </div>
          <span className="bg-blue-950/15 text-blue-950 text-[10px] px-2 py-0.5 rounded-full border border-blue-950/20 font-bold shrink-0">
            Akses Penuh
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-0.5">
          <button
            onClick={() => onOpenAdminPanel('profil')}
            className="flex-1 sm:flex-initial px-2.5 py-1.5 min-h-[36px] rounded-lg bg-blue-950 text-white hover:bg-blue-900 active:scale-95 transition flex items-center justify-center gap-1.5 text-[11px] shadow-sm whitespace-nowrap"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Logo & Profil</span>
          </button>

          <button
            onClick={() => onOpenAdminPanel('pengurus')}
            className="flex-1 sm:flex-initial px-2.5 py-1.5 min-h-[36px] rounded-lg bg-blue-950 text-white hover:bg-blue-900 active:scale-95 transition flex items-center justify-center gap-1.5 text-[11px] shadow-sm whitespace-nowrap"
          >
            <Users className="w-3.5 h-3.5 text-sky-300" />
            <span>Kelola Data</span>
          </button>

          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-slate-900/15 hover:bg-rose-600 hover:text-white text-slate-900 active:scale-95 transition flex items-center justify-center gap-1 text-[11px] whitespace-nowrap"
            title="Keluar dari Akun Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
