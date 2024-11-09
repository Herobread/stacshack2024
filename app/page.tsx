"use client";

import { RenderRules } from "@/app/rules/RenderRules";
import { RuleMountainDew } from "@/app/rules/RuleMountainDew";
import { TypeCandidate } from "@/app/rules/TypeCandidate";
import RadioPicker from "@/components/radioPicker";
import { useState } from "react";
import { RuleHeight } from "./rules/RuleHeight";
import { RuleSnack } from "./rules/RuleSnack";
import { RulePassportUpload } from "./rules/RulePassport";
import { RuleBodyCount } from "./RuleBodyCount";
import { RuleShoeSize } from "./RuleShoeSize";

export default function Home() {
  const [openedRules, setOpenedRules] = useState(1);
  const [rules, setRules] = useState<Record<number, boolean>>({});
  const [votePick, setvotePick] = useState(""); // Holds the user's selected candidate

  const [completed, setCompleted] = useState(false);

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
      <h1>EasyVote TM: The Online Voting Platform Accessible to Everyone!</h1>

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

      {votePick && (
        <RenderRules amount={openedRules}>
          <TypeCandidate
            candidate={votePick} // Pass the chosen candidate to TypeCandidate
            id={0}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
          <RuleHeight
          candidateName={votePick}
          id={1}
          onSuccessCallback={iterateRule}
          onStateChange={handleStateChange}
          />
          <RuleMountainDew
            id={5}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
          <RuleSnack
            id={4}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
          <RulePassportUpload
            id={3}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
          <RuleBodyCount id={2}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
          <RuleShoeSize id={6}
            onSuccessCallback={iterateRule}
            onStateChange={handleStateChange}
          />
        </RenderRules>
      )}

      {completed && <p className="text-red-500">
        Thanks for using EasyVote! <br/>
        Unfortunately, your vote is invalid, as this voting system only allows voting for {
          votePick == "Donald Duck" ? "Camilla Cabello." : "Donald Duck"
        }.
        Feel free to refresh the voting form (CTRL+SHIFT+R) and try again!
        <br/>
        <br/>
        <br/>
        EasyVoteTM created by the {votePick == "Donald Duck" ? "Democratic" : "Republican"} party.
        </p>}
    </div>
  );
}
