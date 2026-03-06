# Mogilev Sneakers (Vue + Vite + Tailwind)

Небольшое готовое приложение-магазин: список товаров, поиск/сортировка, закладки и корзина.

## Запуск

```sh
npm install
npm run dev
```

Открой `http://localhost:5173/UI/` (если порт занят — Vite возьмёт другой, смотри вывод в терминале).

## Сборка

```sh
npm run build
npm run preview
```

## Деплой на GitHub Pages

В проекте уже настроено:
- `base: '/UI/'` в `vite.config.js`
- hash-router (`createWebHashHistory`) в `src/main.js` — чтобы не было 404 при обновлении страницы на Pages

Команда:

```sh
npm run deploy
```

## Картинки товаров

Если API не отдаёт `imageUrl`, приложению хватает локальных иллюстраций в `public/products/` — они автоматически подставляются на главной и в закладках.
