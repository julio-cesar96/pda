// ========================================
// MENU MOBILE - SCRIPT COMPLETO
// ========================================

// Seleciona os elementos da DOM
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarLinks = document.querySelectorAll('.nav-link');
const body = document.body;

/**
 * Alterna o estado do menu (aberto/fechado)
 */

function toggleMenu() {
    // Toggle da classe 'active' para mostrar/ocultar o menu
    navbarToggler.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    body.classList.toggle('menu-open');

    // Acessibilidade: Atualiza o atributo aria-expanded
    const isExpanded = navbarToggler.classList.contains('active');
    navbarToggler.setAttribute('aria-expanded', isExpanded);

    // prevenção scroll quando o menu estiver aberto
    if (isExpanded) {
        body.style.overflow = 'hidden'; // Impede o scroll do corpo
    } else {
        body.style.overflow = ''; // Restaura o comportamento de scroll padrão
    }
}

/**
 * Fecha o menu
 */

function closeMenu() {
    navbarToggler.classList.remove('active');
    navbarMenu.classList.remove('active');
    body.classList.remove('menu-open');
    navbarToggler.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
}

// ========== EVENT LISTENERS ==========

// Clique no botão hambúrguer para abrir/fechar o menu
navbarToggler.addEventListener('click', toggleMenu);

// Fechar o menu ao clicar em qualquer link
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});

// Fechar o menu ao pressionar ESC (acessbilidade via teclado)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbarMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Fecha menu ao clicar fora do menu
body.addEventListener('click', (event) => {
    if (body.classList.contains('menu-open') &&
        !navbarMenu.contains(event.target) &&
        !navbarToggler.contains(event.target)) {
        closeMenu();
    }
}); 

// ========== PREVENT BUG AO REDIMENSIONAR ==========

// Fecha menu se usuário redimensionar janela para desktop
// (previne bug de menu aberto ao ampliar janela)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Se está em desktop E menu está aberto, fecha
    if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
      closeMenu();
    }
  }, 250); // Debounce de 250ms
});

// ========== SMOOTH SCROLL PARA ÂNCORAS ==========

// Adiciona scroll suave para links com #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Se href não é apenas '#' e o elemento existe
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});