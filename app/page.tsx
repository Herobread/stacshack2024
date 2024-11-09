"use client";

import { RenderRules } from "@/app/rules/RenderRules";
import { RuleTemplate } from "@/app/rules/RuleTemplate";
import RadioPicker from "@/components/radioPicker";
import { useState } from "react";
import { RuleDisplay } from "./rules/RuleDisplay";
import { TypeCandidate } from "./rules/TypeCandidate";

export default function Home() {
  const [openedRules, setOpenedRules] = useState(1);
  const [rules, setRules] = useState<Record<number, boolean>>({});
  const [votePick, setvotePick] = useState(""); // Holds the user's selected candidate
  const candidates = [
    {
      name: "Donald Duck",
      icon: "donald.png",
      color: "red-400",
    },
    {
      name: "Camilla Cabello",
      icon: "camilla.png",
      color: "blue-400",
    },
  ];

  const iterateRule = () => {
    setOpenedRules((openedRules) => {
      console.log("opened new rule");
      return (openedRules += 1);
    });
  };

  const handleStateChange = (id: number, state: boolean) => {
    setRules((prevRules) => ({
      ...prevRules,
      [id]: state, // Update state for the specific rule
    }));
  };

  return (
    <div className="max-w-screen-lg m-auto py-8">
      <h1>EasyVote TM</h1>

      <h1>Choose your candidate:</h1>

      <div className={`grid grid-cols-2 gap-24`}>
        {candidates.map((cd) => (
          <RadioPicker
            set={setvotePick}
            radioGroup="votePick"
            selected={votePick}
            candidate={cd}
            key={cd.name}
          />
        ))}
      </div>

      <RenderRules amount={openedRules}>
        {votePick && (
          <TypeCandidate
            candidate={votePick} // Pass the chosen candidate to TypeCandidate
            id={0}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
        )}
        <RuleTemplate
          id={1}
          onSuccessCallback={iterateRule}
          onStateChange={handleStateChange}
        />
        <RuleTemplate
          id={2}
          onSuccessCallback={iterateRule}
          onStateChange={handleStateChange}
        />
        <RuleTemplate
          id={3}
          onSuccessCallback={iterateRule}
          onStateChange={handleStateChange}
        />
      </RenderRules>
    </div>
  );
}
