import React from 'react';
import { CharacterId, Emotion } from '@/src/types/game';
import { CHARACTERS, EMOTION_BADGES } from '@/src/data/characters';
import { User } from 'lucide-react';

interface CharacterStageProps {
  characterId: CharacterId;
  emotion: Emotion;
  speakerName: string;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  characterId,
  emotion,
  speakerName,
}) => {
  // If narrator, show clean ambiance stage
  if (characterId === 'narasi') {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 text-center max-w-xs animate-float-up">
          <span className="text-2xl mb-1 block">🏫</span>
          <p className="text-xs text-slate-300 font-medium italic">Lingkungan Sekolah Ramah Anak</p>
        </div>
      </div>
    );
  }

  const charInfo = CHARACTERS[characterId] || CHARACTERS.rian;
  const emotionInfo = EMOTION_BADGES[emotion] || EMOTION_BADGES.neutral;

  return (
    <div className="flex-1 w-full relative flex flex-col items-center justify-end pb-2 overflow-hidden select-none pointer-events-none">
      {/* Emotion indicator pill */}
      <div className="absolute top-3 z-20 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700/60 text-xs text-slate-200 flex items-center gap-1.5 shadow-md animate-float-up">
        <span>{emotionInfo.icon}</span>
        <span className="font-medium text-[11px] text-slate-300">{emotionInfo.label}</span>
      </div>

      {/* Character Portrait Container */}
      <div className="relative z-10 w-56 h-64 sm:w-64 sm:h-72 flex items-end justify-center transition-all duration-300 animate-float-up">
        {charInfo.avatar ? (
          <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-t from-slate-900 via-transparent to-transparent shadow-2xl overflow-hidden border-2 border-slate-600/40">
            <img
              src={charInfo.avatar}
              alt={charInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top rounded-full transition-transform duration-300 animate-pulse-subtle"
            />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-slate-800 flex items-center justify-center border-4 border-slate-700 shadow-xl">
            <User className="w-20 h-20 text-slate-300" />
          </div>
        )}

        {/* Character Role Tag */}
        <div className="absolute -bottom-1 px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] text-slate-300 font-semibold shadow-md whitespace-nowrap">
          {speakerName} · {charInfo.role}
        </div>
      </div>
    </div>
  );
};
