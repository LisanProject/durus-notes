/* ============================================================
   NAV.JS
   Reads NAV (from nav-data.js) and the page's own PAGE object
   to render:
     #crumb-row        -> breadcrumb pill  (Home / Course / Book)
     #tab-row           -> tab pill row     (Notes / Cheat Sheet / Review / Next Section)
     #bottom-nav-row    -> Previous / Next pills at the foot of a lesson
     #home-class-list   -> the full Class Notes list on the home page
   Pages don't hand-write any of this. They just declare PAGE and
   drop the matching empty container in the right spot.
   ============================================================ */

function navEl(tag, opts) {
  var el = document.createElement(tag);
  opts = opts || {};
  if (opts.cls) el.className = opts.cls;
  if (opts.text !== undefined) el.textContent = opts.text;
  if (opts.href !== undefined) el.setAttribute('href', opts.href);
  return el;
}

/* Breadcrumbs and nav pills show the clean chapter name only (e.g. "Al-Kalam"),
   never the "Chapter 1: " prefix, which is reserved for the chapter's own H2
   heading - matches Paul's breadcrumb showing "3-Dimensional Space" not
   "Chapter 12: 3-Dimensional Space". */
function cleanChapterTitle(title) {
  return title.replace(/^Chapter \d+:\s*/, '');
}

function renderCrumb() {
  var row = document.getElementById('crumb-row');
  if (!row || typeof PAGE === 'undefined') return;

  var pill = navEl('div', { cls: 'crumb-pill' });
  pill.appendChild(navEl('a', { href: '/index.html', text: 'Home' }));

  var course = PAGE.course ? navGetCourse(PAGE.course) : null;
  var book = (PAGE.course && PAGE.book) ? navGetBook(PAGE.course, PAGE.book) : null;
  var chapter = (book && PAGE.chapter) ? navGetChapter(PAGE.course, PAGE.book, PAGE.chapter) : null;

  if (!course && PAGE.label) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: PAGE.label }));
  }

  // breadcrumb starts at the Book level (Paul's "Class"), not the Course grouping
  if (book) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    if (chapter || PAGE.topic !== undefined) {
      pill.appendChild(navEl('a', { href: book.path, text: book.title }));
    } else {
      pill.appendChild(navEl('span', { cls: 'current', text: book.title }));
    }
  } else if (course) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: course.shortTitle || course.title }));
  }

  if (chapter) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    if (PAGE.section !== undefined && PAGE.section !== null) {
      pill.appendChild(navEl('a', { href: chapter.path, text: cleanChapterTitle(chapter.title) }));
    } else {
      pill.appendChild(navEl('span', { cls: 'current', text: cleanChapterTitle(chapter.title) }));
    }
  }
  if (chapter && PAGE.section !== undefined && PAGE.section !== null && chapter.sections[PAGE.section]) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: chapter.sections[PAGE.section].title }));
  }

  // legacy flat topic (books without chapters yet)
  if (book && !chapter && PAGE.topic !== undefined && PAGE.topic !== null && book.topics && book.topics[PAGE.topic]) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: book.topics[PAGE.topic].title }));
  }

  row.appendChild(pill);
}

function getPrevNextSection() {
  if (typeof PAGE === 'undefined' || !PAGE.course || !PAGE.book) return null;
  var book = navGetBook(PAGE.course, PAGE.book);
  if (!book) return null;

  if (PAGE.chapter && PAGE.section !== undefined && PAGE.section !== null && book.chapters) {
    var chapters = book.chapters;
    var ci = -1;
    for (var i = 0; i < chapters.length; i++) { if (chapters[i].id === PAGE.chapter) { ci = i; break; } }
    if (ci === -1) return null;
    var chapter = chapters[ci];
    var sections = chapter.sections;
    var si = PAGE.section;

    var result = { prevHref: null, prevLabel: null, nextHref: null, nextLabel: null };
    if (sections[si - 1]) {
      result.prevHref = sections[si - 1].path; result.prevLabel = sections[si - 1].title;
    } else {
      result.prevHref = chapter.path; result.prevLabel = cleanChapterTitle(chapter.title);
    }
    if (sections[si + 1]) {
      result.nextHref = sections[si + 1].path; result.nextLabel = sections[si + 1].title;
    } else if (chapters[ci + 1]) {
      result.nextHref = chapters[ci + 1].path; result.nextLabel = cleanChapterTitle(chapters[ci + 1].title);
    }
    return result;
  }

  if (PAGE.topic !== undefined && PAGE.topic !== null && book.topics) {
    var result2 = { prevHref: null, prevLabel: null, nextHref: null, nextLabel: null };
    var prev = book.topics[PAGE.topic - 1];
    var next = book.topics[PAGE.topic + 1];
    if (prev) { result2.prevHref = prev.path; result2.prevLabel = prev.title; }
    else { result2.prevHref = book.path; result2.prevLabel = book.title; }
    if (next) { result2.nextHref = next.path; result2.nextLabel = next.title; }
    return result2;
  }

  return null;
}

function renderTabs() {
  var row = document.getElementById('tab-row');
  if (!row || typeof PAGE === 'undefined' || !PAGE.course) return;
  var course = navGetCourse(PAGE.course);
  if (!course) return;

  var prevNext = getPrevNextSection();

  if (prevNext && prevNext.prevHref) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: prevNext.prevHref, text: '\u2039 Prev. Section' }));
  }

  var tabs = [
    { label: 'Notes', href: course.path, key: 'notes' },
    { label: 'Practice Problems', href: course.practiceProblems, key: 'practice' },
    { label: 'Assignment Problems', href: course.assignmentProblems, key: 'assignment' }
  ];

  tabs.forEach(function (t) {
    if (!t.href) {
      var dis = navEl('span', { cls: 'tab-pill disabled', text: t.label });
      row.appendChild(dis);
      return;
    }
    var isActive = PAGE.activeTab === t.key;
    var el = isActive
      ? navEl('span', { cls: 'tab-pill active', text: t.label })
      : navEl('a', { cls: 'tab-pill', href: t.href, text: t.label });
    row.appendChild(el);
  });

  if (prevNext && prevNext.nextHref) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: prevNext.nextHref, text: 'Next Section \u203a' }));
  }
}

