import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RulePineapplePizza({
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  const verify = () => {
    if (!selectedOption) {
      toast({
        title: "❌ No selection made",
        description: "Please choose how you feel about pineapple on pizza.",
      });
      return;
    }

    if (selectedOption === "love") {
      toast({
        title: "🛑 You Can’t Vote!",
        description: "Your taste is too controversial for democracy.",
      });
    } else if (selectedOption === "hate") {
      toast({
        title: "🛑 You Can’t Vote!",
        description: "You can’t handle a little diversity on your plate.",
      });
    } else if (selectedOption === "neutral") {
      toast({
        title: "✅ Correct!",
        description: "Your neutrality is refreshing. Move along.",
      });
      notifySuccess();
      return;
    }

    // Mark the rule as completed
    notifySuccess();
  };

  return (
    <RuleCard>
      <label>How do you feel about pineapple on pizza?</label>
      <div style={{ margin: "10px 0" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="radio"
            name="pineapplePizza"
            value="love"
            onChange={() => setSelectedOption("love")}
            disabled={isOpen}
          />
          Love it
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="radio"
            name="pineapplePizza"
            value="hate"
            onChange={() => setSelectedOption("hate")}
            disabled={isOpen}
          />
          Hate it
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="radio"
            name="pineapplePizza"
            value="neutral"
            onChange={() => setSelectedOption("neutral")}
            disabled={isOpen}
          />
          Neutral
        </label>
      </div>
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Submit"}
      </Button>
    </RuleCard>
  );
}
