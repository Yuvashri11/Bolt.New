
"use client";
import SandpackPreviewClient from "./SandpackPreviewClient";
import axios from "axios";
import { DEPENDANCY } from "@/app/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/app/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import CODE_GEN_PROMPT from "@/app/data/Prompt";
import { useRef, useContext, useEffect, useState } from "react";
export default function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState({})
  const { messages, setMessages } = useContext(MessagesContext)
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        GenerateAiCode();
      }
    }
  }, [messages]);
  //   useEffect(() => {
  //   if (!hasGenerated.current && messages && messages.length > 0) {
  //     const lastMessage = messages[messages.length - 1];
  //     if (lastMessage.role === 'user') {
  //       hasGenerated.current = true; // ✅ block future triggers
  //       GenerateAiCode();
  //     }
  //   }
  // }, [messages]);

  const flattenToRoot = (files) => {
    const updated = {};
    for (const [path, content] of Object.entries(files)) {
      if (path.startsWith("/src/")) {
        const newPath = "/" + path.replace("/src/", "");
        updated[newPath] = content;
      } else {
        updated[path] = content;
      }
    }
    return updated;
  };


  const GenerateAiCode = async () => {
    const PROMPT = messages[messages.length - 1].content + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code', {
      prompt: PROMPT
    });
    console.log("res", result.data);
    const resp = result.data
    const mergedFiles = result.data.files
    console.log("m", mergedFiles);

    if (mergedFiles["/src/index.js"]) {
      mergedFiles["/src/index.js"].code = mergedFiles["/src/index.js"].code.replace(
        /from\s+['"]\.\/App['"]/,
        'from "./App"'
      );
    }

    const flatFiles = flattenToRoot(mergedFiles);
    setFiles(flatFiles);
  }

  return (
    <div className="bg-[#181818] w-full p-4 rounded-lg border border-[#333]">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("code")}
          className={`text-sm font-medium px-4 py-1 rounded-full transition ${activeTab === "code"
            ? "bg-blue-600 text-white"
            : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
            }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`text-sm font-medium px-4 py-1 rounded-full transition ${activeTab === "preview"
            ? "bg-blue-600 text-white"
            : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
            }`}
        >
          Preview
        </button>
      </div>
      <SandpackProvider files={files} template="react" theme="dark" customSetup={{
        dependencies: {
          ...DEPENDANCY,
          uuid: "latest"
        }
      }}
      >
        <SandpackLayout
          className="flex-1 rounded-xl border border-[#444] overflow-hidden"
          style={{
            height: "80vh",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #333",
          }}
        >
          {activeTab === "code" ? (
            <div className="flex w-full h-full">
              <div className="w-1/4 border-r border-[#333]">
                <SandpackFileExplorer style={{ height: "100%" }} />
              </div>
              <div className="w-3/4">
                <SandpackCodeEditor style={{ height: "100%" }} />
              </div>
            </div>
          ) : (
            <SandpackPreviewClient />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
