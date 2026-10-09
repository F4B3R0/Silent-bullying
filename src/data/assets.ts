import coverArt from '@/src/assets/images/game_cover_art_1790169497619.jpg';
import bgClassroom from '@/src/assets/images/bg_school_classroom_1790169515260.jpg';
import bgHallway from '@/src/assets/images/bg_school_hallway_1790169530593.jpg';
import bgCounselor from '@/src/assets/images/bg_counselor_room_1790169546551.jpg';

import charRian from '@/src/assets/images/char_rian_1790169603908.jpg';
import charDina from '@/src/assets/images/char_dina_1790169564307.jpg';
import charBuRahma from '@/src/assets/images/char_bu_rahma_1790169585061.jpg';
import charArif from '@/src/assets/images/char_arif_1790169620114.jpg';

export const GAME_IMAGES = {
  cover: coverArt,
  backgrounds: {
    classroom: bgClassroom,
    hallway: bgHallway,
    counselor_room: bgCounselor,
    field: bgHallway, // warm outdoor/field backdrop
    home: bgClassroom, // study room
    chat: bgClassroom,
  },
  characters: {
    rian: charRian,
    dina: charDina,
    bu_rahma: charBuRahma,
    arif: charArif,
    bima: charRian, // Stylized alternative badge
    siswa_lain: charArif,
  }
};
