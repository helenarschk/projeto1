document.addEventListener('DOMContentLoaded', () => {
  initAccessibility();
  initLoginModal();
  initFavorites();
});

/* Acessibilidade: Redimensionamento de Fonte e Contraste */
function initAccessibility() {
  let currentFontSize = 16;

  const btnIncrease = document.getElementById('btn-font-increase');
  const btnDecrease = document.getElementById('btn-font-decrease');
  const btnReset = document.getElementById('btn-font-reset');
  const btnContrast = document.getElementById('btn-contrast');

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (currentFontSize < 22) {
        currentFontSize += 2;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentFontSize = 16;
      document.documentElement.style.fontSize = '16px';
    });
  }

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }
}

/* Modal de Login e Cadastro */
function initLoginModal() {
  const modal = document.getElementById('login-modal');
  const btnOpen = document.getElementById('btn-open-login');
  const btnClose = document.getElementById('btn-close-modal');
  const form = document.getElementById('login-form');

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  }

  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login realizado com sucesso!');
      modal.style.display = 'none';
      if (btnOpen) btnOpen.textContent = '👤 Minha Conta';
    });
  }
}

/* Gerenciador de Favoritos */
function initFavorites() {
  const favButtons = document.querySelectorAll('.btn-fav');
  const favBadge = document.getElementById('fav-count');

  let favCount = parseInt(localStorage.getItem('cineif_favs_count') || '0');
  if (favBadge) favBadge.textContent = favCount;

  favButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) {
        favCount++;
        btn.setAttribute('aria-label', 'Remover dos favoritos');
      } else {
        favCount = Math.max(0, favCount - 1);
        btn.setAttribute('aria-label', 'Adicionar aos favoritos');
      }
      localStorage.setItem('cineif_favs_count', favCount);
      if (favBadge) favBadge.textContent = favCount;
    });
  });
}

/* Filtro de Busca Dinâmico */
function filterCards(query, cardSelector) {
  const cards = document.querySelectorAll(cardSelector);
  const filter = query.toLowerCase().trim();

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(filter)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}