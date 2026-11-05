import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Phone, 
  MapPin, 
  Sparkles, 
  Filter, 
  Tag, 
  CheckCircle, 
  Trash2, 
  ExternalLink,
  MessageCircle,
  X,
  Store
} from 'lucide-react';
import { CitizenProduct, ProductCategory } from '../types';
import { saveStoredProducts } from '../utils/storage';

interface MarketplaceSectionProps {
  products: CitizenProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CitizenProduct[]>>;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: (tab?: any) => void;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  products,
  setProducts,
  showAddModal,
  setShowAddModal,
  isAdmin,
  onOpenAdminPanel
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedRt, setSelectedRt] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CitizenProduct | null>(null);

  // Form State for Adding Product
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Makanan & Minuman');
  const [price, setPrice] = useState<number | ''>('');
  const [unitLabel, setUnitLabel] = useState('porsi');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [rtRw, setRtRw] = useState('RT 01 / RW 01');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  // Preset image choices for easy citizen upload
  const presetImages = [
    { label: 'Keripik / Snack', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80' },
    { label: 'Kopi / Minuman', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Madu Alami', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { label: 'Kue / Jajanan', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
    { label: 'Bibit & Tanaman', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sablon / Kaos', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Kerajinan / Anyaman', url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sayuran Segar', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' }
  ];

  const categories: (ProductCategory | 'Semua')[] = [
    'Semua',
    'Makanan & Minuman',
    'Kerajinan Tangan',
    'Pertanian & Perkebunan',
    'Jasa & Kreatif',
    'Fashion & Pakaian'
  ];

  const rtOptions = ['Semua', 'RT 01', 'RT 02', 'RT 03', 'RT 04', 'RT 05'];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'Semua' || prod.category === selectedCategory;
    const matchesRt = selectedRt === 'Semua' || prod.rtRw.includes(selectedRt);
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRt && matchesSearch;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sellerName.trim() || !sellerPhone.trim() || !price) return;

    const finalImage = image.trim() || presetImages[0].url;

    const newProduct: CitizenProduct = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      category,
      price: Number(price),
      unitLabel: unitLabel.trim() || 'item',
      description: description.trim() || 'Produk lokal berkualitas dari warga Desa Sukamanah.',
      sellerName: sellerName.trim(),
      sellerPhone: sellerPhone.trim().replace(/^0/, '62').replace(/[^0-9]/g, ''),
      rtRw,
      image: finalImage,
      dateAdded: 'Hari Ini',
      isFeatured: false
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    setAddSuccess(true);

    setTimeout(() => {
      setAddSuccess(false);
      setShowAddModal(false);
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setSellerName('');
      setSellerPhone('');
    }, 1800);
  };

  const handleDeleteProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const buildWhatsAppLink = (product: CitizenProduct) => {
    const cleanNumber = product.sellerPhone.replace(/[^0-9]/g, '');
    const phoneWithCode = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
    const message = `Halo ${product.sellerName}, saya melihat produk *${product.name}* seharga ${formatRupiah(product.price)} di Portal Karang Taruna Sukamanah. Apakah produk ini masih tersedia?`;
    return `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Store className="w-3.5 h-3.5 text-blue-700" />
              <span>Pusat Ekonomi Kreatif & Pasar Warga</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lapak UMKM Produk Warga
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Etalase gratis bagi seluruh warga dan pemuda Sukamanah untuk mempromosikan hasil olahan, kerajinan, dan kebun. Pesan langsung ke nomor WhatsApp penjual tanpa potongan biaya!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={() => onOpenAdminPanel('lapak')}
                className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <span>⚙️ Moderasi Lapak (Admin)</span>
              </button>
            )}

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>+ Pasang Produk Saya (Gratis)</span>
            </button>
          </div>
        </div>

        {/* Benefits Banner for Citizens */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Warga Bisa Menaruh Produk Kapan Saja</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                Bantu tingkatkan pendapatan keluarga dengan jangkauan pembeli tetangga desa & luar kecamatan.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-bold whitespace-nowrap shadow transition"
          >
            Daftarkan Produk Sekarang
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari keripik, madu, kopi, sablon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold">Wilayah RT:</span>
                <select
                  value={selectedRt}
                  onChange={(e) => setSelectedRt(e.target.value)}
                  className="px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium outline-none"
                >
                  {rtOptions.map(rt => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-500">
                <strong>{filteredProducts.length}</strong> produk
              </div>
            </div>
          </div>

          {/* Categories Horizontal */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Tidak ada produk ditemukan</h3>
            <p className="text-xs text-slate-500">
              Belum ada produk untuk kategori ini. Apakah Anda memiliki produk warga untuk dipajang?
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold shadow"
            >
              + Pasang Produk Pertama Anda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Photo & Category Tag */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-sm text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow border border-white/20">
                    {product.category}
                  </div>

                  {product.isFeatured && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-blue-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Unggulan</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1 text-[11px] bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded text-slate-200">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{product.rtRw}</span>
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Oleh: <strong className="text-white">{product.sellerName}</strong>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-blue-950 font-mono">
                        {formatRupiah(product.price)}
                      </span>
                      {product.unitLabel && (
                        <span className="text-xs text-slate-500 font-medium">
                          / {product.unitLabel}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* WhatsApp Direct Action Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={buildWhatsAppLink(product)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Beli via WhatsApp</span>
                    </a>

                    {/* Delete button if user added it in session */}
                    {product.id.startsWith('prod-') && !product.isFeatured && (
                      <button
                        onClick={(e) => handleDeleteProduct(product.id, e)}
                        className="p-2.5 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition"
                        title="Hapus Produk Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Detail Produk */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              
              <div className="relative h-48 sm:h-64 bg-slate-950 shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 active:scale-95 transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-sm p-3 rounded-xl text-white border border-white/20">
                  <span className="text-[10px] sm:text-xs text-sky-300 font-bold uppercase">{selectedProduct.category}</span>
                  <h3 className="text-sm sm:text-lg font-bold text-white mt-0.5 line-clamp-1">{selectedProduct.name}</h3>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xl sm:text-2xl font-black text-blue-950 font-mono">
                    {formatRupiah(selectedProduct.price)}
                    {selectedProduct.unitLabel && (
                      <span className="text-xs text-slate-500 font-normal ml-1 font-sans">
                        / {selectedProduct.unitLabel}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    Lokasi: {selectedProduct.rtRw}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Deskripsi Lengkap Produk
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Nama Penjual Warga</span>
                    <span className="text-sm font-bold text-slate-900">{selectedProduct.sellerName}</span>
                    <span className="text-xs text-slate-500 block">Domisili {selectedProduct.rtRw}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Kontak WhatsApp</span>
                    <span className="text-xs font-mono font-bold text-emerald-700">{selectedProduct.sellerPhone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row gap-2.5">
                  <a
                    href={buildWhatsAppLink(selectedProduct)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat & Pesan via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-3 min-h-[44px] rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 active:scale-95 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal Formulir Tambah Produk Warga */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[94dvh] flex flex-col">
              
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
                <div className="min-w-0 pr-2">
                  <h3 className="text-base sm:text-lg font-bold truncate">Pasang Produk Warga di Lapak Desa</h3>
                  <p className="text-xs text-sky-200 truncate">100% Gratis & Langsung Tayang untuk Warga Sukamanah</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition shrink-0"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {addSuccess ? (
                <div className="p-6 sm:p-8 text-center space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Produk Berhasil Ditayangkan!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Produk Anda sudah dapat dilihat oleh seluruh warga dan pembeli. Pembeli akan langsung menghubungi WhatsApp Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddProduct} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Produk / Jasa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Sambal Bawang Bu Nur / Madu Randu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Kategori *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProductCategory)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                      >
                        <option value="Makanan & Minuman">Makanan & Minuman</option>
                        <option value="Kerajinan Tangan">Kerajinan Tangan</option>
                        <option value="Pertanian & Perkebunan">Pertanian & Perkebunan</option>
                        <option value="Jasa & Kreatif">Jasa & Kreatif</option>
                        <option value="Fashion & Pakaian">Fashion & Pakaian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Harga (Rp) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1000"
                        placeholder="Contoh: 25000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Satuan Produk
                      </label>
                      <input
                        type="text"
                        placeholder="bungkus, porsi, kg, pcs, botol"
                        value={unitLabel}
                        onChange={(e) => setUnitLabel(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Asal RT / RW Anda *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: RT 02 / RW 01"
                        value={rtRw}
                        onChange={(e) => setRtRw(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nama Penjual *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Ibu Rina / Kang Rudi"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        No. WhatsApp (Untuk Order) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  {/* Foto Produk Preset or URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Pilih Foto Ilustrasi Cepat Atau Masukkan URL Foto:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {presetImages.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImage(preset.url)}
                          className={`relative h-14 rounded-lg overflow-hidden border-2 text-[10px] font-semibold flex items-end p-1 text-white transition active:scale-95 ${
                            image === preset.url ? 'border-sky-500 ring-2 ring-sky-300' : 'border-slate-200'
                          }`}
                        >
                          <img src={preset.url} alt={preset.label} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/40"></div>
                          <span className="relative z-10 truncate w-full text-center drop-shadow">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      placeholder="Atau tempel link URL foto sendiri (opsional)..."
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Deskripsi Produk & Kualitas
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Jelaskan keunggulan produk Anda..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-3 min-h-[44px] rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white text-xs font-bold shadow-md active:scale-95 transition"
                    >
                      Tayangkan Produk Sekarang
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
