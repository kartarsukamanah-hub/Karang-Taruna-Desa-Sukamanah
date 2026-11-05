import React, { useState } from 'react';
import { 
  Target, 
  Compass, 
  BookOpen, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Users2
} from 'lucide-react';
import { OrganizationProfile } from '../types';

interface ProfileSectionProps {
  profile: OrganizationProfile;
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  profile,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [activeTab, setActiveTab] = useState<'visimisi' | 'lambang' | 'sejarah' | 'kontak'>('visimisi');

  return (
    <section className="py-8 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Profil Resmi Organisasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Lebih Dekat <br />
            <span className="text-blue-900">{profile.name}</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-600 text-xs sm:text-base leading-relaxed">
            Wadah pengembangan generasi muda non-partisan yang tumbuh dari masyarakat, oleh masyarakat, dan untuk kemaslahatan seluruh warga desa.
          </p>
          {isAdmin && onOpenAdminPanel && (
            <div className="mt-3 sm:mt-4">
              <button
                onClick={() => onOpenAdminPanel('profil')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition inline-flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation"
              >
                <span>✏️ Ubah Logo & Edit Informasi Profil (Mode Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Selector Buttons - Responsive 2x2 grid on mobile, row on tablet/desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 mb-6 sm:mb-10">
          <button
            onClick={() => setActiveTab('visimisi')}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation ${
              activeTab === 'visimisi'
                ? 'bg-blue-900 text-white shadow-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Target className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Visi & Misi</span>
          </button>

          <button
            onClick={() => setActiveTab('lambang')}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation ${
              activeTab === 'lambang'
                ? 'bg-blue-900 text-white shadow-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Makna Lambang</span>
          </button>

          <button
            onClick={() => setActiveTab('sejarah')}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation ${
              activeTab === 'sejarah'
                ? 'bg-blue-900 text-white shadow-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sejarah Organisasi</span>
          </button>

          <button
            onClick={() => setActiveTab('kontak')}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation ${
              activeTab === 'kontak'
                ? 'bg-blue-900 text-white shadow-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Sekretariat</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg sm:shadow-xl shadow-slate-200/50 p-4 sm:p-8 lg:p-10">
          
          {/* 1. VISI & MISI */}
          {activeTab === 'visimisi' && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              {/* Visi Box */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white border border-blue-800 shadow-md">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Visi Utama Karang Taruna</span>
                </div>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-relaxed">
                  "{profile.vision}"
                </h3>
              </div>

              {/* Misi List */}
              <div>
                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-base sm:text-xl mb-3 sm:mb-4">
                  <Target className="w-5 h-5 text-blue-700 shrink-0" />
                  <span>5 Pilar Misi Strategis</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {profile.missions.map((mission, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-blue-700 transition">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {mission}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prinsip Dasar */}
              <div className="p-4 sm:p-5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-700 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">Berlandaskan Permensos No. 25 Tahun 2019</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                      Organisasi sosial kemasyarakatan berbadan hukum resmi pembina kesejahteraan sosial dan kewirausahaan pemuda.
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-bold whitespace-nowrap">
                  Resmi & Transparan
                </span>
              </div>
            </div>
          )}

          {/* 2. MAKNA LAMBANG */}
          {activeTab === 'lambang' && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Emblem Visual Card */}
                <div className="lg:col-span-5 flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-blue-900 to-slate-950 text-white border border-blue-800 shadow-xl">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-blue-800 to-blue-600 border-4 border-amber-400 flex items-center justify-center shadow-2xl mb-4 overflow-hidden p-2">
                    {profile.logoUrl ? (
                      <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <>
                        <div className="absolute inset-2 rounded-full border border-amber-300/40"></div>
                        <Award className="w-12 h-12 sm:w-16 sm:h-16 text-amber-300" />
                      </>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-amber-300 tracking-wide uppercase">
                    Logo & Lambang Resmi
                  </h3>
                  <p className="text-xs text-blue-200 font-mono italic mt-1">
                    "{profile.motto}"
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Setiap elemen pada lambang mengandung nilai-nilai patriotisme, gotong royong, ketaatan pada Tuhan YME, dan tekad pengabdian generasi muda.
                  </p>
                </div>

                {/* Meaning List */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">
                    Penjelasan Filosofi & Arti Tiap Elemen
                  </h4>
                  {profile.symbolMeaning.map((symbol, idx) => (
                    <div 
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition"
                    >
                      <div className="flex items-center gap-2 text-blue-900 font-bold text-xs sm:text-sm mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{symbol.part}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                        {symbol.description}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* 3. SEJARAH */}
          {activeTab === 'sejarah' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-900 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      Lintas Sejarah Pemuda Desa Sukamanah
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dirintis sejak tahun {profile.establishedYear} dan terus bergenerasi hingga kini.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  {profile.history}
                </p>

                {/* Timeline Milestones */}
                <div className="pt-4 space-y-4">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                    Tonggak Perjalanan Penting
                  </h4>
                  
                  <div className="relative pl-5 sm:pl-6 border-l-2 border-blue-900 space-y-5 sm:space-y-6 ml-2">
                    <div className="relative">
                      <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-900 border-2 border-white shadow"></span>
                      <span className="text-[11px] font-bold text-blue-900 font-mono">Tahun 1988</span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">Perintisan Wadah Pemuda Desa</h5>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Pemuda desa membentuk paguyuban ronda malam dan panitia Agustusan bersama aparatur desa.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-900 border-2 border-white shadow"></span>
                      <span className="text-[11px] font-bold text-blue-900 font-mono">Tahun 2012</span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">Pendirian Koperasi & Sentra Olahraga Pemuda</h5>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Mendapatkan hibah renovasi lapangan olahraga serbaguna serta pembentukan unit usaha sablon.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></span>
                      <span className="text-[11px] font-bold text-emerald-700 font-mono">Tahun 2024 - Sekarang</span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">Era Transformasi Digital & Lapak Warga</h5>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Meluncurkan portal online, digitalisasi aspirasi masyarakat, dan etalase promosi UMKM warga tanpa perantara.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. KONTAK & SEKRETARIAT */}
          {activeTab === 'kontak' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Informasi Kontak Lengkap */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Sekretariat & Pelayanan Warga
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Pintu sekretariat kami selalu terbuka untuk diskusi, audiensi warga, perizinan kegiatan pemuda, maupun kemitraan usaha mikro.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <MapPin className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sekretariat</div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">{profile.address}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{profile.villageName}, {profile.districtName}, {profile.provinceName}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <Clock className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Jam Pelayanan & Buka</div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">{profile.operatingHours}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">Petugas piket pemuda siap melayani konsultasi warga</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <Mail className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Email Resmi</div>
                        <a href={`mailto:${profile.email}`} className="text-xs sm:text-sm font-semibold text-blue-800 hover:underline truncate block">
                          {profile.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <Phone className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Hotline WhatsApp Organisasi</div>
                        <a 
                          href="https://wa.me/6282123456789?text=Halo%20Karang%20Taruna%20Sukamanah,%20saya%20ingin%20bertanya" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs sm:text-sm font-bold text-emerald-700 hover:underline truncate block"
                        >
                          {profile.phone} (WhatsApp Aktif)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cakupan Wilayah Binaan */}
                <div className="p-4 sm:p-6 rounded-2xl bg-blue-950 text-white border border-blue-900 space-y-3.5">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <Users2 className="w-4 h-4" />
                    <span>Wilayah Kerja Koordinasi Pemuda</span>
                  </div>
                  <h4 className="text-base sm:text-xl font-bold text-white">
                    Mencakup 5 Rukun Warga (RW) & 24 Rukun Tetangga (RT)
                  </h4>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Setiap RW memiliki koordinator pemuda perwakilan yang bertugas menyerap aspirasi lingkungan dan mengoordinasikan kegiatan ronda, kerja bakti, maupun pembinaan bakat seni dan olahraga.
                  </p>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 rounded-lg bg-blue-900/60 border border-blue-800">
                      <span className="font-bold text-amber-300 block">RW 01 (Dusun Krajan)</span>
                      <span className="text-blue-200 text-[11px]">5 RT - 180 Pemuda</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-900/60 border border-blue-800">
                      <span className="font-bold text-amber-300 block">RW 02 (Dusun Sukarame)</span>
                      <span className="text-blue-200 text-[11px]">6 RT - 210 Pemuda</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-900/60 border border-blue-800">
                      <span className="font-bold text-amber-300 block">RW 03 (Dusun Mekarsari)</span>
                      <span className="text-blue-200 text-[11px]">4 RT - 165 Pemuda</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-900/60 border border-blue-800">
                      <span className="font-bold text-amber-300 block">RW 04 (Dusun Sukamaju)</span>
                      <span className="text-blue-200 text-[11px]">5 RT - 195 Pemuda</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-600/40 text-xs text-sky-200 flex items-center justify-between">
                    <span className="text-[11px]">Pemuda Produktif (16-35 th):</span>
                    <strong className="text-white text-xs sm:text-sm">850+ Jiwa</strong>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
