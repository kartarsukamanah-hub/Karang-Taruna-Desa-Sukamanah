import React from 'react';
import { 
  Smartphone, 
  Download, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Apple, 
  Zap, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  appName
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 via-blue-900 to-[#071326] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-500 border border-amber-400 p-1 flex items-center justify-center shadow-lg">
              <img src="/icon.svg" alt="App Icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                Bisa di Android & iPhone
              </span>
              <h3 className="text-base font-extrabold text-white">Pasang Aplikasi ke HP Anda</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Keuntungan Memasang Aplikasi */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2">
            <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Keunggulan Dipasang di Layar Utama HP:</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-blue-900 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Buka instan seperti APK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Layar penuh tanpa bar browser</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Hemat kuota & cepat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tanpa perlu download Play Store</span>
              </div>
            </div>
          </div>

          {/* Android Native One-Click Install */}
          {isInstallable && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Perangkat Android Terdeteksi</span>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Aplikasi Sekarang (1-Klik)</span>
              </button>
            </div>
          )}

          {/* iPhone / iOS Guide */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-200">
              <Apple className="w-4 h-4 text-slate-800" />
              <span>Cara Pasang di iPhone / iPad (iOS Safari):</span>
            </div>

            <ol className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  Buka website ini menggunakan browser <strong>Safari</strong> di iPhone Anda.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  Tap tombol <strong>Bagikan / Share</strong> di bilah bawah (ikon kotak dengan panah ke atas: <Share2 className="w-3.5 h-3.5 inline text-blue-600" />).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  Gulir ke bawah dan pilih <strong>"Tambah ke Layar Utama"</strong> (<em>Add to Home Screen</em> <PlusSquare className="w-3.5 h-3.5 inline text-blue-600" />).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div>
                  Tap <strong>Tambah (Add)</strong> di pojok kanan atas. Ikon aplikasi Karang Taruna akan langsung muncul di layar utama iPhone!
                </div>
              </li>
            </ol>
          </div>

          {/* Android Chrome Manual Guide (if native prompt isn't supported) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Cara Pasang di HP Android (Google Chrome):</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tap menu <strong>titik tiga (⋮)</strong> di pojok kanan atas browser Chrome Anda ➔ Pilih <strong>"Pasang aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
          >
            Tutup
          </button>

        </div>

      </div>
    </div>
  );
};
