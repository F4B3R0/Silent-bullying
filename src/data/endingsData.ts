import { Ending } from '@/src/types/game';

export const ENDINGS: Ending[] = [
  {
    id: 'ending_pelopor_emas',
    title: 'Pelopor & Duta Berani Bicara',
    subtitle: 'Keseimbangan Sempurna antara Empati Tinggi & Keberanian Melapor',
    ratingTier: 'Emas',
    badgeName: 'Duta Sekolah Ramah Anak',
    minEmpathy: 70,
    minTrust: 70,
    description: 'Kamu membuktikan bahwa keberanian sejati bukanlah tentang kekuatan fisik, melainkan tentang ketegasan hati membela yang lemah dan kebijaksanaan mencari bantuan otoritas. Berkat tindakanmu, kelasmu kini menjadi ruang yang aman dan penuh kehangatan bagi semua siswa.',
    keyLessons: [
      'Mampu membedakan candaan biasa dengan perundungan verbal yang merusak.',
      'Merangkul teman yang terisolasi dan memotong sirkulasi gosip beracun.',
      'Menghentikan laju cyberbullying dengan screenshot bukti dan menolak membagikan konten merendahkan.',
      'Menerapkan strategi 5D secara cerdas saat menjadi saksi perundungan.',
      'Mempercayai Guru BK dan orang tua sebagai mitra perlindungan terbaik.',
    ],
    recommendation: 'Teruslah menjadi teladan kebaikan di manapun kamu berada. Sebarkan semangat bahwa satu suara keberanian bisa menyelamatkan masa depan seorang sahabat.',
  },
  {
    id: 'ending_sahabat_empatik',
    title: 'Sahabat Sejati Penuh Empati',
    subtitle: 'Sentuhan Kasih yang Memulihkan Hati Teman yang Terluka',
    ratingTier: 'Perak',
    badgeName: 'Penjaga Persahabatan Tulus',
    minEmpathy: 60,
    minTrust: 30,
    description: 'Kamu memiliki kepekaan emosional yang sangat tinggi. Kamu tidak pernah membiarkan teman menangis sendirian di sudut sekolah. Kehadiran dan pelukan hangatmu mengembalikan senyuman Arif dan Dina.',
    keyLessons: [
      'Empatimu yang dalam membuat korban bullying merasa dihargai kembali.',
      'Selalu siap mendengarkan tanpa menghakimi perasaan orang lain.',
      'Mulai belajar mempercayai guru dan konselor sekolah untuk menyelesaikan masalah yang lebih besar.',
    ],
    recommendation: 'Langkah selanjutnya: Terus tingkatkan kepercayaanmu pada otoritas sekolah agar kamu tidak memikul beban melindungi teman seorang diri.',
  },
  {
    id: 'ending_penjaga_keadilan',
    title: 'Penjaga Keadilan & Kebenaran',
    subtitle: 'Ketegasan Memutus Rantai Kekerasan Lewat Jalur yang Tepat',
    ratingTier: 'Perak',
    badgeName: 'Garda Disiplin & Pelindung',
    minEmpathy: 30,
    minTrust: 60,
    description: 'Kamu adalah sosok yang sangat menghargai aturan, kebenaran, dan rasa aman. Kamu tidak ragu membawa masalah ke hadapan Guru BK dan wali kelas untuk ditindaklanjuti secara prosedural dan adil.',
    keyLessons: [
      'Mampu bertindak cepat dan prosedural saat melihat intimidasi fisik.',
      'Memahami pentingnya bukti valid dan kerahasiaan pelaporan.',
      'Mendukung peran guru sebagai penengah yang berwenang di sekolah.',
    ],
    recommendation: 'Padukan ketegasanmu dengan kehangatan empati agar teman yang sedang terpuruk juga merasa dirangkul secara emosional.',
  },
  {
    id: 'ending_langkah_pertama',
    title: 'Langkah Pertama Menuju Keberanian',
    subtitle: 'Membuka Mata bahwa Diam Bukanlah Solusi',
    ratingTier: 'Perunggu',
    badgeName: 'Pembelajar Jiwa Berani',
    minEmpathy: 0,
    minTrust: 0,
    description: 'Kamu telah menyelesaikan perjalanan ini dan menyadari bahwa perundungan bukanlah hal sepele. Meskipun terkadang rasa takut dan ragu masih membayangi, kamu kini memahami pentingnya bersuara dan mencari bantuan.',
    keyLessons: [
      'Menyadari bahwa diamnya saksi (bystander) bisa memperparah perundungan.',
      'Mengenal berbagai bentuk perundungan: verbal, sosial, cyber, dan fisik.',
      'Mengetahui bahwa Ruang BK adalah tempat yang ramah dan siap membantu.',
    ],
    recommendation: 'Jangan pernah ragu untuk mencoba lagi. Di dunia nyata, setiap hari adalah kesempatan baru untuk menjadi pahlawan kebaikan bagi sekitarmu.',
  },
];

export const EMERGENCY_CONTACTS = [
  {
    title: 'Layanan SAPA 129 (KemenPPPA)',
    phone: '129 / WhatsApp: 08111-129-129',
    description: 'Layanan Pengaduan Sahabat Perempuan dan Anak Kementerian PPPA RI (Bebas pulsa & 24 jam).',
    color: 'border-pink-500/40 bg-pink-500/10 text-pink-300',
  },
  {
    title: 'Halo Kemendikbudristek (PPKSP)',
    phone: '177 / kemdikbud.lapor.go.id',
    description: 'Kanal resmi penanganan kekerasan dan perundungan di lingkungan satuan pendidikan.',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  },
  {
    title: 'KPAI (Komisi Perlindungan Anak)',
    phone: '021-31901556 / pengaduan@kpai.go.id',
    description: 'Lembaga independen pengawasan dan perlindungan hak-hak anak di Indonesia.',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
];
