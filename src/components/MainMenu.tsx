import React from 'react';
import { GAME_IMAGES } from '@/src/data/assets';
import { Play, PlayCircle, BookOpen, MessageSquareHeart, Settings, HelpCircle, Heart, Shield, LogOut } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface MainMenuProps {
  hasSavedGame: boolean;
  empathy: number;
  trust: number;
  onNewGame: () => void;
  onResumeGame: () => void;
  onOpenChapters: () => void;
  onOpenCounseling: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  hasSavedGame,
  empathy,
  trust,
  onNewGame,
  onResumeGame,
  onOpenChapters,
  onOpenCounseling,
  onOpenSettings,
  onOpenAbout,
}) => {
  return (
    <div
      className="flex-1 w-full flex flex-col justify-between p-4 relative overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${GAME_IMAGES.cover})` }}
    >
      {/* Dynamic gradient overlay to ensure contrast and vibrant colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/50" />

      {/* Top Bar with Mini Stats */}
      <div className="relative z-10 w-full flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs">
          <span className="flex items-center gap-1 text-pink-400 font-bold">
            <Heart className="w-3.5 h-3.5 fill-pink-500" /> {empathy}
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1 text-blue-400 font-bold">
            <Shield className="w-3.5 h-3.5 fill-blue-500" /> {trust}
          </span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Pengaturan"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Center Game Title Branding */}
      <div className="relative z-10 text-center my-auto flex flex-col items-center animate-float-up">
        {/* Decorative Badge */}
        <div className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 font-bold text-xs uppercase tracking-wider mb-2 backdrop-blur-sm">
          Game Edukasi Anti-Bullying
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-pink-300 drop-shadow-md tracking-tight">
          BERANI BICARA
        </h1>

        <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-[280px] font-medium drop-shadow">
          Suaramu Berarti. Peduli Sesama, Wujudkan Sekolah Ramah Anak.
        </p>
      </div>

      {/* Main Menu Action Buttons (Large, finger-friendly) */}
      <div className="relative z-10 flex flex-col gap-2.5 w-full max-w-xs mx-auto pb-2">
        {/* Lanjutkan (if saved game exists) */}
        {hasSavedGame && (
          <button
            onClick={() => {
              sound.playClick();
              onResumeGame();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[50px]"
          >
            <PlayCircle className="w-5 h-5 text-emerald-200" />
            <span>Lanjutkan Cerita</span>
          </button>
        )}

        {/* Mulai Game */}
        <button
          onClick={() => {
            sound.playClick();
            onNewGame();
          }}
          className={`w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[50px] ${
            hasSavedGame
              ? 'bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-100'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{hasSavedGame ? 'Mulai Cerita Baru' : 'Mulai Game'}</span>
        </button>

        {/* Pilih Chapter */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenChapters();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[46px]"
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Pilih Chapter (5 Chapter)</span>
        </button>

        {/* Konsultasi dengan Guru BK */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenCounseling();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-900/40 to-purple-900/40 hover:from-pink-900/60 hover:to-purple-900/60 backdrop-blur-md border border-pink-500/40 text-pink-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[46px]"
        >
          <MessageSquareHeart className="w-4 h-4 text-pink-400" />
          <span>Konsultasi dengan Guru BK</span>
        </button>

        {/* Bottom row: Pengaturan & Tentang */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-transform min-h-[42px]"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Pengaturan</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenAbout();
            }}
            className="py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-transform min-h-[42px]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Tentang Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
