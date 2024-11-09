import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

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

  const [block, setBlock] = useState(false)

  const { toast } = useToast(); // Toast hook for notifications

  // Function to mark the rule as completed and allow progression
  const notifySuccess = () => {
    if (!isOpen) {
      setIsOpen(true); // Mark rule as completed
      onSuccessCallback(); // Notify parent component
      onStateChange(id, true); // Update parent state
    }
  };

  const verifyInput = () => {
    if (inputValue === candidate.split("").reverse().join("")) {
      notifySuccess(); // Mark success
      toast({
        title: "✅ Success!",
        description: "You entered the candidate's name backwards correctly.",
      });
    } else {
      setBlock(true)
      toast({
        title: "❌ Incorrect!",
        description: "Freedom isn't free, and neither are second chances. Try harder, patriot!",
      });
    }
  };

  return (
    <RuleCard>
      <div>
        <p>
          Confirm your vote by typing the candidate's name backwards:
        </p>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here"
          disabled={isOpen} // Disable input if the rule is completed
        />
      </div>
      {
!block &&
        <Button onClick={verifyInput} disabled={isOpen} >
        {isOpen ? "Verified" : "Verify"}
      </Button>
      }
    </RuleCard>
  );
}
