import React, { useEffect, useState } from 'react';
import {
  AppRoot,
  ConfigProvider,
  Surface,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  Div,
} from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { BattleField } from './components/BattleField';
import { ScoreBoard } from './components/ScoreBoard';

type GameState = {
  turn: number;
  lastUpdated: number;
};

type ThemeParams = {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
};

interface WebAppMainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  setText?: (text: string) => void;
  show?: () => void;
  hide?: () => void;
  onClick?: (cb: () => void) => void;
  offClick?: (cb: () => void) => void;
}

interface WebApp {
  colorScheme?: 'light' | 'dark';
  ready?: () => void;
  expand?: () => void;
  themeParams?: ThemeParams;
  MainButton?: WebAppMainButton;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}

const STORAGE_KEY = 'gwent-miniapp-game-state';

const getInitialGameState = (): GameState => {
  const fallback: GameState = {
    turn: 0,
    lastUpdated: Date.now(),
  };

  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      ...fallback,
      ...parsed,
      lastUpdated: parsed.lastUpdated ?? Date.now(),
    };
  } catch {
    return fallback;
  }
};

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      return;
    }

    webApp.ready?.();
    webApp.expand?.();

    const theme = webApp.themeParams;
    if (theme) {
      const root = document.documentElement;

      if (theme.bg_color) {
        root.style.setProperty('--tg-theme-bg-color', theme.bg_color);
      }
      if (theme.text_color) {
        root.style.setProperty('--tg-theme-text-color', theme.text_color);
      }
      if (theme.hint_color) {
        root.style.setProperty('--tg-theme-hint-color', theme.hint_color);
      }
      if (theme.button_color) {
        root.style.setProperty('--tg-theme-button-color', theme.button_color);
      }
      if (theme.button_text_color) {
        root.style.setProperty(
          '--tg-theme-button-text-color',
          theme.button_text_color
        );
      }
      if (theme.secondary_bg_color) {
        root.style.setProperty(
          '--tg-theme-secondary-bg-color',
          theme.secondary_bg_color
        );
      }
    }

    const mainButton = webApp.MainButton;
    if (!mainButton) {
      return;
    }

    const handleClick = () => {
      setGameState((prev) => ({
        ...prev,
        turn: prev.turn + 1,
        lastUpdated: Date.now(),
      }));
    };

    mainButton.setText?.('Завершить ход');
    if (theme?.button_color) {
      mainButton.color = theme.button_color;
    }
    if (theme?.button_text_color) {
      mainButton.textColor = theme.button_text_color;
    }
    mainButton.show?.();
    mainButton.onClick?.(handleClick);

    return () => {
      mainButton.offClick?.(handleClick);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // ignore
    }
  }, [gameState]);

  const scheme =
    window.Telegram?.WebApp?.colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <ConfigProvider appearance={scheme}>
      <AppRoot>
        <div className="min-h-screen bg-telegram-background text-telegram-text flex items-center justify-center p-2">
          <Surface
            className="w-full max-w-md h-[calc(100vh-1rem)] rounded-screen overflow-hidden bg-telegram-secondary shadow-lg flex flex-col"
          >
            <Panel>
              <PanelHeader
                before={<PanelHeaderBack className="opacity-0" />}
                className="flex-shrink-0"
              >
                Gwent Calc
              </PanelHeader>

              <Group>
                <Header mode="primary">Поле боя</Header>
                <Div>
                  <BattleField />
                </Div>
              </Group>

              <Group>
                <Header mode="primary">Счёт</Header>
                <Div>
                  <ScoreBoard />
                </Div>
              </Group>
            </Panel>
          </Surface>
        </div>
      </AppRoot>
    </ConfigProvider>
  );
};

