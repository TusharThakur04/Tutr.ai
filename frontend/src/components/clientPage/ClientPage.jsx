"use client";
import { useState } from "react";
import Logging from "../logging/Logging";
import Navigation from "../navigation/Navigation";
import { useUser } from "@clerk/nextjs";
import storeUser from "@/lib/clerk/storeUser";

export default function ClientPage(uploadingState) {
  const [loggingState, setLoggingState] = useState(false);
  const { isSignedIn, user } = useUser();

  //storing users in db
  if (isSignedIn && user) {
    storeUser(user);
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation
        uploadingState={uploadingState}
        setLoggingState={setLoggingState}
      />
      {loggingState && <Logging setLoggingState={setLoggingState} />}
    </div>
  );
}