function renderBottomNav() {
  var row = document.getElementById('bottom-nav-row');
  if (!row) return;
  var prevNext = getPrevNextSection();
  if (!prevNext) return;

  if (prevNext.prevHref) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: prevNext.prevHref, text: '< ' + prevNext.prevLabel }));
  }
  if (prevNext.nextHref) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: prevNext.nextHref, text: prevNext.nextLabel + ' >' }));
  }
}

function renderHomeClassList() {
  var wrap = document.getElementById('home-class-list');
  if (!wrap) return;

  NAV.courses.forEach(function (course, idx) {
    var entry = navEl('div', { cls: 'class-entry' });

    var p = navEl('p');
    var nameSpan = navEl('span', { cls: 'class-name', text: course.title });
    p.appendChild(nameSpan);

    var linksSpan = navEl('span', { cls: 'class-links' });
    linksSpan.appendChild(document.createTextNode(' ['));
    linksSpan.appendChild(navEl('a', { href: course.path, text: 'Notes' }));
    linksSpan.appendChild(document.createTextNode(']'));
    if (course.practiceProblems) {
      linksSpan.appendChild(document.createTextNode(' ['));
      linksSpan.appendChild(navEl('a', { href: course.practiceProblems, text: 'Practice Problems' }));
      linksSpan.appendChild(document.createTextNode(']'));
    }
    if (course.assignmentProblems) {
      linksSpan.appendChild(document.createTextNode(' ['));
      linksSpan.appendChild(navEl('a', { href: course.assignmentProblems, text: 'Assignment Problems' }));
      linksSpan.appendChild(document.createTextNode(']'));
    }
    p.appendChild(linksSpan);
    p.appendChild(document.createTextNode(course.books.length ? ' - topics included are:' : ''));
    entry.appendChild(p);

    if (course.books.length) {
      var ul = navEl('ul', { cls: 'class-topics' });
      course.books.forEach(function (book) {
        var li = navEl('li');
        li.appendChild(document.createTextNode(book.title));
        if (book.chapters && book.chapters.length) {
          var anyRealContent = book.chapters.some(function (ch) { return ch.sections.length > 0; });
          if (anyRealContent) {
            var chapterText = book.chapters.map(function (ch) {
              var sectionNames = ch.sections.map(function (s) { return s.title; }).join(', ');
              var cleanTitle = ch.title.replace(/^Chapter \d+:\s*/, '');
              return sectionNames ? cleanTitle + ' (' + sectionNames + ')' : cleanTitle;
            }).join(', ');
            li.appendChild(document.createTextNode(' - ' + chapterText + '.'));
          } else {
            li.appendChild(document.createTextNode(' - ' + book.chapters.length + ' lessons, notes added as each is completed.'));
          }
        } else if (book.topics && book.topics.length) {
          li.appendChild(document.createTextNode(' - ' + book.topics.map(function (t) { return t.title; }).join(', ') + '.'));
        } else {
          li.appendChild(document.createTextNode(' - coming soon.'));
        }
        ul.appendChild(li);
      });
      entry.appendChild(ul);
    }

    if (course.intro) {
      entry.appendChild(navEl('p', { cls: 'class-desc', text: course.intro }));
    }

    wrap.appendChild(entry);
    if (idx < NAV.courses.length - 1) {
      wrap.appendChild(navEl('div', { cls: 'content-sub-separator' }));
    }
  });
}

