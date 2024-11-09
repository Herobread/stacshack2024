import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

// copy this file to create new rule

export function RuleHeight({
  onSuccessCallback,
  id,
  onStateChange,
  candidateName
}: {
  id: number;
  onSuccessCallback: SuccessCallback;
  onStateChange: (id: number, state: boolean) => void;
  candidateName: string
}) {
  // Local state to track if the rule is "open" or "success notified"
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let height = {
    feet: 0,
    inches: 0,
    sixteenths: 0
  };

  const { toast } = useToast();


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

  const verify = () => {
    let calcHeight = height.feet + height.inches/12 + height.sixteenths/16/12;

    if(candidateName == "Donald Duck" && calcHeight < 7) {
      toast({
        title: "❌ Invalid Height",
        description: "You are voting for Donald Duck, who doesn't want voters below 7 feet."
      });
    } else if(candidateName == "Camilla Cabello" && calcHeight > 7) {
      toast({
        title: "❌ Invalid Height",
        description: "You are voting for Camilla Cabello, who doesn't want voters above 7 feet."
      });
    } else {
      toast({
        title: "✅ Height Verified!"
      })
      notifySuccess();
    }
  }

  return (
    <RuleCard>
      <div>
        Verify your height:
        <p>Feet <Input type="number" min="0" disabled={isOpen} onChange={(event) => height.feet = (+event.target.value)}/></p>
        <p>Inches <Input type="number" min="0" max="12" disabled={isOpen} onChange={(event) => height.inches = (+event.target.value)}/></p>
        <p>Sixteenths of an inch <Input type="number" min="0" max="16" disabled={isOpen} onChange={(event) => height.sixteenths = (+event.target.value)}/></p>
        <br/>
        <Button onClick={verify} disabled={isOpen}>Verify</Button>
      </div>
    </RuleCard>
  );
}
