import React from 'react';
import { CHAPTERS } from '@/src/data/chaptersData';
import { X, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface ChapterSelectModalProps {
  completedChapters: number[];
  onSelectChapter: (chapterId: number) => void;
  onClose: () => void;
}

export const ChapterSelectModal: React.FC<ChapterSelectModalProps> = ({
  completedChapters,
  onSelectChapter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white font-heading">Daftar Chapter Cerita</h3>
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

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
          {CHAPTERS.map((ch) => {
            const isCompleted = completedChapters.includes(ch.id);

            return (
              <button
                key={ch.id}
                onClick={() => {
                  sound.playClick();
                  onSelectChapter(ch.id);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex items-start gap-3 shadow group ${
                  isCompleted
                    ? 'bg-slate-800/90 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-blue-400/50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : ch.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                      {ch.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 font-semibold text-slate-400 shrink-0">
                      {ch.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {ch.description}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 shrink-0 self-center" />
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-2">
          Pilih salah satu chapter untuk memulai simulasi edukatif.
        </div>
      </div>
    </div>
  );
};
