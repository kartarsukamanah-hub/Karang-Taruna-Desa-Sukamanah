import React, { useState, useRef } from 'react';
import { 
  X, 
  Settings, 
  Image as ImageIcon, 
  Users, 
  Calendar, 
  Briefcase, 
  MessageSquareHeart, 
  ShoppingBag, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { 
  OrganizationProfile, 
  OfficialMember, 
  Activity, 
  WorkProgram, 
  Aspiration, 
  CitizenProduct,
  VolunteerApplication
} from '../types';
import { 
  saveStoredProfile, 
  saveStoredOfficials, 
  saveStoredActivities, 
  saveStoredWorkPrograms, 
  saveStoredAspirations, 
  saveStoredProducts,
  getStoredVolunteers,
  changeAdminPassword
} from '../utils/storage';

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OrganizationProfile;
  setProfile: React.Dispatch<React.SetStateAction<OrganizationProfile>>;
  officials: OfficialMember[];
  setOfficials: React.Dispatch<React.SetStateAction<OfficialMember[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  programs: WorkProgram[];
  setPrograms: React.Dispatch<React.SetStateAction<WorkProgram[]>>;
  aspirations: Aspiration[];
  setAspirations: React.Dispatch<React.SetStateAction<Aspiration[]>>;
  products: CitizenProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CitizenProduct[]>>;
  initialTab?: 'profil' | 'pengurus' | 'kegiatan' | 'proker' | 'aspirasi' | 'lapak' | 'sandi';
}

export const AdminManagementModal: React.FC<AdminManagementModalProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  officials,
  setOfficials,
  activities,
  setActivities,
  programs,
  setPrograms,
  aspirations,
  setAspirations,
  products,
  setProducts,
  initialTab = 'profil'
}) => {
  const [activeTab, setActiveTab] = useState<'profil' | 'pengurus' | 'kegiatan' | 'proker' | 'aspirasi' | 'lapak' | 'sandi'>(initialTab);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Profile Form State
  const [editProfile, setEditProfile] = useState<OrganizationProfile>({ ...profile });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // New Official State
  const [showAddOfficial, setShowAddOfficial] = useState(false);
  const [newOffName, setNewOffName] = useState('');
  const [newOffPos, setNewOffPos] = useState('');
  const [newOffSec, setNewOffSec] = useState<any>('Pimpinan Inti');
  const [newOffAvatar, setNewOffAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [newOffBio, setNewOffBio] = useState('');
  const [newOffQuote, setNewOffQuote] = useState('');
  const [newOffPhone, setNewOffPhone] = useState('');
  const [newOffRt, setNewOffRt] = useState('RT 01 / RW 01');

  // New Activity State
  const [showAddAct, setShowAddAct] = useState(false);
  const [actTitle, setActTitle] = useState('');
  const [actCat, setActCat] = useState<any>('Sosial & Kemanusiaan');
  const [actDate, setActDate] = useState('');
  const [actLoc, setActLoc] = useState('');
  const [actImg, setActImg] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
  const [actDesc, setActDesc] = useState('');
  const [actReport, setActReport] = useState('');
  const [actCoord, setActCoord] = useState('');

  // Password change state
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  // Registered Volunteers List
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => getStoredVolunteers());

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // 1. Handle Profile & Logo Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editProfile);
    saveStoredProfile(editProfile);
    triggerToast('Logo & Profil Organisasi berhasil diperbarui!');
  };

  // Handle Logo File Upload (reads file into Data URL)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditProfile(prev => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Handle Official Add & Delete
  const handleAddOfficial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffName.trim() || !newOffPos.trim()) return;

    const newObj: OfficialMember = {
      id: `off-${Date.now()}`,
      name: newOffName.trim(),
      position: newOffPos.trim(),
      section: newOffSec,
      avatar: newOffAvatar.trim(),
      bio: newOffBio.trim() || 'Pengurus aktif pemuda Karang Taruna.',
      quote: newOffQuote.trim(),
      phone: newOffPhone.trim(),
      termPeriod: '2024 - 2027',
      rtRw: newOffRt
    };

    const updated = [...officials, newObj];
    setOfficials(updated);
    saveStoredOfficials(updated);
    setShowAddOfficial(false);
    setNewOffName('');
    setNewOffPos('');
    setNewOffBio('');
    setNewOffQuote('');
    setNewOffPhone('');
    triggerToast('Pengurus baru berhasil ditambahkan!');
  };

  const handleDeleteOfficial = (id: string) => {
    if (window.confirm('Hapus pengurus ini dari daftar resmi?')) {
      const updated = officials.filter(o => o.id !== id);
      setOfficials(updated);
      saveStoredOfficials(updated);
      triggerToast('Pengurus berhasil dihapus.');
    }
  };

  // 3. Handle Activity Add & Delete
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle.trim()) return;

    const newObj: Activity = {
      id: `act-${Date.now()}`,
      title: actTitle.trim(),
      category: actCat,
      date: actDate.trim() || 'Bulan Ini',
      location: actLoc.trim() || 'Desa Sukamanah',
      image: actImg.trim(),
      description: actDesc.trim(),
      fullReport: actReport.trim() || actDesc.trim(),
      participantsCount: 50,
      coordinator: actCoord.trim() || 'Pengurus Karang Taruna',
      status: 'Selesai',
      likesCount: 10
    };

    const updated = [newObj, ...activities];
    setActivities(updated);
    saveStoredActivities(updated);
    setShowAddAct(false);
    setActTitle('');
    setActLoc('');
    setActDesc('');
    setActReport('');
    triggerToast('Kegiatan baru berhasil diterbitkan!');
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('Hapus dokumentasi kegiatan ini?')) {
      const updated = activities.filter(a => a.id !== id);
      setActivities(updated);
      saveStoredActivities(updated);
      triggerToast('Kegiatan berhasil dihapus.');
    }
  };

  // 4. Handle Work Programs Update
  const handleUpdateProkerProgress = (id: string, newPercent: number) => {
    const updated = programs.map(p => {
      if (p.id === id) {
        return {
          ...p,
          progressPercent: newPercent,
          status: newPercent === 100 ? ('Selesai' as const) : newPercent >= 70 ? ('Siap Eksekusi' as const) : ('Persiapan' as const)
        };
      }
      return p;
    });
    setPrograms(updated);
    saveStoredWorkPrograms(updated);
    triggerToast('Progress program kerja berhasil diupdate!');
  };

  const handleDeleteProker = (id: string) => {
    if (window.confirm('Hapus program kerja ini?')) {
      const updated = programs.filter(p => p.id !== id);
      setPrograms(updated);
      saveStoredWorkPrograms(updated);
      triggerToast('Program kerja dihapus.');
    }
  };

  // 5. Handle Aspirations Response & Status Update
  const handleUpdateAspiration = (id: string, newStatus: any, responseText: string) => {
    const updated = aspirations.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatus,
          adminResponse: responseText.trim(),
          responseDate: 'Baru Saja'
        };
      }
      return a;
    });
    setAspirations(updated);
    saveStoredAspirations(updated);
    triggerToast('Tanggapan dan status aspirasi berhasil diperbarui!');
  };

  const handleDeleteAspiration = (id: string) => {
    if (window.confirm('Hapus aspirasi ini dari papan publik?')) {
      const updated = aspirations.filter(a => a.id !== id);
      setAspirations(updated);
      saveStoredAspirations(updated);
      triggerToast('Aspirasi telah dihapus.');
    }
  };

  // 6. Handle Marketplace Moderation
  const handleToggleProductFeatured = (id: string) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    });
    setProducts(updated);
    saveStoredProducts(updated);
    triggerToast('Status produk unggulan berhasil diubah.');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Hapus produk warga ini dari lapak?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      triggerToast('Produk telah dihapus dari lapak.');
    }
  };

  // 7. Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 5) {
      setPassError('Kata sandi minimal 5 karakter.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    changeAdminPassword(newPass);
    setNewPass('');
    setConfirmPass('');
    setPassError('');
    triggerToast('Kata sandi admin berhasil diganti!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-5xl w-full h-[94dvh] sm:h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Top Header */}
        <div className="p-3.5 sm:p-5 bg-gradient-to-r from-blue-950 via-blue-900 to-[#071326] text-white flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400 text-blue-950 font-black shadow-md flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-black text-white truncate">
                  Panel Admin Karang Taruna
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0">
                  Akses Penuh
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-blue-200 truncate hidden xs:block">
                Kelola logo, pengurus, kegiatan, proker, dan aspirasi warga
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition shrink-0 ml-2"
            aria-label="Tutup Panel Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {saveToast && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in slide-in-from-top-2 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Tab Navigation Navigation Bar - Swipeable on mobile */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto shrink-0 scrollbar-none text-xs font-bold touch-pan-x">
          <button
            onClick={() => setActiveTab('profil')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'profil'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-sky-400" />
            <span>1. Logo & Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('pengurus')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'pengurus'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>2. Pengurus ({officials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('kegiatan')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'kegiatan'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>3. Kegiatan ({activities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('proker')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'proker'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>4. Proker ({programs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('aspirasi')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'aspirasi'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <MessageSquareHeart className="w-4 h-4 text-rose-400" />
            <span>5. Aspirasi ({aspirations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lapak')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'lapak'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>6. Produk ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sandi')}
            className={`px-3 py-2 min-h-[38px] rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'sandi'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 bg-white sm:bg-transparent'
            }`}
          >
            <KeyRound className="w-4 h-4 text-slate-400" />
            <span>7. Sandi</span>
          </button>
        </div>

        {/* Tab Body Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-slate-50 overscroll-contain">
          
          {/* ======================================================== */}
          {/* TAB 1: LOGO & PROFIL ORGANISASI                         */}
          {/* ======================================================== */}
          {activeTab === 'profil' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-4xl mx-auto">
              
              {/* LOGO MANAGEMENT BOX (Main Request: "logonya bisa di ubah dan semuanya") */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <ImageIcon className="w-5 h-5 text-blue-900" />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Ubah Logo Karang Taruna</h3>
                    <p className="text-xs text-slate-500">Logo ini akan tampil di seluruh navigasi atas, hero banner, dan footer aplikasi</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Logo Preview */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Preview Logo Saat Ini</span>
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 border-2 border-amber-400 shadow-md flex items-center justify-center p-2 overflow-hidden">
                      {editProfile.logoUrl ? (
                        <img 
                          src={editProfile.logoUrl} 
                          alt="Logo Karang Taruna" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"/>
                          <path d="M12 17v5"/>
                        </svg>
                      )}
                    </div>
                    {editProfile.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setEditProfile(prev => ({ ...prev, logoUrl: undefined }))}
                        className="text-[11px] text-rose-600 hover:underline font-semibold"
                      >
                        Reset ke Logo Standar
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        1. Unggah Gambar Logo dari Perangkat (HP / Laptop):
                      </label>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden" 
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                      >
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>Pilih File Gambar Logo</span>
                      </button>
                      <p className="text-[11px] text-slate-500 mt-1">Format PNG, JPG, atau WebP (disarankan latar transparan / bulat)</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        2. Atau Tempel Tautan / URL Gambar Logo:
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/logo-karang-taruna.png"
                        value={editProfile.logoUrl || ''}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, logoUrl: e.target.value }))}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GENERAL PROFILE SETTINGS */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Identitas Dasar Organisasi
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Organisasi *</label>
                    <input
                      type="text"
                      required
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Semboyan / Motto *</label>
                    <input
                      type="text"
                      required
                      value={editProfile.motto}
                      onChange={(e) => setEditProfile({ ...editProfile, motto: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline Slogan *</label>
                  <input
                    type="text"
                    required
                    value={editProfile.tagline}
                    onChange={(e) => setEditProfile({ ...editProfile, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Desa</label>
                    <input
                      type="text"
                      value={editProfile.villageName}
                      onChange={(e) => setEditProfile({ ...editProfile, villageName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kecamatan</label>
                    <input
                      type="text"
                      value={editProfile.districtName}
                      onChange={(e) => setEditProfile({ ...editProfile, districtName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Provinsi</label>
                    <input
                      type="text"
                      value={editProfile.provinceName}
                      onChange={(e) => setEditProfile({ ...editProfile, provinceName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Sekretariat</label>
                  <input
                    type="text"
                    value={editProfile.address}
                    onChange={(e) => setEditProfile({ ...editProfile, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Resmi</label>
                    <input
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">No. Kontak / Hotline</label>
                    <input
                      type="text"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Visi Karang Taruna</label>
                  <textarea
                    rows={2}
                    value={editProfile.vision}
                    onChange={(e) => setEditProfile({ ...editProfile, vision: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sejarah Singkat Organisasi</label>
                  <textarea
                    rows={3}
                    value={editProfile.history}
                    onChange={(e) => setEditProfile({ ...editProfile, history: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Simpan Perubahan Logo & Profil</span>
                </button>
              </div>

            </form>
          )}

          {/* ======================================================== */}
          {/* TAB 2: KELOLA PENGURUS & DAFTAR RELAWAN                 */}
          {/* ======================================================== */}
          {activeTab === 'pengurus' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Kelola Struktur Kepengurusan</h3>
                  <p className="text-xs text-slate-500">Tambah, sunting, atau hapus susunan pimpinan & seksi pemuda</p>
                </div>
                <button
                  onClick={() => setShowAddOfficial(!showAddOfficial)}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{showAddOfficial ? 'Tutup Formulir' : '+ Tambah Pengurus Baru'}</span>
                </button>
              </div>

              {/* Form Tambah Pengurus Baru */}
              {showAddOfficial && (
                <form onSubmit={handleAddOfficial} className="p-5 rounded-2xl bg-white border border-blue-200 shadow-md space-y-4">
                  <h4 className="font-bold text-sm text-blue-900">Formulir Pengurus Baru</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap & Gelar *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Rian Anggara, S.Kom."
                        value={newOffName}
                        onChange={(e) => setNewOffName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jabatan Resmi *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Wakil Sekretaris"
                        value={newOffPos}
                        onChange={(e) => setNewOffPos(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Divisi / Seksi</label>
                      <select
                        value={newOffSec}
                        onChange={(e) => setNewOffSec(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none bg-white"
                      >
                        <option value="Pimpinan Inti">Pimpinan Inti</option>
                        <option value="Sosial & Lingkungan">Sosial & Lingkungan</option>
                        <option value="Olahraga & Seni">Olahraga & Seni</option>
                        <option value="Ekonomi Kreatif & UMKM">Ekonomi Kreatif & UMKM</option>
                        <option value="Pendidikan & Humas">Pendidikan & Humas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Asal RT / RW</label>
                      <input
                        type="text"
                        placeholder="RT 02 / RW 01"
                        value={newOffRt}
                        onChange={(e) => setNewOffRt(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">No. WhatsApp</label>
                      <input
                        type="text"
                        placeholder="08123456789"
                        value={newOffPhone}
                        onChange={(e) => setNewOffPhone(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL Foto Profil</label>
                    <input
                      type="url"
                      value={newOffAvatar}
                      onChange={(e) => setNewOffAvatar(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tugas & Bio</label>
                    <input
                      type="text"
                      placeholder="Fokus bidang pembinaan..."
                      value={newOffBio}
                      onChange={(e) => setNewOffBio(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddOfficial(false)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-600"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs rounded-lg bg-blue-900 text-white font-bold"
                    >
                      Tambahkan Pengurus
                    </button>
                  </div>
                </form>
              )}

              {/* List Pengurus Saat Ini */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {officials.map((off) => (
                  <div key={off.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={off.avatar} alt={off.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{off.name}</h4>
                        <p className="text-xs text-blue-900 font-semibold">{off.position}</p>
                        <span className="text-[10px] text-slate-500">{off.section} • {off.rtRw}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteOfficial(off.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                      title="Hapus Pengurus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Data Pendaftar Relawan Masuk dari Warga */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">
                  Daftar Pendaftar Relawan Pemuda Masuk ({volunteers.length})
                </h4>
                {volunteers.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada warga yang mendaftar via formulir relawan.</p>
                ) : (
                  <div className="space-y-2">
                    {volunteers.map((v) => (
                      <div key={v.id} className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <strong className="text-slate-900">{v.fullName}</strong> ({v.rtRw})
                          <p className="text-blue-900 font-semibold">Minat: {v.interestDivision}</p>
                          <p className="text-slate-500 text-[11px]">Keahlian: {v.skills || '-'}</p>
                        </div>
                        <a
                          href={`https://wa.me/${v.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                        >
                          Hubungi WA ({v.phone})
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: KELOLA KEGIATAN & BERITA                          */}
          {/* ======================================================== */}
          {activeTab === 'kegiatan' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Kelola Dokumentasi & Kegiatan</h3>
                  <p className="text-xs text-slate-500">Terbitkan berita kegiatan baru atau perbarui dokumentasi</p>
                </div>
                <button
                  onClick={() => setShowAddAct(!showAddAct)}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{showAddAct ? 'Tutup' : '+ Buat Berita Kegiatan Baru'}</span>
                </button>
              </div>

              {showAddAct && (
                <form onSubmit={handleAddActivity} className="p-5 rounded-2xl bg-white border border-blue-200 shadow-md space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Kegiatan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Kerja Bakti Akbar Pembersihan Irigasi"
                      value={actTitle}
                      onChange={(e) => setActTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                      <select
                        value={actCat}
                        onChange={(e) => setActCat(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none bg-white"
                      >
                        <option value="Sosial & Kemanusiaan">Sosial & Kemanusiaan</option>
                        <option value="Olahraga & Seni">Olahraga & Seni</option>
                        <option value="Pelatihan & UMKM">Pelatihan & UMKM</option>
                        <option value="Lingkungan Hidup">Lingkungan Hidup</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal</label>
                      <input
                        type="text"
                        placeholder="Contoh: 14 November 2026"
                        value={actDate}
                        onChange={(e) => setActDate(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lokasi</label>
                      <input
                        type="text"
                        placeholder="Contoh: Lapangan Serbaguna"
                        value={actLoc}
                        onChange={(e) => setActLoc(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tautan Foto Utama</label>
                    <input
                      type="url"
                      value={actImg}
                      onChange={(e) => setActImg(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ringkasan Kegiatan</label>
                    <textarea
                      rows={2}
                      value={actDesc}
                      onChange={(e) => setActDesc(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAct(false)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-600"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs rounded-lg bg-blue-900 text-white font-bold"
                    >
                      Terbitkan Kegiatan
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.id} className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={act.image} alt={act.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">{act.category}</span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{act.title}</h4>
                        <p className="text-xs text-slate-500">{act.date} • {act.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteActivity(act.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus Berita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: KELOLA PROGRAM KERJA (PROKER)                     */}
          {/* ======================================================== */}
          {activeTab === 'proker' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Roadmap & Progress Program Kerja</h3>
                <p className="text-xs text-slate-500">Ubah tahapan kesiapan proker dan update kemajuan secara berkala</p>
              </div>

              <div className="space-y-3">
                {programs.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-900">{p.targetQuarter}</span>
                        <h4 className="font-bold text-base text-slate-900">{p.title}</h4>
                        <p className="text-xs text-slate-500">PIC: {p.leadPerson} • Anggaran: {p.budgetEstimate}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-950 border border-blue-200">
                        {p.status} ({p.progressPercent}%)
                      </span>
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Atur Kemajuan Progress:</span>
                        <span className="font-bold">{p.progressPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={p.progressPercent}
                        onChange={(e) => handleUpdateProkerProgress(p.id, Number(e.target.value))}
                        className="w-full accent-blue-900 cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleDeleteProker(p.id)}
                        className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Program Kerja</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: TANGGAPAN ASPIRASI WARGA                          */}
          {/* ======================================================== */}
          {activeTab === 'aspirasi' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Tindak Lanjut & Tanggapan Aspirasi Warga</h3>
                <p className="text-xs text-slate-500">Berikan respon resmi pengurus dan perbarui status penanganan agar warga mengetahui perkembangan</p>
              </div>

              <div className="space-y-4">
                {aspirations.map((asp) => (
                  <div key={asp.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">{asp.category}</span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{asp.title}</h4>
                        <p className="text-xs text-slate-500">Oleh: {asp.senderName} ({asp.rtRw}) • {asp.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAspiration(asp.id)}
                        className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg"
                        title="Hapus Aspirasi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "{asp.content}"
                    </p>

                    {/* Respon Box */}
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-blue-950 uppercase">Tanggapan Resmi Karang Taruna:</label>
                        <select
                          value={asp.status}
                          onChange={(e) => handleUpdateAspiration(asp.id, e.target.value, asp.adminResponse || '')}
                          className="text-xs font-bold px-2 py-1 rounded border border-blue-300 bg-white"
                        >
                          <option value="Menunggu Verifikasi">Status: Menunggu Verifikasi</option>
                          <option value="Diterima Pengurus">Status: Diterima Pengurus</option>
                          <option value="Dalam Tindak Lanjut">Status: Dalam Tindak Lanjut</option>
                          <option value="Selesai / Terlaksana">Status: Selesai / Terlaksana</option>
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        defaultValue={asp.adminResponse || ''}
                        placeholder="Tuliskan respon dan tindakan yang diambil oleh pengurus desa..."
                        onBlur={(e) => handleUpdateAspiration(asp.id, asp.status, e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-blue-200 bg-white outline-none focus:ring-1 focus:ring-blue-900"
                      ></textarea>
                      <p className="text-[10px] text-blue-800 italic">* Ketik tanggapan lalu klik di luar kotak untuk menyimpan otomatis.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: MODERASI LAPAK PRODUK WARGA                       */}
          {/* ======================================================== */}
          {activeTab === 'lapak' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Moderasi Lapak UMKM Warga</h3>
                <p className="text-xs text-slate-500">Tandai produk unggulan desa atau hapus produk yang tidak sesuai</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h4>
                        <p className="text-xs font-mono font-bold text-blue-950">Rp {p.price.toLocaleString('id-ID')}</p>
                        <p className="text-[10px] text-slate-500">Penjual: {p.sellerName} ({p.rtRw})</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleProductFeatured(p.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold ${
                          p.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                        }`}
                        title="Tandai Unggulan"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: SANDI ADMIN                                       */}
          {/* ======================================================== */}
          {activeTab === 'sandi' && (
            <div className="max-w-md mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Ganti Kata Sandi Admin</h3>
                <p className="text-xs text-slate-500">Gunakan kata sandi kuat untuk menjaga keamanan data Karang Taruna</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kata Sandi Baru</label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ulangi Kata Sandi Baru</label>
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                {passError && (
                  <p className="text-xs text-rose-600 font-bold">{passError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs shadow hover:bg-blue-800"
                >
                  Simpan Kata Sandi Baru
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
