import React from "react";
import { Winner } from "../../Store";

type WinnerSectionProps = {
  winner: Winner;
  playAgain: () => void;
};

export const WinnerSection = ({ winner, playAgain }: WinnerSectionProps) => {
  return (
    <div className="winner">
      <p>
        {winner.p1Won === false && winner.p2Won === false
          ? "TIE"
          : winner.p1Won
          ? "YOU WIN"
          : "COMPUTER WIN"}
      </p>
      <button className="button_play_again" onClick={playAgain}>
        PLAY AGAIN
      </button>
    </div>
  );
};
