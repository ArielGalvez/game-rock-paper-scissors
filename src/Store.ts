import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { getWinner } from "./GameEngine";

const SCORE_POINT = 1;

export enum Hands {
  paper = "paper",
  scissor = "scissor",
  rock = "rock",
}

export enum Status {
  playerChoosing = "playerChoosing",
  computerChoosinging = "computerChoosinging",
  showingWinner = "showingWinner",
}

export interface Winner {
  p1Won: boolean;
  p2Won: boolean;
}

export interface GameStore {
  status: Status;
  score: number;
  playerHand: Hands | null;
  computerHand: Hands | null;
  winner: Winner;
  setStatus: (status: Status) => void;
  setPlayerHand: (playerHand: Hands | null) => void;
  setComputerHand: (computerHand: Hands | null) => void;
  resetAll: () => void;
}

const initialState = {
  status: Status.playerChoosing,
  score: 0,
  playerHand: null,
  computerHand: null,
  winner: {
    p1Won: false,
    p2Won: false,
  },
};

export const useGameStore = create<GameStore>()(
  persist(
  (set) => ({
  ...initialState,
  setStatus: (status) => set((state) => ({ ...state, status })),
  setPlayerHand: (playerHand) => set((state) => ({ ...state, playerHand })),
  setComputerHand: (computerHand) =>
    set((state) => {
      const winner = getWinner(state.playerHand, computerHand);
      const newState = {
        ...state,
        computerHand,
        winner,
        score:
          !winner.p1Won && !winner.p2Won
            ? state.score
            : winner.p1Won
            ? state.score + SCORE_POINT
            : state.score - SCORE_POINT,
      };
      return newState;
    }),
  resetAll: () =>
    set((state) => ({ ...state, ...initialState, score: state.score })),
}), {
  name: 'game-storage'
})
);
