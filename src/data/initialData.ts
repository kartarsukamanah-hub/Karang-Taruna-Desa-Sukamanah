import { 
  OrganizationProfile, 
  OfficialMember, 
  Activity, 
  WorkProgram, 
  Aspiration, 
  CitizenProduct,
  PollQuestion
} from '../types';

export const initialProfile: OrganizationProfile = {
  name: "Karang Taruna Sukamanah",
  tagline: "Generasi Pemuda Tangguh, Berkarya Mandiri, Berbakti untuk Negeri",
  motto: "Aditya Karya Mahatva Yodha",
  establishedYear: 1988,
  villageName: "Desa Sukamanah",
  districtName: "Kecamatan Sukamanah",
  regencyName: "Kabupaten",
  provinceName: "Jawa Barat",
  address: "Gedung Serbaguna Pemuda, Jl. Raya Sukamanah No. 45, RT 02 / RW 03",
  email: "kartarsukamanah@gmail.com",
  phone: "+62 821-2345-6789",
  operatingHours: "Senin - Sabtu: 09.00 - 21.00 WIB",
  vision: "Terwujudnya pemuda Desa Sukamanah yang berkarakter, berdaya saing, inovatif, serta aktif menjadi pelopor kesejahteraan sosial dan kemandirian ekonomi desa.",
  missions: [
    "Menumbuhkan rasa persaudaraan, kepedulian sosial, dan gotong royong di kalangan generasi muda.",
    "Membina minat dan bakat pemuda dalam bidang olahraga, seni budaya, teknologi informasi, dan kewirausahaan.",
    "Menjadi jembatan komunikasi dan penyerap aspirasi masyarakat dengan pemerintah desa serta lintas lembaga.",
    "Mengembangkan potensi ekonomi lokal melalui wadah UMKM pemuda dan digitalisasi produk warga.",
    "Melestarikan lingkungan hidup dan menciptakan suasana desa yang aman, tertib, dan bersih."
  ],
  history: "Karang Taruna Sukamanah bermula dari perkumpulan pemuda desa yang secara swadaya menyelenggarakan kegiatan peringatan kemerdekaan dan kerja bakti saluran irigasi pada akhir dekade 1980-an. Seiring berjalannya waktu dan legalitas Peraturan Menteri Sosial, Karang Taruna Sukamanah diresmikan sebagai wadah resmi pembinaan dan pemberdayaan generasi muda di tingkat desa. Kini telah memiliki ratusan anggota aktif dan puluhan program unggulan berkelanjutan.",
  symbolMeaning: [
    {
      part: "Bunga Teratai Berdaun Lima",
      description: "Melambangkan pemuda yang bertakwa, berbudi pekerti luhur, berlandaskan Pancasila, dan tumbuh mekar membawa manfaat ke sekitarnya."
    },
    {
      part: "Lingkaran Rantai & Roda",
      description: "Melambangkan persatuan kokoh yang tak terputus, dinamisme kerja nyata, serta semangat gotong royong antar pemuda dan seluruh elemen warga."
    },
    {
      part: "Warna Biru Navy & Kuning Keemasan",
      description: "Biru melambangkan kedewasaan, integritas, dan keteduhan jiwa; Kuning keemasan mencerminkan kecerdasan, masa depan gilang-gemilang, dan optimisme."
    },
    {
      part: "Pita Bertuliskan Aditya Karya Mahatva Yodha",
      description: "Semboyan kehormatan pemuda: Pejuang yang berkepribadian mandiri, berilmu keterampilan, dan berbudi luhur bagi nusa dan bangsa."
    }
  ]
};

