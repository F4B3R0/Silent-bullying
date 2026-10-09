import React from 'react';
import { Heart, Shield, Volume2, VolumeX, Menu, BookOpen } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface TopHUDProps {
  empathy: number;
  trust: number;
  chapterTitle?: string;
  chapterId?: number;
  onOpenMenu: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  floatingScore?: {
    text: string;
    type: 'empathy' | 'trust' | 'both';
  } | null;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  empathy,
  trust,
  chapterTitle,
  chapterId,
  onOpenMenu,
  musicEnabled,
  onToggleMusic,
  floatingScore,
}) => {
  return (
    <div className="w-full px-3 py-2 bg-slate-900/85 backdrop-blur-md border-b border-slate-800 z-30 flex flex-col gap-1.5 shrink-0 shadow-md">
      {/* Top row: Menu, Chapter badge, Sound */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onOpenMenu();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700/60 active:scale-95 transition-transform min-h-[36px]"
          aria-label="Buka Menu"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>

        {chapterTitle && (
          <div className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full truncate max-w-[200px]">
            <BookOpen className="w-3 h-3 shrink-0" />
            <span className="truncate">Ch.{chapterId || 1}: {chapterTitle}</span>
          </div>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onToggleMusic();
          }}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 active:scale-95 transition-transform"
          aria-label={musicEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
        >
          {musicEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {/* Bottom row: Score meters */}
      <div className="grid grid-cols-2 gap-2 relative">
        {/* Empathy Meter */}
        <div className="bg-slate-950/70 rounded-xl px-2.5 py-1.5 border border-pink-500/20 flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="flex items-center gap-1 text-pink-400 font-semibold">
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500 animate-pulse" />
              <span>Empati</span>
            </span>
            <span className="font-mono font-bold text-slate-200 tabular-nums">{empathy}/100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, empathy))}%` }}
            />
          </div>
        </div>

        {/* Trust Meter */}
        <div className="bg-slate-950/70 rounded-xl px-2.5 py-1.5 border border-blue-500/20 flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <Shield className="w-3 h-3 fill-blue-500 text-blue-500" />
              <span>Kepercayaan</span>
            </span>
            <span className="font-mono font-bold text-slate-200 tabular-nums">{trust}/100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, trust))}%` }}
            />
          </div>
        </div>

        {/* Floating Gain Badge Notification */}
        {floatingScore && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-score-gain">
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs rounded-full shadow-lg border border-yellow-200 flex items-center gap-1 whitespace-nowrap">
              <span>✨</span>
              <span>{floatingScore.text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
