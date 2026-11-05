import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Instagram, 
  Quote, 
  UserPlus, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  BadgeCheck, 
  HeartHandshake,
  X
} from 'lucide-react';
import { OfficialMember, SectionType, VolunteerApplication } from '../types';
import { addStoredVolunteer } from '../utils/storage';

interface OfficialsSectionProps {
  officials: OfficialMember[];
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const OfficialsSection: React.FC<OfficialsSectionProps> = ({ 
  officials,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionType>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialMember | null>(null);
  
  // Registration Form State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rtRw, setRtRw] = useState('RT 01 / RW 01');
  const [interestDivision, setInterestDivision] = useState('Ekonomi Kreatif & UMKM');
  const [skills, setSkills] = useState('');
  const [motivation, setMotivation] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);

  const sections: SectionType[] = [
    'Semua',
    'Pimpinan Inti',
    'Sosial & Lingkungan',
    'Olahraga & Seni',
    'Ekonomi Kreatif & UMKM',
    'Pendidikan & Humas'
  ];

  const filteredOfficials = officials.filter((off) => {
    const matchesSection = selectedSection === 'Semua' || off.section === selectedSection;
    const matchesQuery = 
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.rtRw.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesQuery;
  });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const newApplicant: VolunteerApplication = {
      id: `vol-${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      rtRw,
      interestDivision,
      skills: skills.trim(),
      motivation: motivation.trim(),
      appliedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    addStoredVolunteer(newApplicant);
    setJoinSuccess(true);
    setTimeout(() => {
      setJoinSuccess(false);
      setShowJoinModal(false);
      setFullName('');
      setPhone('');
      setSkills('');
      setMotivation('');
    }, 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-blue-700" />
              <span>Struktur Kepengurusan 2024 - 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Susunan Pengurus & Kader Pemuda
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Dedikasi pemuda desa dari perwakilan tiap RT/RW yang mengemban amanah menggerakkan sosial kemasyarakatan dan ekonomi kreatif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={() => onOpenAdminPanel('pengurus')}
                className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <span>⚙️ Kelola & Tambah Pengurus</span>
              </button>
            )}

            <button
              onClick={() => setShowJoinModal(true)}
              className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-900/20 transition flex items-center gap-2 active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>Gabung Jadi Anggota / Relawan</span>
            </button>
          </div>
        </div>

        {/* Pelindung & Pembina Hierarchy Box */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Pelindung & Pembina Karang Taruna
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Pelindung Utama</p>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">H. Ahmad Subagja, S.Sos.</p>
              <p className="text-xs text-blue-800 font-medium">Kepala Desa Sukamanah</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Pembina Fungsional</p>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">Sertu Mulyadi & Bripka Anton</p>
              <p className="text-xs text-blue-800 font-medium">Babinsa & Bhabinkamtibmas Desa</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Pembina Tokoh Warga</p>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">Drs. H. Syarifuddin, M.Pd.</p>
              <p className="text-xs text-blue-800 font-medium">Ketua BPD & Tokoh Masyarakat</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>

            <span className="text-xs text-slate-500">
              Menampilkan <strong>{filteredOfficials.length}</strong> dari {officials.length} pengurus
            </span>
          </div>

          {/* Section Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedSection === sec
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Officials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOfficials.map((official) => (
            <div
              key={official.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col"
            >
              {/* Photo & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={official.avatar}
                  alt={official.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {official.badge && (
                  <div className="absolute top-3 left-3 bg-amber-400 text-blue-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{official.badge}</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-blue-900/80 backdrop-blur-sm text-white font-mono text-[10px] px-2 py-0.5 rounded-md border border-white/20">
                  {official.termPeriod}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-sky-300 block">
                    {official.section}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug drop-shadow-sm">
                    {official.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-bold text-xs border border-blue-100">
                    {official.position}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                    {official.bio}
                  </p>

                  {official.quote && (
                    <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border-l-2 border-amber-400 text-[11px] text-slate-700 italic">
                      "{official.quote}"
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{official.rtRw}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {official.instagram && (
                      <a
                        href={`https://instagram.com/${official.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition"
                        title={official.instagram}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {official.phone && (
                      <a
                        href={`https://wa.me/${official.phone.replace(/[^0-9]/g, '')}?text=Halo%20Kak%20${encodeURIComponent(official.name)},%20saya%20warga%20Sukamanah`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                        title="Hubungi WhatsApp"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOfficial(official)}
                  className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 text-xs font-semibold transition"
                >
                  Lihat Profil Lengkap
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Pengurus */}
        {selectedOfficial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              <div className="relative h-44 sm:h-48 bg-gradient-to-r from-blue-950 to-blue-900 p-4 sm:p-6 text-white flex items-end shrink-0">
                <button
                  onClick={() => setSelectedOfficial(null)}
                  className="absolute top-3 right-3 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 active:scale-95 transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={selectedOfficial.avatar}
                    alt={selectedOfficial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white shadow-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs text-sky-300 font-semibold block truncate">{selectedOfficial.section}</span>
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{selectedOfficial.name}</h3>
                    <p className="text-xs text-amber-300 font-medium truncate">{selectedOfficial.position}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Peran & Tanggung Jawab</h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{selectedOfficial.bio}</p>
                </div>

                {selectedOfficial.quote && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 text-xs italic flex items-start gap-2">
                    <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>"{selectedOfficial.quote}"</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Domisili</span>
                    <span className="font-semibold text-slate-800">{selectedOfficial.rtRw}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Masa Pengabdian</span>
                    <span className="font-semibold text-slate-800">Periode {selectedOfficial.termPeriod}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row gap-2">
                  {selectedOfficial.phone && (
                    <a
                      href={`https://wa.me/${selectedOfficial.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Kirim Pesan WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedOfficial(null)}
                    className="px-5 py-3 min-h-[44px] rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 active:scale-95 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Pendaftaran Anggota Baru */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 to-blue-900 text-white flex items-center justify-between shrink-0">
                <div className="min-w-0 pr-2">
                  <h3 className="text-base sm:text-lg font-bold truncate">Pendaftaran Relawan & Pemuda</h3>
                  <p className="text-xs text-blue-200 truncate">Mari berkontribusi nyata untuk kemajuan Desa Sukamanah</p>
                </div>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition shrink-0"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {joinSuccess ? (
                <div className="p-6 sm:p-8 text-center space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Pendaftaran Berhasil Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Terima kasih, data Anda telah tercatat di sekretariat. Koordinator Karang Taruna akan segera menghubungi Anda via WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Dimas Pratama"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Asal RT / RW *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: RT 03 / RW 02"
                        value={rtRw}
                        onChange={(e) => setRtRw(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Pilihan Divisi Peminatan
                    </label>
                    <select
                      value={interestDivision}
                      onChange={(e) => setInterestDivision(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                    >
                      <option value="Ekonomi Kreatif & UMKM">Seksi Ekonomi Kreatif & UMKM Desa</option>
                      <option value="Olahraga & Seni">Seksi Olahraga, Seni & Budaya</option>
                      <option value="Sosial & Lingkungan">Seksi Sosial & Lingkungan Hidup</option>
                      <option value="Pendidikan & Humas">Seksi Pendidikan, Publikasi & Humas</option>
                      <option value="Relawan Tanggap Darurat">Relawan Umum / Tanggap Darurat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Keahlian / Hobi (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Fotografi, Desain, Futsal, Masak, Komputer"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Motivasi Bergabung (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Apa harapanmu untuk kemajuan pemuda Sukamanah?"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowJoinModal(false)}
                      className="flex-1 py-3 min-h-[44px] rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 min-h-[44px] rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md active:scale-95 transition"
                    >
                      Kirim Formulir
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
