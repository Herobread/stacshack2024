import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SuccessCallback = () => void;

// copy this file to create new rule

export function RuleTemplate({
  onSuccessCallback,
  id,
  onStateChange,
}: {
  id: number;
  onSuccessCallback: SuccessCallback;
  onStateChange: (id: number, state: boolean) => void;
}) {
  // Local state to track if the rule is "open" or "success notified"
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // run this function whenever u want to mark this rule completed and allow progression to next one
  const notifySuccess = () => {
    if (!isOpen) {
      // Update local state to mark the rule as "success notified"
      setIsOpen(true);

      // Call the parent-provided callback to handle the success notification
      onSuccessCallback();
      onStateChange(id, true); // Pass the `id` and new state to the parent
    }
  };

  return (
    <RuleCard>
      {/* example content, remove everything inside of <RuleCard/> and replace with ur fun content */}
      <div>
        Rule {id}: {isOpen ? "True" : "False"}
      </div>
      <Button onClick={notifySuccess} disabled={isOpen}>
        {isOpen ? "Success Notified" : "Notify Success"}
      </Button>
    </RuleCard>
  );
}
