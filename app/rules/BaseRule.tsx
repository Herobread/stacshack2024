import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type SuccessCallback = () => void;

interface BaseRuleProps {
  id: number;
  onSuccessCallback: SuccessCallback;
  children: React.ReactNode;
}

const BaseRule: React.FC<BaseRuleProps> = ({
  id,
  onSuccessCallback,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const notifySuccess = () => {
    if (!isOpen) {
      onSuccessCallback();
      setIsOpen(true);
    }
  };

  return (
    <div>
      <div>{children}</div>
      <Button onClick={notifySuccess}>Notify Success</Button>
      <div>Rule ID: {id}</div>
    </div>
  );
};

export default BaseRule;
