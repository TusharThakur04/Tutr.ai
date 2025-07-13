import React from "react";
import { Rnd } from "react-rnd";

const Viewer = ({ selectedDoc, setSelectedDoc }) => {
  if (!selectedDoc) return null;

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 800,
        height: 600,
      }}
      bounds="parent"
      minWidth={300}
      minHeight={300}
      dragHandleClassName="drag-handle"
      className="absolute z-50 bg-white border shadow-lg rounded"
    >
      <div className="drag-handle bg-purple-400 text-white p-2 cursor-move flex justify-between">
        <span>handle bar</span>
        <button onClick={() => setSelectedDoc(null)}>✖</button>
      </div>

      <iframe
        src="https://www.bing.com"
        className="w-full h-[calc(100%-2rem)]"
        title="PDF Viewer"
      />
    </Rnd>
  );
};

export default Viewer;
