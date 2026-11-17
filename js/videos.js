(() => {
  const cards = [...document.querySelectorAll('.video-card')];
  const filters = document.querySelector('.filters');
  filters.hidden = false;
  function refreshDates() {
    const now = Date.now();
    cards.forEach(card => {
      if (!card.dataset.publish) return;
      const passed = new Date(card.dataset.publish).getTime() <= now;
      card.querySelector('.status').textContent = passed ? 'Fecha de publicación cumplida' : 'Próxima publicación';
    });
  }
  refreshDates();
  setInterval(refreshDates, 60000);
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.format !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.getElementById('result-count').textContent = `${count} recuerdos`;
  });
})();
