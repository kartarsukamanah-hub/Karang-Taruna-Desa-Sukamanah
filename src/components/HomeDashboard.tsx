import React from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  Users, 
  MessageSquareHeart, 
  ShieldCheck, 
  Store, 
  MapPin
} from 'lucide-react';
import { 
  OrganizationProfile, 
  OfficialMember, 
  Activity, 
  WorkProgram, 
  CitizenProduct 
} from '../types';

interface HomeDashboardProps {
  profile: OrganizationProfile;
  officials: OfficialMember[];
  activities: Activity[];
  programs: WorkProgram[];
  products: CitizenProduct[];
  setActiveTab: (tab: string) => void;
  onOpenProductModal: () => void;
  onOpenAspirationModal: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  officials,
  activities,
  programs,
  products,
  setActiveTab,
  onOpenProductModal,
  onOpenAspirationModal
}) => {
  const ketua = officials.find(o => o.position.toLowerCase().includes('ketua')) || officials[0];
  const featuredProducts = products.slice(0, 3);
  const recentActivities = activities.slice(0, 3);
  const urgentPrograms = programs.slice(0, 2);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-8 sm:pb-12">
      
      {/* 1. Sambutan Ketua & Nilai Luhur */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg sm:shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Foto Ketua */}
            <div className="lg:col-span-5 relative bg-gradient-to-t from-blue-950 via-blue-900 to-slate-900 py-6 px-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
              <img
                src={ketua.avatar}
                alt={ketua.name}
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-2xl border-4 border-white/20 shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
              
              <div className="mt-3 relative z-20 bg-slate-950/85 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/10 text-center w-full max-w-xs">
                <span className="text-xs sm:text-sm font-black text-amber-300 block truncate">{ketua.name}</span>
                <span className="text-[10px] sm:text-[11px] text-sky-200">{ketua.position} ({ketua.termPeriod})</span>
              </div>
            </div>

            {/* Teks Sambutan */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 sm:space-y-6">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>Sambutan Ketua Karang Taruna</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  "Menyemai Karya, Mengabdi untuk Kemajuan Seluruh Warga Sukamanah"
                </h2>
                
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 sm:space-y-3">
                  <p>
                    <em>Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Salam Aditya Karya Mahatva Yodha!</em>
                  </p>
                  <p>
                    Karang Taruna bukan sekadar perkumpulan saat peringatan kemerdekaan. Hari ini, pemuda hadir sebagai mitra strategis pembangunan desa, pelindung kesetiakawanan sosial, dan motor penggerak kebangkitan ekonomi mikro warga.
                  </p>
                  <p className="hidden xs:block">
                    Melalui portal terpadu ini, kami membuka ruang seluas-luasnya bagi masyarakat untuk menyampaikan aspirasi dan memasarkan produk UMKM secara gratis. Mari kita rajut persatuan demi masa depan Sukamanah yang lebih gemilang.
                  </p>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="truncate">Sekretariat Balai Desa Sukamanah</span>
                </div>

                <button
                  onClick={() => setActiveTab('profil')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition flex items-center justify-center gap-1.5 shadow active:scale-95 touch-manipulation"
                >
                  <span>Baca Visi Misi & Profil Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. LAPAK UMKM WARGA HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Store className="w-3.5 h-3.5 text-amber-700" />
              <span>Etalase Pasar Warga Desa</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Produk Unggulan Warga Sukamanah
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Beli langsung dari tetangga dan pengrajin desa tanpa perantara. Hubungi WhatsApp penjual secara instan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenProductModal}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation"
            >
              <Store className="w-4 h-4" />
              <span>+ Pasang Produk</span>
            </button>
            <button
              onClick={() => setActiveTab('lapak')}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition flex items-center justify-center gap-1 active:scale-95 touch-manipulation"
            >
              <span>Semua Lapak ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setActiveTab('lapak')}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition cursor-pointer flex flex-col justify-between active:scale-98 touch-manipulation"
            >
              <div>
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-blue-900/90 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow">
                    {prod.category}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] sm:text-[11px] bg-slate-950/75 backdrop-blur-sm px-2.5 py-1 rounded">
                    <span className="truncate">{prod.sellerName}</span>
                    <span className="text-amber-300 font-mono font-bold shrink-0">{prod.rtRw}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <div className="mt-1.5 text-base sm:text-lg font-black text-blue-950 font-mono">
                    {formatRupiah(prod.price)}
                    {prod.unitLabel && (
                      <span className="text-xs font-normal text-slate-500 font-sans ml-1">/ {prod.unitLabel}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <a
                  href={`https://wa.me/${prod.sellerPhone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(prod.sellerName)},%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(prod.name)}*%20di%20Portal%20Karang%20Taruna`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 touch-manipulation"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Pesan via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DOKUMENTASI KEGIATAN TERBARU */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              <span>Aksi Nyata Pemuda</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kegiatan & Dokumentasi Lapangan
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Catatan kegiatan gotong royong, turnamen, dan bakti sosial yang telah terlaksana.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('kegiatan')}
            className="self-start sm:self-auto px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-blue-900 font-bold text-xs hover:bg-blue-50 transition flex items-center gap-1 active:scale-95 touch-manipulation"
          >
            <span>Lihat Semua Kegiatan ({activities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => setActiveTab('kegiatan')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between group active:scale-98 touch-manipulation"
            >
              <div>
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-blue-950/85 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded">
                    {act.category}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 text-[11px] text-white bg-slate-950/75 px-2 py-0.5 rounded">
                    {act.date}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 line-clamp-2">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 mt-2">
                <span className="flex items-center gap-1 text-[11px]">
                  <Users className="w-3.5 h-3.5 text-blue-700" />
                  <strong>{act.participantsCount}</strong> Warga
                </span>
                <span className="text-blue-900 font-bold text-xs group-hover:underline">
                  Lihat Hasil →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AGENDA PROGRAM KERJA KEDEPAN */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-950 via-[#0a192f] to-[#071326] text-white border border-blue-900 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-blue-900/80">
            <div>
              <span className="text-amber-400 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider block mb-1">
                Roadmap Inovasi 2026 / 2027
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                Rencana Program Kerja Mendatang
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl">
                Transparansi target pelaksanaan dan kesempatan bagi pemuda desa untuk mendaftar sebagai relawan panitia.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('proker')}
              className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs shadow transition flex items-center gap-1.5 shrink-0 active:scale-95 touch-manipulation"
            >
              <span>Semua Program Kerja ({programs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {urgentPrograms.map((p) => (
              <div 
                key={p.id} 
                className="p-4 sm:p-5 rounded-2xl bg-blue-900/40 border border-blue-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300">{p.targetQuarter}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-800 text-amber-300 border border-amber-400/30">
                    {p.status}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-blue-200 line-clamp-2">{p.description}</p>

                <div className="pt-1.5 space-y-1">
                  <div className="flex justify-between text-[11px] text-blue-300">
                    <span>Persiapan</span>
                    <span className="font-bold text-white">{p.progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-blue-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-400 rounded-full transition-all duration-300"
                      style={{ width: `${p.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-blue-800/60 flex items-center justify-between text-xs text-blue-200">
                  <span className="truncate mr-2">PIC: <strong className="text-white">{p.leadPerson}</strong></span>
                  <button
                    onClick={() => setActiveTab('proker')}
                    className="text-sky-300 hover:text-white font-bold shrink-0 active:scale-95 touch-manipulation"
                  >
                    Daftar Relawan →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BANNER AJAKAN ASPIRASI WARGA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 border border-blue-700/60">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <span className="px-3 py-0.5 rounded-full bg-white/10 text-sky-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider inline-block">
              Partisipasi Warga
            </span>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white">
              Punya Masukan, Keluhan, atau Ide untuk Desa?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Kirimkan aspirasi Anda melalui kotak suara online. Bisa tanpa nama (anonim) dan akan langsung dibahas pengurus Karang Taruna bersama Kepala Desa.
            </p>
          </div>

          <button
            onClick={onOpenAspirationModal}
            className="w-full md:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white text-blue-950 font-black text-xs sm:text-sm shadow-xl hover:bg-amber-300 transition shrink-0 active:scale-95 flex items-center justify-center gap-2 touch-manipulation"
          >
            <MessageSquareHeart className="w-4 h-4 text-rose-600" />
            <span>Kirim Suara Warga Sekarang</span>
          </button>
        </div>
      </section>

    </div>
  );
};
