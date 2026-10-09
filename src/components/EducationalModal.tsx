import React from 'react';
import { EducationalNote } from '@/src/types/game';
import { BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface EducationalModalProps {
  note: EducationalNote;
  onClose: () => void;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[85vh] overflow-y-auto">
        {/* Header Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Edukasi Sahabat Peduli</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold font-heading text-white leading-tight">
          {note.title}
        </h3>

        {/* Content Body */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {note.content}
        </p>

        {/* Highlight Key Takeaway */}
        <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-amber-200 italic leading-snug">
            {note.keyTakeaway}
          </p>
        </div>

        {/* Legal Context if available */}
        {note.legalContext && (
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 leading-normal">
            <span className="font-semibold text-slate-300 block mb-0.5">Dasar Hukum & Kebijakan:</span>
            {note.legalContext}
          </div>
        )}

        {/* Confirmation Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all min-h-[48px]"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Saya Mengerti & Lanjutkan</span>
        </button>
      </div>
    </div>
  );
};
