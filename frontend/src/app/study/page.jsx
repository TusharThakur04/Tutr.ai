import { ChatPanel } from "@/components/chatPanel/ChatPanel";
import Navigation from "@/components/navigation/Navigation";
import { UploadPanel } from "@/components/uploadPanel/UploadPanel";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />
      <div className=" pt-16 flex h-screen">
        <ChatPanel />
        <UploadPanel />
      </div>
    </div>
  );
};

export default page;
