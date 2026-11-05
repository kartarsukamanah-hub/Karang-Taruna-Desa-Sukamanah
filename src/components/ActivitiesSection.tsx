import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  Eye, 
  PlusCircle, 
  CheckCircle, 
  Sparkles, 
  Filter, 
  X,
  Search,
  Share2
} from 'lucide-react';
import { Activity, ActivityCategory } from '../types';

interface ActivitiesSectionProps {
  activities: Activity[];
  onOpenAspirationModal: () => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ 
  activities: initialActivitiesList,
  onOpenAspirationModal,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivitiesList);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [likedActivities, setLikedActivities] = useState<string[]>([]);
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [proposeSuccess, setProposeSuccess] = useState(false);

  // Proposal State
  const [propTitle, setPropTitle] = useState('');
  const [propCategory, setPropCategory] = useState<ActivityCategory>('Sosial & Kemanusiaan');
  const [propLocation, setPropLocation] = useState('');
  const [propDesc, setPropDesc] = useState('');
  const [propSender, setPropSender] = useState('');

  const categories = [
    'Semua',
    'Sosial & Kemanusiaan',
    'Olahraga & Seni',
    'Pelatihan & UMKM',
    'Lingkungan Hidup'
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedActivities.includes(id);
    if (isLiked) {
      setLikedActivities(likedActivities.filter(item => item !== id));
      setActivities(prev => prev.map(a => a.id === id ? { ...a, likesCount: a.likesCount - 1 } : a));
    } else {
      setLikedActivities([...likedActivities, id]);
      setActivities(prev => prev.map(a => a.id === id ? { ...a, likesCount: a.likesCount + 1 } : a));
    }
  };

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle.trim()) return;

    setProposeSuccess(true);
    setTimeout(() => {
      setProposeSuccess(false);
      setShowProposeModal(false);
      setPropTitle('');
      setPropLocation('');
      setPropDesc('');
      setPropSender('');
    }, 2000);
  };

  const filtered = activities.filter((act) => {
    const matchesCat = selectedCategory === 'Semua' || act.category === selectedCategory;
    const matchesQuery = 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              <span>Agenda & Dokumentasi Nyata</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Aktivitas & Gerakan Pemuda
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Dokumentasi transparansi kegiatan pemuda Sukamanah dalam bidang kepedulian sosial, kejuaraan olahraga, penghijauan lingkungan, dan pelatihan usaha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={() => onOpenAdminPanel('kegiatan')}
                className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <span>⚙️ Kelola Berita Kegiatan</span>
              </button>
            )}

            <button
              onClick={() => setShowProposeModal(true)}
              className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-900/20 transition flex items-center gap-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-sky-300" />
              <span>Usulkan Kegiatan Warga</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kegiatan, kerja bakti, futsal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <div className="text-xs text-slate-500">
              Menampilkan <strong>{filtered.length}</strong> kegiatan
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => {
            const isLiked = likedActivities.includes(activity.id);
            return (
              <div
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Photo & Category Badge */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-sm text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow border border-white/20">
                    {activity.category}
                  </div>

                  <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md shadow ${
                    activity.status === 'Selesai' 
                      ? 'bg-emerald-600 text-white' 
                      : activity.status === 'Sedang Berjalan'
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-sky-600 text-white'
                  }`}>
                    {activity.status}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                      {activity.title}
                    </h3>

                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{activity.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-blue-700" />
                      <span><strong>{activity.participantsCount}</strong> Partisipan</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleLike(activity.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition ${
                          isLiked 
                            ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{activity.likesCount}</span>
                      </button>

                      <span className="text-blue-900 font-bold hover:underline flex items-center gap-0.5">
                        Detail <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Detail Kegiatan & Galeri */}
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              
              <div className="relative h-48 sm:h-64 bg-slate-950 shrink-0">
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-3 right-3 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 active:scale-95 transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-sm p-3 rounded-xl text-white border border-white/20">
                  <span className="text-[10px] sm:text-xs text-sky-300 font-bold uppercase">{selectedActivity.category}</span>
                  <h3 className="text-sm sm:text-lg font-bold text-white mt-0.5 line-clamp-1">{selectedActivity.title}</h3>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Waktu & Tanggal</span>
                    <span className="font-semibold text-slate-800 text-xs">{selectedActivity.date}</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Lokasi Acara</span>
                    <span className="font-semibold text-slate-800 truncate block text-xs">{selectedActivity.location}</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Koordinator</span>
                    <span className="font-semibold text-slate-800 text-xs">{selectedActivity.coordinator}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Laporan Ringkas Hasil Kegiatan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedActivity.fullReport}
                  </p>
                </div>

                {/* Galeri Tambahan jika ada */}
                {selectedActivity.gallery && selectedActivity.gallery.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Dokumentasi Foto Tambahan
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedActivity.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Dokumentasi"
                          className="h-20 sm:h-24 w-full object-cover rounded-lg border border-slate-200 hover:scale-105 transition"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Didukung oleh <strong>{selectedActivity.likesCount}</strong> warga
                  </span>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="px-5 py-2.5 min-h-[40px] rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 active:scale-95 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal Usulkan Kegiatan Baru */}
        {showProposeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 to-blue-900 text-white flex items-center justify-between shrink-0">
                <div className="min-w-0 pr-2">
                  <h3 className="text-base sm:text-lg font-bold truncate">Usulkan Kegiatan Pemuda / Warga</h3>
                  <p className="text-xs text-blue-200 truncate">Sampaikan ide kegiatan positif untuk desa kita</p>
                </div>
                <button
                  onClick={() => setShowProposeModal(false)}
                  className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition shrink-0"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {proposeSuccess ? (
                <div className="p-6 sm:p-8 text-center space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Usulan Berhasil Dikirim!</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Terima kasih atas ide Anda. Seksi terkait Karang Taruna Sukamanah akan membahas usulan ini dalam rapat pengurus.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleProposeSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Pengusul / Asal RT *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Bambang - RT 02"
                      value={propSender}
                      onChange={(e) => setPropSender(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama / Gagasan Kegiatan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Lomba Memancing Pemuda di Kolam Desa"
                      value={propTitle}
                      onChange={(e) => setPropTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Kategori
                      </label>
                      <select
                        value={propCategory}
                        onChange={(e) => setPropCategory(e.target.value as ActivityCategory)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                      >
                        <option value="Sosial & Kemanusiaan">Sosial & Kemanusiaan</option>
                        <option value="Olahraga & Seni">Olahraga & Seni</option>
                        <option value="Pelatihan & UMKM">Pelatihan & UMKM</option>
                        <option value="Lingkungan Hidup">Lingkungan Hidup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Usulan Lokasi
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Lapangan RT 04"
                        value={propLocation}
                        onChange={(e) => setPropLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Deskripsi & Manfaat Kegiatan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan gambaran acara dan manfaatnya bagi warga..."
                      value={propDesc}
                      onChange={(e) => setPropDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowProposeModal(false)}
                      className="flex-1 py-3 min-h-[44px] rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 min-h-[44px] rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md active:scale-95 transition"
                    >
                      Kirim Usulan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
