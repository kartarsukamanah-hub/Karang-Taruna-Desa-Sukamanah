import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  EyeOff, 
  Filter, 
  Vote, 
  Sparkles,
  MapPin,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Aspiration, AspirationCategory, AspirationStatus, PollQuestion } from '../types';
import { 
  saveStoredAspirations, 
  saveStoredPoll, 
  getUserVotedPollId, 
  setUserVotedPollId, 
  toggleUserUpvoteAspiration, 
  getUserUpvotedAspirations 
} from '../utils/storage';

interface AspirationsSectionProps {
  aspirations: Aspiration[];
  poll: PollQuestion;
  onOpenModal: () => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const AspirationsSection: React.FC<AspirationsSectionProps> = ({ 
  aspirations: initialAspirations,
  poll: initialPoll,
  onOpenModal,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [aspirations, setAspirations] = useState<Aspiration[]>(initialAspirations);
  const [poll, setPoll] = useState<PollQuestion>(initialPoll);
  const [userVotedOption, setUserVotedOption] = useState<string | null>(getUserVotedPollId());
  const [upvotedIds, setUpvotedIds] = useState<string[]>(getUserUpvotedAspirations());
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Fasilitas & Lingkungan',
    'Kegiatan Kepemudaan',
    'Keamanan & Ketertiban',
    'Usulan & Ide Baru'
  ];

  const statuses = [
    'Semua',
    'Dalam Tindak Lanjut',
    'Selesai / Terlaksana',
    'Diterima Pengurus'
  ];

  const handleVotePoll = (optionId: string) => {
    if (userVotedOption) return; // already voted

    const updatedOptions = poll.options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });

    const updatedPoll = {
      ...poll,
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1
    };

    setPoll(updatedPoll);
    saveStoredPoll(updatedPoll);
    setUserVotedOption(optionId);
    setUserVotedPollId(optionId);
  };

  const handleToggleUpvote = (id: string) => {
    const { upvoted, allUpvoted } = toggleUserUpvoteAspiration(id);
    setUpvotedIds(allUpvoted);

    const updated = aspirations.map(asp => {
      if (asp.id === id) {
        return {
          ...asp,
          upvotes: upvoted ? asp.upvotes + 1 : Math.max(0, asp.upvotes - 1)
        };
      }
      return asp;
    });

    setAspirations(updated);
    saveStoredAspirations(updated);
  };

  const filtered = aspirations.filter(asp => {
    const matchCat = selectedCategory === 'Semua' || asp.category === selectedCategory;
    const matchStatus = selectedStatus === 'Semua' || asp.status === selectedStatus;
    return matchCat && matchStatus;
  });

  const getStatusBadge = (status: AspirationStatus) => {
    switch (status) {
      case 'Selesai / Terlaksana':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Dalam Tindak Lanjut':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Diterima Pengurus':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquareHeart className="w-3.5 h-3.5 text-blue-700" />
              <span>Transparansi & Partisipasi Publik</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kotak Suara & Aspirasi Warga
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Salurkan kritik konstruktif, keluhan fasilitas lingkungan, maupun ide kegiatan pemuda. Setiap suara warga ditindaklanjuti secara transparan oleh pengurus Karang Taruna Sukamanah.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={() => onOpenAdminPanel('aspirasi')}
                className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <span>⚙️ Tindak Lanjut & Beri Tanggapan (Admin)</span>
              </button>
            )}

            <button
              onClick={onOpenModal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-lg shadow-blue-950/20 transition flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 text-sky-300" />
              <span>+ Sampaikan Aspirasi Baru</span>
            </button>
          </div>
        </div>

        {/* Polling Warga Box */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-[#071326] text-white border border-blue-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-blue-800/80">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Vote className="w-4 h-4 text-amber-400" />
              <span>Jajak Pendapat & Polling Pemuda Aktif</span>
            </div>
            <div className="text-xs text-blue-200">
              Total <strong>{poll.totalVotes}</strong> warga telah berpartisipasi
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-4">
            "{poll.question}"
          </h3>

          <div className="space-y-3">
            {poll.options.map((opt) => {
              const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
              const isSelected = userVotedOption === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => !userVotedOption && handleVotePoll(opt.id)}
                  className={`relative p-3.5 rounded-xl border transition cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-blue-800/90 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : userVotedOption
                      ? 'bg-blue-950/40 border-blue-800/60'
                      : 'bg-blue-900/40 border-blue-700/60 hover:bg-blue-800/60'
                  }`}
                >
                  {/* Fill percentage background */}
                  {userVotedOption && (
                    <div
                      className={`absolute top-0 bottom-0 left-0 ${
                        isSelected ? 'bg-sky-500/30' : 'bg-blue-600/20'
                      } transition-all duration-700`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="font-semibold text-white flex items-center gap-2">
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                      <span>{opt.label}</span>
                    </span>

                    {userVotedOption ? (
                      <span className="font-mono font-bold text-sky-300 shrink-0">
                        {percentage}% ({opt.votes} suara)
                      </span>
                    ) : (
                      <span className="text-xs text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 shrink-0">
                        Klik untuk Pilih
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {userVotedOption && (
            <p className="text-xs text-blue-300 mt-3 text-center italic">
              Terima kasih telah memberikan suara! Masukan Anda menjadi acuan prioritas program kerja pemuda.
            </p>
          )}
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-1">Kategori:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === c
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Aspirations List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
              <MessageSquareHeart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Belum ada aspirasi pada filter ini</h3>
              <p className="text-xs text-slate-500 mt-1">Jadilah yang pertama menyampaikan usulan untuk lingkungan sekitar.</p>
              <button
                onClick={onOpenModal}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold shadow"
              >
                Kirim Aspirasi Sekarang
              </button>
            </div>
          ) : (
            filtered.map((asp) => {
              const isUpvoted = upvotedIds.includes(asp.id);

              return (
                <div
                  key={asp.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-300 transition-all space-y-4"
                >
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                        {asp.category}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">{asp.date}</span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getStatusBadge(asp.status)}`}>
                      {asp.status}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {asp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      {asp.isAnonymous ? (
                        <span className="flex items-center gap-1 text-slate-600 font-semibold italic">
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          <span>Warga (Identitas Dirahasiakan)</span>
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-800">
                          Dari: {asp.senderName}
                        </span>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{asp.rtRw}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    "{asp.content}"
                  </p>

                  {/* Official Response from Karang Taruna */}
                  {asp.adminResponse && (
                    <div className="p-4 rounded-xl bg-blue-50/90 border border-blue-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-blue-900 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-blue-700" />
                          <span>Tanggapan Resmi Pengurus Karang Taruna:</span>
                        </span>
                        {asp.responseDate && (
                          <span className="text-[11px] text-blue-700 font-medium">{asp.responseDate}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                        {asp.adminResponse}
                      </p>
                    </div>
                  )}

                  {/* Footer Action: Upvote / Dukungan Warga */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleUpvote(asp.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isUpvoted
                          ? 'bg-blue-900 text-white shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                      <span>{isUpvoted ? 'Didukung oleh Anda' : 'Dukung Aspirasi Ini'} ({asp.upvotes})</span>
                    </button>

                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      Ditinjau oleh Seksi Humas & Pengurus Desa
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
