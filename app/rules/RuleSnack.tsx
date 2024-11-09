import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RuleSnack({
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
  const [selectedSnack, setSelectedSnack] = useState<string | null>(null);

  const handleChange = (snack: string) => {
    setSelectedSnack(snack);
  };

  const verify = () => {
    if (!selectedSnack) {
      toast({
        title: "❌ No selection made",
        description: "Please select your favorite snack.",
      });
      return;
    }

    switch (selectedSnack) {
      case "chips":
        toast({
          title: "🛑 You can’t vote!",
          description: "You're too salty to participate in democracy.",
        });
        break;
      case "chocolate":
        toast({
          title: "🛑 You can’t vote!",
          description: "You're too sweet to be tough on issues.",
        });
        break;
      case "fruit":
        toast({
          title: "🛑 You can’t vote!",
          description: "You're too fruity to make sense in politics.",
        });
        break;
      default:
        notifySuccess();
        toast({
          title: "✅ You’re eligible to vote!",
          description: "Your snack choice shows you’re ready for civic duty.",
        });
    }
  };

  return (
    <RuleCard>
      <label>What’s your favorite snack?</label>
      <div className="options">
        {["chips", "chocolate", "fruit", "popcorn"].map((snack) => (
          <label key={snack} style={{ display: "block", margin: "5px 0" }}>
            <input
              type="radio"
              name="snack"
              value={snack}
              onChange={() => handleChange(snack)}
              disabled={isOpen}
            />
            {snack.charAt(0).toUpperCase() + snack.slice(1)}
          </label>
        ))}
      </div>
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Submit"}
      </Button>
    </RuleCard>
  );
}
