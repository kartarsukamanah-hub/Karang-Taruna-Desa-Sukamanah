import React from 'react';
import { 
  Home, 
  Calendar, 
  MessageSquareHeart, 
  ShoppingBag,
  Info,
  Users
} from 'lucide-react';

interface BottomMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  productsCount: number;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  activeTab,
  setActiveTab,
  productsCount
}) => {
  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'kegiatan', label: 'Kegiatan', icon: Calendar },
    { id: 'lapak', label: 'Lapak', icon: ShoppingBag, count: productsCount },
    { id: 'aspirasi', label: 'Aspirasi', icon: MessageSquareHeart },
    { id: 'profil', label: 'Profil', icon: Info },
  ];

  return (
    <nav 
      aria-label="Navigasi Bawah Seluler"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071326]/95 backdrop-blur-xl border-t border-blue-900/60 pb-[calc(0.35rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 transition-all active:scale-95 touch-manipulation ${
                isActive ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-115 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : ''}`} />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow border border-slate-950">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-[62px] ${isActive ? 'text-sky-300 font-bold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