export const initialOfficials: OfficialMember[] = [
  {
    id: "off-1",
    name: "Muhammad Rizky Pratama, S.T.",
    position: "Ketua Karang Taruna",
    section: "Pimpinan Inti",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Aktif menggerakkan pemuda sejak 2018. Berfokus pada digitalisasi desa dan kolaborasi antar pemuda RT/RW.",
    quote: "Pemuda bukan menunggu kesempatan datang, tetapi menciptakan perubahan nyata di lingkungannya.",
    phone: "+62 821-1122-3344",
    instagram: "@rizky_sukamanah",
    termPeriod: "2024 - 2027",
    rtRw: "RT 03 / RW 02",
    badge: "Pimpinan Utama"
  },
  {
    id: "off-2",
    name: "Dinda Aulia Rahmawati, S.E.",
    position: "Wakil Ketua",
    section: "Pimpinan Inti",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Penggiat literasi keuangan desa dan pendampingan UMKM perempuan muda di Dusun Sukamaju.",
    quote: "Kekuatan sebuah desa berakar dari kehangatan pemuda yang saling merangkul dan mendukung.",
    phone: "+62 813-9876-5432",
    instagram: "@dindaaulia.r",
    termPeriod: "2024 - 2027",
    rtRw: "RT 01 / RW 01"
  },
  {
    id: "off-3",
    name: "Fajar Maulana, S.Kom.",
    position: "Sekretaris Umum",
    section: "Pimpinan Inti",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Bertanggung jawab atas administrasi, inventaris, persuratan resmi, dan pengelolaan portal digital desa.",
    quote: "Administrasi yang tertib adalah fondasi organisasi yang transparan dan dipercaya warga.",
    phone: "+62 857-4433-2211",
    instagram: "@fajar.digital",
    termPeriod: "2024 - 2027",
    rtRw: "RT 04 / RW 03"
  },
  {
    id: "off-4",
    name: "Siti Nurhaliza, A.Md.Ak.",
    position: "Bendahara Umum",
    section: "Pimpinan Inti",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Mengelola akuntabilitas keuangan organisasi, kas anggota, dan pelaporan bantuan dana sosial warga.",
    quote: "Satu rupiah dana amanah warga harus dapat dipertanggungjawabkan dengan tuntas dan berkah.",
    phone: "+62 812-7788-9900",
    instagram: "@sitinurhaliza.acc",
    termPeriod: "2024 - 2027",
    rtRw: "RT 02 / RW 02"
  },
  {
    id: "off-5",
    name: "Bayu Saputra",
    position: "Koordinator Seksi Olahraga & Seni",
    section: "Olahraga & Seni",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Mantan kapten tim sepak bola kecamatan, kini mengoordinasikan turnamen berkala dan sanggar seni desa.",
    quote: "Lewat olahraga kita bangun sportivitas, lewat seni kita lestarikan warisan leluhur desa.",
    phone: "+62 822-6655-4433",
    instagram: "@bayu_sport",
    termPeriod: "2024 - 2027",
    rtRw: "RT 05 / RW 04"
  },
  {
    id: "off-6",
    name: "Anisa Wardani, S.P.",
    position: "Koordinator Seksi Lingkungan & Sosial",
    section: "Sosial & Lingkungan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: "Inisiator Bank Sampah 'Resik Berkah' dan koordinator penanggulangan bencana tanggap darurat RT.",
    quote: "Bumi yang bersih adalah warisan paling jujur untuk generasi yang akan datang.",
    phone: "+62 878-1122-8899",
    instagram: "@anisa_wardanisp",
    termPeriod: "2024 - 2027",
    rtRw: "RT 03 / RW 01"
  },
  {
    id: "off-7",
    name: "Hendra Gunawan",
    position: "Koordinator Seksi Ekonomi Kreatif & UMKM",
    section: "Ekonomi Kreatif & UMKM",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Pengusaha muda lokal yang aktif melatih kemasan produk dan pemasaran online untuk warga desa.",
    quote: "Desa berdaya jika produk warganya dicintai dan dibeli oleh tetangga sendiri.",
    phone: "+62 896-5544-3322",
    instagram: "@hendra_kreatif",
    termPeriod: "2024 - 2027",
    rtRw: "RT 02 / RW 03"
  },
  {
    id: "off-8",
    name: "Zaki Firdaus",
    position: "Koordinator Seksi Humas & Aspirasi",
    section: "Pendidikan & Humas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "Menjembatani aspirasi warga dari tiap RT ke pengurus desa dan mengelola media publikasi sosial media.",
    quote: "Mendengar adalah langkah pertama sebelum bertindak memberi solusi.",
    phone: "+62 852-3344-5566",
    instagram: "@zaki_humas",
    termPeriod: "2024 - 2027",
    rtRw: "RT 01 / RW 02"
  }
];

