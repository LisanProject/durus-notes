/* ============================================================
   NAV-DATA.JS
   The one file you edit to add a course, a book, or a lesson.
   nav.js reads this file plus a small PAGE object declared at
   the top of each page to build:
     - the breadcrumb pill ("Home / Arabic Sciences / Al-Ajrumiyyah")
     - the tab pill row (Notes / Cheat Sheet / Review)
     - the prev / next pills at the bottom of a lesson
     - the full Class Notes list on the home page

   COURSE  = a subject, e.g. "Arabic Sciences (Nahw and Sarf)"
   BOOK    = a text within that subject, e.g. "Al-Ajrumiyyah"
   TOPIC   = one lesson / section within a book
   ============================================================ */

var NAV = {

  siteTitle: "Liban's Online Notes",
  siteTagline: "Class notes, cheat sheets, and reviews for the Islamic sciences",

  courses: [
    {
      id: "nahw-sarf",
      title: "Arabic Sciences (Nahw and Sarf)",
      shortTitle: "Arabic Sciences",
      path: "/Classes/Nahw/Nahw.html",
      cheatSheet: "/Extras/CheatSheets_Tables.html#nahw-sarf",
      review: "/Extras/Reviews.html#nahw-sarf",
      intro: "Here are my notes for Nahw and Sarf, the Arabic grammar and morphology that everything else in the Islamic sciences rests on. The notes move through the Ajrumiyyah first, then Qatr al-Nada, then the Alfiyyah of ibn Malik, in the order I am actually studying them in.",
      books: [
        {
          id: "ajrumiyyah",
          title: "Al-Ajrumiyyah",
          path: "/Classes/Nahw/Ajrumiyyah/Ajrumiyyah.html",
          topics: [
            { title: "Kalam", path: "/Classes/Nahw/Ajrumiyyah/Kalam.html" },
            { title: "Word Types (Ism, Fi'l, Harf)", path: "/Classes/Nahw/Ajrumiyyah/WordTypes.html" },
            { title: "Signs of the Ism", path: "/Classes/Nahw/Ajrumiyyah/SignsOfIsm.html" },
            { title: "I'rab, Part I", path: "/Classes/Nahw/Ajrumiyyah/IrabI.html" }
          ]
        },
        { id: "qatr-al-nada", title: "Qatr al-Nada", path: "/Classes/Nahw/QatrAlNada/QatrAlNada.html", topics: [] },
        { id: "alfiyyah", title: "Alfiyyah ibn Malik", path: "/Classes/Nahw/Alfiyyah/Alfiyyah.html", topics: [] }
      ]
    },
    {
      id: "quran-sciences",
      title: "Quran Sciences",
      path: "/Classes/Quran/Quran.html",
      intro: "Notes on Ulum al-Quran, tafsir methodology, and the sciences of qira'at and tajwid.",
      books: [
        { id: "ulum-al-quran", title: "Ulum al-Quran", path: "", topics: [] }
      ]
    },
    {
      id: "hadith",
      title: "Hadith",
      path: "/Classes/Hadith/Hadith.html",
      intro: "Mustalah al-hadith together with a memorization track moving from the Arba'in through Bulugh al-Maram.",
      books: [
        { id: "bayquniyyah", title: "Al-Bayquniyyah (Mustalah)", path: "", topics: [] },
        { id: "arbain", title: "Arba'in al-Nawawiyya", path: "", topics: [] },
        { id: "umdah", title: "Umdat al-Ahkam", path: "", topics: [] },
        { id: "bulugh", title: "Bulugh al-Maram", path: "", topics: [] }
      ]
    },
    {
      id: "fiqh",
      title: "Fiqh",
      path: "/Classes/Fiqh/Fiqh.html",
      intro: "Maliki fiqh, starting with purification and prayer and moving out into the wider chapters of worship and transactions.",
      books: []
    },
    {
      id: "aqeedah",
      title: "Aqeedah",
      path: "/Classes/Aqidah/Aqidah.html",
      intro: "Ash'ari theology, including a translation of al-Dardir's al-Aqida al-Tawhidiyya with notes drawn from commentary, and the Kharidah framework for reasoning about the divine attributes.",
      books: [
        { id: "aqida-tawhidiyya", title: "Al-Aqida al-Tawhidiyya (al-Dardir)", path: "", topics: [] },
        { id: "kharidah", title: "Al-Kharidah al-Bahiyyah", path: "", topics: [] }
      ]
    },
    {
      id: "usul-fiqh",
      title: "Usul al-Fiqh",
      path: "/Classes/UsulFiqh/UsulFiqh.html",
      intro: "The principles and methodology behind how fiqh rulings are derived.",
      books: []
    }
  ],

  extras: [
    { title: "Cheat Sheets and Tables", path: "/Extras/CheatSheets_Tables.html" },
    { title: "Reviews", path: "/Extras/Reviews.html" },
    { title: "Ijazat", path: "/Classes/Ijazat/Ijazat.html" },
    { title: "Uploads and Extras", path: "/Extras/Uploads.html" }
  ]
};

/* Look up a course object by id */
function navGetCourse(id) {
  for (var i = 0; i < NAV.courses.length; i++) {
    if (NAV.courses[i].id === id) return NAV.courses[i];
  }
  return null;
}

/* Look up a book object within a course by id */
function navGetBook(courseId, bookId) {
  var course = navGetCourse(courseId);
  if (!course) return null;
  for (var i = 0; i < course.books.length; i++) {
    if (course.books[i].id === bookId) return course.books[i];
  }
  return null;
}
