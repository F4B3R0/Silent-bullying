import { CharacterId, Emotion } from '@/src/types/game';
import { GAME_IMAGES } from './assets';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  role: string;
  avatar: string;
  themeColor: string;
  badgeBg: string;
  description: string;
}

export const CHARACTERS: Record<CharacterId, CharacterInfo> = {
  rian: {
    id: 'rian',
    name: 'Rian (Kamu)',
    role: 'Siswa SMA Kelas 10',
    avatar: GAME_IMAGES.characters.rian,
    themeColor: '#3B82F6', // Blue
    badgeBg: 'bg-blue-600',
    description: 'Siswa yang peduli pada lingkungan sekolah dan berusaha menumbuhkan keberanian untuk bersuara.',
  },
  dina: {
    id: 'dina',
    name: 'Dina',
    role: 'Teman Sekelas',
    avatar: GAME_IMAGES.characters.dina,
    themeColor: '#EC4899', // Pink
    badgeBg: 'bg-pink-600',
    description: 'Siswi yang ramah, gemar membaca, namun sempat merasa terasing karena rumor yang tidak benar.',
  },
  bu_rahma: {
    id: 'bu_rahma',
    name: 'Bu Rahma',
    role: 'Guru Bimbingan Konseling (BK)',
    avatar: GAME_IMAGES.characters.bu_rahma,
    themeColor: '#10B981', // Emerald
    badgeBg: 'bg-emerald-600',
    description: 'Konselor sekolah yang hangat, bijaksana, dan siap mendengarkan tanpa menghakimi.',
  },
  arif: {
    id: 'arif',
    name: 'Arif',
    role: 'Teman Sekelas',
    avatar: GAME_IMAGES.characters.arif,
    themeColor: '#8B5CF6', // Purple
    badgeBg: 'bg-purple-600',
    description: 'Siswa pendiam yang kerap menjadi target candaan berlebihan dan membutuhkan teman yang tulus.',
  },
  bima: {
    id: 'bima',
    name: 'Bima',
    role: 'Teman Sekelas',
    avatar: GAME_IMAGES.characters.bima,
    themeColor: '#F59E0B', // Amber
    badgeBg: 'bg-amber-600',
    description: 'Siswa yang vokal dan suka bercanda, namun sering tidak sadar candaannya melewati batas dan menyakiti.',
  },
  siswa_lain: {
    id: 'siswa_lain',
    name: 'Siswa Lain',
    role: 'Warga Sekolah',
    avatar: GAME_IMAGES.characters.siswa_lain,
    themeColor: '#64748B', // Slate
    badgeBg: 'bg-slate-600',
    description: 'Teman-teman di sekitar lingkungan sekolah.',
  },
  narasi: {
    id: 'narasi',
    name: 'Suara Hati & Situasi',
    role: 'Narator',
    avatar: '',
    themeColor: '#475569',
    badgeBg: 'bg-slate-700',
    description: 'Pengantar cerita dan situasi yang terjadi.',
  },
};

export const EMOTION_BADGES: Record<Emotion, { label: string; icon: string }> = {
  neutral: { label: 'Biasa', icon: '😐' },
  happy: { label: 'Senang', icon: '😊' },
  sad: { label: 'Sedih', icon: '😢' },
  worried: { label: 'Cemas', icon: '😟' },
  confident: { label: 'Tegas & Berani', icon: '✨' },
  angry: { label: 'Kesal', icon: '😠' },
  thinking: { label: 'Berpikir', icon: '🤔' },
};
