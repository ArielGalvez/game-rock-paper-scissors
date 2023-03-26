import React from "react";
import { Hands } from "../../Store";
import { Hand } from "../Hand/Hand";

type PlayerChoosingProps = {
  handleClickHand: (type: Hands | null) => void;
};

export const PlayerChoosing = ({ handleClickHand }: PlayerChoosingProps) => {
  return (
    <div className="player-choosing">
      <Hand type={Hands.paper} className="first" onClick={handleClickHand} />
      <Hand type={Hands.scissor} className="second" onClick={handleClickHand} />
      <Hand type={Hands.rock} className="third" onClick={handleClickHand} />
    </div>
  );
};