export const initialActivities: Activity[] = [
  {
    id: "act-1",
    title: "Kerja Bakti Akbar & Revitalisasi Lapangan Warga Sukamanah",
    category: "Lingkungan Hidup",
    date: "12 Oktober 2026",
    location: "Lapangan Gelora Pemuda RT 03 / RW 02",
    description: "Gotong royong pembersihan saluran air drainase menghadapi musim hujan dan pengecatan kembali sarana olahraga.",
    fullReport: "Kegiatan kerja bakti akbar ini diikuti oleh lebih dari 95 pemuda dan warga desa Sukamanah. Selain membersihkan sedimentasi parit sepanjang 400 meter, tim pemuda juga memperbaiki penerangan lapangan dan menanam 50 bibit pohon peneduh di tepi lapangan serbaguna.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
    ],
    participantsCount: 95,
    coordinator: "Anisa Wardani, S.P.",
    status: "Selesai",
    likesCount: 64
  },
  {
    id: "act-2",
    title: "Pelatihan Digital Marketing & Kemasan Produk UMKM Desa",
    category: "Pelatihan & UMKM",
    date: "28 September 2026",
    location: "Aula Pertemuan Desa Sukamanah",
    description: "Workshop praktis cara foto produk pakai HP, pasang lapak online di marketplace, dan optimasi WhatsApp Bisnis.",
    fullReport: "Pelatihan dihadiri oleh 42 pelaku usaha mikro warga binaan Karang Taruna. Peserta dibekali mini light box foto, teknik copywriting promosi sederhana, hingga pembuatan link pemesanan cepat via WhatsApp.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
    ],
    participantsCount: 42,
    coordinator: "Hendra Gunawan",
    status: "Selesai",
    likesCount: 89
  },
  {
    id: "act-3",
    title: "Turnamen Futsal & Badminton Antar-RT Piala Karta Cup 2026",
    category: "Olahraga & Seni",
    date: "15 - 20 Agustus 2026",
    location: "Gedung Olahraga Sukamanah",
    description: "Ajang silaturahmi olahraga pemuda antar 8 RT untuk merayakan HUT Kemerdekaan RI ke-81.",
    fullReport: "Turnamen berlangsung meriah selama 6 hari berturut-turut. RT 04 berhasil membawa pulang piala bergilir Futsal, sementara RT 02 menjadi juara umum cabor bulu tangkis ganda putra dan putri.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80"
    ],
    participantsCount: 160,
    coordinator: "Bayu Saputra",
    status: "Selesai",
    likesCount: 142
  },
  {
    id: "act-4",
    title: "Bakti Sosial & Santunan Kasih Lansia Serta Anak Yatim",
    category: "Sosial & Kemanusiaan",
    date: "04 Juli 2026",
    location: "Sekretariat Bersama RW 01 - RW 04",
    description: "Penyaluran 85 paket sembako dan santunan pendidikan dari kas iuran pemuda dan donatur sukarela warga.",
    fullReport: "Penyaluran bantuan dilakukan door-to-door oleh relawan pemuda bagi warga lansia yang berhalangan hadir, serta pembagian serentak perlengkapan sekolah untuk anak-anak yatim piatu menjelang tahun ajaran baru.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
    ],
    participantsCount: 85,
    coordinator: "Dinda Aulia Rahmawati, S.E.",
    status: "Selesai",
    likesCount: 110
  },
  {
    id: "act-5",
    title: "Posko Literasi & Bimbingan Belajar Gratis untuk Anak Desa",
    category: "Pelatihan & UMKM",
    date: "Sedang Berlangsung (Setiap Sabtu & Minggu)",
    location: "Pojok Baca Sekretariat Karang Taruna",
    description: "Program kakak asuh mahasiswa pemuda desa membantu adik-adik SD dan SMP belajar matematika, bahasa Inggris, dan baca Al-Qur'an.",
    fullReport: "Program bimbel gratis telah berjalan selama 3 bulan dengan rata-rata 35 siswa aktif setiap minggunya, dibimbing oleh 12 mahasiswa sukarelawan Karang Taruna Sukamanah.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    participantsCount: 47,
    coordinator: "Zaki Firdaus",
    status: "Sedang Berjalan",
    likesCount: 95
  }
];

