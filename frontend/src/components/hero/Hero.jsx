import { FileText, Upload } from "lucide-react";
import { Button } from "../common/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your AI Tutor.{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Powered by Your Notes.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your class notes and ask questions. Get answers grounded in
              what you study.
            </p>
            <div className="flex gap-4 justify-center items-center mb-12">
              <Link href="/study">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload & Study
                </Button>
              </Link>
            </div>

            {/* Hero Illustration */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div>
                        <div className="font-semibold text-sm">
                          Biology Notes.pdf
                        </div>
                        <div className="text-gray-500 text-xs">
                          Uploaded successfully
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-semibold text-sm">
                          Chemistry Chapter 3.pdf
                        </div>
                        <div className="text-gray-500 text-xs">
                          Ready for questions
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        You asked:
                      </div>
                      <div className="font-medium">What is photosynthesis?</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-4">
                      <div className="text-sm mb-2">Tutr.ai answered:</div>
                      <div className="text-sm">
                        Photosynthesis is the process by which plants convert
                        light energy into chemical energy...
                      </div>
                      <div className="text-xs mt-2 opacity-80">
                        Source: Biology Notes.pdf, Page 23
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
