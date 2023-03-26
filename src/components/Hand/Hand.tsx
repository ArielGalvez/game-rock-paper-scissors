import React from "react";
import { Hands } from "../../Store";
import { IconPaper, IconScissor, IconRock } from "../Icons/Icons";
import "./Hand.css";

type HandProps = {
  className?: string;
  type: Hands | null;
  disabled?: boolean;
  onClick?: (type: Hands | null) => void;
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
    onClick && onClick(type);
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
