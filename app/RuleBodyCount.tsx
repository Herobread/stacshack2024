import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RuleBodyCount({
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
        description: "Please select your body count or number of relationships.",
      });
      return;
    }

    switch (selectedOption) {
      case "moreThan2":
        toast({
          title: "🛑 You can’t vote!",
          description: "Commitment isn’t your thing. Try again later!, but it is ok this time because you are perfectly faithful",
        });
        notifySuccess();
        break;
      case "zero":
        toast({
          title: "🛑 You can’t vote!",
          description: "You have no experience in negotiations, but it is ok this time because you are perfectly faithful",
        });
        notifySuccess();
        break;
      case "one":
        toast({
          title: "🛑 You can’t vote!",
          description: "You’re too loyal to see other perspectives, but it is ok this time because you are perfectly faithful",
        });
        notifySuccess();
        break;
      default:
        // If we reach here, something went wrong.
        return;
    }

   
  };

  return (
    <RuleCard>
      <label>What’s your body count or number of relationships?</label>
      <div className="options" style={{ marginTop: "10px" }}>
        <label style={{ display: "block", margin: "5px 0" }}>
          <input
            type="radio"
            name="bodyCount"
            value="moreThan2"
            onChange={() => setSelectedOption("moreThan2")}
            disabled={isOpen}
          />
          More than 2
        </label>
        <label style={{ display: "block", margin: "5px 0" }}>
          <input
            type="radio"
            name="bodyCount"
            value="zero"
            onChange={() => setSelectedOption("zero")}
            disabled={isOpen}
          />
          Zero
        </label>
        <label style={{ display: "block", margin: "5px 0" }}>
          <input
            type="radio"
            name="bodyCount"
            value="one"
            onChange={() => setSelectedOption("one")}
            disabled={isOpen}
          />
          Exactly 1
        </label>
      </div>
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Submit"}
      </Button>
    </RuleCard>
  );
}
