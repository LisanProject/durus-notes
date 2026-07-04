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

function renderCrumb() {
  var row = document.getElementById('crumb-row');
  if (!row || typeof PAGE === 'undefined') return;

  var pill = navEl('div', { cls: 'crumb-pill' });
  pill.appendChild(navEl('a', { href: '/index.html', text: 'Home' }));

  var course = PAGE.course ? navGetCourse(PAGE.course) : null;
  var book = (PAGE.course && PAGE.book) ? navGetBook(PAGE.course, PAGE.book) : null;

  if (!course && PAGE.label) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: PAGE.label }));
  }

  if (course) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    if (book || PAGE.topic !== undefined) {
      pill.appendChild(navEl('a', { href: course.path, text: course.shortTitle || course.title }));
    } else {
      pill.appendChild(navEl('span', { cls: 'current', text: course.shortTitle || course.title }));
    }
  }
  if (book) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    if (PAGE.topic !== undefined && PAGE.topic !== null) {
      pill.appendChild(navEl('a', { href: book.path, text: book.title }));
    } else {
      pill.appendChild(navEl('span', { cls: 'current', text: book.title }));
    }
  }
  if (book && PAGE.topic !== undefined && PAGE.topic !== null && book.topics[PAGE.topic]) {
    pill.appendChild(navEl('span', { cls: 'sep', text: ' / ' }));
    pill.appendChild(navEl('span', { cls: 'current', text: book.topics[PAGE.topic].title }));
  }

  row.appendChild(pill);
}

function renderTabs() {
  var row = document.getElementById('tab-row');
  if (!row || typeof PAGE === 'undefined' || !PAGE.course) return;
  var course = navGetCourse(PAGE.course);
  if (!course) return;

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
}

function renderBottomNav() {
  var row = document.getElementById('bottom-nav-row');
  if (!row || typeof PAGE === 'undefined' || !PAGE.course || !PAGE.book) return;
  if (PAGE.topic === undefined || PAGE.topic === null) return;
  var book = navGetBook(PAGE.course, PAGE.book);
  if (!book) return;

  var prev = book.topics[PAGE.topic - 1];
  var next = book.topics[PAGE.topic + 1];

  if (prev) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: prev.path, text: '< ' + prev.title }));
  } else {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: book.path, text: '< Back to ' + book.title }));
  }
  if (next) {
    row.appendChild(navEl('a', { cls: 'tab-pill', href: next.path, text: next.title + ' >' }));
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
        var strong = navEl('strong', { text: book.title });
        li.appendChild(document.createTextNode(book.title));;
        if (book.topics.length) {
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
      wrap.appendChild(navEl('div', { cls: 'class-separator' }));
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

/* Show / hide content blocks, used on lesson pages */
document.addEventListener('DOMContentLoaded', function () {
  renderTopbarMenu();
  renderCrumb();
  renderTabs();
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
