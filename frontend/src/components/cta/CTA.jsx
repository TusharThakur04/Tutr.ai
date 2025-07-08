import { CheckCircle, Shield, Zap } from "lucide-react";
import { Button } from "../common/button";

const CTA = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Studying?
        </h2>
        <p className="text-xl text-purple-100 mb-8">
          Join thousands of students who study smarter with Tutr.ai
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Start Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg"
          >
            View Demo
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <CheckCircle className="h-6 w-6 text-green-300 mx-auto mb-2" />
            <span className="text-purple-100">No signup required</span>
          </div>
          <div>
            <Shield className="h-6 w-6 text-green-300 mx-auto mb-2" />
            <span className="text-purple-100">Privacy-first design</span>
          </div>
          <div>
            <Zap className="h-6 w-6 text-green-300 mx-auto mb-2" />
            <span className="text-purple-100">Instant results</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
