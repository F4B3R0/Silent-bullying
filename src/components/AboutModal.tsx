import React from 'react';
import { X, ShieldCheck, Heart, Sparkles, BookOpen, Users, PhoneCall } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/src/data/endingsData';
import { sound } from '@/src/services/soundManager';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-heading">Tentang Game</h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Synopsis */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
            Game Edukasi Interaktif 2D
          </span>
          <h4 className="text-sm font-bold text-white leading-snug">
            “Berani Bicara” — Sahabat Pencegah Perundungan
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Game ini dirancang khusus untuk pelajar SMP dan SMA sebagai media edukatif mengenali situasi bullying, mengasah empati, menumbuhkan keberanian moral untuk bersuara, dan mencari bantuan dari orang dewasa terpercaya.
          </p>
        </div>

        {/* 4 Jenis Bullying */}
        <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-col gap-2">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> 4 Jenis Perundungan yang Harus Diwaspadai:
          </span>
          <ul className="text-[11px] text-slate-300 flex flex-col gap-1.5">
            <li><strong className="text-slate-100">1. Verbal:</strong> Ejekan, nama julukan buruk, hinaan fisik, merendahkan.</li>
            <li><strong className="text-slate-100">2. Relasional (Sosial):</strong> Pengucilan, menyebar gosip, menghasut teman untuk memusuhi.</li>
            <li><strong className="text-slate-100">3. Siber (Cyberbullying):</strong> Meme olok-olok, teror di grup pesan, doxing, peretasan.</li>
            <li><strong className="text-slate-100">4. Fisik:</strong> Memukul, memalak uang jajan, merusak barang, menjegal.</li>
          </ul>
        </div>

        {/* Strategi 5D Upstander */}
        <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-col gap-2">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Strategi 5D Intervensi Saksi yang Aman:
          </span>
          <ul className="text-[11px] text-slate-300 flex flex-col gap-1">
            <li><strong>Direct:</strong> Tegur langsung jika kondisi kondusif dan aman.</li>
            <li><strong>Distract:</strong> Alihkan perhatian pelaku untuk memecah fokus.</li>
            <li><strong>Delegate:</strong> Minta bantuan guru, satpam, atau otoritas sekolah.</li>
            <li><strong>Delay:</strong> Dampingi korban setelah kejadian, dengarkan perasaannya.</li>
            <li><strong>Document:</strong> Simpan bukti tangkapan layar untuk dilaporkan secara resmi.</li>
          </ul>
        </div>

        {/* Hotline Kontak */}
        <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-col gap-2">
          <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5" /> Kontak Pengaduan Resmi:
          </span>
          <p className="text-[11px] text-slate-300">
            • <strong>SAPA 129:</strong> Telepon 129 / WhatsApp 08111-129-129 (24 Jam)<br />
            • <strong>Lapor Kemendikbud:</strong> 177 / kemdikbud.lapor.go.id<br />
            • <strong>KPAI:</strong> 021-31901556
          </p>
        </div>

        {/* Core Message */}
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-3 rounded-2xl border border-blue-500/30 text-center">
          <p className="text-xs font-bold text-blue-200 italic">
            “Kamu tidak harus menghadapi bullying sendirian. Berani bicara dan mencari bantuan adalah langkah penting.”
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-transform min-h-[44px]"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
