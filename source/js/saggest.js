(function () {
    'use strict';

    const saggestBlock = document.querySelector('.saggest');
    const input = saggestBlock.querySelector('.saggest__input');
    const list = saggestBlock.querySelector('.saggest__list');

    const delay = (function () {
        let timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    input.addEventListener('input', () => {
        list.innerHTML = '';
        if (input.value) {
            delay(() => {
                saggest(input.value);
            }, 250);
        }
    });

    // функция saggest находит первые 10 названий, включающих подстроку

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

    // функция saggestSort находит 10 названий, включающих подстроку, с наилучшим результатом,
    // т.е. те, где подстрока расположена ближе всего к началу строки.

    function saggestSort(substr) {
        let time = performance.now();  // для определения скорости работы функции

        const fragment = document.createDocumentFragment();
        const suitableStreets = [];

        substr = substr.toLowerCase();

        /* eslint-disable no-undef */
        for (const street of streets) {
        /* eslint-anaible no-undef */

            const result = street.toLowerCase().includes(substr);
            if (result) {
                suitableStreets.push(street);
            }
        }

        suitableStreets.sort((nameA, nameB) => {
            const indexA = nameA.toLowerCase().indexOf(substr);
            const indexB = nameB.toLowerCase().indexOf(substr);
            if (indexA > indexB) {
                return 1;
            } else {
                return -1;
            }
        });

        for (let i = 0; i <= 10; i++) {
            const item = document.createElement('li');
            item.textContent = suitableStreets[i];
            fragment.appendChild(item);
        }

        list.appendChild(fragment);

        time = performance.now() - time;  // для определения скорости работы функции
        console.log('Время выполнения saggestSort = ', time, ' для строки ', substr);
    }
})();
