"use client"
import  ChatView  from "@/components/custom/ChatView";
import  CodeView  from "@/components/custom/CodeView";

export default function Workspace() {
  return (
    <div className="h-calc[100vh-60px] bg-[#0f0f0f] text-white p-3 pr-5">
        <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-7">
            <div className="col-span-1 h-full">
          <ChatView />
        </div>
            <div className="col-span-3 h-full">
                <CodeView/>
            </div>
        </div>
    </div>
  );
}