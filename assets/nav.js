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
          var chapterText = book.chapters.map(function (ch) {
            var sectionNames = ch.sections.map(function (s) { return s.title; }).join(', ');
            return ch.title.replace(/^Chapter \d+:\s*/, '') + ' (' + sectionNames + ')';
          }).join(', ');
          li.appendChild(document.createTextNode(' - ' + chapterText + '.'));
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
  if (!header || document.getElementById('content-top-menu')) return;

  if (!document.getElementById('icon-sprite-root')) {
    var spriteWrap = navEl('div');
    spriteWrap.id = 'icon-sprite-root';
    spriteWrap.innerHTML = ICON_SPRITE_SVG;
    document.body.insertBefore(spriteWrap, document.body.firstChild);
  }

  var menu = navEl('div');
  menu.id = 'content-top-menu';
  header.appendChild(menu);

  var course = (typeof PAGE !== 'undefined' && PAGE.course) ? navGetCourse(PAGE.course) : null;
  var book = (course && PAGE.book) ? navGetBook(PAGE.course, PAGE.book) : null;
  var prevNext = getPrevNextSection();

  // ---- View menu (eye icon): Go To Notes/Practice/Assignment, Show/Hide all solutions ----
  var viewBtn = navEl('button', { cls: 'top-menu-button' });
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

  [[viewBtn, viewDropdown], [navBtn, navDropdown], [dlBtn, dlDropdown], [printBtn, printDropdown]].forEach(function (pair) {
    var btn = pair[0], dropdown = pair[1];
    menu.appendChild(btn);
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

  var btn = navEl('button', { cls: '' });
  btn.id = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Site menu');
  btn.appendChild(navEl('span'));
  btn.appendChild(navEl('span'));
  btn.appendChild(navEl('span'));
  header.insertBefore(btn, header.firstChild);

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
  renderTopbarMenu();
  renderTopbarIcons();
  renderCrumb();
  renderTabs();
  renderSectionNumber();
  renderBottomNav();
  renderHomeClassList();
  renderExtrasList();

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
