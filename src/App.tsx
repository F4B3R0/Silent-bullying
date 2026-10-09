import React, { useState, useEffect, useCallback } from 'react';
import { AndroidFrame } from '@/src/components/AndroidFrame';
import { MainMenu } from '@/src/components/MainMenu';
import { TopHUD } from '@/src/components/TopHUD';
import { CharacterStage } from '@/src/components/CharacterStage';
import { DialogueBox } from '@/src/components/DialogueBox';
import { ChatScreen } from '@/src/components/ChatScreen';
import { CounselingScreen } from '@/src/components/CounselingScreen';
import { EndingScreen } from '@/src/components/EndingScreen';
import { ChapterSelectModal } from '@/src/components/ChapterSelectModal';
import { SettingsModal } from '@/src/components/SettingsModal';
import { AboutModal } from '@/src/components/AboutModal';
import { EducationalModal } from '@/src/components/EducationalModal';

import { CHAPTERS } from '@/src/data/chaptersData';
import { GAME_IMAGES } from '@/src/data/assets';
import { sound } from '@/src/services/soundManager';
import { Choice, EducationalNote, GameSaveState } from '@/src/types/game';

type AppScreen = 'MENU' | 'PLAYING' | 'COUNSELING' | 'ENDING';

const SAVE_KEY = 'berani_bicara_save';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('MENU');
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [currentNodeId, setCurrentNodeId] = useState<string>('c1_start');
  const [empathy, setEmpathy] = useState<number>(0);
  const [trust, setTrust] = useState<number>(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  // Modals state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showChapterSelect, setShowChapterSelect] = useState<boolean>(false);
  const [activeEducationalNote, setActiveEducationalNote] = useState<EducationalNote | null>(null);

  // Audio state
  const [musicEnabled, setMusicEnabled] = useState<boolean>(sound.musicEnabled);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(sound.sfxEnabled);

  // Floating score notification
  const [floatingScore, setFloatingScore] = useState<{
    text: string;
    type: 'empathy' | 'trust' | 'both';
  } | null>(null);

  // Load saved state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved: GameSaveState = JSON.parse(raw);
        if (saved && saved.currentChapterId) {
          setCurrentChapterId(saved.currentChapterId);
          setCurrentNodeId(saved.currentNodeId || 'c1_start');
          setEmpathy(saved.empathyScore || 0);
          setTrust(saved.trustScore || 0);
          setCompletedChapters(saved.completedChapters || []);
          setHasSavedGame(true);
        }
      }
    } catch {
      // Storage parsing fallback
    }
  }, []);

  // Save state helper
  const saveCurrentProgress = useCallback((chapId: number, nodeId: string, emp: number, tru: number, comp: number[]) => {
    try {
      const stateToSave: GameSaveState = {
        currentChapterId: chapId,
        currentNodeId: nodeId,
        empathyScore: emp,
        trustScore: tru,
        completedChapters: comp,
        visitedNodes: [],
        choicesHistory: [],
        lastPlayedDate: new Date().toISOString(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
      setHasSavedGame(true);
    } catch {
      // Storage fallback
    }
  }, []);

  const triggerFloatingScore = (empDelta: number, truDelta: number) => {
    if (empDelta === 0 && truDelta === 0) return;
    let text = '';
    let type: 'empathy' | 'trust' | 'both' = 'both';

    if (empDelta > 0 && truDelta > 0) {
      text = `+${empDelta} Empati · +${truDelta} Kepercayaan`;
      type = 'both';
    } else if (empDelta > 0) {
      text = `+${empDelta} Empati`;
      type = 'empathy';
    } else {
      text = `+${truDelta} Kepercayaan`;
      type = 'trust';
    }

    setFloatingScore({ text, type });
    setTimeout(() => {
      setFloatingScore(null);
    }, 2000);
  };

  const handleUpdateScore = (empDelta: number, truDelta: number, _label?: string) => {
    const newEmp = Math.min(100, Math.max(0, empathy + empDelta));
    const newTru = Math.min(100, Math.max(0, trust + truDelta));
    setEmpathy(newEmp);
    setTrust(newTru);
    triggerFloatingScore(empDelta, truDelta);
    saveCurrentProgress(currentChapterId, currentNodeId, newEmp, newTru, completedChapters);
  };

  // Start new game
  const handleStartNewGame = () => {
    sound.playTransition();
    sound.startBgm();
    setCurrentChapterId(1);
    setCurrentNodeId('c1_start');
    setEmpathy(10);
    setTrust(10);
    setCompletedChapters([]);
    setScreen('PLAYING');
    saveCurrentProgress(1, 'c1_start', 10, 10, []);
  };

  // Resume game
  const handleResumeGame = () => {
    sound.playTransition();
    sound.startBgm();
    setScreen('PLAYING');
  };

  // Select chapter
  const handleSelectChapter = (chapId: number) => {
    sound.playTransition();
    sound.startBgm();
    const targetChap = CHAPTERS.find((c) => c.id === chapId) || CHAPTERS[0];
    setCurrentChapterId(chapId);
    setCurrentNodeId(targetChap.initialNodeId);
    setShowChapterSelect(false);
    setScreen('PLAYING');
    saveCurrentProgress(chapId, targetChap.initialNodeId, empathy, trust, completedChapters);
  };

  // Toggle audio
  const handleToggleMusic = (val?: boolean) => {
    const nextVal = typeof val === 'boolean' ? val : !musicEnabled;
    setMusicEnabled(nextVal);
    sound.setMusicEnabled(nextVal);
  };

  const handleToggleSfx = (val?: boolean) => {
    const nextVal = typeof val === 'boolean' ? val : !sfxEnabled;
    setSfxEnabled(nextVal);
    sound.setSfxEnabled(nextVal);
  };

  // Reset entire game progress
  const handleResetProgress = () => {
    localStorage.removeItem(SAVE_KEY);
    setCurrentChapterId(1);
    setCurrentNodeId('c1_start');
    setEmpathy(0);
    setTrust(0);
    setCompletedChapters([]);
    setHasSavedGame(false);
    setShowSettings(false);
    setScreen('MENU');
  };

  // Visual novel active chapter and node
  const activeChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const currentNode = activeChapter.nodes[currentNodeId] || activeChapter.nodes[activeChapter.initialNodeId];

  // Advance dialogue to next
  const handleNextDialogue = () => {
    if (!currentNode) return;

    // Check if node is chapter end
    if (currentNode.chapterEnd) {
      handleChapterFinished();
      return;
    }

    if (currentNode.next && activeChapter.nodes[currentNode.next]) {
      const nextNode = activeChapter.nodes[currentNode.next];
      setCurrentNodeId(currentNode.next);

      // Handle onEnter triggers
      if (nextNode.onEnter) {
        if (nextNode.onEnter.empathyChange || nextNode.onEnter.trustChange) {
          const emp = nextNode.onEnter.empathyChange || 0;
          const tru = nextNode.onEnter.trustChange || 0;
          sound.playScoreGain();
          handleUpdateScore(emp, tru);
        }
      }

      saveCurrentProgress(currentChapterId, currentNode.next, empathy, trust, completedChapters);
    } else {
      // If no next node, consider chapter finished
      handleChapterFinished();
    }
  };

  // Select choice
  const handleSelectChoice = (choice: Choice) => {
    sound.playScoreGain();
    const newEmp = Math.min(100, Math.max(0, empathy + choice.empathyChange));
    const newTru = Math.min(100, Math.max(0, trust + choice.trustChange));
    setEmpathy(newEmp);
    setTrust(newTru);
    triggerFloatingScore(choice.empathyChange, choice.trustChange);

    if (choice.nextNodeId && activeChapter.nodes[choice.nextNodeId]) {
      const nextNode = activeChapter.nodes[choice.nextNodeId];
      setCurrentNodeId(choice.nextNodeId);

      if (nextNode.onEnter) {
        const emp = nextNode.onEnter.empathyChange || 0;
        const tru = nextNode.onEnter.trustChange || 0;
        if (emp || tru) {
          handleUpdateScore(emp, tru);
        }
      }

      saveCurrentProgress(currentChapterId, choice.nextNodeId, newEmp, newTru, completedChapters);
    } else {
      handleChapterFinished();
    }
  };

  // Handle chapter completion
  const handleChapterFinished = () => {
    sound.playTransition();

    // Mark chapter completed
    const updatedCompleted = Array.from(new Set([...completedChapters, currentChapterId]));
    setCompletedChapters(updatedCompleted);

    // If educational note exists, trigger modal
    if (currentNode.educationalNote) {
      setActiveEducationalNote(currentNode.educationalNote);
    } else {
      proceedAfterChapterCompletion(updatedCompleted);
    }
  };

  const proceedAfterChapterCompletion = (updatedCompleted: number[]) => {
    // If it was the final chapter (Chapter 5), go to Ending
    if (currentChapterId >= 5) {
      setScreen('ENDING');
      saveCurrentProgress(currentChapterId, currentNodeId, empathy, trust, updatedCompleted);
      return;
    }

    // Otherwise, unlock next chapter
    const nextChapId = currentChapterId + 1;
    const nextChap = CHAPTERS.find((c) => c.id === nextChapId);
    if (nextChap) {
      setCurrentChapterId(nextChapId);
      setCurrentNodeId(nextChap.initialNodeId);
      saveCurrentProgress(nextChapId, nextChap.initialNodeId, empathy, trust, updatedCompleted);
    } else {
      setScreen('ENDING');
    }
  };

  const handleCloseEducationalModal = () => {
    setActiveEducationalNote(null);
    proceedAfterChapterCompletion(completedChapters);
  };

  // Get current background image
  const getBackgroundImage = (): string => {
    if (!currentNode) return GAME_IMAGES.backgrounds.classroom;
    switch (currentNode.location) {
      case 'classroom':
        return GAME_IMAGES.backgrounds.classroom;
      case 'hallway':
        return GAME_IMAGES.backgrounds.hallway;
      case 'counselor_room':
        return GAME_IMAGES.backgrounds.counselor_room;
      case 'field':
        return GAME_IMAGES.backgrounds.hallway;
      case 'home':
        return GAME_IMAGES.backgrounds.classroom;
      default:
        return GAME_IMAGES.backgrounds.classroom;
    }
  };

  return (
    <AndroidFrame>
      {/* SCREEN: MAIN MENU */}
      {screen === 'MENU' && (
        <MainMenu
          hasSavedGame={hasSavedGame}
          empathy={empathy}
          trust={trust}
          onNewGame={handleStartNewGame}
          onResumeGame={handleResumeGame}
          onOpenChapters={() => setShowChapterSelect(true)}
          onOpenCounseling={() => {
            sound.playTransition();
            setScreen('COUNSELING');
          }}
          onOpenSettings={() => setShowSettings(true)}
          onOpenAbout={() => setShowAbout(true)}
        />
      )}

      {/* SCREEN: PLAYING (Visual Novel or Chat) */}
      {screen === 'PLAYING' && (
        <div
          className="flex-1 w-full flex flex-col justify-between relative overflow-hidden bg-cover bg-center select-none"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        >
          {/* Subtle dark gradient overlay for optimal text legibility */}
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />

          {/* Top HUD with Empathy and Trust */}
          <TopHUD
            empathy={empathy}
            trust={trust}
            chapterId={activeChapter.id}
            chapterTitle={activeChapter.badge}
            onOpenMenu={() => setScreen('MENU')}
            musicEnabled={musicEnabled}
            onToggleMusic={() => handleToggleMusic()}
            floatingScore={floatingScore}
          />

          {/* Special mode: Chat Screen for Chapter 3 Cyberbullying */}
          {currentNode.isChatMode ? (
            <ChatScreen
              messages={currentNode.chatMessages || []}
              choices={currentNode.choices}
              onSelectChoice={handleSelectChoice}
              onNext={handleNextDialogue}
              speakerPrompt={currentNode.text}
            />
          ) : (
            <>
              {/* Visual Novel Character Stage */}
              <CharacterStage
                characterId={currentNode.characterId}
                emotion={currentNode.emotion}
                speakerName={currentNode.speaker}
              />

              {/* Bottom Visual Novel Dialogue Box */}
              <DialogueBox
                speaker={currentNode.speaker}
                characterId={currentNode.characterId}
                text={currentNode.text}
                choices={currentNode.choices}
                onSelectChoice={handleSelectChoice}
                onNext={handleNextDialogue}
                isEndNode={currentNode.chapterEnd}
              />
            </>
          )}
        </div>
      )}

      {/* SCREEN: BK COUNSELING */}
      {screen === 'COUNSELING' && (
        <CounselingScreen
          empathy={empathy}
          trust={trust}
          onUpdateScore={handleUpdateScore}
          onBackToMenu={() => setScreen('MENU')}
        />
      )}

      {/* SCREEN: ENDING */}
      {screen === 'ENDING' && (
        <EndingScreen
          empathy={empathy}
          trust={trust}
          onRestart={() => {
            setScreen('MENU');
          }}
        />
      )}

      {/* MODALS */}
      {showChapterSelect && (
        <ChapterSelectModal
          completedChapters={completedChapters}
          onSelectChapter={handleSelectChapter}
          onClose={() => setShowChapterSelect(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          musicEnabled={musicEnabled}
          sfxEnabled={sfxEnabled}
          onToggleMusic={handleToggleMusic}
          onToggleSfx={handleToggleSfx}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}

      {activeEducationalNote && (
        <EducationalModal
          note={activeEducationalNote}
          onClose={handleCloseEducationalModal}
        />
      )}
    </AndroidFrame>
  );
}
