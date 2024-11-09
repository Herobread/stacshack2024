import { Card } from "@/components/ui/card";
import React from "react";

export default function RuleCard({ children }: { children: React.ReactNode }) {
  return <Card className="grid gap-4 justify-start p-8">{children}</Card>;
}