function renderExtrasList() {
  var wrap = document.getElementById('home-extras-list');
  if (!wrap) return;
  var ul = navEl('ul', { cls: 'class-topics' });
  NAV.extras.forEach(function (ex) {
    var li = navEl('li');
    li.appendChild(navEl('a', { href: ex.path, text: ex.title }));
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
}

var ICON_SPRITE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
  '<symbol id="icon-view" viewBox="0 0 24 24"><path d="M1,12 Q12,2 23,12 Q12,22 1,12 Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2" fill="none"/></symbol>' +
  '<symbol id="icon-nav" viewBox="0 0 24 24"><polyline points="9,4 3,12 9,20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><polyline points="15,4 21,12 15,20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>' +
  '<symbol id="icon-download" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><polyline points="6,10 12,16 18,10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="4" y1="21" x2="20" y2="21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></symbol>' +
  '<symbol id="icon-print" viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="11" rx="1" stroke="currentColor" stroke-width="2.5" fill="none"/><polyline points="7,9 7,3 17,3 17,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="7" y="15" width="10" height="6" rx="0.5" stroke="currentColor" stroke-width="2" fill="none"/><line x1="7" y1="13" x2="9.5" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>' +
  '</svg>';

function svgIcon(id) {
  var span = navEl('span');
  span.innerHTML = '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>';
  return span.firstChild;
}

function closeAllDropdowns(except) {
  document.querySelectorAll('.jq-dropdown.open').forEach(function (d) {
    if (d !== except) d.classList.remove('open');
  });
}

function renderTopbarIcons() {
  var header = document.getElementById('site-header');
  if (!header || document.getElementById('nh-view-btn')) return;

  if (!document.getElementById('icon-sprite-root')) {
    var spriteWrap = navEl('div');
    spriteWrap.id = 'icon-sprite-root';
    spriteWrap.innerHTML = ICON_SPRITE_SVG;
    document.body.insertBefore(spriteWrap, document.body.firstChild);
  }

  var menu = document.getElementById('nh-icons');
  if (!menu) { menu = navEl('div'); header.appendChild(menu); }
  menu.id = 'nh-icons';
  var menuAnchor = menu.firstChild;

  var course = (typeof PAGE !== 'undefined' && PAGE.course) ? navGetCourse(PAGE.course) : null;
  var book = (course && PAGE.book) ? navGetBook(PAGE.course, PAGE.book) : null;
  var prevNext = getPrevNextSection();

  // ---- View menu (eye icon): Go To Notes/Practice/Assignment, Show/Hide all solutions ----
  var viewBtn = navEl('button', { cls: 'top-menu-button' });
  viewBtn.id = 'nh-view-btn';
  viewBtn.title = 'View (Notes, Practice Problems, Assignment Problems, Show/Hide Solutions) Menu';
  viewBtn.appendChild(svgIcon('icon-view'));
  var viewDropdown = navEl('div', { cls: 'jq-dropdown' });
  var viewList = navEl('ul', { cls: 'jq-dropdown-menu' });
  viewList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Go To' })));
  if (course) {
    var goToItems = [
      { label: 'Notes', href: course.path, key: 'notes' },
      { label: 'Practice Problems', href: course.practiceProblems, key: 'practice' },
      { label: 'Assignment Problems', href: course.assignmentProblems, key: 'assignment' }
    ];
    goToItems.forEach(function (item) {
      var li = navEl('li');
      if (!item.href) return;
      if (PAGE.activeTab === item.key) {
        li.appendChild(navEl('span', { cls: 'current-view', text: item.label }));
      } else {
        li.appendChild(navEl('a', { href: item.href, text: item.label }));
      }
      viewList.appendChild(li);
    });
  }
  viewList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Show / Hide' })));
  var showAllLi = navEl('li');
  var showAllBtn = navEl('a', { text: 'Show all Solutions/Steps' });
  showAllBtn.href = 'javascript:void(0)';
  showAllBtn.addEventListener('click', function () { toggleAllSolutions(true); });
  showAllLi.appendChild(showAllBtn);
  viewList.appendChild(showAllLi);
  var hideAllLi = navEl('li');
  var hideAllBtn = navEl('a', { text: 'Hide all Solutions/Steps' });
  hideAllBtn.href = 'javascript:void(0)';
  hideAllBtn.addEventListener('click', function () { toggleAllSolutions(false); });
  hideAllLi.appendChild(hideAllBtn);
  viewList.appendChild(hideAllLi);
  viewDropdown.appendChild(viewList);

  // ---- Quick nav menu (arrows icon): Next Section/Chapter, Classes, Extras ----
  var navBtn = navEl('button', { cls: 'top-menu-button' });
  navBtn.title = 'Quick Navigation (Previous/Next Sections, Classes, Extras) Menu';
  navBtn.appendChild(svgIcon('icon-nav'));
  var navDropdown = navEl('div', { cls: 'jq-dropdown' });
  var navList = navEl('ul', { cls: 'jq-dropdown-menu' });
  if (prevNext && (prevNext.prevHref || prevNext.nextHref)) {
    navList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Sections' })));
    if (prevNext.nextHref) navList.appendChild(wrapLi(navEl('a', { href: prevNext.nextHref, text: 'Next: ' + prevNext.nextLabel })));
    if (prevNext.prevHref) navList.appendChild(wrapLi(navEl('a', { href: prevNext.prevHref, text: 'Prev: ' + prevNext.prevLabel })));
  }
  navList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Classes' })));
  NAV.courses.forEach(function (c) {
    navList.appendChild(wrapLi(navEl('a', { href: c.path, text: c.shortTitle || c.title })));
  });
  navList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Extras' })));
  NAV.extras.forEach(function (ex) {
    navList.appendChild(wrapLi(navEl('a', { href: ex.path, text: ex.title })));
  });
  navDropdown.appendChild(navList);

  // ---- Download menu ----
  var dlBtn = navEl('button', { cls: 'top-menu-button' });
  dlBtn.title = 'Download PDF Menu';
  dlBtn.appendChild(svgIcon('icon-download'));
  var dlDropdown = navEl('div', { cls: 'jq-dropdown' });
  var dlList = navEl('ul', { cls: 'jq-dropdown-menu' });
  if (book && book.downloadPdf) {
    dlList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-nav-title', text: 'Notes Downloads' })));
    dlList.appendChild(wrapLi(navEl('a', { href: book.downloadPdf, text: 'Complete Book (' + book.title + ')' })));
    var dlChapter = PAGE.chapter ? navGetChapter(PAGE.course, PAGE.book, PAGE.chapter) : null;
    if (dlChapter && dlChapter.sections && dlChapter.sections.length) {
      var chPdf = book.downloadPdf.replace(/\.pdf$/, '/' + dlChapter.id + '.pdf');
      dlList.appendChild(wrapLi(navEl('a', { href: chPdf, text: 'Current Chapter (' + dlChapter.title + ')' })));
    }
    if (typeof PAGE.section === 'number') {
      var dlSection = navEl('a', { text: 'Current Section (print or save as PDF)' });
      dlSection.href = 'javascript:void(0)';
      dlSection.addEventListener('click', function () { toggleAllSolutions(true); setTimeout(window.print, 50); });
      dlList.appendChild(wrapLi(dlSection));
    }
  } else {
    dlList.appendChild(wrapLi(navEl('div', { cls: 'jq-dropdown-notice', text: 'A compiled PDF is not yet available for this book.' })));
  }
  dlDropdown.appendChild(dlList);

  // ---- Print menu ----
  var printBtn = navEl('button', { cls: 'top-menu-button' });
  printBtn.title = 'Print Menu';
  printBtn.appendChild(svgIcon('icon-print'));
  var printDropdown = navEl('div', { cls: 'jq-dropdown' });
  var printList = navEl('ul', { cls: 'jq-dropdown-menu' });
  var printDefault = navEl('a', { text: 'Print Page in Current Form' });
  printDefault.href = 'javascript:void(0)';
  printDefault.addEventListener('click', function () { window.print(); });
  printList.appendChild(wrapLi(printDefault));
  var printShow = navEl('a', { text: 'Show all Solutions/Steps and Print' });
  printShow.href = 'javascript:void(0)';
  printShow.addEventListener('click', function () { toggleAllSolutions(true); setTimeout(window.print, 50); });
  printList.appendChild(wrapLi(printShow));
  var printHide = navEl('a', { text: 'Hide all Solutions/Steps and Print' });
  printHide.href = 'javascript:void(0)';
  printHide.addEventListener('click', function () { toggleAllSolutions(false); setTimeout(window.print, 50); });
  printList.appendChild(wrapLi(printHide));
  printDropdown.appendChild(printList);

  [[viewBtn, viewDropdown], [dlBtn, dlDropdown], [printBtn, printDropdown]].forEach(function (pair) {
    var btn = pair[0], dropdown = pair[1];
    btn.className = 'nh-icon-btn';
    menu.insertBefore(btn, menuAnchor);
    document.body.appendChild(dropdown);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !dropdown.classList.contains('open');
      closeAllDropdowns();
      if (willOpen) {
        var rect = btn.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        dropdown.classList.add('open');
      }
    });
  });
  document.addEventListener('click', function () { closeAllDropdowns(); });
}

