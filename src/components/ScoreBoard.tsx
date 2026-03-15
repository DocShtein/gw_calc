import React from 'react';

export const ScoreBoard: React.FC = () => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-telegram-secondary border border-white/5 px-4 py-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-telegram-hint uppercase tracking-wide">
          Счёт раунда
        </span>
        <span className="text-sm text-telegram-text">
          Вы: <span className="font-semibold">0</span> — Оппонент:{' '}
          <span className="font-semibold">0</span>
        </span>
      </div>
      <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-telegram-button text-telegram-button-text active:scale-[0.97] transition">
        Сбросить
      </button>
    </div>
  );
};

