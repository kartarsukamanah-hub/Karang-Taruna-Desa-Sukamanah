import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'button' | 'banner' | 'pill';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'button'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);

  // If already running as an installed PWA on home screen, do not render
  if (isInstalled) {
    return null;
  }

  // Banner variant for home screen or bottom prompt
  if (variant === 'banner') {
    if (dismissedBanner) return null;
    if (!isInstallable && !isIOS) return null;

    return (
      <>
        <div className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-sky-400/30 shadow-xl flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shrink-0 shadow">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">Pasang Aplikasi Karang Taruna di HP</h4>
              <p className="text-[11px] text-blue-200">Akses cepat seperti APK tanpa perlu buka browser lagi</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isInstallable ? (
              <button
                onClick={install}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pasang</span>
              </button>
            ) : isIOS ? (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-blue-950 text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pasang (iOS)</span>
              </button>
            ) : null}

            <button
              onClick={() => setDismissedBanner(true)}
              className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10"
              title="Tutup banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iOS Guide Modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Pasang di iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <p>
                    Ketuk tombol <strong>Bagikan / Share</strong> <Share className="w-4 h-4 inline text-blue-600 align-text-bottom mx-1" /> di bilah menu Safari bawah.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <p>
                    Gulir ke bawah dan ketuk opsi <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> <PlusSquare className="w-4 h-4 inline text-blue-600 align-text-bottom mx-1" />.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <p>
                    Ketuk <strong>"Tambah"</strong> di pojok kanan atas. Ikon aplikasi akan langsung muncul di beranda iPhone Anda!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow transition"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Pill / Button variant for Navbar or Footer
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition flex items-center gap-1.5 active:scale-95 ${className}`}
        title="Pasang aplikasi ke layar utama HP"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 font-bold text-xs transition flex items-center gap-1.5 ${className}`}
          title="Petunjuk pasang di iOS Safari"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-300" />
          <span>Pasang di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Pasang di iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <p>
                    Ketuk tombol <strong>Bagikan / Share</strong> <Share className="w-4 h-4 inline text-blue-600 align-text-bottom mx-1" /> di bilah menu Safari bawah.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <p>
                    Gulir ke bawah dan ketuk opsi <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> <PlusSquare className="w-4 h-4 inline text-blue-600 align-text-bottom mx-1" />.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <p>
                    Ketuk <strong>"Tambah"</strong> di pojok kanan atas. Ikon aplikasi akan langsung muncul di beranda iPhone Anda!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow transition"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