/* On a book's landing page, point readers to the compiled PDF of the notes */
function renderBookDownloadNote() {
  if (typeof PAGE === 'undefined' || !PAGE.book || PAGE.chapter) return;
  var book = navGetBook(PAGE.course, PAGE.book);
  if (!book || !book.downloadPdf) return;
  var main = document.getElementById('content');
  var firstH2 = main && main.querySelector('h2');
  if (!firstH2) return;
  var note = navEl('p', { cls: 'download-note' });
  note.appendChild(document.createTextNode('The complete notes for this book are available as a single PDF: '));
  note.appendChild(navEl('a', { href: book.downloadPdf, text: 'Download ' + book.title + ' (PDF)' }));
  note.appendChild(document.createTextNode('. Each chapter can also be downloaded on its own from the download menu at the top of any section.'));
  main.insertBefore(note, firstH2);
}

function wrapLi(el) {
  var li = navEl('li');
  li.appendChild(el);
  return li;
}

function toggleAllSolutions(open) {
  document.querySelectorAll('.showhide-content, .example-solution-content').forEach(function (el) {
    el.classList.toggle('open', open);
  });
  document.querySelectorAll('.showhide-btn').forEach(function (btn) {
    var label = btn.dataset.label || 'Content';
    btn.textContent = (open ? 'Hide ' : 'Show ') + label;
  });
  document.querySelectorAll('.example-solution-toggle').forEach(function (btn) {
    btn.classList.toggle('open', open);
    var textSpan = btn.querySelector('.toggle-text');
    if (textSpan) textSpan.textContent = open ? 'Hide Solution' : 'Show Solution';
  });
}

function renderTopbarMenu() {
  var header = document.getElementById('site-header');
  if (!header || document.getElementById('hamburger-btn')) return;

  var btn = navEl('button', { cls: 'nh-icon-btn nh-mobile-only' });
  btn.id = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Site menu');
  btn.appendChild(nhIcon('icon-menu'));
  var iconArea = document.getElementById('nh-icons');
  if (iconArea) iconArea.appendChild(btn); else header.insertBefore(btn, header.firstChild);

  var overlay = navEl('div');
  overlay.id = 'site-menu-overlay';
  var panel = navEl('div');
  panel.id = 'site-menu-panel';

  function closeMenu() { overlay.classList.remove('open'); panel.classList.remove('open'); }
  function toggleMenu() {
    var opening = !overlay.classList.contains('open');
    overlay.classList.toggle('open');
    panel.classList.toggle('open');
    if (opening) renderRootScreen();
  }

  function clearPanel() { while (panel.firstChild) panel.removeChild(panel.firstChild); }

  function renderRootScreen() {
    clearPanel();
    panel.appendChild(navEl('a', { cls: 'sm-link sm-home', href: '/index.html', text: 'Home' }));

    var classesPill = navEl('div', { cls: 'sm-pill-heading', text: 'Classes' });
    panel.appendChild(classesPill);
    NAV.courses.forEach(function (course) {
      var row = navEl('div', { cls: 'sm-row', text: '' });
      row.appendChild(navEl('span', { cls: 'sm-row-link', text: course.shortTitle || course.title }));
      row.appendChild(navEl('span', { cls: 'sm-chevron', text: '\u203A' }));
      row.addEventListener('click', function () { renderCourseScreen(course); });
      panel.appendChild(row);
    });

    var extrasPill = navEl('div', { cls: 'sm-pill-heading', text: 'Extras' });
    panel.appendChild(extrasPill);
    NAV.extras.forEach(function (ex) {
      var row = navEl('div', { cls: 'sm-row' });
      row.appendChild(navEl('a', { cls: 'sm-row-link', href: ex.path, text: ex.title }));
      panel.appendChild(row);
    });
  }

  function renderCourseScreen(course) {
    clearPanel();

    var head = navEl('div', { cls: 'sm-drill-header' });
    var crumb = navEl('div', { cls: 'sm-drill-crumb' });
    var homeLink = navEl('a', { text: "Liban's Notes" });
    homeLink.href = '#';
    homeLink.addEventListener('click', function (e) { e.preventDefault(); renderRootScreen(); });
    crumb.appendChild(homeLink);
    crumb.appendChild(document.createTextNode(' / '));
    crumb.appendChild(navEl('span', { text: course.shortTitle || course.title }));
    head.appendChild(crumb);
    var closeBtn = navEl('button', { cls: 'sm-close-x', text: '\u00D7' });
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.addEventListener('click', closeMenu);
    head.appendChild(closeBtn);
    panel.appendChild(head);

    var viewNotesRow = navEl('div', { cls: 'sm-row' });
    viewNotesRow.appendChild(navEl('a', { cls: 'sm-row-link sm-view-notes', href: course.path, text: 'View ' + (course.shortTitle || course.title) + ' Notes' }));
    panel.appendChild(viewNotesRow);

    if (!course.books.length) {
      var noBooks = navEl('div', { cls: 'sm-row' });
      noBooks.appendChild(navEl('a', { cls: 'sm-row-link', href: course.path, text: 'View class notes' }));
      panel.appendChild(noBooks);
      return;
    }

    course.books.forEach(function (book, i) {
      var row = navEl('div', { cls: 'sm-drill-row' });
      var link = navEl('a', { cls: 'sm-drill-row-link', href: book.path });
      link.textContent = (i + 1) + '. ' + book.title;
      row.appendChild(link);
      row.appendChild(navEl('span', { cls: 'sm-drill-chevron', text: '\u203A' }));
      panel.appendChild(row);
    });
  }

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
}

