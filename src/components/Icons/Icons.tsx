import React from "react";
import iconPaper from "./icon-paper.svg";
import iconScissors from "./icon-scissors.svg";
import iconRock from "./icon-rock.svg";

export const IconPaper = () => {
  return (
    <img
      src={iconPaper}
      width={40}
      height={40}
      className="icon_arcade"
      alt="icon-arcade"
    />
  );
};

export const IconScissor = () => {
  return (
    <img
      src={iconScissors}
      width={40}
      height={40}
      className="icon_arcade"
      alt="icon-arcade"
    />
  );
};

export const IconRock = () => {
  return (
    <img
      src={iconRock}
      width={40}
      height={40}
      className="icon_arcade"
      alt="icon-arcade"
    />
  );
};
