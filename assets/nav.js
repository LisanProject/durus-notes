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

  NAV.courses.forEach(function (course) {
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
    p.appendChild(document.createTextNode(' - ' + (course.books.length ? 'topics included are:' : course.intro)));
    entry.appendChild(p);

    if (course.books.length) {
      var ul = navEl('ul', { cls: 'class-topics' });
      course.books.forEach(function (book) {
        var li = navEl('li');
        var strong = navEl('strong', { text: book.title });
        li.appendChild(strong);
        if (book.topics.length) {
          li.appendChild(document.createTextNode(' - ' + book.topics.map(function (t) { return t.title; }).join(', ') + '.'));
        } else {
          li.appendChild(document.createTextNode(' - coming soon.'));
        }
        ul.appendChild(li);
      });
      entry.appendChild(ul);
    }

    wrap.appendChild(entry);
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

  panel.appendChild(navEl('a', { cls: 'sm-link sm-home', href: '/index.html', text: 'Home' }));
  panel.appendChild(navEl('div', { cls: 'sm-heading', text: 'Classes' }));
  NAV.courses.forEach(function (course) {
    panel.appendChild(navEl('a', { cls: 'sm-link', href: course.path, text: course.shortTitle || course.title }));
  });
  panel.appendChild(navEl('div', { cls: 'sm-heading', text: 'Extras' }));
  NAV.extras.forEach(function (ex) {
    panel.appendChild(navEl('a', { cls: 'sm-link', href: ex.path, text: ex.title }));
  });

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function closeMenu() { overlay.classList.remove('open'); panel.classList.remove('open'); }
  function toggleMenu() { overlay.classList.toggle('open'); panel.classList.toggle('open'); }

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
});
