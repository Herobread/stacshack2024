"use client";

import ExtendedRule from "@/app/rules/ExtendedRule";
import { useState } from "react";

export default function page() {
  const [ruleNumber, setRuleNumber] = useState(0);

  const iterateRule = () => {
    setRuleNumber((ruleNumber) => {
      console.log("opened new rule");

      return (ruleNumber += 1);
    });
  };

  return (
    <>
      <h1>kurva bober {ruleNumber}</h1>
      <ExtendedRule onSuccessCallback={iterateRule} />
      <ExtendedRule onSuccessCallback={iterateRule} />
    </>
  );
}
