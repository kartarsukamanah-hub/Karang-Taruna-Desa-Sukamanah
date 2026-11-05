export interface OrganizationProfile {
  name: string;
  tagline: string;
  motto: string;
  establishedYear: number;
  logoUrl?: string;
  villageName: string;
  districtName: string;
  regencyName: string;
  provinceName: string;
  address: string;
  email: string;
  phone: string;
  operatingHours: string;
  vision: string;
  missions: string[];
  history: string;
  symbolMeaning: {
    part: string;
    description: string;
  }[];
}

export type SectionType = 
  | 'Semua'
  | 'Pimpinan Inti'
  | 'Sosial & Lingkungan'
  | 'Olahraga & Seni'
  | 'Ekonomi Kreatif & UMKM'
  | 'Pendidikan & Humas';

export interface OfficialMember {
  id: string;
  name: string;
  position: string;
  section: SectionType;
  avatar: string;
  bio: string;
  quote?: string;
  phone?: string;
  instagram?: string;
  termPeriod: string;
  rtRw: string;
  badge?: string;
}

export type ActivityCategory = 
  | 'Sosial & Kemanusiaan'
  | 'Olahraga & Seni'
  | 'Pelatihan & UMKM'
  | 'Lingkungan Hidup'
  | 'Keagamaan & Kebangsaan';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  location: string;
  description: string;
  fullReport: string;
  image: string;
  gallery?: string[];
  participantsCount: number;
  coordinator: string;
  status: 'Selesai' | 'Sedang Berjalan' | 'Akan Datang';
  likesCount: number;
}

export type ProgramStatus = 'Perencanaan' | 'Persiapan' | 'Siap Eksekusi' | 'Berjalan' | 'Selesai';

export interface WorkProgram {
  id: string;
  title: string;
  targetQuarter: string;
  targetDate: string;
  category: string;
  leadPerson: string;
  targetAudience: string;
  budgetEstimate: string;
  description: string;
  goals: string[];
  progressPercent: number;
  status: ProgramStatus;
  volunteersNeeded: number;
  volunteersRegistered: number;
}

export type AspirationCategory = 
  | 'Fasilitas & Lingkungan'
  | 'Kegiatan Kepemudaan'
  | 'Keamanan & Ketertiban'
  | 'Bantuan Sosial'
  | 'Usulan & Ide Baru';

export type AspirationStatus = 'Menunggu Verifikasi' | 'Diterima Pengurus' | 'Dalam Tindak Lanjut' | 'Selesai / Terlaksana';

export interface Aspiration {
  id: string;
  senderName: string;
  isAnonymous: boolean;
  rtRw: string;
  category: AspirationCategory;
  title: string;
  content: string;
  date: string;
  status: AspirationStatus;
  adminResponse?: string;
  responseDate?: string;
  upvotes: number;
}

export type ProductCategory = 
  | 'Makanan & Minuman'
  | 'Kerajinan Tangan'
  | 'Pertanian & Perkebunan'
  | 'Jasa & Kreatif'
  | 'Fashion & Pakaian';

export interface CitizenProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  sellerName: string;
  sellerPhone: string; // WhatsApp number
  rtRw: string;
  image: string;
  dateAdded: string;
  isFeatured?: boolean;
  unitLabel?: string; // misal: "porsi", "bungkus", "pcs", "kg", "jam"
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  nik?: string;
  phone: string;
  rtRw: string;
  interestDivision: string;
  skills: string;
  motivation: string;
  appliedAt: string;
}

export interface PollQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
    votes: number;
  }[];
  totalVotes: number;
  deadline: string;
  isActive: boolean;
}
