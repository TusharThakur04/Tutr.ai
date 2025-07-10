"use client";
import { Button } from "@/components/common/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const Navigation = ({ setLoggingState }) => {
  const route = usePathname();
  console.log(route);
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Tutr.ai
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {route === "/" && (
              <>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Features
                </a>
              </>
            )}
            {route === "/study" && (
              <>
                <a
                  href="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Home
                </a>
              </>
            )}

            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                onClick={() => {
                  setLoggingState(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started Free
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
