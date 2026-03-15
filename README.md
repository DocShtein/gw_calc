# Gwent Calc — Telegram Mini App

Мини-приложение Telegram, созданное на базе **React + Vite + TypeScript**, с использованием **Tailwind CSS** и библиотеки **@telegram-apps/telegram-ui**.

## Установка

```bash
npm install
```

## Режим разработки

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Структура

- **главный экран** — `App.tsx`, оболочка в компонентах `ConfigProvider` / `AppRoot` из `@telegram-apps/telegram-ui`;
- **поле боя** — `src/components/BattleField.tsx`;
- **компонент счёта** — `src/components/ScoreBoard.tsx`.

Оформление основано на цветовых переменных Telegram (`--tg-theme-*`) и адаптировано под мобильные экраны.

