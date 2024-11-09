"use client";

import RadioPicker from "@/components/radioPicker";
import { useState } from "react";

export default function Home() {

  const [votePick, setvotePick] = useState("");

  return (
    <div className="max-w-screen-lg m-auto text-center">
      <h1>EasyVote TM</h1>

      <h1>Choose your candidate:</h1>

      <div className="grid grid-cols-2 gap-24">
        <RadioPicker set={setvotePick} radioGroup="votePick" name="Donald Duck" icon="donald.png" selected={votePick}/>
        <RadioPicker set={setvotePick} radioGroup="votePick" name="Camilla Cabello" icon="camilla.png" selected={votePick}/>
      </div>

      <p>You are for: {votePick} 🔫</p>
    </div>
  );
}
