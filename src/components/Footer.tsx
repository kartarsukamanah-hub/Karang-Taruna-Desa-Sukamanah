import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  Users,
  ShoppingBag,
  MessageSquareHeart,
  Calendar,
  Briefcase,
  Lock,
  Settings,
  Smartphone
} from 'lucide-react';
import { OrganizationProfile } from '../types';

interface FooterProps {
  profile: OrganizationProfile;
  setActiveTab: (tab: string) => void;
  onOpenAspirationModal: () => void;
  onOpenProductModal: () => void;
  isAdmin?: boolean;
  onOpenLoginModal?: () => void;
  onOpenAdminPanel?: (tab?: any) => void;
  onOpenInstallModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  setActiveTab,
  onOpenAspirationModal,
  onOpenProductModal,
  isAdmin,
  onOpenLoginModal,
  onOpenAdminPanel,
  onOpenInstallModal
}) => {
  return (
    <footer className="bg-[#050e1c] text-white border-t border-blue-900/60 pt-14 pb-24 lg:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-900 border border-blue-500/40 text-amber-300 font-black overflow-hidden p-1 shadow-md">
                {profile.logoUrl ? (
                  <img src={profile.logoUrl} alt={profile.name} className="w-full h-full object-contain" />
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"/>
                    <path d="M12 17v5"/>
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-black text-lg text-white tracking-wide uppercase">
                  {profile.name}
                </h3>
                <span className="text-[11px] text-amber-300 font-mono italic">
                  "{profile.motto}"
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed max-w-sm">
              Organisasi sosial wadah pembinaan generasi muda desa yang bergerak dalam pemberdayaan sosial, ekonomi kerakyatan, kesenian olahraga, dan pelestarian lingkungan hidup.
            </p>

            <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/60 text-xs text-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Sekretariat Pusat:</span>
              </div>
              <p className="pl-5 text-slate-300 text-[11px]">
                {profile.address}, {profile.villageName}, {profile.districtName}
              </p>
              <div className="flex items-center gap-2 pl-5 text-[11px] text-sky-300">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${profile.email}`} className="hover:underline font-mono">
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Menu Informasi
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li>
                <button 
                  onClick={() => { setActiveTab('beranda'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Beranda Utama</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Profil & Visi Misi Organisasi</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('pengurus'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Struktur Pengurus & Anggota</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('kegiatan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Dokumentasi Kegiatan Desa</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('proker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Program Kerja Kedepan</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('aspirasi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Kotak Suara Aspirasi Warga</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('lapak'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Lapak UMKM Produk Warga</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Citizen Actions & Emergency */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Layanan Warga & Kontak Darurat
            </h4>

            <div className="space-y-2">
              {onOpenInstallModal && (
                <button
                  onClick={onOpenInstallModal}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>Pasang Aplikasi di HP (Android & iPhone)</span>
                </button>
              )}

              <button
                onClick={onOpenProductModal}
                className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pasang Produk Warga (Gratis)</span>
              </button>

              <button
                onClick={onOpenAspirationModal}
                className="w-full py-2.5 px-3.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-blue-100 border border-blue-700/60 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquareHeart className="w-4 h-4 text-rose-400" />
                <span>Sampaikan Aspirasi / Keluhan</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hotline Piket Bhabinkamtibmas / Babinsa:</span>
              </div>
              <p className="text-slate-300">+62 812-9988-1122 (Desa Sukamanah)</p>
            </div>

            {/* Admin Access in Footer */}
            <div className="pt-2">
              {isAdmin ? (
                <button
                  onClick={() => onOpenAdminPanel?.('profil')}
                  className="text-xs text-amber-300 hover:text-white flex items-center gap-1.5 font-bold"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Buka Panel Pengurus (Ubah Logo & Data)</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login Pengurus / Admin Karang Taruna</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/80">
          <p>© 2026 {profile.name} • Bersama Membangun Desa Mandiri & Berprestasi.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Sesuai Permensos RI No. 25/2019</span>
            <span>•</span>
            <span className="font-semibold text-amber-300">Aditya Karya Mahatva Yodha</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