export const initialWorkPrograms: WorkProgram[] = [
  {
    id: "prog-1",
    title: "Pembangunan Sentra UMKM & Pujasera Kreatif Pemuda",
    targetQuarter: "Kuartal 1 - 2027",
    targetDate: "Februari - Maret 2027",
    category: "Ekonomi Kreatif",
    leadPerson: "Hendra Gunawan",
    targetAudience: "30+ Pelaku UMKM kuliner dan kerajinan warga",
    budgetEstimate: "Rp 18.500.000",
    description: "Menyediakan area terpusat di depan Balai Desa untuk gerai makanan dan kerajinan warga yang buka setiap sore hingga malam, dikelola secara modern dengan pembayaran QRIS.",
    goals: [
      "Meningkatkan perputaran ekonomi warga desa hingga 35%",
      "Membuka lapangan kerja paruh waktu bagi 20 pemuda desa",
      "Menyediakan tempat nongkrong sehat dan positif dengan fasilitas WiFi desa"
    ],
    progressPercent: 65,
    status: "Persiapan",
    volunteersNeeded: 15,
    volunteersRegistered: 11
  },
  {
    id: "prog-2",
    title: "Sukamanah Green Village: Bank Sampah & Budidaya Maggot",
    targetQuarter: "Kuartal 4 - 2026",
    targetDate: "Desember 2026",
    category: "Lingkungan Hidup",
    leadPerson: "Anisa Wardani, S.P.",
    targetAudience: "Seluruh warga 5 RT di Desa Sukamanah",
    budgetEstimate: "Rp 9.200.000",
    description: "Pengolahan limbah organik rumah tangga menggunakan biokonversi maggot BSF dan penukaran sampah anorganik menjadi saldo tabungan warga.",
    goals: [
      "Mengurangi volume sampah ke TPA hingga 60%",
      "Menghasilkan pakan ternak murah berprotein tinggi untuk peternak unggas lokal",
      "Edukasi pemilahan sampah dari sumber rumah tangga"
    ],
    progressPercent: 40,
    status: "Persiapan",
    volunteersNeeded: 20,
    volunteersRegistered: 14
  },
  {
    id: "prog-3",
    title: "Festival Seni Budaya & Pesta Rakyat Sukamanah",
    targetQuarter: "Kuartal 2 - 2027",
    targetDate: "Mei 2027",
    category: "Seni & Olahraga",
    leadPerson: "Bayu Saputra",
    targetAudience: "Warga umum & pemuda se-Kecamatan",
    budgetEstimate: "Rp 25.000.000",
    description: "Perayaan budaya menampilkan kesenian pencak silat, tari tradisional sunda, pasar malam UMKM, dan parade musik akustik pemuda desa.",
    goals: [
      "Melestarikan kesenian tradisional lokal di kalangan Gen-Z desa",
      "Mempererat silaturahmi warga pasca Idul Fitri",
      "Menjadi magnet wisata budaya tingkat kecamatan"
    ],
    progressPercent: 25,
    status: "Perencanaan",
    volunteersNeeded: 35,
    volunteersRegistered: 19
  },
  {
    id: "prog-4",
    title: "Program Beasiswa & Bimbingan Minat Karir Pemuda Sukamanah",
    targetQuarter: "Kuartal 1 - 2027",
    targetDate: "Januari 2027",
    category: "Pendidikan & Humas",
    leadPerson: "Fajar Maulana, S.Kom.",
    targetAudience: "Siswa SMA/SMK kelas akhir & lulusan baru",
    budgetEstimate: "Rp 12.000.000",
    description: "Pemberian subsidi biaya pendaftaran kuliah/kursus vokasi, pelatihan CV & interview kerja, serta mentorship bersama alumni sukses desa.",
    goals: [
      "Menurunkan angka pengangguran usia muda di desa",
      "Membuka akses ke perguruan tinggi negeri dan politeknik vokasi",
      "Membentuk jejaring alumni Sukamanah di berbagai kota industri"
    ],
    progressPercent: 50,
    status: "Persiapan",
    volunteersNeeded: 10,
    volunteersRegistered: 8
  },
  {
    id: "prog-5",
    title: "Digitalisasi Pelayanan Surat Pemuda & Hotline Pengaduan RT",
    targetQuarter: "Kuartal 4 - 2026",
    targetDate: "November 2026",
    category: "Administrasi & Teknologi",
    leadPerson: "Muhammad Rizky Pratama, S.T.",
    targetAudience: "Aparatur Desa & Seluruh Warga",
    budgetEstimate: "Rp 4.500.000",
    description: "Penyempurnaan portal web terpadu Karang Taruna agar warga dapat mengirim aspirasi, mempromosikan produk secara instan, dan melihat laporan kas berkala.",
    goals: [
      "Transparansi penuh pengelolaan kegiatan dan anggaran pemuda",
      "Respon cepat aspirasi warga maksimal 2x24 jam",
      "Portal produk desa dapat diakses 24/7 oleh pembeli luar daerah"
    ],
    progressPercent: 85,
    status: "Siap Eksekusi",
    volunteersNeeded: 8,
    volunteersRegistered: 8
  }
];

