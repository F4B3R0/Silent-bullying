import React, { useState, useEffect } from 'react';
import { COUNSELING_QUESTIONS } from '@/src/data/counselingData';
import { CHARACTERS } from '@/src/data/characters';
import { GAME_IMAGES } from '@/src/data/assets';
import { Heart, Shield, Sparkles, ChevronRight, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface CounselingScreenProps {
  empathy: number;
  trust: number;
  onUpdateScore: (empathyDelta: number, trustDelta: number, message: string) => void;
  onBackToMenu: () => void;
}

export const CounselingScreen: React.FC<CounselingScreenProps> = ({
  empathy,
  trust,
  onUpdateScore,
  onBackToMenu,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    sound.playCounselingBell();
  }, []);

  const currentQ = COUNSELING_QUESTIONS[currentQIndex];

  const handleSelectOption = (index: number) => {
    sound.playClick();
    setSelectedOptionIndex(index);
    const opt = currentQ.options[index];
    onUpdateScore(opt.empathyChange, opt.trustChange, 'Sesi Konsultasi BK');
    sound.playScoreGain();
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQIndex < COUNSELING_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartSession = () => {
    sound.playClick();
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsCompleted(false);
  };

  const buRahma = CHARACTERS.bu_rahma;

  return (
    <div
      className="flex-1 w-full flex flex-col relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${GAME_IMAGES.backgrounds.counselor_room})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />

      {/* Header bar */}
      <div className="relative z-10 w-full px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/60 flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMenu();
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700 min-h-[38px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <h2 className="text-xs sm:text-sm font-bold text-emerald-300">Ruang Konseling BK</h2>
          <p className="text-[10px] text-slate-400">Ruang Aman Tanpa Prasangka</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <span className="flex items-center gap-1 text-pink-400">
            <Heart className="w-3 h-3 fill-pink-500" /> {empathy}
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <Shield className="w-3 h-3 fill-blue-500" /> {trust}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col items-center justify-between">
        {!isCompleted ? (
          <div className="w-full max-w-sm flex flex-col gap-3 my-auto animate-float-up">
            {/* Counselor Avatar & Welcome Greeting */}
            <div className="flex items-center gap-3 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 shadow-lg">
              <img
                src={buRahma.avatar}
                alt="Bu Rahma"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-emerald-400 shrink-0"
              />
              <div className="flex-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                  Bu Rahma · Guru BK
                </span>
                <p className="text-xs text-slate-200 mt-1 leading-snug">
                  “Ibu di sini siap mendengarkan. Ceritakan apa saja yang ada di hatimu.”
                </p>
              </div>
            </div>

            {/* Step Progress indicator */}
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
              <span>Pertanyaan Konsultasi {currentQIndex + 1} dari {COUNSELING_QUESTIONS.length}</span>
              <span className="text-emerald-400 font-bold">{Math.round(((currentQIndex + 1) / COUNSELING_QUESTIONS.length) * 100)}%</span>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-xl">
              <h3 className="text-sm sm:text-base font-bold text-amber-300 mb-1 leading-snug">
                {currentQ.question}
              </h3>
              <p className="text-xs text-slate-400 mb-3">{currentQ.subtext}</p>

              {/* Options list */}
              {selectedOptionIndex === null ? (
                <div className="flex flex-col gap-2">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 active:scale-[0.98] border border-slate-700 hover:border-emerald-400/50 text-xs text-slate-100 transition-all flex items-start justify-between gap-2 shadow"
                    >
                      <span className="leading-snug">{opt.text}</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              ) : (
                /* Counselor Feedback Response */
                <div className="flex flex-col gap-3 animate-float-up">
                  {/* Selected Choice Pill */}
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 text-xs text-slate-300 italic">
                    “{currentQ.options[selectedOptionIndex].text}”
                  </div>

                  {/* Bu Rahma's Educational Response */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-100 leading-relaxed">
                    <span className="font-bold text-emerald-300 block mb-1">Tanggapan Bu Rahma:</span>
                    {currentQ.options[selectedOptionIndex].counselorResponse}
                  </div>

                  {/* Advice Card */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{currentQ.options[selectedOptionIndex].advice}</span>
                  </div>

                  {/* Next Step Button */}
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <span>{currentQIndex < COUNSELING_QUESTIONS.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesaikan Sesi Konseling'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Completed Session Card */
          <div className="w-full max-w-sm bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-center my-auto animate-float-up">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Sesi Konseling Selesai</h3>
              <p className="text-xs text-slate-300 mt-1">
                Terima kasih telah berani membuka diri. Kamu telah mengambil langkah besar untuk kesehatan mentalmu dan teman-temanmu.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 text-left">
              <span className="font-bold text-emerald-400 block mb-1">Catatan Penting Guru BK:</span>
              <p className="leading-relaxed">
                “Pintu Ruang BK selalu terbuka untukmu setiap jam sekolah. Jangan pernah ragu untuk mampir, berdiskusi, atau sekadar menenangkan pikiran.”
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onBackToMenu();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-transform min-h-[48px]"
              >
                Kembali ke Menu Utama
              </button>

              <button
                onClick={handleRestartSession}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Mulai Konsultasi Ulang</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
