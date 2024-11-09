"use client";

import RadioPicker from "@/components/radioPicker";
import { useState } from "react";

export default function Home() {

  const [votePick, setvotePick] = useState("");
  const candidates = [
    {
      name: "Donald Duck",
      icon: "donald.png",
      color: "red-400"
    },
    {
      name: "Camilla Cabello",
      icon: "camilla.png",
      color: "blue-400"
    }
  ]

  return (
    <div className="max-w-screen-lg m-auto text-center">
      <h1>EasyVote TM</h1>

      <h1>Choose your candidate:</h1>

      <div className={`grid grid-cols-${candidates.length} gap-24`}>
        {candidates.map((cd) => 
          <RadioPicker set={setvotePick} radioGroup="votePick" selected={votePick} candidate={cd} key={cd.name}/>
        )}
      </div>

      <p>You are for: {votePick} 🔫</p>
    </div>
  );
}
