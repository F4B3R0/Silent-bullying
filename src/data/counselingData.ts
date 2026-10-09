import { CounselingQuestion } from '@/src/types/game';

export const COUNSELING_QUESTIONS: CounselingQuestion[] = [
  {
    id: 'cq_feeling',
    question: '“Apa yang sebenarnya kamu rasakan saat ini?”',
    subtext: 'Bebaskan dirimu untuk mengungkapkan perasaan yang sesungguhnya tanpa takut dihakimi.',
    options: [
      {
        text: '“Saya merasa cemas dan takut jika masalah ini terus berlanjut atau bertambah parah.”',
        counselorResponse: '“Sangat wajar merasa cemas, nak. Ketakutan itu tanda bahwa kamu peduli dengan rasa amanmu. Di ruangan ini, kamu tidak sendiri lagi. Kita akan susun langkah perlindungan bersama langkah demi langkah.”',
        advice: 'Ingat: Rasa takut berkurang saat dibagi dengan orang yang tepat. Menuliskan kekhawatiranmu atau menceritakannya ke guru BK membantu menenangkan sistem sarafmu.',
        empathyChange: 15,
        trustChange: 15,
      },
      {
        text: '“Saya merasa marah dan kecewa melihat ada teman yang diperlakukan tidak adil.”',
        counselorResponse: '“Ibu sangat menghargai kemarahanmu. Itu adalah kemarahan moral—tanda nurani yang hidup. Mari kita salurkan energi kemarahan ini menjadi aksi positif yang melindungi teman tanpa kekerasan balasan.”',
        advice: 'Tindakan konstruktif: Alihkan kemarahan menjadi pendampingan korban dan pelaporan resmi kepada pihak sekolah.',
        empathyChange: 15,
        trustChange: 10,
      },
      {
        text: '“Saya merasa bingung dan ragu, tidak tahu apa yang harus saya lakukan terlebih dahulu.”',
        counselorResponse: '“Tidak apa-apa merasa bingung. Tugasmu sebagai siswa bukanlah memikul semua beban dunia sekolah sendirian. Mulailah dari hal kecil: pastikan temanmu tahu bahwa kamu peduli padanya.”',
        advice: 'Langkah pertama ketika bingung: Jangan ambil tindakan terburu-buru yang membahayakan diri. Berikan sapaan hangat pada korban dan ajak guru berdiskusi.',
        empathyChange: 10,
        trustChange: 15,
      },
    ],
  },
  {
    id: 'cq_trust',
    question: '“Siapa sosok yang paling bisa kamu percaya saat menghadapi kesulitan?”',
    subtext: 'Mengenali jejaring dukungan (support system) adalah benteng pertahanan terbaik.',
    options: [
      {
        text: '“Guru BK dan Bapak/Ibu Guru di sekolah yang bijaksana dan memegang rahasia.”',
        counselorResponse: '“Terima kasih atas kepercayaanmu. Setiap guru dan konselor di sekolah berkomitmen melindungi martabat setiap murid. Kerahasiaan identitas pelapor selalu dijaga dengan ketat.”',
        advice: 'Sekolah memiliki Tim Pencegahan dan Penanganan Kekerasan (TPPK). Melapor ke guru BK adalah jalur resmi tercepat untuk menghentikan bullying.',
        empathyChange: 10,
        trustChange: 20,
      },
      {
        text: '“Orang tua atau anggota keluarga di rumah yang selalu mendukungku tanpa syarat.”',
        counselorResponse: '“Luar biasa. Keluarga adalah jangkar terkuat kita. Jangan ragu bercerita saat makan malam atau sebelum tidur. Orang tua selalu menginginkan anak-anaknya merasa aman dan terlindungi.”',
        advice: 'Tips bercerita ke orang tua: Ceritakan kronologi dengan tenang, jelaskan perasaanmu, dan minta saran langkah terbaik bersama pihak sekolah.',
        empathyChange: 15,
        trustChange: 15,
      },
      {
        text: '“Sahabat sebaya yang selalu ada di sampingku setiap hari di kelas.”',
        counselorResponse: '“Persahabatan sejati adalah anugerah terindah. Ketika kalian saling menguatkan, kalian membentuk benteng kebaikan yang tidak mudah diintimidasi oleh siapapun.”',
        advice: 'Kekuatan teman sebaya: Berjalan bersama di lorong sepi, makan siang bersama, dan saling mengingatkan untuk menjauhi candaan beracun.',
        empathyChange: 20,
        trustChange: 10,
      },
    ],
  },
  {
    id: 'cq_action',
    question: '“Apa langkah nyata yang ingin kamu lakukan selanjutnya?”',
    subtext: 'Satu langkah kecil yang konsisten akan membawa perubahan besar bagi sekolahmu.',
    options: [
      {
        text: '“Saya ingin aktif mendampingi teman yang sedang diserang agar dia tidak merasa sendirian.”',
        counselorResponse: '“Komitmen yang sungguh mulia. Kehadiran fisik seorang sahabat adalah obat penenang terbaik bagi jiwa yang sedang terluka akibat perundungan.”',
        advice: 'Bentuk pendampingan: Ajak ngobrol santai, temani saat jam istirahat, dan hindari membahas kejadian traumatis berulang-ulang tanpa izinnya.',
        empathyChange: 20,
        trustChange: 10,
      },
      {
        text: '“Saya akan berani bicara dan segera melapor jika melihat intimidasi terjadi lagi.”',
        counselorResponse: '“Itulah esensi dari BERANI BICARA! Jangan pernah biarkan rasa takut membungkam kebenaran. Kamu adalah pahlawan tanpa tanda jasa bagi teman-temanmu.”',
        advice: 'Metode lapor aman: Gunakan kotak suara BK, hubungi kontak pengaduan sekolah, atau temui guru favorit secara privat.',
        empathyChange: 10,
        trustChange: 20,
      },
      {
        text: '“Saya ingin mengajak teman-teman sekelas membuat kesepakatan ruang kelas yang ramah dan saling menghargai.”',
        counselorResponse: '“Ide yang brilian! Pencegahan kolektif jauh lebih efektif daripada mengobati luka. Ibu siap mendampingi kelasmu mengadakan deklarasi kelas ramah anak!”',
        advice: 'Langkah kelas: Diskusikan batasan candaan yang disepakati bersama, larangan menyebar foto aib, dan janji saling menjaga satu sama lain.',
        empathyChange: 20,
        trustChange: 20,
      },
    ],
  },
];
