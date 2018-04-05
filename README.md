# SHRI-2018-homework-11

### Домашняя работа по теме "Алгоритмы"

Яндекс. Школа разработки интерфейсов. 2018 год.

#### Задание 2: saggest

Для начала для поиска подстроки я попробовала использовать выражение:  
```
for (const street of streets) {
    ...
  street.match(new RegExp(substr, 'i'));
```
Для подстроки "теат" результат выдавался в среднем через 100ms.  
Затем я попробовала другой метод:  
```
substr = substr.toLowerCase();

for (const street of streets) {
    ...
    street.toLowerCase().includes(substr);

```
Этот способ для той же подстроки выдавал результат за 5ms.
