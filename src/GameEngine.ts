import { Hands } from "./Store";

export const getCompuerHand = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const toHands: Record<number, Hands> = {
    1: Hands.paper,
    2: Hands.scissor,
    3: Hands.rock,
  };
  return toHands[randomNumber];
};

export const getWinner = (p1: Hands | null, p2: Hands | null) => {
  const winner = {
    p1Won: false,
    p2Won: false,
  };
  if (p1 === null) {
    winner.p2Won = true;
  }
  if (p2 === null) {
    winner.p1Won = true;
  }

  switch (p1) {
    case Hands.paper:
      if (p2 === Hands.scissor) {
        winner.p2Won = true;
      }
      if (p2 === Hands.rock) {
        winner.p1Won = true;
      }
      break;
    case Hands.scissor:
      if (p2 === Hands.paper) {
        winner.p1Won = true;
      }
      if (p2 === Hands.rock) {
        winner.p2Won = true;
      }
      break;
    case Hands.rock:
      if (p2 === Hands.paper) {
        winner.p2Won = true;
      }
      if (p2 === Hands.scissor) {
        winner.p1Won = true;
      }
      break;
  }
  return winner;
};
