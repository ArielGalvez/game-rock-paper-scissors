import React from "react";
import "./Rules.css";
type RulesProps = {};

export const Rules = (props: RulesProps) => {
  return (
    <div className="rules-modal">
      <h3 className="rules-title">RULES</h3>
      <img
        src="http://127.0.0.1:3000/assets/images/image-rules.svg"
        alt="rules"
      />
    </div>
  );
};
