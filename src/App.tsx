import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminManagementModal } from './components/AdminManagementModal';
import { BottomMobileNav } from './components/BottomMobileNav';
import { HeroSection } from './components/HeroSection';
import { HomeDashboard } from './components/HomeDashboard';
import { ProfileSection } from './components/ProfileSection';
import { OfficialsSection } from './components/OfficialsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { WorkProgramsSection } from './components/WorkProgramsSection';
import { AspirationsSection } from './components/AspirationsSection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { AspirationModal } from './components/AspirationModal';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';

import { 
  getStoredProfile,
  getStoredProducts, 
  getStoredAspirations, 
  getStoredPoll, 
  getStoredWorkPrograms, 
  getStoredOfficials, 
  getStoredActivities,
  getAdminAuthStatus,
  setAdminAuthStatus
} from './utils/storage';
import { 
  CitizenProduct, 
  Aspiration, 
  OrganizationProfile, 
  OfficialMember, 
  Activity, 
  WorkProgram, 
  PollQuestion 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  
  // Persistent State from LocalStorage
  const [profile, setProfile] = useState<OrganizationProfile>(() => getStoredProfile());
  const [products, setProducts] = useState<CitizenProduct[]>(() => getStoredProducts());
  const [aspirations, setAspirations] = useState<Aspiration[]>(() => getStoredAspirations());
  const [officials, setOfficials] = useState<OfficialMember[]>(() => getStoredOfficials());
  const [activities, setActivities] = useState<Activity[]>(() => getStoredActivities());
  const [programs, setPrograms] = useState<WorkProgram[]>(() => getStoredWorkPrograms());
  const [poll] = useState<PollQuestion>(() => getStoredPoll());

  // Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getAdminAuthStatus());
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);
  const [showAdminManageModal, setShowAdminManageModal] = useState<boolean>(false);
  const [adminManageTab, setAdminManageTab] = useState<'profil' | 'pengurus' | 'kegiatan' | 'proker' | 'aspirasi' | 'lapak' | 'sandi'>('profil');

  // Citizen Modals
  const [showAspirationModal, setShowAspirationModal] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);

  // Sync scroll on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setAdminAuthStatus(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminAuthStatus(false);
  };

  const handleOpenAdminPanel = (tab: 'profil' | 'pengurus' | 'kegiatan' | 'proker' | 'aspirasi' | 'lapak' | 'sandi' = 'profil') => {
    if (!isAdmin) {
      setShowAdminLoginModal(true);
    } else {
      setAdminManageTab(tab);
      setShowAdminManageModal(true);
    }
  };

  const handleAspirationAdded = (newAsp: Aspiration) => {
    setAspirations(prev => [newAsp, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-900 selection:text-white">
      
      {/* Network Offline Notification */}
      <OfflineIndicator />

      {/* 0. Admin Status Strip (Only visible when logged in as Admin) */}
      <AdminBar
        isAdmin={isAdmin}
        onOpenAdminPanel={handleOpenAdminPanel}
        onLogout={handleLogout}
        onOpenLoginModal={() => setShowAdminLoginModal(true)}
      />

      {/* 1. Primary Top Navigation */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProductModal={() => {
          setActiveTab('lapak');
          setShowProductModal(true);
        }}
        onOpenAspirationModal={() => setShowAspirationModal(true)}
        isAdmin={isAdmin}
        onOpenLoginModal={() => setShowAdminLoginModal(true)}
        onOpenAdminPanel={handleOpenAdminPanel}
      />

      {/* 2. Main Hero Section (On Beranda) */}
      {activeTab === 'beranda' && (
        <HeroSection
          profile={profile}
          setActiveTab={setActiveTab}
          onOpenAspirationModal={() => setShowAspirationModal(true)}
          onOpenProductModal={() => {
            setActiveTab('lapak');
            setShowProductModal(true);
          }}
          productsCount={products.length}
          aspirationsCount={aspirations.length}
          officialsCount={officials.length}
          isAdmin={isAdmin}
          onOpenAdminPanel={handleOpenAdminPanel}
        />
      )}

      {/* Secondary Banner for other tabs for context */}
      {activeTab !== 'beranda' && (
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-[#071326] text-white py-6 border-b border-blue-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-sky-300 font-bold text-xs uppercase tracking-wider block">
                Portal {profile.name}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white capitalize mt-0.5">
                {activeTab === 'profil' && 'Profil & Visi Misi Organisasi'}
                {activeTab === 'pengurus' && 'Struktur Anggota & Pengurus'}
                {activeTab === 'kegiatan' && 'Dokumentasi & Berita Kegiatan'}
                {activeTab === 'proker' && 'Roadmap & Program Kerja Kedepan'}
                {activeTab === 'aspirasi' && 'Kotak Aspirasi & Suara Warga'}
                {activeTab === 'lapak' && 'Lapak UMKM Produk Warga (Pasar Warga)'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => handleOpenAdminPanel(activeTab as any)}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-blue-950 text-xs font-bold shadow hover:bg-amber-300 transition"
                >
                  ⚙️ Kelola Halaman Ini
                </button>
              )}
              <button
                onClick={() => setActiveTab('beranda')}
                className="text-xs text-blue-200 hover:text-white underline underline-offset-4"
              >
                ← Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main View Switcher with bottom safe area for mobile navigation */}
      <main className="flex-1 pb-20 lg:pb-0">
        {activeTab === 'beranda' && (
          <HomeDashboard
            profile={profile}
            officials={officials}
            activities={activities}
            programs={programs}
            products={products}
            setActiveTab={setActiveTab}
            onOpenProductModal={() => {
              setActiveTab('lapak');
              setShowProductModal(true);
            }}
            onOpenAspirationModal={() => setShowAspirationModal(true)}
          />
        )}

        {activeTab === 'profil' && (
          <ProfileSection 
            profile={profile} 
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}

        {activeTab === 'pengurus' && (
          <OfficialsSection 
            officials={officials} 
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}

        {activeTab === 'kegiatan' && (
          <ActivitiesSection 
            activities={activities}
            onOpenAspirationModal={() => setShowAspirationModal(true)}
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}

        {activeTab === 'proker' && (
          <WorkProgramsSection 
            programs={programs} 
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}

        {activeTab === 'aspirasi' && (
          <AspirationsSection
            aspirations={aspirations}
            poll={poll}
            onOpenModal={() => setShowAspirationModal(true)}
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}

        {activeTab === 'lapak' && (
          <MarketplaceSection
            products={products}
            setProducts={setProducts}
            showAddModal={showProductModal}
            setShowAddModal={setShowProductModal}
            isAdmin={isAdmin}
            onOpenAdminPanel={handleOpenAdminPanel}
          />
        )}
      </main>

      {/* 4. Citizen Modals */}
      <AspirationModal
        isOpen={showAspirationModal}
        onClose={() => setShowAspirationModal(false)}
        onSuccessAdded={handleAspirationAdded}
      />

      {/* 5. Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 6. Admin Management Hub Modal (Full Control: Logo, Profile, Officials, Activities, Proker, Aspirations, Marketplace) */}
      <AdminManagementModal
        isOpen={showAdminManageModal}
        onClose={() => setShowAdminManageModal(false)}
        profile={profile}
        setProfile={setProfile}
        officials={officials}
        setOfficials={setOfficials}
        activities={activities}
        setActivities={setActivities}
        programs={programs}
        setPrograms={setPrograms}
        aspirations={aspirations}
        setAspirations={setAspirations}
        products={products}
        setProducts={setProducts}
        initialTab={adminManageTab}
      />

      {/* 7. Footer */}
      <Footer
        profile={profile}
        setActiveTab={setActiveTab}
        onOpenAspirationModal={() => setShowAspirationModal(true)}
        onOpenProductModal={() => {
          setActiveTab('lapak');
          setShowProductModal(true);
        }}
        isAdmin={isAdmin}
        onOpenLoginModal={() => setShowAdminLoginModal(true)}
        onOpenAdminPanel={handleOpenAdminPanel}
      />

      {/* 8. Mobile Bottom Navigation (APK Feel) */}
      <BottomMobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
      />

    </div>
  );
}