function renderSectionNumber() {
  if (typeof PAGE === 'undefined' || !PAGE.course || !PAGE.book || !PAGE.chapter) return;
  if (PAGE.section === undefined || PAGE.section === null) return;
  var book = navGetBook(PAGE.course, PAGE.book);
  if (!book || !book.chapters) return;
  var ci = -1;
  for (var i = 0; i < book.chapters.length; i++) {
    if (book.chapters[i].id === PAGE.chapter) { ci = i; break; }
  }
  if (ci === -1) return;
  var h1 = document.querySelector('h1.page-title');
  if (!h1) return;
  var prefix = navEl('span', { text: 'Section ' + (ci + 1) + '.' + (PAGE.section + 1) + ' : ' });
  h1.insertBefore(prefix, h1.firstChild);
}

/* Show / hide content blocks, used on lesson pages */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof PAGE !== 'undefined' && PAGE.course) {
    document.body.classList.add('course-' + PAGE.course);
  }
  renderNewHeader();
  renderTopbarMenu();
  renderTopbarIcons();
  renderNewCrumb();
  renderNewTabs();
  renderSectionNumber();
  renderBottomNav();
  renderNewHomeClassList();
  renderNewExtrasList();
  renderBookDownloadNote();
  renderNewFooter();
  renderPageTools();

  document.querySelectorAll('.showhide-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = document.getElementById(this.dataset.target);
      var label = this.dataset.label || 'Content';
      var open = box.classList.toggle('open');
      this.textContent = (open ? 'Hide ' : 'Show ') + label;
    });
  });

  document.querySelectorAll('.example-solution-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = document.getElementById(this.dataset.target);
      var open = box.classList.toggle('open');
      this.classList.toggle('open', open);
      var textSpan = this.querySelector('.toggle-text');
      if (textSpan) textSpan.textContent = open ? 'Hide Solution' : 'Show Solution';
    });
  });
});

/* ============================================================
   NEW SITE CHROME (2026 redesign, modeled on Paul's new layout)
   Header bar with mega menus, breadcrumb bar, content nav with
   arrow-shaped Prev/Next, card-style class list, footer, and
   floating page tools.
   ============================================================ */

var NAV_MENU_GROUPS_DEFAULT = [
  { id: 'arabic', label: 'Arabic', courses: ['nahw-sarf', 'arabic-speaking'] },
  { id: 'fiqh', label: 'Fiqh', courses: ['fiqh', 'usul-fiqh'] },
  { id: 'aqidah', label: 'Aqidah', courses: ['aqidah'] },
  { id: 'hadith', label: 'Hadith', courses: ['hadith'] },
  { id: 'quran', label: "Qur'an", courses: ['quran-sciences'] },
  { id: 'extras', label: 'Extras', extras: true }
];

function navMenuGroups() {
  var groups = (typeof NAV !== 'undefined' && NAV.menuGroups) ? NAV.menuGroups : NAV_MENU_GROUPS_DEFAULT;
  return groups.map(function (g) {
    var out = { id: g.id, label: g.label, extras: !!g.extras, courses: [] };
    (g.courses || []).forEach(function (cid) { var c = navGetCourse(cid); if (c) out.courses.push(c); });
    return out;
  });
}

var NEW_ICON_SPRITE =
  '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
  '<symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"/></symbol>' +
  '<symbol id="icon-envelope" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>' +
  '<symbol id="icon-menu" viewBox="0 0 24 24"><line x1="3" y1="5" x2="21" y2="5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="3" y1="19" x2="21" y2="19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></symbol>' +
  '<symbol id="icon-chevron-down" viewBox="0 0 24 24"><polyline points="4,9 12,17 20,9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
  '<symbol id="icon-list" viewBox="0 0 24 24"><circle cx="4" cy="6" r="1.6" fill="currentColor"/><circle cx="4" cy="12" r="1.6" fill="currentColor"/><circle cx="4" cy="18" r="1.6" fill="currentColor"/><line x1="9" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="9" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="9" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></symbol>' +
  '</svg>';

function nhIcon(id, cls) {
  var span = document.createElement('span');
  span.innerHTML = '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  return span.firstChild;
}

function bookHasNotes(book) {
  return (book.chapters || []).some(function (ch) { return ch.sections && ch.sections.length; });
}

/* ---------- Header + mega menus ---------- */
function renderNewHeader() {
  var header = document.getElementById('site-header');
  if (!header || header.classList.contains('nh')) return;
  header.classList.add('nh');
  while (header.firstChild) header.removeChild(header.firstChild);

  var sprite = navEl('div'); sprite.innerHTML = NEW_ICON_SPRITE;
  document.body.insertBefore(sprite, document.body.firstChild);

  var inner = navEl('div', { cls: 'nh-inner' });
  var home = navEl('a', { cls: 'nh-home', href: '/index.html' });
  home.appendChild(nhIcon('icon-home', 'nh-home-icon'));
  home.appendChild(navEl('span', { cls: 'nh-home-text', text: "Liban's Notes" }));
  inner.appendChild(home);

  var items = navEl('ul', { cls: 'nh-topitems' });
  inner.appendChild(items);
  var icons = navEl('div', { cls: 'nh-icons' });
  icons.id = 'nh-icons';
  inner.appendChild(icons);
  header.appendChild(inner);

  var openMega = null, closeTimer = null;
  function closeMega() {
    if (!openMega) return;
    openMega.panel.classList.remove('open');
    openMega.trigger.setAttribute('aria-expanded', 'false');
    openMega.trigger.classList.remove('open');
    openMega = null;
  }
  function showMega(entry) {
    clearTimeout(closeTimer);
    if (openMega === entry) return;
    closeMega(); closeAllDropdowns();
    entry.panel.classList.add('open');
    entry.trigger.setAttribute('aria-expanded', 'true');
    entry.trigger.classList.add('open');
    openMega = entry;
  }
  function scheduleClose() { clearTimeout(closeTimer); closeTimer = setTimeout(closeMega, 220); }

  navMenuGroups().forEach(function (g) {
    var li = navEl('li');
    var firstPath = g.extras ? (NAV.extras[0] && NAV.extras[0].path) : (g.courses[0] && g.courses[0].path);
    var trigger = navEl('a', { cls: 'nh-topitem', href: firstPath || '/index.html' });
    trigger.appendChild(document.createTextNode(g.label + ' '));
    trigger.appendChild(navEl('span', { cls: 'nh-chevron', text: '▸' }));
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    li.appendChild(trigger);
    items.appendChild(li);

    var panel = g.extras ? buildExtrasMega() : buildGroupMega(g);
    header.appendChild(panel);
    var entry = { trigger: trigger, panel: panel };

    trigger.addEventListener('mouseenter', function () { if (window.innerWidth > 900) showMega(entry); });
    trigger.addEventListener('mouseleave', scheduleClose);
    panel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
    panel.addEventListener('mouseleave', scheduleClose);
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) return;
      e.preventDefault();
      if (openMega === entry) closeMega(); else showMega(entry);
    });
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMega(); });
  document.addEventListener('click', function (e) {
    if (openMega && !openMega.panel.contains(e.target) && !openMega.trigger.contains(e.target)) closeMega();
  });

  // contact icon
  var contact = navEl('a', { cls: 'nh-icon-btn', href: '/Extras/Contact.html' });
  contact.setAttribute('aria-label', 'Contact');
  contact.title = 'Contact';
  contact.appendChild(nhIcon('icon-envelope'));
  icons.appendChild(contact);
}

