document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const themeBtn = document.getElementById('theme-btn');
    const notification = document.getElementById('notification');

    // 1. Подсчёт символов
    textInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });

    // 2. Копирование текста
    copyBtn.addEventListener('click', function() {
        if (textInput.value) {
            navigator.clipboard.writeText(textInput.value)
                .then(() => {
                    // Показываем уведомление
                    notification.classList.remove('hidden');
                    notification.classList.add('show');

                    // Скрываем через 2 секунды
                    setTimeout(() => {
                        notification.classList.remove('show');
                        notification.classList.add('hidden');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Ошибка при копировании:', err);
                    alert('Не удалось скопировать текст. Проверьте разрешения браузера.');
                });
        } else {
            alert('Текст отсутствует!');
        }
    });

    // 3. Очистка текста
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        charCount.textContent = '0';
    });

    // 4. Переключение темы
    function toggleTheme() {
        const currentTheme = document.body.classList[0];
        
        if (currentTheme === 'light-theme') {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    }

    themeBtn.addEventListener('click', toggleTheme);

    // 5. Восстановление темы при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.replace(
            document.body.classList[0],
            savedTheme
        );
    }
});
