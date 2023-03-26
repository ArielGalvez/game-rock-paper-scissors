import React, { useEffect, useRef } from "react";
import { getCompuerHand } from "../../GameEngine";
import { Hands, Status, useGameStore } from "../../Store";
import { WinnerSection } from "./WinnerSection";
import { PlayerChoosing } from "./PlayerChoosing";
import { Result } from "./Result";
import "./Game.css";

type Timer = ReturnType<typeof setTimeout>;

export const Game: React.FC = () => {
  const timerComputerTurmRef = useRef<null | Timer | number>(null);
  const timerWinnerRef = useRef<null | Timer | number>(null);

  const {
    status,
    playerHand,
    computerHand,
    winner,
    setStatus,
    setPlayerHand,
    setComputerHand,
    resetAll,
  } = useGameStore((state) => ({
    status: state.status,
    playerHand: state.playerHand,
    computerHand: state.computerHand,
    winner: state.winner,
    setStatus: state.setStatus,
    setPlayerHand: state.setPlayerHand,
    setComputerHand: state.setComputerHand,
    resetAll: state.resetAll,
  }));

  const handleClickHand = (hand: Hands | null) => {
    setPlayerHand(hand);
    setStatus(Status.computerChoosinging);
    timerComputerTurmRef.current = setTimeout(generateComputerHand, 1000);
  };

  const generateComputerHand = () => {
    const generatedHannd = getCompuerHand();
    setComputerHand(generatedHannd);
    timerWinnerRef.current = setTimeout(showWinner, 1000);
  };

  const showWinner = () => {
    setStatus(Status.showingWinner);
  };

  const playAgain = () => {
    resetAll();
  };

  useEffect(() => {
    if (timerComputerTurmRef) {
      return () => clearTimeout(timerComputerTurmRef.current as number);
    }
    if (timerWinnerRef) {
      return () => clearTimeout(timerWinnerRef.current as number);
    }
  }, []);

  return (
    <div className="game">
      {status === Status.playerChoosing && (
        <PlayerChoosing handleClickHand={handleClickHand} />
      )}
      {(status === Status.computerChoosinging ||
        status === Status.showingWinner) && (
        <Result
          playerHand={playerHand}
          computerHand={computerHand}
          winner={winner}
        >
          {status === Status.showingWinner && (
            <WinnerSection winner={winner} playAgain={playAgain} />
          )}
        </Result>
      )}
    </div>
  );
};
