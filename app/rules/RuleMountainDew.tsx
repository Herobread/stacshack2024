import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RuleMountainDew({
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

  const { toast } = useToast();
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const verify = () => {
    // Match three specific items with optional commas or spaces in between
    const regex =
      /^\s*(?:Mountain Dew|Code Red|Baja Blast|Voltage|Live Wire|Major Melon|Pitch Black|Frost Bite|Spark|Kickstart|Game Fuel)(?:[, ]+(?:Mountain Dew|Code Red|Baja Blast|Voltage|Live Wire|Major Melon|Pitch Black|Frost Bite|Spark|Kickstart|Game Fuel)){2}\s*$/;

    // Test the input string against the regex
    if (regex.test(input.trim())) {
      notifySuccess();
      toast({
        title: "✅ Freedom Approved!",
        description: "Your patriotic spirit is unmatched. God bless democracy!",
      });
    } else {
      toast({
        title: "❌ Freedom Denied",
        description: "Please enter exactly three flavors of Mountain Dew.",
      });
    }
  };

  return (
    <RuleCard>
      <label>
        Confirm your citizenship by naming three flavors of Mountain Dew.
      </label>
      <Input value={input} onChange={handleChange} />
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Check"}
      </Button>
    </RuleCard>
  );
}
