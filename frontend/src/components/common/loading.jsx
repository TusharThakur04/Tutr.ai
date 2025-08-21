"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ThinkingBubble = ({ setMessage }) => {
  useEffect(() => {
    setMessage("");
  });
  return (
    <div className=" mt-6 flex justify-start">
      <div className="bg-gray-200 px-3 py-2 rounded-2xl max-w-xs">
        <div className="flex items-center space-x-1">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="w-2 h-2 bg-gray-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: dot * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThinkingBubble;
