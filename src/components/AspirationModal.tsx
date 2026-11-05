import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  MessageSquareHeart, 
  EyeOff, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Aspiration, AspirationCategory } from '../types';
import { saveStoredAspirations, getStoredAspirations } from '../utils/storage';

interface AspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdded: (newAsp: Aspiration) => void;
}

export const AspirationModal: React.FC<AspirationModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdded
}) => {
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [rtRw, setRtRw] = useState('RT 01 / RW 01');
  const [category, setCategory] = useState<AspirationCategory>('Fasilitas & Lingkungan');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAspiration: Aspiration = {
      id: `asp-${Date.now()}`,
      senderName: isAnonymous ? 'Warga' : (senderName.trim() || 'Warga Sukamanah'),
      isAnonymous,
      rtRw,
      category,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      status: 'Diterima Pengurus',
      adminResponse: 'Aspirasi telah masuk ke sistem pengurus Karang Taruna dan diteruskan kepada seksi terkait untuk diverifikasi.',
      responseDate: 'Hari Ini',
      upvotes: 1
    };

    const currentList = getStoredAspirations();
    const updated = [newAspiration, ...currentList];
    saveStoredAspirations(updated);
    onSuccessAdded(newAspiration);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setTitle('');
      setContent('');
      setSenderName('');
      setIsAnonymous(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[94dvh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="p-2 rounded-xl bg-blue-800/80 border border-blue-600 text-sky-300 shrink-0">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold truncate">Kirim Aspirasi & Usulan Warga</h3>
              <p className="text-xs text-blue-200 truncate">Karang Taruna Sukamanah Responsif & Terbuka</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-6 sm:p-8 text-center space-y-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">Aspirasi Berhasil Diterima!</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Terima kasih telah peduli pada lingkungan desa kita. Aspirasi Anda telah masuk ke daftar publik dan siap ditindaklanjuti.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
            {/* Anonymous Toggle Notice */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Kirim Secara Anonim (Rahasiakan Nama)</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded text-blue-900 focus:ring-blue-900 cursor-pointer"
              />
            </div>

            {!isAnonymous && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Sugeng / Bu Rahayu"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kategori Masukan *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AspirationCategory)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                >
                  <option value="Fasilitas & Lingkungan">Fasilitas & Lingkungan</option>
                  <option value="Kegiatan Kepemudaan">Kegiatan Kepemudaan</option>
                  <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                  <option value="Bantuan Sosial">Bantuan Sosial</option>
                  <option value="Usulan & Ide Baru">Usulan & Ide Baru</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Lokasi RT / RW Anda *
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
                Judul Aspirasi / Pokok Masalah *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Perbaikan Saluran Air Gang Melati yang Tersumbat"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Uraian Lengkap / Saran Solusi *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan detail keluhan, waktu kejadian, atau ide solusi yang Anda harapkan dari pemuda Karang Taruna..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aspirasi warga dimoderasi secara adil dan terbuka untuk kebaikan bersama.</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 min-h-[44px] rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-sky-300" />
                <span>Kirimkan Aspirasi</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
