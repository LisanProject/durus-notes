/* ============================================================
   NAV-DATA.JS
   The one file you edit to add a course, a book, or a lesson.
   Restored from the original site content (macrons stripped to
   match house style), organized into Course -> Book -> Topic.
   Books without a written lesson yet still show their topic list
   with descriptions - the book page IS the "coming soon" page.
   ============================================================ */

var NAV = {

  siteTitle: "Liban's Online Notes",
  siteTagline: "Class notes, cheat sheets, and reviews for the Islamic sciences",

  courses: [
    {
      id: "nahw-sarf",
      title: "Arabic Syntax and Morphology",
      shortTitle: "Arabic Sciences",
      path: "/Classes/Nahw/Nahw.html",
      practiceProblems: "/Extras/PracticeProblems.html#nahw-sarf",
      assignmentProblems: "/Extras/AssignmentProblems.html#nahw-sarf",
      intro: "These texts are arranged in the classical progression from foundational to advanced. The first texts build the student's ability to read and parse Arabic at a basic level. The later texts, particularly the Alfiyyah, represent a longer-term project requiring sustained commitment.",
      books: [
        {
          id: "ajrumiyyah",
          title: "Al-Ajrumiyyah",
          path: "/Classes/Nahw/Ajrumiyyah/Ajrumiyyah.html",
          chapters: [
            {
              id: "alkalam",
              title: "Chapter 1: Al-Kalam",
              path: "/Classes/Nahw/Ajrumiyyah/Chapters/AlKalamIntro.html",
              sections: [
                { title: "Kalam", path: "/Classes/Nahw/Ajrumiyyah/Chapters/Kalam.html" },
                { title: "Word Types (Ism, Fi'l, Harf)", path: "/Classes/Nahw/Ajrumiyyah/Chapters/WordTypes.html" },
                { title: "Signs of the Ism", path: "/Classes/Nahw/Ajrumiyyah/Chapters/SignsOfIsm.html" },
                { title: "Signs of the Fi'l", path: "/Classes/Nahw/Ajrumiyyah/Chapters/SignsOfFil.html" }
              ]
            },
            {
              id: "alirab",
              title: "Chapter 2: Al-I'rab",
              path: "/Classes/Nahw/Ajrumiyyah/Chapters/AlIrabIntro.html",
              sections: [
                { title: "I'rab: Definition and the Word Categories", path: "/Classes/Nahw/Ajrumiyyah/Chapters/IrabWordCategories.html" },
                { title: "Signs of Rafa", path: "/Classes/Nahw/Ajrumiyyah/Chapters/SignsOfRafa.html" },
                { title: "Signs of Nasb", path: "/Classes/Nahw/Ajrumiyyah/Chapters/SignsOfNasb.html" }
              ]
            }
          ]
        },
        {
          id: "qatralnada",
          title: "Qatr al-Nada wa Ball al-Sada",
          path: "/Classes/Nahw/QatrAlNada/QatrAlNada.html",
          topics: [{ title: "Definitions & Divisions of the Word" }, { title: "I'rab in Detail" }, { title: "The Complete Marfu'at" }, { title: "The Complete Mansubat" }, { title: "Particles & Their Grammatical Effects" }]
        },
        {
          id: "qawaidalirab",
          title: "Qawa'id al-I'rab",
          path: "/Classes/Nahw/QawaidAlirab/QawaidAlirab.html",
          topics: [{ title: "Principles of I'rab" }, { title: "Particles & Their Parsing" }, { title: "Qur'anic I'rab Exercises" }]
        },
        {
          id: "alfiyyah",
          title: "Alfiyyat Ibn Malik",
          path: "/Classes/Nahw/Alfiyyah/Alfiyyah.html",
          topics: [{ title: "Lines 1-50 - Kalam & I'rab Foundations" }, { title: "" }]
        },
      ]
    },
    {
      id: "fiqh",
      title: "Fiqh",
      shortTitle: "Fiqh",
      path: "/Classes/Fiqh/Fiqh.html",
      practiceProblems: "/Extras/PracticeProblems.html#fiqh",
      assignmentProblems: "/Extras/AssignmentProblems.html#fiqh",
      intro: "Shafi'i Madhhab. These texts follow the classical pedagogical ladder of the school, from introductory matn to the substantive legal manuals used in advanced study.",
      books: [
        {
          id: "mukhtasarallatif",
          title: "Mukhtasar al-Latif",
          path: "/Classes/Fiqh/MukhtasarAllatif/MukhtasarAllatif.html",
          topics: [{ title: "Taharah - Purity" }, { title: "Salah - Prayer" }, { title: "Zakah" }, { title: "Sawm - Fasting" }, { title: "Hajj & Umrah" }]
        },
        {
          id: "matnabishuja",
          title: "Matn Abi Shuja' (Al-Ghayah wal-Taqrib)",
          path: "/Classes/Fiqh/MatnAbiShuja/MatnAbiShuja.html",
          topics: [{ title: "Taharah" }, { title: "Salah" }, { title: "Zakah, Fasting, Hajj" }, { title: "Transactions (Buyu')" }, { title: "Inheritance (Fara'id)" }]
        },
        {
          id: "fiqhalmanhaji",
          title: "Fiqh al-Manhaji",
          path: "/Classes/Fiqh/FiqhAlmanhaji/FiqhAlmanhaji.html",
          topics: [{ title: "Taharah" }, { title: "Salah" }, { title: "Zakah" }, { title: "Sawm, Hajj, Transactions, Family Law" }]
        },
      ]
    },
    {
      id: "usul-fiqh",
      title: "Usul al-Fiqh",
      shortTitle: "Usul al-Fiqh",
      path: "/Classes/UsulFiqh/UsulFiqh.html",
      practiceProblems: "/Extras/PracticeProblems.html#usul-fiqh",
      assignmentProblems: "/Extras/AssignmentProblems.html#usul-fiqh",
      intro: "The science of legal theory and the sources of Islamic law and the principles by which rulings are derived from them. These texts progress from the foundational primer of Imam al-Juwayni to the encyclopedic Jam' al-Jawami'.",
      books: [
        {
          id: "waraqat",
          title: "Al-Waraqat",
          path: "/Classes/UsulFiqh/Waraqat/Waraqat.html",
          topics: [{ title: "Introduction" }, { title: "The Four Sources (Usul)" }, { title: "Amm & Khass - General & Specific" }, { title: "Mujmal & Mubayyan; Zahir & Mu'awwal" }, { title: "Naskh - Abrogation" }, { title: "Ijtihad & Taqlid" }]
        },
        {
          id: "qurratalaynbisharhwaraqat",
          title: "Qurrat al-Ayn bi-Sharh Waraqat Imam al-Haramayn",
          path: "/Classes/UsulFiqh/QurratAlaynBisharhWaraqat/QurratAlaynBisharhWaraqat.html",
          topics: []
        },
        {
          id: "alluma",
          title: "Al-Luma'",
          path: "/Classes/UsulFiqh/Alluma/Alluma.html",
          topics: [{ title: "Sources of Law in Detail" }, { title: "Qiyas - Analogical Reasoning" }, { title: "Disagreement (Ikhtilaf) & Its Rules" }]
        },
        {
          id: "jamaljawami",
          title: "Jam' al-Jawami'",
          path: "/Classes/UsulFiqh/JamAljawami/JamAljawami.html",
          topics: []
        },
      ]
    },
    {
      id: "aqeedah",
      title: "Ash'ari Aqidah",
      shortTitle: "Aqeedah",
      path: "/Classes/Aqidah/Aqidah.html",
      practiceProblems: "/Extras/PracticeProblems.html#aqeedah",
      assignmentProblems: "/Extras/AssignmentProblems.html#aqeedah",
      intro: "The texts listed here follow the Ash'ari school, the position held historically by the overwhelming majority of Sunni scholars, including most of the major hadith scholars, jurists, and theologians cited across all four madhahib. In recent years some have dismissed Ash'arism, or other sound schools of aqeedah, as innovation or worse, generally without engaging seriously with the actual arguments those schools make or the weight of scholarship behind them. I hope these notes show something of the depth and internal coherence of the Ash'ari school on its own terms, rather than the caricature it is sometimes reduced to.",
      books: [
        {
          id: "sharhalaqbawi",
          title: "Sharh al-Aqbawi (Aqidah Tawhidiyyah)",
          path: "/Classes/Aqidah/SharhAlaqbawi/SharhAlaqbawi.html",
          topics: [{ title: "The Attributes of Allah - Wajib, Mustahil, Ja'iz" }, { title: "The Messengers - Their Attributes" }]
        },
        {
          id: "aqidaalsharnubiyyah",
          title: "Aqida al-Sharnubiyyah",
          path: "/Classes/Aqidah/AqidaAlsharnubiyyah/AqidaAlsharnubiyyah.html",
          topics: []
        },
        {
          id: "alkharidahalbahiyyah",
          title: "Al-Kharidah al-Bahiyyah",
          path: "/Classes/Aqidah/AlkharidahAlbahiyyah/AlkharidahAlbahiyyah.html",
          topics: [{ title: "Lines 1-20 - Necessary Attributes of Allah" }, { title: "Lines 21-45 - Attributes of Meaning & Meaningful States" }, { title: "Lines 46-66 - The Prophets & Conclusion" }]
        },
        {
          id: "ummalbarahin",
          title: "Umm al-Barahin (Al-Aqidah al-Sanusiyyah)",
          path: "/Classes/Aqidah/UmmAlbarahin/UmmAlbarahin.html",
          topics: [{ title: "Introduction - Obligation of Knowledge" }, { title: "Wajib, Mustahil, Ja'iz for Allah" }, { title: "Wajib, Mustahil, Ja'iz for the Prophets" }, { title: "The Rational Proofs (Dala'il Aqliyyah)" }]
        },
        {
          id: "aljawharataltawhid",
          title: "Al-Jawharat al-Tawhid",
          path: "/Classes/Aqidah/AljawharatAltawhid/AljawharatAltawhid.html",
          topics: [{ title: "Necessary Attributes - Extended Treatment" }, { title: "Prophethood (Nubuwwat)" }, { title: "Eschatology (Sam'iyyat)" }]
        },
      ]
    },
    {
      id: "hadith",
      title: "Hadith",
      shortTitle: "Hadith",
      path: "/Classes/Hadith/Hadith.html",
      practiceProblems: "/Extras/PracticeProblems.html#hadith",
      assignmentProblems: "/Extras/AssignmentProblems.html#hadith",
      intro: "This section covers both hadith texts for memorization and the science of hadith criticism (mustalah al-hadith). Memorization targets are noted where applicable.",
      books: [
        {
          id: "alarbainalnawawiyyah",
          title: "Al-Arba'in al-Nawawiyyah",
          path: "/Classes/Hadith/AlarbainAlnawawiyyah/AlarbainAlnawawiyyah.html",
          topics: [{ title: "Hadith 1-5 - Intentions & Foundations" }, { title: "Hadith 6-15 - Halal, Haram & Doubt" }, { title: "Hadith 16-28 - Rights & Conduct" }, { title: "Hadith 29-42 - Faith, Zuhd & Conclusion" }]
        },
        {
          id: "alshamailalmuhammadiyyah",
          title: "Al-Shama'il al-Muhammadiyyah",
          path: "/Classes/Hadith/AlshamailAlmuhammadiyyah/AlshamailAlmuhammadiyyah.html",
          topics: [{ title: "Chapter 1-5 - Physical Description (Khalq)" }, { title: "Chapter 6-15 - Food, Drink & Household" }, { title: "Chapter 16-30 - Worship & Prayer" }, { title: "Chapter 31-56 - Character & Final Illness" }]
        },
        {
          id: "almuwatta",
          title: "Al-Muwatta'",
          path: "/Classes/Hadith/Almuwatta/Almuwatta.html",
          topics: [{ title: "Kitab al-Taharah" }, { title: "Kitab al-Salah" }, { title: "Kitab al-Zakah & al-Sawm" }, { title: "Kitab al-Hajj" }, { title: "Kitab al-Buyu' onward" }]
        },
        {
          id: "musnadabidawudaltayalisi",
          title: "Musnad Abi Dawud al-Tayalisi",
          path: "/Classes/Hadith/MusnadAbiDawudAltayalisi/MusnadAbiDawudAltayalisi.html",
          topics: []
        },
        {
          id: "albayquniyyah",
          title: "Al-Bayquniyyah",
          path: "/Classes/Hadith/Albayquniyyah/Albayquniyyah.html",
          topics: [{ title: "Lines 1-10 - Sahih, Hasan, Da'if" }, { title: "Lines 11-20 - Mawquf, Maqtu', Musnad, Muttasil" }, { title: "Lines 21-34 - Shadhdh, Munkar, Mawdu' & More" }]
        },
        {
          id: "nukhbatalfikar",
          title: "Nukhbat al-Fikar",
          path: "/Classes/Hadith/NukhbatAlfikar/NukhbatAlfikar.html",
          topics: []
        },
        {
          id: "iktisarulumalhadith",
          title: "Iktisar Ulum al-Hadith",
          path: "/Classes/Hadith/IktisarUlumAlhadith/IktisarUlumAlhadith.html",
          topics: []
        },
        {
          id: "altaqribwaltaysir",
          title: "Al-Taqrib wal-Taysir",
          path: "/Classes/Hadith/AltaqribWaltaysir/AltaqribWaltaysir.html",
          topics: []
        },
      ]
    },
    {
      id: "quran-sciences",
      title: "Ulum al-Qur'an",
      shortTitle: "Quran Sciences",
      path: "/Classes/Quran/Quran.html",
      practiceProblems: "/Extras/PracticeProblems.html#quran-sciences",
      assignmentProblems: "/Extras/AssignmentProblems.html#quran-sciences",
      intro: "The sciences of Tajwid and Qira'at are foundational to everything else. These sciences cannot be learned from notes alone. A licensed teacher with an unbroken chain is a condition, not a recommendation. Notes here serve as a reference alongside instruction, not a replacement for it.",
      books: [
        {
          id: "tuhfatalatfal",
          title: "Tuhfat al-Atfal",
          path: "/Classes/Quran/TuhfatAlatfal/TuhfatAlatfal.html",
          topics: [{ title: "Lines 1-10 - Introduction & Nun Sakinah" }, { title: "Lines 11-20 - Mim Sakinah & Shaddah" }, { title: "Lines 21-40 - Madd (Prolongation)" }, { title: "Lines 41-61 - Lam, Ra' & Conclusion" }]
        },
        {
          id: "matnaljazariyyah",
          title: "Matn al-Jazariyyah",
          path: "/Classes/Quran/MatnAljazariyyah/MatnAljazariyyah.html",
          topics: [{ title: "Lines 1-20 - Makharij al-Huruf" }, { title: "Lines 21-50 - Sifat al-Huruf" }, { title: "Lines 51-80 - Rules of Nun, Mim & Madd" }, { title: "Lines 81-107 - Waqf, Ibtida' & Conclusion" }]
        },
        {
          id: "hirzalamani",
          title: "Hirz al-Amani (Al-Shatibiyyah)",
          path: "/Classes/Quran/HirzAlamani/HirzAlamani.html",
          topics: [{ title: "Fasl al-Usul - Foundational Principles" }, { title: "The Seven Imams & Their Rawis" }, { title: "Chapters by Topic (Surah-by-Surah Variations)" }]
        },
      ]
    },
  ],

  extras: [
    { title: "How to Study the Islamic Sciences", path: "/Extras/HowToStudy/HowToStudy.html" },
    { title: "Reviews", path: "/Extras/Reviews.html" },
    { title: "Khutbah a Week", path: "/Extras/Khutbah.html" },
    { title: "Essays", path: "/Extras/Essays.html" },
    { title: "Reading Recommendations", path: "/Extras/ReadingRecs.html" },
    { title: "Ijazat", path: "/Classes/Ijazat/Ijazat.html" },
    { title: "Uploads and Extras", path: "/Extras/Uploads.html" }
  ]
};

function navGetCourse(id) {
  for (var i = 0; i < NAV.courses.length; i++) {
    if (NAV.courses[i].id === id) return NAV.courses[i];
  }
  return null;
}
function navGetBook(courseId, bookId) {
  var course = navGetCourse(courseId);
  if (!course) return null;
  for (var i = 0; i < course.books.length; i++) {
    if (course.books[i].id === bookId) return course.books[i];
  }
  return null;
}

/* Look up a chapter object within a book by id */
function navGetChapter(courseId, bookId, chapterId) {
  var book = navGetBook(courseId, bookId);
  if (!book || !book.chapters) return null;
  for (var i = 0; i < book.chapters.length; i++) {
    if (book.chapters[i].id === chapterId) return book.chapters[i];
  }
  return null;
}