function buildGroupMega(g) {
  var panel = navEl('div', { cls: 'nh-mega' });
  var body = navEl('div', { cls: 'nh-mega-body' });
  var left = navEl('ul', { cls: 'nh-mega-left' });
  var right = navEl('div', { cls: 'nh-mega-right' });
  var def = navEl('div', { cls: 'nh-mega-default' });
  def.appendChild(navEl('p', { cls: 'nh-mega-default-title', text: g.label }));
  def.appendChild(navEl('p', { text: 'Hover over or select a book on the left to see its chapters and sections.' }));
  right.appendChild(def);

  var panels = [];
  function activate(i) {
    panels.forEach(function (p, j) {
      p.panel.classList.toggle('active', i === j);
      p.btn.classList.toggle('active', i === j);
    });
    def.style.display = i === null ? '' : 'none';
  }

  g.courses.forEach(function (course) {
    if (g.courses.length > 1) {
      var head = navEl('li', { cls: 'nh-mega-left-head' });
      head.appendChild(navEl('a', { href: course.path, text: course.title }));
      left.appendChild(head);
    }
    course.books.forEach(function (book) {
      var li = navEl('li');
      var btn = navEl('button', { cls: 'nh-mega-left-item' });
      btn.type = 'button';
      btn.appendChild(navEl('span', { text: book.title }));
      btn.appendChild(navEl('span', { cls: 'nh-chevron', text: '▸' }));
      if (!bookHasNotes(book)) btn.classList.add('soon');
      li.appendChild(btn);
      left.appendChild(li);
      var bp = buildBookPanel(course, book);
      right.appendChild(bp);
      var idx = panels.length;
      panels.push({ btn: btn, panel: bp });
      btn.addEventListener('mouseenter', function () { activate(idx); });
      btn.addEventListener('focus', function () { activate(idx); });
      btn.addEventListener('click', function () { activate(idx); });
    });
  });

  // open on the current book if we are inside this group
  if (typeof PAGE !== 'undefined' && PAGE.book) {
    var flat = [];
    g.courses.forEach(function (c) { c.books.forEach(function (b) { flat.push(c.id + '/' + b.id); }); });
    var here = flat.indexOf(PAGE.course + '/' + PAGE.book);
    if (here !== -1) activate(here);
  }

  body.appendChild(left);
  body.appendChild(right);
  panel.appendChild(body);
  return panel;
}

function buildBookPanel(course, book) {
  var p = navEl('div', { cls: 'nh-mega-book' });
  var head = navEl('div', { cls: 'nh-mega-book-head' });
  head.appendChild(navEl('a', { cls: 'nh-mega-book-title', href: book.path, text: book.title }));
  var links = navEl('div', { cls: 'nh-mega-book-links' });
  links.appendChild(navEl('a', { href: book.path, text: 'Notes' }));
  if (course.practiceProblems) links.appendChild(navEl('a', { href: course.practiceProblems, text: 'Practice Problems' }));
  if (course.assignmentProblems) links.appendChild(navEl('a', { href: course.assignmentProblems, text: 'Assignment Problems' }));
  if (book.downloadPdf) links.appendChild(navEl('a', { href: book.downloadPdf, text: 'Download PDF' }));
  head.appendChild(links);
  p.appendChild(head);

  var chapters = book.chapters || [];
  if (!chapters.length) {
    var topics = book.topics || [];
    if (topics.length) {
      var ul = navEl('ul', { cls: 'nh-mega-sections nh-mega-flat' });
      topics.forEach(function (t) {
        var li = navEl('li');
        li.appendChild(t.path ? navEl('a', { href: t.path, text: t.title }) : navEl('span', { text: t.title }));
        ul.appendChild(li);
      });
      p.appendChild(ul);
    } else {
      p.appendChild(navEl('p', { cls: 'nh-mega-soon', text: 'Notes for this book will be added as lessons are completed.' }));
    }
    return p;
  }

  chapters.forEach(function (ch, ci) {
    var acc = navEl('div', { cls: 'nh-acc' });
    var trig = navEl('button', { cls: 'nh-acc-trigger' });
    trig.type = 'button';
    trig.appendChild(navEl('span', { text: ch.title }));
    var count = (ch.sections || []).length;
    trig.appendChild(navEl('span', { cls: 'nh-acc-count', text: count ? count + (count === 1 ? ' section' : ' sections') : 'coming soon' }));
    trig.appendChild(nhIcon('icon-chevron-down', 'nh-acc-chev'));
    acc.appendChild(trig);
    var list = navEl('ul', { cls: 'nh-mega-sections' });
    if (ch.path) {
      var introLi = navEl('li', { cls: 'nh-sec-intro' });
      introLi.appendChild(navEl('a', { href: ch.path, text: 'Chapter overview' }));
      list.appendChild(introLi);
    }
    (ch.sections || []).forEach(function (s, si) {
      var li = navEl('li');
      var a = navEl('a', { href: s.path });
      a.appendChild(navEl('span', { cls: 'nh-sec-num', text: (ci + 1) + '.' + (si + 1) }));
      a.appendChild(document.createTextNode(s.title));
      if (typeof PAGE !== 'undefined' && PAGE.book === book.id && PAGE.chapter === ch.id && PAGE.section === si) a.classList.add('current');
      li.appendChild(a);
      list.appendChild(li);
    });
    acc.appendChild(list);
    var isHere = typeof PAGE !== 'undefined' && PAGE.book === book.id && PAGE.chapter === ch.id;
    if (isHere) acc.classList.add('open');
    trig.addEventListener('click', function () { acc.classList.toggle('open'); });
    p.appendChild(acc);
  });
  return p;
}

