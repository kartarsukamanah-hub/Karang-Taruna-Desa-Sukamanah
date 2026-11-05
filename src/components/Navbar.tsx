import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  MessageSquareHeart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  Info, 
  Lock, 
  Settings,
  Download
} from 'lucide-react';
import { OrganizationProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  profile: OrganizationProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProductModal: () => void;
  onOpenAspirationModal: () => void;
  isAdmin: boolean;
  onOpenLoginModal: () => void;
  onOpenAdminPanel: (tab?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenProductModal,
  onOpenAspirationModal,
  isAdmin,
  onOpenLoginModal,
  onOpenAdminPanel
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Sparkles },
    { id: 'profil', label: 'Profil', icon: Info },
    { id: 'pengurus', label: 'Pengurus & Anggota', icon: Users },
    { id: 'kegiatan', label: 'Kegiatan', icon: Calendar },
    { id: 'proker', label: 'Program Kerja', icon: Briefcase },
    { id: 'aspirasi', label: 'Kotak Aspirasi', icon: MessageSquareHeart },
    { id: 'lapak', label: 'Lapak Warga', icon: ShoppingBag, badge: 'UMKM' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071326]/95 backdrop-blur-md border-b border-blue-900/60 shadow-lg shadow-black/20 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 px-3 sm:px-4 py-1 text-xs font-medium text-blue-100 flex items-center justify-between border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="hidden sm:inline text-blue-200">Semboyan:</span>
            <span className="font-semibold text-amber-300 italic tracking-wide truncate">"{profile.motto}"</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-blue-200 shrink-0">
            <span className="hidden md:inline">{profile.villageName}, {profile.districtName}</span>

            {/* Admin Status / Login Pill */}
            {isAdmin ? (
              <button
                onClick={() => onOpenAdminPanel('profil')}
                className="px-2.5 py-0.5 rounded-full bg-amber-400 text-blue-950 font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow hover:bg-amber-300 transition active:scale-95"
              >
                <Settings className="w-3 h-3" />
                <span>Panel Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-2.5 py-0.5 rounded-full bg-blue-800/80 hover:bg-blue-700 text-sky-200 border border-blue-600/50 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95"
                title="Khusus Pengurus Karang Taruna"
              >
                <Lock className="w-2.5 h-2.5 text-amber-300" />
                <span>Login Pengurus</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none min-w-0"
          >
            {/* Custom or Official Emblem Logo */}
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 border border-blue-400/40 shadow-inner shadow-blue-400/20 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              {profile.logoUrl ? (
                <img 
                  src={profile.logoUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <>
                  <div className="absolute inset-0.5 rounded-[10px] border border-amber-400/60 pointer-events-none"></div>
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"/>
                    <path d="M12 17v5"/>
                    <path d="M8 22h8"/>
                  </svg>
                </>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-lg md:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors uppercase truncate">
                  {profile.name}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-blue-300 font-medium tracking-wide truncate hidden xs:block">
                Portal Resmi Informasi & Pemberdayaan Pemuda
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                      : 'text-blue-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-blue-300'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 text-[10px] uppercase bg-amber-400 text-blue-950 font-black px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-300 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <PWAInstallButton />
            <button
              onClick={onOpenAspirationModal}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-blue-400/40 text-blue-100 hover:bg-blue-900/60 transition flex items-center gap-1.5"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-sky-400" />
              <span>Suara Warga</span>
            </button>
            <button
              onClick={onOpenProductModal}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 transition flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span>+ Pasang Produk</span>
            </button>
          </div>

          {/* Mobile Right Action Bar */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <PWAInstallButton className="hidden xs:flex py-1 px-2 text-[11px]" />
            <button
              onClick={onOpenProductModal}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-1 active:scale-95 shadow-sm touch-manipulation"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[11px]">+ Produk</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-blue-900/70 border border-blue-700/60 text-blue-200 hover:text-white active:scale-95 touch-manipulation"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071326] border-b border-blue-900/80 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85dvh] overflow-y-auto">
          <div className="px-2 py-1.5 text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center justify-between border-b border-blue-900/60 pb-2">
            <span className="truncate">Menu {profile.name}</span>
            {isAdmin ? (
              <span className="text-[10px] bg-amber-400 text-blue-950 font-bold px-2 py-0.5 rounded-full shrink-0">Mode Admin</span>
            ) : (
              <button onClick={() => { onOpenLoginModal(); setMobileMenuOpen(false); }} className="text-[11px] text-amber-300 underline shrink-0">
                Login Pengurus
              </button>
            )}
          </div>

          {/* Mobile PWA Install option if available */}
          <div className="py-1">
            <PWAInstallButton variant="banner" className="w-full" />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition active:scale-98 touch-manipulation ${
                  isActive
                    ? 'bg-blue-700 text-white font-bold'
                    : 'text-blue-200 hover:bg-blue-950/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-blue-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase bg-amber-400 text-blue-950 font-black px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => {
                onOpenAdminPanel('profil');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-400 text-blue-950 font-bold text-xs flex items-center justify-center gap-2 mt-2 shadow active:scale-95 touch-manipulation"
            >
              <Settings className="w-4 h-4" />
              <span>Buka Panel Kelola Organisasi (Ubah Logo & Data)</span>
            </button>
          )}

          <div className="pt-3 border-t border-blue-900/60 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAspirationModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-blue-700 text-blue-100 text-xs font-semibold flex items-center justify-center gap-1.5 bg-blue-950/50 active:scale-95 touch-manipulation"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-sky-400" />
              <span>Aspirasi Warga</span>
            </button>
            <button
              onClick={() => {
                onOpenProductModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 touch-manipulation"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lapak Warga</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
