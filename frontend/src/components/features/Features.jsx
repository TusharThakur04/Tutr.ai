import { MessageSquare, Shield, Upload, Zap } from "lucide-react";
import { Card, CardContent } from "../common/card";

const Features = () => {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need for effective studying
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow border-purple-100">
            <CardContent className="p-0">
              <Upload className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Notes</h3>
              <p className="text-gray-600">
                PDF, TXT, Markdown supported. Drag and drop or paste directly.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-0">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">RAG-powered Q&A</h3>
              <p className="text-gray-600">
                Accurate answers with no hallucination using advanced retrieval.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-yellow-100">
            <CardContent className="p-0">
              <MessageSquare className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chat UI</h3>
              <p className="text-gray-600">
                Ask questions like you would on ChatGPT. Natural conversation.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-indigo-100">
            <CardContent className="p-0">
              <Shield className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Memory & Privacy</h3>
              <p className="text-gray-600">
                Reuse uploaded data later. Your notes stay private and secure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
