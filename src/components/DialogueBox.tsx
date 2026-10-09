import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Choice } from '@/src/types/game';
import { CHARACTERS } from '@/src/data/characters';
import { CharacterId } from '@/src/types/game';
import { sound } from '@/src/services/soundManager';

interface DialogueBoxProps {
  speaker: string;
  characterId: CharacterId;
  text: string;
  choices?: Choice[];
  onSelectChoice: (choice: Choice) => void;
  onNext: () => void;
  isEndNode?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  characterId,
  text,
  choices,
  onSelectChoice,
  onNext,
  isEndNode,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  const handleBoxClick = () => {
    // If still typing, immediately complete text
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // If no choices, advance to next dialogue
    if (!choices || choices.length === 0) {
      sound.playClick();
      onNext();
    }
  };

  const charInfo = CHARACTERS[characterId] || CHARACTERS.rian;

  return (
    <div className="w-full p-3 z-30 shrink-0">
      {/* Dialogue Main Container */}
      <div
        onClick={handleBoxClick}
        className="w-full bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-4 shadow-2xl relative cursor-pointer active:border-slate-500 transition-colors"
      >
        {/* Speaker Name Tag */}
        <div className="flex items-center justify-between mb-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5 ${
              charInfo.badgeBg || 'bg-blue-600'
            }`}
          >
            <span>{speaker}</span>
          </div>

          {!choices && (
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <span>{isTyping ? 'Mengetik...' : 'Ketuk untuk lanjut'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="min-h-[64px] flex items-start">
          <p className="text-slate-100 text-[15px] sm:text-base leading-relaxed tracking-normal font-normal">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-blue-400 animate-pulse" />}
          </p>
        </div>

        {/* Choices Container (Rendered when text finished or when choices exist) */}
        {choices && choices.length > 0 && !isTyping && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col gap-2.5 animate-float-up">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentukan Pilihan Tindakanmu:</span>
            </div>

            <div className="flex flex-col gap-2">
              {choices.map((choice, index) => (
                <button
                  key={choice.id || index}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    onSelectChoice(choice);
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 active:scale-[0.98] transition-all border border-slate-700 hover:border-blue-400/60 shadow-md group flex items-start justify-between gap-2 min-h-[48px]"
                >
                  <span className="text-xs sm:text-sm font-medium text-slate-100 group-hover:text-blue-300 transition-colors leading-snug">
                    {choice.text}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button for mobile tap affordance when no choices */}
        {(!choices || choices.length === 0) && !isTyping && (
          <div className="mt-2 pt-2 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onNext();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 active:scale-95 transition-transform min-h-[40px]"
            >
              <span>{isEndNode ? 'Selesaikan Chapter' : 'Lanjut'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
