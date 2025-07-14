"use client";
import { ChatPanel } from "@/components/chatPanel/ChatPanel";
import Navigation from "@/components/navigation/Navigation";
import { UploadPanel } from "@/components/uploadPanel/UploadPanel";
import Viewer from "@/components/viewer/Viewer";
import { useUser } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { user } = useUser();
  const { isLoaded } = useSignIn();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    setUserId(user.id);
    let docs = null;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/metadata/?userId=${user.id}`
        );
        docs = res.data;
        console.log(docs);
        setDocuments(docs);
        // console.log(documents);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };

    fetchData();
  }, [isLoaded, user]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />
      <div className=" pt-16 flex h-screen">
        <ChatPanel />
        <UploadPanel
          setSelectedDoc={setSelectedDoc}
          userId={userId}
          documents={documents}
          setDocuments={setDocuments}
        />
        <Viewer selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} />
      </div>
    </div>
  );
};

export default page;
