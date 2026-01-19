document.addEventListener('DOMContentLoaded', function() {
    const showAllBtn = document.querySelector('[data-show-all-cards]');
    const allCards = document.querySelectorAll('.directions__card');
    const buttonContainer = document.querySelector('.directions__buttons');
    
    const SHOW_INITIAL = 6; // Количество карточек для начального показа
    
    (function initCards() {
    const allCards = document.querySelectorAll('.directions__card');
    const SHOW_INITIAL = 6;
    
    if (allCards.length <= SHOW_INITIAL) {
        const buttonContainer = document.querySelector('.directions__buttons');
        if (buttonContainer) {
            buttonContainer.style.display = 'none';
        }
        return;
    }
    
    // Скрываем лишние карточки
    allCards.forEach((card, index) => {
        if (index >= SHOW_INITIAL) {
            card.style.display = 'none';
            card.classList.add('directions__card--hidden');
        }
    });
})();
    // Скрываем карточки, начиная с 7-й
    allCards.forEach((card, index) => {
        if (index >= SHOW_INITIAL) {
            card.style.display = 'none';
            card.classList.add('directions__card--hidden');
        }
    });
    
    // Проверяем, есть ли скрытые карточки
    if (allCards.length <= SHOW_INITIAL) {
        buttonContainer.style.display = 'none';
        return;
    }
    
    // Обработчик клика по кнопке
    showAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Показываем лоадер
        this.classList.add('loading');
        
        // Показываем все скрытые карточки
        setTimeout(() => {
            const hiddenCards = document.querySelectorAll('.directions__card--hidden');
            
            hiddenCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'flex';
                    card.classList.remove('directions__card--hidden');
                    card.classList.add('show');
                }, index * 50); // Задержка для последовательного появления
            });
            
            // Скрываем кнопку после анимации
            setTimeout(() => {
                buttonContainer.style.opacity = '0';
                setTimeout(() => {
                    buttonContainer.style.display = 'none';
                    this.classList.remove('loading');
                }, 300);
            }, hiddenCards.length * 50 + 300);
            
        }, 800);
    });
});