function buildExtrasMega() {
  var panel = navEl('div', { cls: 'nh-mega nh-mega-small' });
  var ul = navEl('ul', { cls: 'nh-mega-misc' });
  NAV.extras.forEach(function (ex) {
    var li = navEl('li');
    li.appendChild(navEl('a', { href: ex.path, text: ex.title }));
    ul.appendChild(li);
  });
  [['About This Site', '/Extras/About.html'], ['Contact', '/Extras/Contact.html']].forEach(function (x) {
    var li = navEl('li', { cls: 'nh-misc-sep' });
    li.appendChild(navEl('a', { href: x[1], text: x[0] }));
    ul.appendChild(li);
  });
  panel.appendChild(ul);
  return panel;
}

/* ---------- Breadcrumb bar ---------- */
function renderNewCrumb() {
  var row = document.getElementById('crumb-row');
  if (!row || typeof PAGE === 'undefined') return;
  row.className = 'nb-crumb';
  while (row.firstChild) row.removeChild(row.firstChild);
  var ol = navEl('ol');
  function add(text, href) {
    var li = navEl('li');
    if (href) li.appendChild(navEl('a', { href: href, text: text }));
    else { var s = navEl('span', { text: text }); li.setAttribute('aria-current', 'page'); li.appendChild(s); }
    ol.appendChild(li);
  }
  var course = PAGE.course ? navGetCourse(PAGE.course) : null;
  var book = (course && PAGE.book) ? navGetBook(PAGE.course, PAGE.book) : null;
  var chapter = (book && PAGE.chapter) ? navGetChapter(PAGE.course, PAGE.book, PAGE.chapter) : null;
  var hasSection = chapter && PAGE.section !== undefined && PAGE.section !== null && chapter.sections[PAGE.section];

  if (!course) {
    if (PAGE.label) { add('Home', '/index.html'); add(PAGE.label); }
  } else {
    add(course.shortTitle || course.title, book ? course.path : null);
    if (book) add(book.title, (chapter || PAGE.topic !== undefined) ? book.path : null);
    if (chapter) add(cleanChapterTitle(chapter.title), hasSection ? chapter.path : null);
    if (hasSection) add(chapter.sections[PAGE.section].title);
    if (book && !chapter && PAGE.topic !== undefined && book.topics && book.topics[PAGE.topic]) add(book.topics[PAGE.topic].title);
  }
  if (!ol.children.length) { row.style.display = 'none'; return; }
  row.setAttribute('aria-label', 'Breadcrumb');
  row.appendChild(ol);
}

/* ---------- Content nav: arrow Prev / pills / arrow Next ---------- */
function renderNewTabs() {
  var row = document.getElementById('tab-row');
  if (!row || typeof PAGE === 'undefined' || !PAGE.course) return;
  var course = navGetCourse(PAGE.course);
  if (!course) return;
  row.className = 'nc-nav';
  while (row.firstChild) row.removeChild(row.firstChild);
  var inner = navEl('div', { cls: 'nc-row' });
  var pn = getPrevNextSection();

  if (pn && pn.prevHref) {
    var prev = navEl('a', { cls: 'nc-prev', href: pn.prevHref });
    prev.title = 'Previous: ' + pn.prevLabel;
    prev.innerHTML = '<span>Prev.<span class="nc-wide"> Section</span></span>';
    inner.appendChild(prev);
  } else inner.appendChild(navEl('span', { cls: 'nc-spacer' }));

  var pills = navEl('div', { cls: 'nc-pills' });
  [
    { label: 'Notes', short: 'Notes', href: course.path, key: 'notes' },
    { label: 'Practice Problems', short: 'Prac.', href: course.practiceProblems, key: 'practice' },
    { label: 'Assignment Problems', short: 'Asgn.', href: course.assignmentProblems, key: 'assignment' }
  ].forEach(function (t) {
    var el;
    if (PAGE.activeTab === t.key) { el = navEl('span', { cls: 'nc-pill current' }); el.setAttribute('aria-current', 'page'); }
    else if (!t.href) { el = navEl('span', { cls: 'nc-pill disabled' }); }
    else el = navEl('a', { cls: 'nc-pill', href: t.href });
    el.innerHTML = '<span class="nc-wide">' + t.label + '</span><span class="nc-narrow">' + t.short + '</span>';
    pills.appendChild(el);
  });
  inner.appendChild(pills);

  if (pn && pn.nextHref) {
    var next = navEl('a', { cls: 'nc-next', href: pn.nextHref });
    next.title = 'Next: ' + pn.nextLabel;
    next.innerHTML = '<span>Next<span class="nc-wide"> Section</span></span>';
    inner.appendChild(next);
  } else inner.appendChild(navEl('span', { cls: 'nc-spacer' }));

  row.appendChild(inner);
}

