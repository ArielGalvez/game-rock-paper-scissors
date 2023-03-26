import React from "react";
import srcBg from "../../assets/image-rules.svg";
import "./Rules.css";
type RulesProps = {};

export const Rules = (props: RulesProps) => {
  return (
    <div className="rules-modal">
      <h3 className="rules-title">RULES</h3>
      <img src={srcBg} alt="rules" />
    </div>
  );
};
