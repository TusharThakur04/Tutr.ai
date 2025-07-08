import { Button } from "../common/button";
import { Card, CardContent, CardHeader } from "../common/card";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { X } from "lucide-react";

const Logging = ({ setLoggingState }) => {
  return (
    <SignedOut>
      {" "}
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center min-h-screen">
        <Card className="relative w-full max-w-sm shadow-lg bg-purple-100">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">
              Welcome to Tutr.ai
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Your personal AI tutor. Get started below.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-4">
            <SignInButton>
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </SignUpButton>
            <X
              onClick={() => {
                setLoggingState(false);
              }}
              size="30px"
              className="absolute top-1 right-2 hover:scale-95"
            />
          </CardContent>
        </Card>
      </div>
    </SignedOut>
  );
};

export default Logging;
