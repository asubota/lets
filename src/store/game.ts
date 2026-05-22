import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export type ItemKind = 'common' | 'uncommon' | 'rare' | 'rocket'

export type HitsByKind = Record<ItemKind, number>

export type ScoreEntry = {
  id: string
  startedAt: number
  endedAt: number
  score: number
  hits: HitsByKind
  bestCombo: number
}

export type GameSettings = {
  soundEnabled: boolean
  hapticEnabled: boolean
  musicEnabled: boolean
  scope: 'all' | 'list-only'
  autoEndEnabled: boolean
  autoEndSeconds: number
}

const emptyHits = (): HitsByKind => ({ common: 0, uncommon: 0, rare: 0, rocket: 0 })

interface GameStore {
  gameMode: boolean
  scores: ScoreEntry[]
  settings: GameSettings

  currentScore: number
  currentCombo: number
  currentMaxCombo: number
  currentHits: HitsByKind
  sessionStartedAt: number | null
  lastHitAt: number

  actions: {
    toggleGameMode(this: void): void
    setGameMode(this: void, on: boolean): void
    recordHit(this: void, kind: ItemKind, points: number, isCombo: boolean): void
    endSession(this: void): void
    resetSession(this: void): void
    clearScores(this: void): void
    updateSettings(this: void, patch: Partial<GameSettings>): void
  }
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  hapticEnabled: true,
  musicEnabled: false,
  scope: 'all',
  autoEndEnabled: true,
  autoEndSeconds: 60,
}

const useStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        gameMode: false,
        scores: [],
        settings: defaultSettings,

        currentScore: 0,
        currentCombo: 0,
        currentMaxCombo: 0,
        currentHits: emptyHits(),
        sessionStartedAt: null,
        lastHitAt: 0,

        actions: {
          toggleGameMode: () => {
            const wasOn = get().gameMode
            set({ gameMode: !wasOn })
            if (wasOn) {
              get().actions.endSession()
            }
          },
          setGameMode: (on) => {
            const wasOn = get().gameMode
            set({ gameMode: on })
            if (wasOn && !on) {
              get().actions.endSession()
            }
          },
          recordHit: (kind, points, isCombo) => {
            set((state) => {
              const newCombo = isCombo ? state.currentCombo + 1 : 1
              const newScore = state.currentScore + points
              const newHits = { ...state.currentHits, [kind]: state.currentHits[kind] + 1 }
              const maxCombo = Math.max(state.currentMaxCombo, newCombo)
              return {
                currentScore: newScore,
                currentCombo: newCombo,
                currentMaxCombo: maxCombo,
                currentHits: newHits,
                lastHitAt: Date.now(),
                sessionStartedAt: state.sessionStartedAt ?? Date.now(),
              }
            })
          },
          endSession: () => {
            const state = get()
            if (state.sessionStartedAt === null || state.currentScore === 0) {
              set({
                currentScore: 0,
                currentCombo: 0,
                currentMaxCombo: 0,
                currentHits: emptyHits(),
                sessionStartedAt: null,
                lastHitAt: 0,
              })
              return
            }
            const entry: ScoreEntry = {
              // eslint-disable-next-line sonarjs/pseudo-random
              id: `${state.sessionStartedAt}-${Math.random().toString(36).slice(2, 8)}`,
              startedAt: state.sessionStartedAt,
              endedAt: Date.now(),
              score: state.currentScore,
              hits: state.currentHits,
              bestCombo: state.currentMaxCombo,
            }
            set({
              scores: [entry, ...state.scores].slice(0, 200),
              currentScore: 0,
              currentCombo: 0,
              currentMaxCombo: 0,
              currentHits: emptyHits(),
              sessionStartedAt: null,
              lastHitAt: 0,
            })
          },
          resetSession: () =>
            set({
              currentScore: 0,
              currentCombo: 0,
              currentMaxCombo: 0,
              currentHits: emptyHits(),
              sessionStartedAt: null,
              lastHitAt: 0,
            }),
          clearScores: () => set({ scores: [] }),
          updateSettings: (patch) =>
            set((state) => ({ settings: { ...state.settings, ...patch } })),
        },
      }),
      {
        name: 'lets-bike-game',
        partialize: (state) => ({
          gameMode: state.gameMode,
          scores: state.scores,
          settings: state.settings,
        }),
        merge: (persisted, current) => {
          const p = (persisted ?? {}) as Partial<GameStore>
          return {
            ...current,
            ...p,
            settings: {
              ...current.settings,
              ...(p.settings ?? {}),
            },
          }
        },
      },
    ),
    {
      name: 'lets-bike-game',
      enabled: import.meta.env.DEV,
    },
  ),
)

export const useGameActions = () => useStore((state) => state.actions)
export const useGameMode = () => useStore((state) => state.gameMode)
export const useGameSettings = () => useStore((state) => state.settings)
export const useGameScores = () => useStore(useShallow((state) => state.scores))
export const useCurrentScore = () => useStore((state) => state.currentScore)
export const useCurrentCombo = () => useStore((state) => state.currentCombo)
export const useCurrentHits = () => useStore(useShallow((state) => state.currentHits))
export const useCurrentMaxCombo = () => useStore((state) => state.currentMaxCombo)
export const useSessionStartedAt = () => useStore((state) => state.sessionStartedAt)

export const getGameSnapshot = () => useStore.getState()
