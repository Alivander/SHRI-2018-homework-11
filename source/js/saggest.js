(function () {
    'use strict';

    const saggestBlock = document.querySelector('.saggest');
    const input = saggestBlock.querySelector('.saggest__input');
    const list = saggestBlock.querySelector('.saggest__list');

    input.addEventListener('input', () => {
        list.innerHTML = '';
        if (input.value) {
            saggest(input.value);
        }
    });

    function saggest(substr) {
        let time = performance.now();  // для определения скорости работы функции

        const fragment = document.createDocumentFragment();
        let counter = 0;

        substr = substr.toLowerCase();

        /* eslint-disable no-undef */
        for (const street of streets) {
        /* eslint-anaible no-undef */
            if (counter >= 10) {
                break;
            }

            const result = street.toLowerCase().includes(substr);
            if (result) {
                counter++;
                const item = document.createElement('li');
                item.textContent = street;
                fragment.appendChild(item);
            }
        }

        list.appendChild(fragment);

        time = performance.now() - time;  // для определения скорости работы функции
        console.log('Время выполнения saggest = ', time, ' для строки ', substr);
    }
})();
