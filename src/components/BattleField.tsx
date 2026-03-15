import React from 'react';

type RowType = 'melee' | 'ranged' | 'siege';

interface BattleRowProps {
  owner: 'you' | 'opponent';
  type: RowType;
  score: number;
  hasFrost?: boolean;
  hasRain?: boolean;
}

const typeLabel: Record<RowType, string> = {
  melee: 'Рукопашный',
  ranged: 'Дальний',
  siege: 'Осадный',
};

const ownerLabel: Record<'you' | 'opponent', string> = {
  opponent: 'Оппонент',
  you: 'Вы',
};

const BattleRow: React.FC<BattleRowProps> = ({
  owner,
  type,
  score,
  hasFrost,
  hasRain,
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-gradient-to-br from-[#101318] to-[#050608] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.7)] px-3 py-2">
      <div className="flex items-center justify-between text-[10px] text-telegram-hint uppercase tracking-[0.14em] mb-1">
        <span>
          {ownerLabel[owner]} · {typeLabel[type]}
        </span>
        <span className="flex items-center gap-1">
          {hasFrost && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/10 text-[9px] text-sky-300 border border-sky-500/40">
              ❄
            </span>
          )}
          {hasRain && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500/10 text-[9px] text-cyan-300 border border-cyan-500/40">
              ☔
            </span>
          )}
        </span>
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex-1 h-16 flex items-center justify-start gap-1 overflow-x-auto scrollbar-none">
          {/* Заглушки карт — визуально похожи на игровые карты */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-10 h-14 rounded-xl border border-zinc-700/80 bg-gradient-to-br from-zinc-900 to-zinc-800/80 shadow-[0_0_10px_rgba(0,0,0,0.8)] flex items-center justify-center text-[10px] text-telegram-hint/80 select-none"
            >
              К{i}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center px-2 rounded-xl bg-black/40 border border-white/10 min-w-[44px]">
          <span className="text-[9px] text-telegram-hint uppercase tracking-[0.16em]">
            Сумма
          </span>
          <span className="text-lg font-semibold text-telegram-text leading-none mt-1">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};

export const BattleField: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Ряды оппонента (верхняя половина поля) */}
      <div className="flex flex-col gap-2">
        <BattleRow owner="opponent" type="siege" score={0} hasRain />
        <BattleRow owner="opponent" type="ranged" score={0} />
        <BattleRow owner="opponent" type="melee" score={0} hasFrost />
      </div>

      {/* Ряды игрока (нижняя половина поля) */}
      <div className="flex flex-col gap-2">
        <BattleRow owner="you" type="melee" score={0} hasFrost />
        <BattleRow owner="you" type="ranged" score={0} />
        <BattleRow owner="you" type="siege" score={0} hasRain />
      </div>
    </div>
  );
};

