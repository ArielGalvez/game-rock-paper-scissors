import React from "react";
import { Hands, Winner } from "../../Store";
import { Hand } from "../Hand/Hand";
import { WaveAnimation } from "../WaveAnimation/WaveAnimation";
import "./Result.css";

type ResultProps = {
  winner: Winner;
  playerHand: Hands | null;
  computerHand: Hands | null;
  children?: React.ReactNode;
};

export const Result = (props: ResultProps) => {
  const { winner, playerHand, computerHand, children } = props;
  return (
    <div className="result">
      <div className="picked p1">
        {winner.p1Won ? (
          <WaveAnimation>
            <Hand type={playerHand} disabled />
          </WaveAnimation>
        ) : (
          <Hand type={playerHand} disabled />
        )}
        <p>YOU PICKED</p>
      </div>
      <div className="picked p2">
        {winner.p2Won ? (
          <WaveAnimation>
            <Hand type={computerHand} disabled />
          </WaveAnimation>
        ) : (
          <Hand type={computerHand} disabled />
        )}
        <p>THE HOUSE PICKED</p>
      </div>
      {children}
    </div>
  );
};
