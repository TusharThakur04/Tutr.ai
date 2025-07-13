"use client";
import { ChatPanel } from "@/components/chatPanel/ChatPanel";
import Navigation from "@/components/navigation/Navigation";
import { UploadPanel } from "@/components/uploadPanel/UploadPanel";
import Viewer from "@/components/viewer/Viewer";
import { useState } from "react";

const page = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />
      <div className=" pt-16 flex h-screen">
        <ChatPanel />
        <UploadPanel setSelectedDoc={setSelectedDoc} />
        <Viewer selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} />
      </div>
    </div>
  );
};

export default page;
