import React from 'react';
import { 
  Users, 
  Calendar, 
  ShoppingBag, 
  MessageSquareHeart, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Megaphone 
} from 'lucide-react';
import { OrganizationProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeroSectionProps {
  profile: OrganizationProfile;
  setActiveTab: (tab: string) => void;
  onOpenAspirationModal: () => void;
  onOpenProductModal: () => void;
  productsCount: number;
  aspirationsCount: number;
  officialsCount: number;
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  setActiveTab,
  onOpenAspirationModal,
  onOpenProductModal,
  productsCount,
  aspirationsCount,
  officialsCount,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#071326] via-[#0b1e3b] to-[#0f274d] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-20 border-b border-blue-900/50">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-5 w-60 sm:w-80 h-60 sm:h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* PWA Mobile Install Banner */}
        <div className="mb-5 sm:mb-6">
          <PWAInstallButton variant="banner" />
        </div>

        {/* Official Banner Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/70 border border-blue-500/30 text-[11px] sm:text-xs text-sky-200 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping"></span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-semibold tracking-wide">Organisasi Kepemudaan Resmi {profile.villageName}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{profile.districtName}, {profile.provinceName}</span>
          </div>
        </div>

        {/* Main Grid: Headline + Quick Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-amber-300 font-extrabold tracking-widest text-[11px] sm:text-xs uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Maju Bersama, Mengabdi Sepenuh Hati
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Wadah Kreasi, Aksi, & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">
                  Kemandirian Pemuda Desa
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-blue-200/90 leading-relaxed max-w-2xl">
                Selamat datang di portal informasi resmi <strong className="text-white">{profile.name}</strong>. Tempat bersinergi, menyalurkan aspirasi warga, menggerakkan UMKM lokal, dan mewujudkan desa berkarakter berlandaskan gotong royong.
              </p>
            </div>

            {/* Semboyan Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-blue-950/70 border border-blue-800/80 flex items-start gap-3 shadow-md">
              <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">Motto Kehormatan Pemuda</p>
                <p className="text-xs sm:text-sm font-semibold text-white italic truncate">"{profile.motto}"</p>
                <p className="text-[11px] text-blue-300 mt-0.5 line-clamp-2 sm:line-clamp-none">
                  Pejuang yang berkepribadian mandiri, berilmu keterampilan, dan berbudi luhur.
                </p>
              </div>
            </div>

            {/* Call To Action Buttons - Mobile friendly flex wrap */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => setActiveTab('lapak')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 group active:scale-95 touch-manipulation"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Jelajahi Lapak Warga ({productsCount})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAspirationModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
              >
                <MessageSquareHeart className="w-4 h-4 text-rose-300" />
                <span>Kirim Aspirasi Warga</span>
              </button>

              <button
                onClick={() => setActiveTab('proker')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/40 text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1.5 touch-manipulation"
              >
                <span>Program Kerja 2026/2027</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {isAdmin && onOpenAdminPanel && (
                <button
                  onClick={() => onOpenAdminPanel('profil')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ubah Logo & Profil Karang Taruna</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Highlights & Stats */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Announcement Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/90 to-blue-950/95 border border-sky-500/30 shadow-xl shadow-blue-950/50">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide mb-1.5">
                <Megaphone className="w-4 h-4 animate-bounce text-amber-400 shrink-0" />
                <span>Agenda Terkini & Peluang UMKM</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Pendaftaran Lapak UMKM Warga Dibuka Gratis!
              </h3>
              <p className="text-xs text-blue-200 mt-1 leading-relaxed">
                Punya usaha makanan, kerajinan, jasa, atau hasil kebun? Promosikan langsung di portal Karang Taruna dan dapatkan pesanan WhatsApp dari warga sekitar.
              </p>
              <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-blue-800/60 text-xs">
                <span className="text-blue-300 text-[11px]">Biaya: <strong className="text-emerald-400 font-bold">100% Gratis</strong></span>
                <button
                  onClick={onOpenProductModal}
                  className="text-xs font-bold text-sky-300 hover:text-white underline underline-offset-4 flex items-center gap-1 active:scale-95"
                >
                  Pasang Produk Sekarang →
                </button>
              </div>
            </div>

            {/* Quick Stats Matrix */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div 
                onClick={() => setActiveTab('pengurus')}
                className="p-3 sm:p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/70 hover:border-sky-400/50 transition cursor-pointer group active:scale-98 touch-manipulation"
              >
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Pengurus & Kader</span>
                  <Users className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{officialsCount}+</div>
                <p className="text-[10px] sm:text-[11px] text-blue-300 mt-0.5 truncate">Pemuda lintas RT/RW</p>
              </div>

              <div 
                onClick={() => setActiveTab('lapak')}
                className="p-3 sm:p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/70 hover:border-amber-400/50 transition cursor-pointer group active:scale-98 touch-manipulation"
              >
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Lapak UMKM Warga</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300">{productsCount}</div>
                <p className="text-[10px] sm:text-[11px] text-blue-300 mt-0.5 truncate">Produk lokal aktif</p>
              </div>

              <div 
                onClick={() => setActiveTab('aspirasi')}
                className="p-3 sm:p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/70 hover:border-rose-400/50 transition cursor-pointer group active:scale-98 touch-manipulation"
              >
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Aspirasi Masuk</span>
                  <MessageSquareHeart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{aspirationsCount}</div>
                <p className="text-[10px] sm:text-[11px] text-emerald-400 mt-0.5 truncate">100% Ditanggapi</p>
              </div>

              <div 
                onClick={() => setActiveTab('kegiatan')}
                className="p-3 sm:p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/70 hover:border-emerald-400/50 transition cursor-pointer group active:scale-98 touch-manipulation"
              >
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Kegiatan Rutin</span>
                  <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">24+</div>
                <p className="text-[10px] sm:text-[11px] text-blue-300 mt-0.5 truncate">Aksi sosial & olahraga</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
