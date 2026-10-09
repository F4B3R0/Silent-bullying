import React from 'react';
import { X, Volume2, VolumeX, Music, Bell, RotateCcw } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface SettingsModalProps {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic: (val: boolean) => void;
  onToggleSfx: (val: boolean) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  musicEnabled,
  sfxEnabled,
  onToggleMusic,
  onToggleSfx,
  onResetProgress,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-heading">Pengaturan Game</h3>
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

        {/* Settings Controls */}
        <div className="flex flex-col gap-3 py-1">
          {/* Music Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-100 block">Musik Latar (BGM)</span>
                <span className="text-[10px] text-slate-400">Melodi sekolah yang tenang</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onToggleMusic(!musicEnabled);
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
                musicEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle Musik"
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* SFX Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-100 block">Efek Suara (SFX)</span>
                <span className="text-[10px] text-slate-400">Ketukan tombol & poin</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onToggleSfx(!sfxEnabled);
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
                sfxEnabled ? 'bg-pink-600 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle Efek Suara"
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Reset Game Data */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                if (window.confirm('Apakah kamu yakin ingin mereset seluruh progress skor dan chapter?')) {
                  onResetProgress();
                }
              }}
              className="w-full py-3 px-4 rounded-2xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-600/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span>Reset Seluruh Progress Game</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-transform"
        >
          Selesai & Simpan
        </button>
      </div>
    </div>
  );
};
