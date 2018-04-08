(function () {
    'use strict';

    const buttonEvent = document.querySelector('.generator__button--event');
    const listOnHandler = document.querySelector('.generator__buttons--on');
    const buttonOnHandlers = listOnHandler.querySelectorAll('.generator__button--handler');
    const buttonOffHandler = document.querySelector('.generator__button--offhandler');
    const inputCount = document.querySelector('.generator__input');
    const logEmitter = document.querySelector('.log__list--emitter');

    const logging = function (message) {
        const item = document.createElement('li');
        item.textContent = message;
        logEmitter.appendChild(item);
    };

    const emitter = {
        events: {},

        on: function (event, handler) {
            if (!this.events[event]) {
                this.events[event] = new Map();
            }
            this.events[event].set(this.events[event].size, handler);
        },

        off: function (event, handler) {
            const queue = this.events[event];
            for (const [key, value] of queue.entries()) {
                if (value === handler) {
                    queue.delete(key);
                    break;
                }
            }
        },

        emit: function (event) {
            const queue = this.events[event];
            if (queue) {
                for (const [key, value] of queue.entries()) {
                    value(key);
                }
            }
        }
    };

    function handler(index) {
        index++;
        logging(`Сработал обработчик №${index}`);
    }

    // подписали
    buttonOnHandlers.forEach((button) => {
        button.addEventListener('click', (evt) => {
            let time = performance.now();

            const count = evt.target.dataset.amount;
            for (let i = 0; i < count; i++) {
                emitter.on('Клик!', handler);
            }
            const queue = emitter.events['Клик!'];

            time = Math.round((performance.now() - time) * 1000) / 1000;
            logging(`Подписали ${count} обработчиков за ${time}ms, длина очереди ${queue.size}.`);
        });
    });

    // обработали событие
    buttonEvent.addEventListener('click', () => {
        emitter.emit('Клик!');
    });

    // отписали
    buttonOffHandler.addEventListener('click', () => {
        let time = performance.now();
        const count = Number(inputCount.value);
        if (count) {
            for (let i = 0; i < count; i++) {
                emitter.off('Клик!', handler);
            }
        }
        const queue = emitter.events['Клик!'];

        time = Math.round((performance.now() - time) * 1000) / 1000;
        logging(`Отписали ${count} обработчиков за ${time}ms, длина очереди ${queue.size}.`);
    });
})();
