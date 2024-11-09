import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type SuccessCallback = () => void;

// copy this file to create new rule

export function TypeCandidate({
  candidate,
  onSuccessCallback,
  id,
  onStateChange,
}: {
  candidate: string;
  id: number;
  onSuccessCallback: SuccessCallback;
  onStateChange: (id: number, state: boolean) => void;
}) {
  // Local state to track if the rule is "open" or "success notified"
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  // run this function whenever u want to mark this rule completed and allow progression to next one
  const notifySuccess = () => {
    // Check if the input matches the reversed candidate
    if (inputValue === candidate.split('').reverse().join('')) {
      if (!isOpen) {
        // Update local state to mark the rule as "success notified"
        setIsOpen(true);

        // Call the parent-provided callback to handle the success notification
        onSuccessCallback();
        onStateChange(id, true); // Pass the `id` and new state to the parent
      }
    } else {
      alert("Input does not match the reversed candidate name.");
    }
  };

  return (
    <RuleCard>
      {/* example content, replace with your fun content */}
      <div>
        <p>
          Confirm your vote by typing the candidate's name backwards:{" "}
          {isOpen ? "True" : "False"}
        </p>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here"
          disabled={isOpen} // Disable input if the rule is completed
        />
      </div>
      <Button onClick={notifySuccess} disabled={isOpen}>
        {isOpen ? "Success Notified" : "Notify Success"}
      </Button>
    </RuleCard>
  );
}
