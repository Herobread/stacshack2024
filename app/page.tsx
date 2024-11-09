"use client";

import RadioPicker from "@/components/radioPicker";
import { useState } from "react";

export default function Home() {

  const [votePick, setvotePick] = useState("");

  return (
    <div>
      <h1>EasyVote TM</h1>

      <h1>Choose your candidate:</h1>

      <div className="bg-red-500 w-full">
        <RadioPicker set={setvotePick} radioGroup="votePick" name="Terrible Candidate 1" />
        <RadioPicker set={setvotePick} radioGroup="votePick" name="Terrible Candidate 2" />
      </div>

      <p>You are voting for: {votePick}</p>
    </div>
  );
}
