// Simple tab controller with accessible focus handling
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.getAttribute('data-tab');

    tabs.forEach(t => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });

    panels.forEach(p => p.classList.toggle('active', p.id === id));
    // Move focus to panel heading for screen readers
    const h2 = document.querySelector(`#${id} h2`);
    if (h2) h2.setAttribute('tabindex', '-1'), h2.focus();
  });
});
