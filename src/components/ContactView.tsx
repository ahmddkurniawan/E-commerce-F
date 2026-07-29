import React, { useState } from 'react';
import { MOCK_FAQS } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  onShowToast: (title: string, message: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSent(true);
    onShowToast('Pesan Terkirim!', 'Tim Customer Service kami akan membalas pesan Anda dalam 1x24 jam.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Hubungi Kami</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Ada Pertanyaan? Kami Siap Membantu Anda
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Tim layanan pelanggan kami dapat dihubungi setiap hari pukul 08.00 - 21.00 WIB.
        </p>
      </div>

      {/* Grid Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              Informasi Kontak Store
            </h3>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Alamat Flagship Store</p>
                <p className="text-slate-600 leading-relaxed mt-0.5">
                  Jl. Singa, 17 Bonto Biraeng, Mamajang District, Makassar City.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">WhatsApp / Telepon</p>
                <p className="text-slate-600 mt-0.5">087884618585</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Email Resmi</p>
                <p className="text-slate-600 mt-0.5">Stitchsupply_mks@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Jam Operasional</p>
                <p className="text-slate-600 mt-0.5">Senin - Minggu: 08.00 - 21.00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Kirim Pesan Kepada Kami</h3>

          {sent ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base">Pesan Anda Berhasil Terkirim!</h4>
              <p className="text-xs text-slate-600">
                Terima kasih telah menghubungi Stitch Supply. Tim kami akan segera menanggapi pesan Anda via WhatsApp / Email.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Setya Pratama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email / No. WA *</label>
                  <input
                    type="text"
                    required
                    placeholder="nama@email.com / 08123456789"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pesan / Pertanyaan Anda *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pertanyaan mengenai produk, stok, atau ukuran..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">FAQ</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Pertanyaan Sering Diajukan</h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {MOCK_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
