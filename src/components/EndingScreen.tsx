import React from 'react';
import { Ending, Choice } from '@/src/types/game';
import { ENDINGS, EMERGENCY_CONTACTS } from '@/src/data/endingsData';
import { Award, Heart, Shield, Sparkles, PhoneCall, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface EndingScreenProps {
  empathy: number;
  trust: number;
  onRestart: () => void;
  choicesHistory?: {
    chapterId: number;
    choiceText: string;
    insight: string;
  }[];
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  empathy,
  trust,
  onRestart,
}) => {
  // Determine ending based on scores
  const determineEnding = (): Ending => {
    if (empathy >= 70 && trust >= 60) return ENDINGS[0]; // Pelopor Emas
    if (empathy >= 55) return ENDINGS[1]; // Sahabat Empatik
    if (trust >= 55) return ENDINGS[2]; // Penjaga Keadilan
    return ENDINGS[3]; // Langkah Pertama
  };

  const ending = determineEnding();

  return (
    <div className="flex-1 w-full bg-slate-950 flex flex-col overflow-y-auto p-4 select-none relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm mx-auto flex flex-col gap-4 py-2 relative z-10 animate-float-up">
        {/* Certificate Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-pink-500 to-blue-500" />

          {/* Trophy Badge */}
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Penghargaan Karakter Pelajar · Predikat {ending.ratingTier}
          </span>

          <h2 className="text-lg sm:text-xl font-bold font-heading text-white mt-2 mb-0.5 leading-snug">
            {ending.title}
          </h2>
          <p className="text-xs text-slate-300 italic mb-3">“{ending.subtitle}”</p>

          {/* Score Badges */}
          <div className="grid grid-cols-2 gap-2 my-3">
            <div className="p-2.5 rounded-2xl bg-pink-950/30 border border-pink-500/30 flex flex-col items-center">
              <span className="text-[11px] font-semibold text-pink-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-pink-500" /> Skor Empati
              </span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">{empathy}/100</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex flex-col items-center">
              <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 fill-blue-500" /> Kepercayaan
              </span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">{trust}/100</span>
            </div>
          </div>

          {/* Ending Description */}
          <p className="text-xs text-slate-300 text-left leading-relaxed border-t border-slate-800/80 pt-3">
            {ending.description}
          </p>
        </div>

        {/* Core Message Card (Mandatory Requirement) */}
        <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/40 rounded-3xl p-4 shadow-xl text-center">
          <Sparkles className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
          <h4 className="text-xs uppercase tracking-wider font-bold text-blue-300 mb-1">
            Pesan Utama Game
          </h4>
          <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
            “Kamu tidak harus menghadapi bullying sendirian. Berani bicara dan mencari bantuan adalah langkah penting.”
          </p>
        </div>

        {/* Key Lessons Learned */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-lg">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Pelajaran Berharga yang Didapat:</span>
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-300">
            {ending.keyLessons.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span className="leading-snug">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real Emergency Helplines (Indonesia) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-lg flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Kanal Bantuan Darurat Resmi (Indonesia):</span>
          </div>

          {EMERGENCY_CONTACTS.map((contact, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-2xl border text-xs flex flex-col gap-0.5 ${contact.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{contact.title}</span>
                <span className="font-mono font-bold">{contact.phone}</span>
              </div>
              <span className="text-[10px] opacity-80">{contact.description}</span>
            </div>
          ))}
        </div>

        {/* Action Button: Restart / Main Lagi */}
        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[48px]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Mainkan Lagi / Pilih Chapter</span>
        </button>
      </div>
    </div>
  );
};
