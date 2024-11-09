import React from "react";
import BaseRule from "./BaseRule";

interface ExtendedRuleProps {
  onSuccessCallback: () => void;
}

const ExtendedRule: React.FC<ExtendedRuleProps> = ({ onSuccessCallback }) => {
  return (
    <BaseRule id={101} onSuccessCallback={onSuccessCallback}>
      <div>This is the extended rule content.</div>
    </BaseRule>
  );
};

export default ExtendedRule;
