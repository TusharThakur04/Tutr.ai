"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Plus, FileText, Upload, Trash2 } from "lucide-react";
import axios from "axios";

export const UploadPanel = ({
  setSelectedDoc,
  userId,
  documents,
  setDocuments,
}) => {
  //rendering document on screen
  const handleClick = async (doc) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/getDoc`, //fetching pre signed url of the doc
        { key: doc.key }
      );

      const { signedUrl } = res.data;

      setSelectedDoc({
        name: doc.name,
        url: signedUrl,
      });
    } catch (err) {
      console.error("Failed to fetch viewer URL", err);
    }
  };

  // console.log(documents);

  const upload = async (files) => {
    const document = {
      fileName: files[0].name,
      type: files[0].type,
      userId,
    };
    // console.log("document:", document);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`, // api call to get s3  url
        document
      );
      const { uploadURL, key } = res.data;
      // console.log(uploadURL);

      //uploading document to s3 bucket

      await axios.put(uploadURL, files[0], {
        headers: {
          "Content-Type": files[0].type,
        },
      });

      try {
        const newDoc = {
          userId,
          name: files[0].name,
          type: files[0].type,
          status: "ready",
          key,
        };
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/metadata`,
          newDoc
        );
        setDocuments((prev) => [...prev, newDoc]);
      } catch (err) {
        console.log("metadata couldn't be uploaded", err);
      }
      //rendering doc on ui
    } catch (err) {
      console.log(err);
    }
  };

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    console.log("Files dropped:", files);

    await upload(files);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx,.txt";

    input.onchange = async (e) => {
      const files = Array.from(e.target.files || []);
      console.log("Files selected:", files);

      await upload(files);
    };

    input.click();
  };

  const handleDeleteDocument = (docId) => {
    // Remove a document from the local state by ID
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
      {/* Upload Section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Upload Documents
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drop files here
              </p>
              <p className="text-xs text-gray-500">or click to browse</p>
            </div>
            <Button
              onClick={handleFileUpload}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      </div>

      {/* Documents List Section */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-800">Your Documents</h4>
          <span className="text-xs text-gray-500">
            {documents.length} files
          </span>
        </div>

        <div className="space-y-2">
          {documents.map((doc) => (
            <Card
              onClick={() => handleClick(doc)}
              key={doc.id}
              className="p-3 hover:shadow-md hover:scale-95 transition-all duration-250 ease-in-out cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium text-gray-800 w-40 truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === "ready"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {doc.status === "ready"
                          ? "Ready for questions"
                          : doc.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDeleteDocument(doc.id)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No documents uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Upload your study materials to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
