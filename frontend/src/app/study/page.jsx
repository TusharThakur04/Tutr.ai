"use client";
import { ChatPanel } from "@/components/chatPanel/ChatPanel";
import Navigation from "@/components/navigation/Navigation";
import { UploadPanel } from "@/components/uploadPanel/UploadPanel";
import Viewer from "@/components/viewer/Viewer";
import { useUser } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const page = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { user } = useUser();
  const { isLoaded } = useSignIn();
  const [userId, setUserId] = useState(null);
  const [uploadingState, setUploadingState] = useState(false);

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
  }, [isLoaded, user, selectedDoc]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation setUploadingState={setUploadingState} />
      <div className=" pt-16 md:flex h-screen">
        <ChatPanel />

        <div className="hidden md:block">
          <UploadPanel
            uploadingState={uploadingState}
            setSelectedDoc={setSelectedDoc}
            userId={userId}
            documents={documents}
            setDocuments={setDocuments}
          />
        </div>
        <div
          className={`fixed top-16 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${uploadingState ? "translate-x-0" : "translate-x-full"} 
          md:hidden`}
        >
          <UploadPanel
            uploadingState={uploadingState}
            setSelectedDoc={setSelectedDoc}
            userId={userId}
            documents={documents}
            setDocuments={setDocuments}
          />
          {/* Close button inside */}
          <ArrowRight
            onClick={() => setUploadingState(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-purple-600"
          />
        </div>

        <Viewer selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} />
      </div>
    </div>
  );
};

export default page;
