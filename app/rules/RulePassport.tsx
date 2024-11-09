import RuleCard from "@/app/rules/RuleCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SuccessCallback = () => void;

export function RulePassportUpload({
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
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const verify = () => {
    if (!file) {
      toast({
        title: "❌ No file uploaded",
        description: "Please upload your passport picture.",
      });
      return;
    }

    // Simulate a "bad passport picture" response
    toast({
      title: "🛑 You can’t vote!",
      description:
        "Bad passport picture detected. Your face is a national security threat. Try again!",
    });

    // Mark the rule as completed after showing the message
    setTimeout(() => {
      toast({
        title: "✅ Rule Completed",
        description: "Your bad passport picture is accepted! Move along.",
      });
      notifySuccess();
    }, 3000); // 3-second delay for humor
  };

  return (
    <RuleCard>
      <label>Upload your passport picture:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isOpen}
        style={{ display: "block", margin: "10px 0" }}
      />
      <Button onClick={() => verify()} disabled={isOpen}>
        {isOpen ? " Successful" : "Submit"}
      </Button>
    </RuleCard>
  );
}
