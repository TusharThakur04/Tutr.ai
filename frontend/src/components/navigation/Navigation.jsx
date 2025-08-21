"use client";
import { Button } from "@/components/common/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const Navigation = ({ setLoggingState, setUploadingState }) => {
  const route = usePathname();
  console.log(route);
  const [open, setOpen] = useState(false);
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
          <div className="flex items-center justify-between p-4">
            <div className="hidden md:flex items-center space-x-8">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started Free
                </Button>
              </SignedOut>
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
                <a
                  href="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Home
                </a>
              )}
            </div>

            <div className="md:hidden">
              <Menu
                onClick={() => setOpen(true)}
                className="h-6 w-6 text-violet-400 cursor-pointer"
              />
            </div>

            <div
              className={`flex flex-col justify-start items-center gap-10 pl-3 pt-6 fixed top-0 right-0 h-55 w-45 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "translate-x-full"} md:hidden`}
            >
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-33"
                >
                  Get Started Free
                </Button>
              </SignedOut>
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
                  <button
                    className=" p-0 w-13 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors"
                    onClick={(prev) => setUploadingState(!prev)}
                  >
                    Upload
                  </button>
                </>
              )}
              <div className="relative bottom-57 left-18">
                <X
                  onClick={() => setOpen(false)}
                  className="h-6 w-6 text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