/* ---------- Home page: class cards with Show Topics ---------- */
function renderNewHomeClassList() {
  var wrap = document.getElementById('home-class-list');
  if (!wrap) return;
  while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
  NAV.courses.forEach(function (course) {
    course.books.forEach(function (book) {
      var card = navEl('div', { cls: 'nh-card' });
      var h = navEl('h3');
      h.appendChild(document.createTextNode(book.title));
      h.appendChild(navEl('span', { cls: 'nh-card-course', text: course.shortTitle || course.title }));
      card.appendChild(h);
      var links = navEl('div', { cls: 'nh-card-links' });
      function bracket(text, href) {
        links.appendChild(document.createTextNode('['));
        links.appendChild(navEl('a', { href: href, text: text }));
        links.appendChild(document.createTextNode('] '));
      }
      bracket('Notes', book.path);
      if (course.practiceProblems) bracket('Practice Problems', course.practiceProblems);
      if (course.assignmentProblems) bracket('Assignment Problems', course.assignmentProblems);
      if (book.downloadPdf) bracket('Download PDF', book.downloadPdf);
      card.appendChild(links);
      if (book.description) card.appendChild(navEl('p', { text: book.description }));

      var chapters = book.chapters || [];
      var items = [];
      if (chapters.length) {
        chapters.forEach(function (ch) {
          var secs = (ch.sections || []).map(function (s) { return s.title; });
          items.push(cleanChapterTitle(ch.title) + (secs.length ? ' - ' + secs.join(', ') + '.' : ' - coming soon.'));
        });
      } else if (book.topics && book.topics.length) {
        items.push(book.topics.map(function (t) { return t.title; }).join(', ') + '.');
      }
      if (!bookHasNotes(book)) card.classList.add('nh-card-soon');
      if (items.length) {
        var btn = navEl('button', { cls: 'nh-expand' });
        btn.type = 'button';
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span class="nh-expand-label">Show Topics</span><svg class="nh-expand-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2 L8 6 L4 10" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var ul = navEl('ul', { cls: 'nh-card-topics' });
        ul.hidden = true;
        items.forEach(function (t) { ul.appendChild(navEl('li', { text: t })); });
        btn.addEventListener('click', function () {
          var open = ul.hidden;
          ul.hidden = !open;
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          btn.querySelector('.nh-expand-label').textContent = open ? 'Hide Topics' : 'Show Topics';
        });
        card.appendChild(btn);
        card.appendChild(ul);
      }
      wrap.appendChild(card);
    });
  });
}

function renderNewExtrasList() {
  var wrap = document.getElementById('home-extras-list');
  if (!wrap) return;
  while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
  NAV.extras.forEach(function (ex) {
    var card = navEl('div', { cls: 'nh-card' });
    var h = navEl('h3');
    h.appendChild(navEl('a', { href: ex.path, text: ex.title }));
    card.appendChild(h);
    if (ex.description) card.appendChild(navEl('p', { text: ex.description }));
    wrap.appendChild(card);
  });
}

/* ---------- Footer ---------- */
function renderNewFooter() {
  var f = document.getElementById('site-footer');
  if (!f) return;
  f.className = 'nf';
  f.innerHTML = '';
  var links = navEl('div', { cls: 'nf-links' });
  [['Home', '/index.html'], ['About This Site', '/Extras/About.html'], ['Contact Me', '/Extras/Contact.html']].forEach(function (x) {
    links.appendChild(document.createTextNode('['));
    links.appendChild(navEl('a', { href: x[1], text: x[0] }));
    links.appendChild(document.createTextNode('] '));
  });
  f.appendChild(links);
  var dates = navEl('div', { cls: 'nf-dates' });
  dates.appendChild(navEl('div', { text: '© ' + new Date().getFullYear() + " Liban's Online Notes" }));
  var lm = new Date(document.lastModified);
  if (!isNaN(lm)) {
    dates.appendChild(navEl('div', { text: 'Page Last Modified : ' + lm.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }));
  }
  f.appendChild(dates);
}

/* ---------- Floating page tools: back to top + jump to ---------- */
function renderPageTools() {
  var main = document.getElementById('content');
  if (!main || document.getElementById('page-tools')) return;
  var tools = navEl('div', { cls: 'page-tools' });
  tools.id = 'page-tools';

  var heads = [].slice.call(main.querySelectorAll('.lesson-block > h4, h2, .example-box .example-label')).filter(function (h) { return h.textContent.trim(); });
  if (heads.length >= 3) {
    var jumpWrap = navEl('div', { cls: 'page-jump' });
    var panel = navEl('nav', { cls: 'page-jump-panel' });
    panel.hidden = true;
    panel.appendChild(navEl('p', { cls: 'page-jump-heading', text: 'Jump to' }));
    var ul = navEl('ul');
    heads.forEach(function (h, i) {
      var target = h.closest('.example-box') || h;
      if (!target.id) target.id = 'jump-' + i;
      var label = h.classList.contains('example-label') ? (h.textContent + ': ' + ((h.nextElementSibling && h.nextElementSibling.textContent) || '')).slice(0, 70) : h.textContent;
      var li = navEl('li');
      var a = navEl('a', { href: '#' + target.id, text: label });
      a.addEventListener('click', function () { panel.hidden = true; });
      li.appendChild(a);
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    var jbtn = navEl('button', { cls: 'page-tool-btn' });
    jbtn.type = 'button';
    jbtn.setAttribute('aria-label', 'Jump to a heading on this page');
    jbtn.title = 'Jump to';
    jbtn.appendChild(nhIcon('icon-list'));
    jbtn.addEventListener('click', function (e) { e.stopPropagation(); panel.hidden = !panel.hidden; });
    document.addEventListener('click', function (e) { if (!panel.contains(e.target)) panel.hidden = true; });
    jumpWrap.appendChild(panel);
    jumpWrap.appendChild(jbtn);
    tools.appendChild(jumpWrap);
  }

  var top = navEl('button', { cls: 'page-tool-btn page-tool-top' });
  top.type = 'button';
  top.setAttribute('aria-label', 'Back to top');
  top.title = 'Back to top';
  top.appendChild(nhIcon('icon-chevron-down'));
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  tools.appendChild(top);
  document.body.appendChild(tools);
  function onScroll() { tools.classList.toggle('visible', window.scrollY > 400); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
