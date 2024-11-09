import React, { Children } from "react";

interface RenderRulesProps {
  amount: number;
  children: React.ReactNode;
}

export function RenderRules({ amount, children }: RenderRulesProps) {
  const limitedChildren = Children.toArray(children).slice(0, amount);

  return <div className="space-y-3">{limitedChildren}</div>;
}
