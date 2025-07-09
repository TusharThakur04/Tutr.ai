"use client";
import { useState } from "react";
import Logging from "../logging/Logging";
import Navigation from "../navigation/Navigation";

export default function ClientPage() {
  const [loggingState, setLoggingState] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation setLoggingState={setLoggingState} />
      {loggingState && <Logging setLoggingState={setLoggingState} />}
    </div>
  );
}
