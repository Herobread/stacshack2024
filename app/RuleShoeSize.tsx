import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RuleShoeSize({
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
  const [shoeSize, setShoeSize] = useState<number | null>(null);

  const { toast } = useToast();

  const notifySuccess = () => {
    if (!isOpen) {
      // Update local state to mark the rule as "success notified"
      setIsOpen(true);

      // Call the parent-provided callback to handle the success notification
      onSuccessCallback();
      onStateChange(id, true); // Pass the `id` and new state to the parent
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setShoeSize(isNaN(value) ? null : value);
  };

  const verify = () => {
    if (shoeSize === null) {
      toast({
        title: "❌ Invalid Input",
        description: "Please enter a valid shoe size.",
      });
      return;
    }

    if (shoeSize < 9) {
      toast({
        title: "🛑 You Can’t Vote!",
        description: "Your feet aren’t standing tall enough for democracy!",
      });
    } else if (shoeSize > 9) {
      toast({
        title: "🛑 You Can’t Vote!",
        description: "Your big feet are trampling on the issues!",
      });
    } else {
      toast({
        title: "🛑 You Can’t Vote!",
        description: "Perfect size? Sorry, but we’re making this up as we go!",
      });
    }

    // Mark the rule as completed
    notifySuccess();
  };

  return (
    <RuleCard>
      <label>What’s your shoe size?</label>
      <Input
        type="number"
        placeholder="Enter your shoe size (US)"
        onChange={handleInputChange}
        disabled={isOpen}
        style={{ margin: "10px 0" }}
      />
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Submit"}
      </Button>
    </RuleCard>
  );
}
