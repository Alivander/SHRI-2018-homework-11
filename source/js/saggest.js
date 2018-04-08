(function () {
    'use strict';

    const saggestBlock = document.querySelector('.saggest');
    const input = saggestBlock.querySelector('.saggest__input');
    const listPlain = saggestBlock.querySelector('.saggest__list--plain');
    const listClusters = saggestBlock.querySelector('.saggest__list--clusters');
    const log = document.querySelector('.log');
    const logForPlain = log.querySelector('.log__list--plain');
    const logForClusters = log.querySelector('.log__list--clusters');

    // Обрабатываем пользовательский ввод

    const delay = (function () {
        let timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    input.addEventListener('input', () => {
        listPlain.innerHTML = '';
        listClusters.innerHTML = '';
        if (input.value) {
            delay(() => {
                saggest(input.value);
                saggestClusters(input.value);
            }, 250);
        }
    });

    // вспомогательная функция

    function logging(message, log) {
        const itemLog = document.createElement('li');
        itemLog.textContent = message;
        log.appendChild(itemLog);
    }

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

        listPlain.appendChild(fragment);

        time = performance.now() - time;  // для определения скорости работы функции
        logging(time, logForPlain);
    }

    // Пытаемся ускорить поиск - разбиваем массив данных на отдельные кластеры

    /* eslint-disable no-undef */
    /* отключаем no-undef в eslint для переменной массива данных - streets*/
    const clusters = new Array(5);
    const clusterValue = Math.floor(streets.length / clusters.length);

    for (let i = 0; i < clusters.length - 1; i++) {
        const j = clusterValue * i;
        clusters[i] = streets.slice(j, j + clusterValue);
    }

    clusters[clusters.length - 1] = streets.slice(clusterValue * (clusters.length - 1));
    /* eslint-anaible no-undef */

    // функция saggestClusters находит первые 10 названий, включающих подстроку,
    // перебирая отдельные кластеры из массива данных

    function saggestClusters(substr) {
        let time = performance.now();  // для определения скорости работы функции

        const fragment = document.createDocumentFragment();
        const results = [];
        let counter = 0;

        substr = substr.toLowerCase();

        function searchSubstr(substr, arrayStr) {
            /* eslint-disable no-unused-vars */
            return new Promise((resolve, reject) => {
            /* eslint-anaible no-unused-vars */

                for (const str of arrayStr) {
                    if (counter >= 10) {
                        resolve(true);
                        break;
                    }

                    const result = str.toLowerCase().includes(substr);
                    if (result) {
                        counter++;
                        results.push(str);
                    }
                }
                resolve(true);
            });
        }

        // не успела переписать так, что бы промисы генерировались функцией
        // и возвращались массивом с запущенными промисами
        Promise.all([
            searchSubstr(substr, clusters[0]),
            searchSubstr(substr, clusters[1]),
            searchSubstr(substr, clusters[2]),
            searchSubstr(substr, clusters[3]),
            searchSubstr(substr, clusters[4])
        ]).then((ok) => {
            if (ok) {
                for (const result of results) {
                    const item = document.createElement('li');
                    item.textContent = result;
                    fragment.appendChild(item);
                }
                listClusters.appendChild(fragment);
            }
        }).catch((error) => {
            /* eslint-disable no-console */
            console.log(`err: ${error}`);
            /* eslint-anable no-console */
        });

        time = performance.now() - time;  // для определения скорости работы функции
        logging(time, logForClusters);
    }
})();
