// Sidebar: toggle book open/closed
document.querySelectorAll('.book-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var list = this.nextElementSibling;
    list.classList.toggle('open');
    this.classList.toggle('open');
  });
});

// Auto-open the book containing the active page link
var active = document.querySelector('.chapter-list a.active');
if (active) {
  var list = active.closest('.chapter-list');
  var btn  = list && list.previousElementSibling;
  if (list) list.classList.add('open');
  if (btn)  btn.classList.add('open');
}

// Show / Hide content blocks
document.querySelectorAll('.showhide-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var box   = document.getElementById(this.dataset.target);
    var label = this.dataset.label || 'Content';
    var open  = box.classList.toggle('open');
    this.textContent = (open ? 'Hide ' : 'Show ') + label;
  });
});
