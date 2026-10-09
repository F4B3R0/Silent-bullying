import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const [time, setTime] = useState<string>('08:00');
  const [isPhoneMockup, setIsPhoneMockup] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-0 md:p-4 select-none overflow-hidden relative">
      {/* Desktop Helper Toggle */}
      <div className="hidden md:flex absolute top-3 right-4 z-50 items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300">
        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
        <span>Mode Android Portrait</span>
        <button
          onClick={() => setIsPhoneMockup(!isPhoneMockup)}
          className="ml-2 px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-medium transition-colors"
          title="Ubah Tampilan"
        >
          {isPhoneMockup ? (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Penuh
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Minimize2 className="w-3 h-3" /> Frame HP
            </span>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col overflow-hidden bg-slate-900 ${
          isPhoneMockup
            ? 'md:w-[420px] md:h-[860px] md:max-h-[92vh] md:rounded-[42px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
            : 'w-full h-screen max-w-2xl'
        } h-screen md:h-[860px]`}
      >
        {/* Android Status Bar */}
        <div className="w-full h-8 px-5 pt-1.5 flex items-center justify-between text-xs text-slate-200 z-40 bg-slate-950/60 backdrop-blur-sm shrink-0">
          <span className="font-semibold tracking-tight text-[13px]">{time}</span>
          
          {/* Camera Punch Hole on Desktop Frame */}
          <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border border-slate-700/60 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            {/* VoLTE / 4G */}
            <span className="text-[10px] font-mono text-emerald-400 font-bold">4G+</span>
            {/* Signal */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7 0 1.5-.47 2.89-1.27 4.03L12 19.38l-5.73-3.35C5.47 14.89 5 13.5 5 12c0-3.87 3.13-7 7-7z" />
            </svg>
            {/* Battery */}
            <div className="w-5 h-2.5 border border-slate-300 rounded-[2px] p-[1px] flex items-center">
              <div className="h-full w-4/5 bg-emerald-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Android Home Navigation Bar Pill */}
        <div className="w-full h-4 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center shrink-0 z-40">
          <div className="w-28 h-1 bg-slate-400/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};