export const initialAspirations: Aspiration[] = [
  {
    id: "asp-1",
    senderName: "Pak Supardi",
    isAnonymous: false,
    rtRw: "RT 03 / RW 02",
    category: "Fasilitas & Lingkungan",
    title: "Penerangan Jalan Gang Mawar Kurang Terang di Malam Hari",
    content: "Mohon adik-adik pemuda Karang Taruna bisa berkoordinasi dengan pengurus RT untuk penambahan 2 titik lampu sorot LED di gang arah makam, karena rawan anak-anak terpeleset di malam hari.",
    date: "01 November 2026",
    status: "Dalam Tindak Lanjut",
    adminResponse: "Terima kasih Pak Supardi. Usulan sudah disurvei oleh Seksi Lingkungan pada 3 November. Kami sudah menyiapkan 2 unit bohlam LED 50W dan kabel, rencana pemasangan akan dilakukan saat kerja bakti Jumat malam ini.",
    responseDate: "03 November 2026",
    upvotes: 28
  },
  {
    id: "asp-2",
    senderName: "Ibu Lilis Suryani",
    isAnonymous: false,
    rtRw: "RT 01 / RW 01",
    category: "Usulan & Ide Baru",
    title: "Adakan Senam Sehat Minggu Pagi Khusus Ibu-Ibu & Remaja Putri",
    content: "Kalau boleh usul di lapangan desa diadakan senam aerobik rutin setiap Minggu pagi jam 06.30 WIB. Pemudanya bisa jadi panitia atau putar musiknya, biar warga makin sehat dan akrab.",
    date: "25 Oktober 2026",
    status: "Selesai / Terlaksana",
    adminResponse: "Usulan sangat bagus Bu Lilis! Mulai 8 November, Karang Taruna bekerja sama dengan kader Posyandu telah menjadwalkan Senam Bugar Sukamanah setiap Minggu pagi dengan instruktur mbak Rina.",
    responseDate: "27 Oktober 2026",
    upvotes: 45
  },
  {
    id: "asp-3",
    senderName: "Anonim Warga",
    isAnonymous: true,
    rtRw: "RT 04 / RW 03",
    category: "Kegiatan Kepemudaan",
    title: "Pelatihan Service Sepeda Motor atau Las Listrik untuk Pemuda Menganggur",
    content: "Banyak anak-anak lulusan SMK yang masih menunggu panggilan kerja. Alangkah baiknya jika ada pelatihan keterampilan teknis seperti servis motor injeksi atau las listrik agar bisa langsung buka bengkel sendiri.",
    date: "18 Oktober 2026",
    status: "Diterima Pengurus",
    adminResponse: "Aspirasi telah dicatat dan masuk dalam agenda rapat kerja proker vokasi. Kami sedang mengajukan proposal kerja sama ke BLK (Balai Latihan Kerja) Kabupaten untuk kuota awal tahun 2027.",
    responseDate: "20 Oktober 2026",
    upvotes: 62
  },
  {
    id: "asp-4",
    senderName: "Kang Deni",
    isAnonymous: false,
    rtRw: "RT 02 / RW 02",
    category: "Keamanan & Ketertiban",
    title: "Peremajaan Jadwal Ronda Malam Poskamling Terpadu",
    content: "Perlu dibuatkan jadwal kolaborasi ronda malam antara bapak-bapak dan pemuda di poskamling utama untuk mengantisipasi aksi pencurian hewan ternak dan kenakalan remaja larut malam.",
    date: "10 Oktober 2026",
    status: "Dalam Tindak Lanjut",
    adminResponse: "Koordinasi bersama Babinsa dan Ketua RW sedang difinalisasi. Jadwal piket regu pemuda pendamping ronda akan ditempel di setiap poskamling minggu depan.",
    responseDate: "13 Oktober 2026",
    upvotes: 34
  }
];

