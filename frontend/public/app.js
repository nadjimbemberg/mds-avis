document.addEventListener('DOMContentLoaded', () => {
  // Auto-dismiss flash messages (green=succès, red=erreur) après 4 secondes
  document.querySelectorAll(
    '.bg-green-500\\/10, .bg-red-500\\/10'
  ).forEach((el) => {
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    }, 4000);
  });

  // Fenêtre de confirmation sur les formulaires de suppression
  document.querySelectorAll('[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const msg = form.dataset.confirm || 'Confirmer cette action ?';
      if (!window.confirm(msg)) e.preventDefault();
    });
  });

  // Compteur de caractères pour les <textarea data-maxlength="N">
  document.querySelectorAll('textarea[data-maxlength]').forEach((ta) => {
    const max = parseInt(ta.dataset.maxlength, 10);
    const counter = document.createElement('p');
    counter.className = 'text-xs text-gray-400 mt-1 text-right';
    ta.parentNode.insertBefore(counter, ta.nextSibling);
    const update = () => {
      counter.textContent = `${ta.value.length} / ${max} caractères`;
      counter.style.color = max - ta.value.length < 20 ? '#ef4444' : '';
    };
    ta.addEventListener('input', update);
    update();
  });
});
