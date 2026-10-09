import React, { useEffect } from 'react';
import { ChatMessage, Choice } from '@/src/types/game';
import { ArrowLeft, MoreVertical, Send, CheckCheck, ShieldAlert } from 'lucide-react';
import { sound } from '@/src/services/soundManager';

interface ChatScreenProps {
  messages: ChatMessage[];
  choices?: Choice[];
  onSelectChoice: (choice: Choice) => void;
  onNext: () => void;
  speakerPrompt: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  choices,
  onSelectChoice,
  onNext,
  speakerPrompt,
}) => {
  useEffect(() => {
    sound.playNotification();
  }, [messages]);

  return (
    <div className="flex-1 w-full bg-[#0b141a] flex flex-col overflow-hidden relative font-sans">
      {/* WhatsApp style header */}
      <div className="w-full bg-[#1f2c34] px-3 py-2 flex items-center justify-between text-slate-100 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNext()}
            className="p-1 hover:bg-slate-700/50 rounded-full"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
          </button>
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
            XA
          </div>
          <div>
            <h3 className="text-xs font-semibold leading-tight flex items-center gap-1">
              <span>Anak X-A Seru 🔥</span>
            </h3>
            <p className="text-[10px] text-slate-400">34 anggota · Bima, Dina, Arif, Kamu...</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Cyberbullying Warning Banner */}
      <div className="bg-amber-950/80 border-b border-amber-800/60 px-3 py-1.5 flex items-center gap-2 text-[11px] text-amber-200">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">Perhatian: Konten chat memuat indikasi perundungan siber!</span>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
        <div className="self-center px-2 py-0.5 bg-[#182229] rounded text-[10px] text-slate-400 my-1 shadow-sm">
          Hari Ini · 20.12 WIB
        </div>

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] rounded-2xl p-2.5 shadow-md animate-float-up ${
              msg.isUser
                ? 'self-end bg-[#005c4b] text-slate-100 rounded-tr-none'
                : msg.isAggressive
                ? 'self-start bg-[#202c33] text-slate-100 border-l-4 border-amber-500 rounded-tl-none'
                : 'self-start bg-[#202c33] text-slate-100 rounded-tl-none'
            }`}
          >
            {!msg.isUser && (
              <span className="text-[11px] font-bold text-amber-400 mb-0.5 flex items-center gap-1">
                <span>{msg.avatar}</span>
                <span>{msg.sender}</span>
              </span>
            )}
            <p className="text-xs sm:text-[13px] leading-relaxed break-words">{msg.text}</p>
            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
              <span>{msg.time}</span>
              {msg.isUser && <CheckCheck className="w-3 h-3 text-blue-400" />}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Reply Area */}
      <div className="p-3 bg-[#1f2c34] border-t border-slate-800 z-20">
        {speakerPrompt && (
          <p className="text-[11px] text-slate-300 mb-2 italic px-1 font-medium">
            💡 {speakerPrompt}
          </p>
        )}

        {choices && choices.length > 0 ? (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-emerald-400 px-1">Pilih Tindakan / Balasan:</span>
            {choices.map((choice, i) => (
              <button
                key={choice.id || i}
                onClick={() => {
                  sound.playClick();
                  onSelectChoice(choice);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-[#2a3942] hover:bg-[#32444f] active:scale-[0.98] border border-slate-700 text-xs text-slate-100 transition-colors flex items-center justify-between gap-2 shadow"
              >
                <span className="line-clamp-2">{choice.text}</span>
                <Send className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 bg-[#2a3942] px-3 py-2 rounded-xl text-xs text-slate-400">
              Pesan ditinjau oleh sistem...
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold active:scale-95 transition-transform"
            >
              Lanjut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