export const initialProducts: CitizenProduct[] = [
  {
    id: "prod-1",
    name: "Keripik Singkong Balado 'Renyah Barokah'",
    category: "Makanan & Minuman",
    price: 15000,
    description: "Keripik singkong gurih khas olahan kebun sendiri dengan bumbu balado asli tanpa bahan pengawet. Tersedia level pedas manis dan ekstra pedas daun jeruk.",
    sellerName: "Ibu Siti Rohimah",
    sellerPhone: "081234567891",
    rtRw: "RT 02 / RW 01",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    dateAdded: "02 November 2026",
    isFeatured: true,
    unitLabel: "bungkus 250gr"
  },
  {
    id: "prod-2",
    name: "Kopi Robusta Asli Gunung Karang Sukamanah",
    category: "Makanan & Minuman",
    price: 35000,
    description: "Kopi robusta petik merah hasil kebun pemuda desa lereng perbukitan. Dipanggang profil medium to dark, aroma karamel manis dan keasaman rendah yang nyaman di lambung.",
    sellerName: "Kang Asep Saepuloh",
    sellerPhone: "082199887766",
    rtRw: "RT 04 / RW 03",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    dateAdded: "30 Oktober 2026",
    isFeatured: true,
    unitLabel: "pouch 200gr"
  },
  {
    id: "prod-3",
    name: "Madu Hutan Murni Asli Tanpa Campuran",
    category: "Makanan & Minuman",
    price: 85000,
    description: "Madu murni hasil panen lebah liar pohon randu dan akasia. Sangat cocok untuk menjaga daya tahan tubuh keluarga dan pemulihan stamina.",
    sellerName: "Pak Haji Dedi",
    sellerPhone: "087788991122",
    rtRw: "RT 01 / RW 02",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    dateAdded: "26 Oktober 2026",
    isFeatured: false,
    unitLabel: "botol 350ml"
  },
  {
    id: "prod-4",
    name: "Jasa Sablon Kaos & Konveksi Seragam Pemuda",
    category: "Jasa & Kreatif",
    price: 65000,
    description: "Workshop sablon manual plastisol dan rubber berkualitas tinggi karya anak-anak muda Karang Taruna. Melayani pembuatan seragam panitia, jersey futsal, kaos kelas, dan jaket komunitas.",
    sellerName: "Mas Danu Permana",
    sellerPhone: "085611223344",
    rtRw: "RT 03 / RW 02",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    dateAdded: "20 Oktober 2026",
    isFeatured: true,
    unitLabel: "kaos (min. 12 pcs)"
  },
  {
    id: "prod-5",
    name: "Bibit Alpukat Aligator & Durian Musang King Unggul",
    category: "Pertanian & Perkebunan",
    price: 45000,
    description: "Bibit sambung pucuk okulasi berkualitas dengan tinggi bibit 70-90 cm. Garansi keaslian varietas dan cepat berbuah dalam pot atau pekarangan rumah.",
    sellerName: "Pak Joko Tani Makmur",
    sellerPhone: "081377665544",
    rtRw: "RT 05 / RW 04",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    dateAdded: "15 Oktober 2026",
    isFeatured: false,
    unitLabel: "pohon bibit"
  },
  {
    id: "prod-6",
    name: "Tas Anyaman Bambu & Besek Hantaran Souvenir",
    category: "Kerajinan Tangan",
    price: 20000,
    description: "Anyaman bambu ramah lingkungan buatan ibu-ibu pengrajin terampil Dusun Sukarame. Kuat, rapi, dan cocok untuk wadah hantaran syukuran atau oleh-oleh desa.",
    sellerName: "Mbak Nur Hasanah",
    sellerPhone: "089855667788",
    rtRw: "RT 02 / RW 03",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80",
    dateAdded: "10 Oktober 2026",
    isFeatured: false,
    unitLabel: "buah"
  }
];

export const initialPoll: PollQuestion = {
  id: "poll-1",
  question: "Keterampilan atau pelatihan apa yang paling dibutuhkan pemuda & warga Desa Sukamanah saat ini?",
  options: [
    { id: "opt-1", label: "Pelatihan Digital Marketing & Toko Online", votes: 84 },
    { id: "opt-2", label: "Kursus Mekanik Servis Sepeda Motor", votes: 68 },
    { id: "opt-3", label: "Pelatihan Budidaya Ikan Lele & Maggot BSF", votes: 52 },
    { id: "opt-4", label: "Desain Grafis & Pembuatan Konten Medsos", votes: 41 }
  ],
  totalVotes: 245,
  deadline: "30 November 2026",
  isActive: true
};
