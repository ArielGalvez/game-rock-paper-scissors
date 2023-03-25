import { create } from "zustand";
import { Hands } from "./components/Hand/Hand";
import { getWinner } from "./GameEngine";

export enum Status {
  playerChoosinging = "playerChoosinging",
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
  status: Status.playerChoosinging,
  score: 0,
  playerHand: null,
  computerHand: null,
  winner: {
    p1Won: false,
    p2Won: false,
  },
};

export const useGameStore = create<GameStore>((set) => ({
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
            ? state.score + 1
            : state.score - 1,
      };
      return newState;
    }),
  resetAll: () =>
    set((state) => ({ ...state, ...initialState, score: state.score })),
}));
