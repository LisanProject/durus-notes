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
      practiceProblems: "/Classes/Nahw/PracticeProblems.html",
      assignmentProblems: "/Classes/Nahw/AssignmentProblems.html",
      intro: "These texts are arranged in the classical progression from foundational to advanced. The first texts build the student's ability to read and parse Arabic at a basic level. The later texts, particularly the Alfiyyah, represent a longer-term project requiring sustained commitment.",
      books: [
        {
          id: "ajrumiyyah",
          title: "Al-Ajrumiyyah",
          path: "/Classes/Nahw/Ajrumiyyah/Ajrumiyyah.html",
          downloadPdf: "/Downloads/Nahw/AlAjrumiyyah.pdf",
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
      id: "arabic-speaking",
      title: "Arabic",
      shortTitle: "Arabic",
      path: "/Classes/ArabicSpeaking/ArabicSpeaking.html",
      intro: "Communicative Arabic, picked up at the level actually being studied rather than from the beginning. The path runs 104, 105, 201, 202, 221. Each lesson holds notes, vocabulary, practice exercises, and a short writing prompt together on one page.",
      books: [
        {
          id: "altakallum104",
          title: "104",
          path: "/Classes/ArabicSpeaking/AlTakallum104/AlTakallum104.html",
          chapters: [
            { id: "lesson1", title: "Lesson 1", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson1.html", sections: [] },
            { id: "lesson2", title: "Lesson 2", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson2.html", sections: [] },
            { id: "lesson3", title: "Lesson 3", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson3.html", sections: [] },
            { id: "lesson4", title: "Lesson 4", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson4.html", sections: [] },
            { id: "lesson5", title: "Lesson 5", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson5.html", sections: [] },
            { id: "lesson6", title: "Lesson 6", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson6.html", sections: [] },
            { id: "lesson7", title: "Lesson 7", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson7.html", sections: [] },
            { id: "lesson8", title: "Lesson 8", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson8.html", sections: [] },
            { id: "lesson9", title: "Lesson 9", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson9.html", sections: [] },
            { id: "lesson10", title: "Lesson 10", path: "/Classes/ArabicSpeaking/AlTakallum104/Chapters/Lesson10.html", sections: [] }
          ]
        },
        {
          id: "altakallum105",
          title: "105",
          path: "/Classes/ArabicSpeaking/AlTakallum105/AlTakallum105.html",
          chapters: [
            { id: "lesson1", title: "Lesson 1", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson1.html", sections: [] },
            { id: "lesson2", title: "Lesson 2", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson2.html", sections: [] },
            { id: "lesson3", title: "Lesson 3", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson3.html", sections: [] },
            { id: "lesson4", title: "Lesson 4", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson4.html", sections: [] },
            { id: "lesson5", title: "Lesson 5", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson5.html", sections: [] },
            { id: "lesson6", title: "Lesson 6", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson6.html", sections: [] },
            { id: "lesson7", title: "Lesson 7", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson7.html", sections: [] },
            { id: "lesson8", title: "Lesson 8", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson8.html", sections: [] },
            { id: "lesson9", title: "Lesson 9", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson9.html", sections: [] },
            { id: "lesson10", title: "Lesson 10", path: "/Classes/ArabicSpeaking/AlTakallum105/Chapters/Lesson10.html", sections: [] }
          ]
        },
        {
          id: "altakallum201",
          title: "201",
          path: "/Classes/ArabicSpeaking/AlTakallum201/AlTakallum201.html",
          chapters: [
            { id: "lesson1", title: "Lesson 1", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson1.html", sections: [] },
            { id: "lesson2", title: "Lesson 2", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson2.html", sections: [] },
            { id: "lesson3", title: "Lesson 3", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson3.html", sections: [] },
            { id: "lesson4", title: "Lesson 4", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson4.html", sections: [] },
            { id: "lesson5", title: "Lesson 5", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson5.html", sections: [] },
            { id: "lesson6", title: "Lesson 6", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson6.html", sections: [] },
            { id: "lesson7", title: "Lesson 7", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson7.html", sections: [] },
            { id: "lesson8", title: "Lesson 8", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson8.html", sections: [] },
            { id: "lesson9", title: "Lesson 9", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson9.html", sections: [] },
            { id: "lesson10", title: "Lesson 10", path: "/Classes/ArabicSpeaking/AlTakallum201/Chapters/Lesson10.html", sections: [] }
          ]
        },
        {
          id: "altakallum202",
          title: "202",
          path: "/Classes/ArabicSpeaking/AlTakallum202/AlTakallum202.html",
          chapters: [
            { id: "lesson1", title: "Lesson 1", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson1.html", sections: [] },
            { id: "lesson2", title: "Lesson 2", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson2.html", sections: [] },
            { id: "lesson3", title: "Lesson 3", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson3.html", sections: [] },
            { id: "lesson4", title: "Lesson 4", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson4.html", sections: [] },
            { id: "lesson5", title: "Lesson 5", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson5.html", sections: [] },
            { id: "lesson6", title: "Lesson 6", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson6.html", sections: [] },
            { id: "lesson7", title: "Lesson 7", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson7.html", sections: [] },
            { id: "lesson8", title: "Lesson 8", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson8.html", sections: [] },
            { id: "lesson9", title: "Lesson 9", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson9.html", sections: [] },
            { id: "lesson10", title: "Lesson 10", path: "/Classes/ArabicSpeaking/AlTakallum202/Chapters/Lesson10.html", sections: [] }
          ]
        },
        {
          id: "altakallum221",
          title: "221",
          path: "/Classes/ArabicSpeaking/AlTakallum221/AlTakallum221.html",
          chapters: [
            { id: "lesson1", title: "Lesson 1", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson1.html", sections: [] },
            { id: "lesson2", title: "Lesson 2", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson2.html", sections: [] },
            { id: "lesson3", title: "Lesson 3", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson3.html", sections: [] },
            { id: "lesson4", title: "Lesson 4", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson4.html", sections: [] },
            { id: "lesson5", title: "Lesson 5", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson5.html", sections: [] },
            { id: "lesson6", title: "Lesson 6", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson6.html", sections: [] },
            { id: "lesson7", title: "Lesson 7", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson7.html", sections: [] },
            { id: "lesson8", title: "Lesson 8", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson8.html", sections: [] },
            { id: "lesson9", title: "Lesson 9", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson9.html", sections: [] },
            { id: "lesson10", title: "Lesson 10", path: "/Classes/ArabicSpeaking/AlTakallum221/Chapters/Lesson10.html", sections: [] }
          ]
        }
      ]
    },
    {
      id: "fiqh",
      title: "Fiqh",
      shortTitle: "Fiqh",
      path: "/Classes/Fiqh/Fiqh.html",
      practiceProblems: "/Classes/Fiqh/PracticeProblems.html",
      assignmentProblems: "/Classes/Fiqh/AssignmentProblems.html",
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
      practiceProblems: "/Classes/UsulFiqh/PracticeProblems.html",
      assignmentProblems: "/Classes/UsulFiqh/AssignmentProblems.html",
      intro: "The science of legal theory and the sources of Islamic law and the principles by which rulings are derived from them. These texts progress from the foundational primer of Imam al-Juwayni to the encyclopedic Jam' al-Jawami'.",
      books: [
        {
          id: "waraqat",
          title: "Al-Waraqat",
          path: "/Classes/UsulFiqh/Waraqat/Waraqat.html",
          chapters: [
            {
              id: "almuqaddima",
              title: "Chapter 1: Al-Muqaddima",
              path: "/Classes/UsulFiqh/Waraqat/Chapters/AlMuqaddimaIntro.html",
              sections: [
                { title: "Foundational Terms", path: "/Classes/UsulFiqh/Waraqat/Chapters/FoundationalTerms.html" },
                { title: "The Seven Ahkam", path: "/Classes/UsulFiqh/Waraqat/Chapters/TheSevenAhkam.html" },
                { title: "Knowledge and Ignorance", path: "/Classes/UsulFiqh/Waraqat/Chapters/KnowledgeAndIgnorance.html" },
                { title: "Usul al-Fiqh and Its Chapters", path: "/Classes/UsulFiqh/Waraqat/Chapters/UsulAlFiqhChapters.html" }
              ]
            },
            {
              id: "aqsamalkalam",
              title: "Chapter 2: Aqsam al-Kalam",
              path: "/Classes/UsulFiqh/Waraqat/Chapters/AqsamAlKalamIntro.html",
              sections: [
                { title: "The Structure of Speech", path: "/Classes/UsulFiqh/Waraqat/Chapters/StructureOfSpeech.html" },
                { title: "Haqiqa and Majaz", path: "/Classes/UsulFiqh/Waraqat/Chapters/HaqiqaAndMajaz.html" }
              ]
            },
            {
              id: "alamrwalnahy",
              title: "Chapter 3: Al-Amr wa'l-Nahy",
              path: "/Classes/UsulFiqh/Waraqat/Chapters/AlAmrWalNahyIntro.html",
              sections: [
                { title: "Al-Amr (Command)", path: "/Classes/UsulFiqh/Waraqat/Chapters/AlAmr.html" }
              ]
            }
          ]
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
      practiceProblems: "/Classes/Aqidah/PracticeProblems.html",
      assignmentProblems: "/Classes/Aqidah/AssignmentProblems.html",
      intro: "The texts listed here follow the Ash'ari school, the position held historically by the overwhelming majority of Sunni scholars, including most of the major hadith scholars, jurists, and theologians cited across all four madhahib. In recent years some have dismissed Ash'arism, or other sound schools of aqeedah, as innovation or worse, generally without engaging seriously with the actual arguments those schools make or the weight of scholarship behind them. I hope these notes show something of the depth and internal coherence of the Ash'ari school on its own terms, rather than the caricature it is sometimes reduced to.",
      books: [
        {
          id: "sharhalaqbawi",
          title: "Sharh al-Aqbawi (Aqidah Tawhidiyyah)",
          path: "/Classes/Aqidah/SharhAlaqbawi/SharhAlaqbawi.html",
          chapters: [
            {
              id: "foundations",
              title: "Chapter 1: Foundations",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/FoundationsIntro.html",
              sections: [
                { title: "The Khutbah, the Basmala, and the Mukallaf", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/IntroBasmalaMukallaf.html" },
                { title: "Why Twenty Attributes?", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/TwentyAttributes.html" }
              ]
            },
            {
              id: "negatingattributes",
              title: "Chapter 2: The Negating Attributes",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/NegatingAttributesIntro.html",
              sections: [
                { title: "Existence, Pre-Eternity, and Everlastingness", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/WujudQidamBaqa.html" },
                { title: "Unlike Creation, Dependent on Nothing", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/MukhalafahQiyam.html" },
                { title: "Divine Oneness in Essence, Attributes, and Acts", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/Wahdaniyyah.html" }
              ]
            },
            {
              id: "rationaltheology",
              title: "Chapter 3: Rational Theology",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/RationalTheologyIntro.html",
              sections: [
                { title: "The Three Rational Laws and the Proof of Life", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/RationalProofs.html" }
              ]
            },
            {
              id: "attributesofmeaning",
              title: "Chapter 4: The Attributes of Meaning",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/AttributesOfMeaningIntro.html",
              sections: [
                { title: "Life, Knowledge, Will, and Power", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/HayahIlmIradahQudrah.html" },
                { title: "Hearing, Sight, and Speech", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/SamBasarKalam.html" }
              ]
            },
            {
              id: "certainty",
              title: "Chapter 5: Certainty and Objections",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/CertaintyIntro.html",
              sections: [
                { title: "Certainty, the Ahad Hadith, and Common Misconceptions", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/CertaintyAndMisconceptions.html" }
              ]
            },
            {
              id: "prophets",
              title: "Chapter 6: The Prophets and the Unseen",
              path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/ProphetsIntro.html",
              sections: [
                { title: "The Prophets and the Unseen (Sam'iyyat)", path: "/Classes/Aqidah/SharhAlaqbawi/Chapters/ProphetsAndSamiyyat.html" }
              ]
            }
          ]
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
      practiceProblems: "/Classes/Hadith/PracticeProblems.html",
      assignmentProblems: "/Classes/Hadith/AssignmentProblems.html",
      intro: "This section covers both hadith texts for memorization and the science of hadith criticism (mustalah al-hadith). Memorization targets are noted where applicable.",
      books: [
        {
          id: "alarbainalnawawiyyah",
          title: "Al-Arba'in al-Nawawiyyah",
          path: "/Classes/Hadith/AlarbainAlnawawiyyah/AlarbainAlnawawiyyah.html",
          chapters: [
            {
              id: "intentions",
              title: "Hadith 1-5 - Intentions & Foundations",
              path: "/Classes/Hadith/AlarbainAlnawawiyyah/Chapters/Hadith1Intentions.html",
              sections: [
                { title: "Hadith 1: Actions Are Judged by Intentions", path: "/Classes/Hadith/AlarbainAlnawawiyyah/Chapters/Hadith1Intentions.html" },
                { title: "Hadith 2: The Hadith of Jibril", path: "/Classes/Hadith/AlarbainAlnawawiyyah/Chapters/Hadith2Jibril.html" }
              ]
            },
            { id: "halalharam", title: "Hadith 6-15 - Halal, Haram & Doubt", path: "/Classes/Hadith/AlarbainAlnawawiyyah/AlarbainAlnawawiyyah.html", sections: [] },
            { id: "rightsconduct", title: "Hadith 16-28 - Rights & Conduct", path: "/Classes/Hadith/AlarbainAlnawawiyyah/AlarbainAlnawawiyyah.html", sections: [] },
            { id: "faithzuhd", title: "Hadith 29-42 - Faith, Zuhd & Conclusion", path: "/Classes/Hadith/AlarbainAlnawawiyyah/AlarbainAlnawawiyyah.html", sections: [] }
          ]
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
          id: "nuzhatalnazar",
          title: "Nuzhat al-Nazar",
          path: "/Classes/Hadith/NuzhatAlnazar/NuzhatAlnazar.html",
          chapters: [
            {
              id: "foundations",
              title: "Foundations of the Science",
              path: "/Classes/Hadith/NuzhatAlnazar/Chapters/HistoryOfMustalah.html",
              sections: [
                { title: "The Historical Development of Mustalah al-Hadith", path: "/Classes/Hadith/NuzhatAlnazar/Chapters/HistoryOfMustalah.html" },
                { title: "Scholarly Integrity, Ijazah, and the Chain of Transmission", path: "/Classes/Hadith/NuzhatAlnazar/Chapters/IjazahAndTransmission.html" },
                { title: "Khabar, Hadith, Athar, and Sunnah", path: "/Classes/Hadith/NuzhatAlnazar/Chapters/KhabarHadithAtharSunnah.html" },
                { title: "Islamic Epistemology: Naqli and Aqli Knowledge", path: "/Classes/Hadith/NuzhatAlnazar/Chapters/IslamicEpistemology.html" }
              ]
            },
            {
              id: "mutawatirahad",
              title: "Classification by Number of Narrators",
              path: "/Classes/Hadith/NuzhatAlnazar/Chapters/MutawatirAndAhad.html",
              sections: [
                { title: "Mutawatir, Mashhur, Aziz, and Gharib", path: "/Classes/Hadith/NuzhatAlnazar/Chapters/MutawatirAndAhad.html" }
              ]
            }
          ]
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
      practiceProblems: "/Classes/Quran/PracticeProblems.html",
      assignmentProblems: "/Classes/Quran/AssignmentProblems.html",
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
    { title: "Clarifying Positions on Ash'ariyyah", path: "/Extras/ClarifyingPositions.html" },
    { title: "Khutbah a Week", path: "/Extras/Khutbah.html" },
    { title: "Essays", path: "/Extras/Essays.html" },
    { title: "Reading Recommendations", path: "/Extras/ReadingRecs.html" },
    { title: "Ijazat", path: "/Classes/Ijazat/Ijazat.html" },
   {  title: "Daily Motivation from Irshad al-'Ibad", path: "/Extras/DailyMotivation.html" }
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
