import React, { useEffect, useRef } from "react";
import { getCompuerHand } from "../../GameEngine";
import { Status, useGameStore } from "../../Store";
import { Hand, Hands } from "../Hand/Hand";
import { WaveAnimation } from "../WaveAnimation/WaveAnimation";
import "./Game.css";
type GameProps = {};

export const Game: React.FC<GameProps> = () => {
  const timerComputerTurmRef = useRef<null | NodeJS.Timeout | number>(null);
  const timerWinnerRef = useRef<null | NodeJS.Timeout | number>(null);

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
    timerComputerTurmRef.current = setTimeout(generateComputerHand, 1500);
  };

  const generateComputerHand = () => {
    const generatedHannd = getCompuerHand();
    setComputerHand(generatedHannd);
    timerWinnerRef.current = setTimeout(showWinner, 1500);
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
      {status === Status.playerChoosinging && (
        <div className="normal">
          <Hand
            type={Hands.paper}
            className="first"
            onClick={handleClickHand}
          />
          <Hand
            type={Hands.scissor}
            className="second"
            onClick={handleClickHand}
          />
          <Hand type={Hands.rock} className="third" onClick={handleClickHand} />
        </div>
      )}
      {(status === Status.computerChoosinging ||
        status === Status.showingWinner) && (
        <div className="result">
          <div className="picked p1">
            {winner.p1Won ? (
              <WaveAnimation>
                <Hand
                  type={playerHand}
                  className="first"
                  disabled
                  onClick={() => {}}
                />
              </WaveAnimation>
            ) : (
              <Hand
                type={playerHand}
                className="first"
                disabled
                onClick={() => {}}
              />
            )}
            <p>YOU PICKED</p>
          </div>
          <div className="picked p2">
            {winner.p2Won ? (
              <WaveAnimation>
                <Hand
                  type={computerHand}
                  className="first"
                  disabled
                  onClick={() => {}}
                />
              </WaveAnimation>
            ) : (
              <Hand
                type={computerHand}
                className="first"
                disabled
                onClick={() => {}}
              />
            )}
            <p>THE HOUSE PICKED</p>
          </div>
          {status === Status.showingWinner && (
            <div className="winner">
              <p>
                {winner.p1Won === false && winner.p2Won === false
                  ? "NO WINNERS"
                  : winner.p1Won
                  ? "YOU WIN"
                  : "COMPUTER WIN"}
              </p>
              <button className="button_play_again" onClick={playAgain}>
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
