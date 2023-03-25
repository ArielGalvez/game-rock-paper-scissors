import React from "react";
import "./WaveAnimation.css";

type Props = {
  children: React.ReactNode;
};

export const WaveAnimation = ({ children }: Props) => {
  return (
    <div className="container">
      <div className="circle delay1"></div>
      <div className="circle delay2"></div>
      <div className="circle delay3"></div>
      <div className="circle delay4"></div>
      {children}
    </div>
  );
};
