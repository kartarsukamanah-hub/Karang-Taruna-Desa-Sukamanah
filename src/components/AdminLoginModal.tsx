import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  X, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { verifyAdminPassword } from '../utils/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (passToVerify?: string) => {
    const finalPass = passToVerify !== undefined ? passToVerify : password;
    if (!finalPass.trim()) {
      setErrorMsg('Silakan masukkan kata sandi pengurus.');
      return;
    }

    if (verifyAdminPassword(finalPass)) {
      setSuccess(true);
      setErrorMsg('');
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
        onLoginSuccess();
        onClose();
      }, 1000);
    } else {
      setErrorMsg('Kata sandi salah. Gunakan sandi default "kartar2026" atau "admin123".');
    }
  };

  const handleQuickLogin = () => {
    setPassword('kartar2026');
    handleLogin('kartar2026');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full max-h-[94dvh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 pr-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center shadow-lg font-black shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-amber-300 font-bold text-[10px] uppercase tracking-wider block">
                Hak Akses Khusus
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white">Login Admin Karang Taruna</h3>
              <p className="text-xs text-blue-200 mt-0.5">Khusus pengurus resmi untuk mengedit data & logo</p>
            </div>
          </div>
        </div>

        {/* Body */}
        {success ? (
          <div className="p-6 sm:p-8 text-center space-y-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">Login Berhasil!</h4>
            <p className="text-xs text-slate-600">
              Selamat datang, Pengurus Karang Taruna. Mode edit dan pengelolaan organisasi telah diaktifkan.
            </p>
          </div>
        ) : (
          <form 
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className="p-4 sm:p-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                <span>Kata Sandi Pengurus</span>
                <span className="text-[11px] text-blue-900 font-normal lowercase">default: kartar2026</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Demo Access Button */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] font-medium">Akses Cepat Pengurus:</span>
              </div>
              <button
                type="button"
                onClick={handleQuickLogin}
                className="px-3 py-1.5 min-h-[36px] rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-blue-950 font-bold text-[11px] transition shadow-sm text-center"
              >
                Masuk Cepat (kartar2026)
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              * Warga biasa tidak perlu login untuk melihat berita, kegiatan, membeli produk, maupun memasang produk & menyampaikan aspirasi.
            </p>

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
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Masuk Admin</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
