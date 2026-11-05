import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  UserCheck, 
  Target, 
  Coins, 
  Clock, 
  CheckCircle2, 
  Users, 
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { WorkProgram, ProgramStatus } from '../types';
import { saveStoredWorkPrograms } from '../utils/storage';

interface WorkProgramsSectionProps {
  programs: WorkProgram[];
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const WorkProgramsSection: React.FC<WorkProgramsSectionProps> = ({ 
  programs: initialPrograms,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [programs, setPrograms] = useState<WorkProgram[]>(initialPrograms);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedProgram, setSelectedProgram] = useState<WorkProgram | null>(null);
  
  // Volunteer Join State
  const [volunteerModalProg, setVolunteerModalProg] = useState<WorkProgram | null>(null);
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volSuccess, setVolSuccess] = useState(false);

  const statuses: string[] = ['Semua', 'Persiapan', 'Siap Eksekusi', 'Perencanaan'];

  const filtered = programs.filter(p => {
    if (statusFilter === 'Semua') return true;
    return p.status === statusFilter;
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerModalProg || !volName.trim() || !volPhone.trim()) return;

    const updated = programs.map(p => {
      if (p.id === volunteerModalProg.id) {
        return {
          ...p,
          volunteersRegistered: p.volunteersRegistered + 1
        };
      }
      return p;
    });

    setPrograms(updated);
    saveStoredWorkPrograms(updated);
    setVolSuccess(true);

    setTimeout(() => {
      setVolSuccess(false);
      setVolunteerModalProg(null);
      setVolName('');
      setVolPhone('');
    }, 2000);
  };

  const getStatusBadge = (status: ProgramStatus) => {
    switch (status) {
      case 'Siap Eksekusi':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Persiapan':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Perencanaan':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-700" />
            <span>Roadmap & Rencana Strategis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Kerja Masa Depan
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Rencana inisiatif terarah Karang Taruna Sukamanah untuk memajukan perekonomian, kepedulian lingkungan, dan kualitas hidup generasi muda.
          </p>
          {isAdmin && onOpenAdminPanel && (
            <div className="mt-4">
              <button
                onClick={() => onOpenAdminPanel('proker')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition inline-flex items-center gap-1.5"
              >
                <span>⚙️ Kelola & Atur Target Program Kerja (Mode Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                statusFilter === st
                  ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st === 'Semua' ? 'Semua Program Kerja' : `Status: ${st}`}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all p-6 flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Meta Top: Target Quarter & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    <span>{prog.targetQuarter}</span>
                  </span>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getStatusBadge(prog.status)}`}>
                    {prog.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {prog.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {prog.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Kesiapan & Tahapan Proker</span>
                    <span className="font-bold text-blue-900">{prog.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-700 to-sky-500 rounded-full transition-all duration-500"
                      style={{ width: `${prog.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Penanggung Jawab</span>
                    <span className="font-semibold text-slate-800">{prog.leadPerson}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimasi Anggaran</span>
                    <span className="font-semibold text-blue-950">{prog.budgetEstimate}</span>
                  </div>
                </div>

                {/* Target Goals */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Capaian Utama yang Ditargetkan:
                  </span>
                  {prog.goals.map((g, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Area: Volunteers Counter & Join Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>
                    Relawan: <strong className="text-blue-950 font-bold">{prog.volunteersRegistered}</strong> / {prog.volunteersNeeded} orang
                  </span>
                </div>

                <button
                  onClick={() => setVolunteerModalProg(prog)}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Daftar Relawan Proker Ini</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Relawan Proker */}
        {volunteerModalProg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 to-blue-900 text-white flex items-center justify-between shrink-0">
                <div className="min-w-0 pr-2">
                  <h3 className="text-base font-bold truncate">Daftar Jadi Relawan Proker</h3>
                  <p className="text-xs text-blue-200 truncate">{volunteerModalProg.title}</p>
                </div>
                <button
                  onClick={() => setVolunteerModalProg(null)}
                  className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition shrink-0"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {volSuccess ? (
                <div className="p-6 sm:p-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Pendaftaran Relawan Berhasil!</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Terima kasih telah bersedia berkontribusi. Koordinator {volunteerModalProg.leadPerson} akan segera menghubungi Anda menjelang pelaksanaan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Farhan Alamsyah"
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <span className="font-bold block">Jadwal Target Eksekusi:</span>
                    <span>{volunteerModalProg.targetDate}</span>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setVolunteerModalProg(null)}
                      className="flex-1 py-3 min-h-[44px] rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 min-h-[44px] rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md active:scale-95 transition"
                    >
                      Konfirmasi Relawan
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
