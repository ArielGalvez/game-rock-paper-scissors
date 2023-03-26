import React from "react";
import { IconPaper, IconScissor, IconRock } from "../Icons/Icons";
import "./Hand.css";

export type HandsType = "paper" | "scissor" | "rock";

export enum Hands {
  paper = "paper",
  scissor = "scissor",
  rock = "rock",
}

type HandProps = {
  className?: string;
  type: Hands | null;
  disabled?: boolean;
  onClick: (type: Hands | null) => void;
};

const icon = {
  paper: <IconPaper />,
  scissor: <IconScissor />,
  rock: <IconRock />,
};

export const Hand = (props: HandProps) => {
  const { className, type, disabled, onClick } = props;
  const hide = type === null;

  const handleOnClick = () => {
    onClick(type);
  };

  return (
    <button
      className={`hand ${type} ${hide && "hide"} ${
        disabled && "disabled"
      } ${className}`}
      onClick={handleOnClick}
    >
      <div className="hand_icon">{!hide && icon[type]}</div>
    </button>
  );
};
