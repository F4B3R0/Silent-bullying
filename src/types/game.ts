export type CharacterId = 'rian' | 'dina' | 'bu_rahma' | 'bima' | 'arif' | 'narasi' | 'siswa_lain';

export type Emotion = 'neutral' | 'happy' | 'sad' | 'worried' | 'confident' | 'angry' | 'thinking';

export type LocationId = 'classroom' | 'hallway' | 'counselor_room' | 'field' | 'home' | 'chat';

export interface Choice {
  id: string;
  text: string;
  empathyChange: number;
  trustChange: number;
  educationalInsight: string;
  nextNodeId: string;
  category?: 'bantu' | 'lapor' | 'abaikan' | 'tanya';
}

export interface EducationalNote {
  title: string;
  category: 'verbal' | 'relational' | 'cyber' | 'bystander' | 'counseling';
  content: string;
  keyTakeaway: string;
  legalContext?: string; // Permendikbudristek No 46/2023
}

export interface ChatMessage {
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isUser?: boolean;
  isAggressive?: boolean;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  characterId: CharacterId;
  emotion: Emotion;
  text: string;
  location: LocationId;
  choices?: Choice[];
  next?: string;
  chapterEnd?: boolean;
  educationalNote?: EducationalNote;
  isChatMode?: boolean;
  chatMessages?: ChatMessage[];
  onEnter?: {
    empathyChange?: number;
    trustChange?: number;
    message?: string;
  };
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  initialNodeId: string;
  badge: string;
  color: string;
  learningGoal: string;
  nodes: Record<string, DialogueNode>;
}

export interface Ending {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badgeName: string;
  minEmpathy: number;
  minTrust: number;
  ratingTier: 'Emas' | 'Perak' | 'Perunggu';
  keyLessons: string[];
  recommendation: string;
}

export interface CounselingQuestion {
  id: string;
  question: string;
  subtext: string;
  options: {
    text: string;
    counselorResponse: string;
    advice: string;
    empathyChange: number;
    trustChange: number;
  }[];
}

export interface GameSaveState {
  currentChapterId: number;
  currentNodeId: string;
  empathyScore: number;
  trustScore: number;
  completedChapters: number[];
  visitedNodes: string[];
  choicesHistory: {
    chapterId: number;
    choiceText: string;
    insight: string;
  }[];
  lastPlayedDate: string;
}
