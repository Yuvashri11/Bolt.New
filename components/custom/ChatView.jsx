"use client";
import { useSidebar } from "../ui/sidebar";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import { useQuery } from 'convex/react';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/app/data/Lookup';
import Prompt from '@/app/data/Prompt';
export default function ChatView() {
  const { id } = useParams();
  const hasLogged = React.useRef(false);
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = React.useState("");
  const workspaceData = useQuery(api.workspace.GetWorkspace, id ? { workspaceId: id } : "skip");
  const [loading, setLoading] = React.useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const {toggleSidebar} = useSidebar();
  useEffect(() => {
    if (workspaceData?.message) {
      setMessages(workspaceData.message);
    }
    if (workspaceData && !hasLogged.current) {
      console.log("Workspace ID:", id);
      console.log("Workspace Data:", workspaceData);
      hasLogged.current = true;
    }
  }, [workspaceData, id, setMessages]);
  useEffect(() => {
    if (messages && messages.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role === 'user') {
        GetAiResponse();
      }
      // console.log("Messages in ChatView:", messages);
    }
  }, [messages]);
  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT
    const res = await axios.post('/api/ai-chat', {
      prompt: PROMPT
    });
    console.log("AI Response:", res.data.response);
    setMessages((prevMessages) => [
      ...prevMessages, {
        role: 'assistant',
        content: res.data.response
      }])

    UpdateMessages({
      workspaceId: id,
      message: [...messages, { role: 'assistant', content: res.data.response }]
    });
    console.log("Updated Messages:", [...messages, { role: 'assistant', content: res.data.response }]);
    console.log("Updated Workspace ID:", id);
    setLoading(false)
    return res.data.response;
  }
  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      alert("Please sign in to continue.");
      return;
    }
    const msg = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, msg]);
    console.log("User Detail in ChatView:", userDetail);
    await GetAiResponse();
    setUserInput("");
  };
  return (
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll scrollbar-hide px-5'>
        <h2 className="text-2xl font-bold mb-4">Chat View</h2>

        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="bg-zinc-800 p-2 rounded-lg mb-2 flex flex-col gap-2 items-center leading-7">

              {msg?.role === 'user' && <Image src={userDetail?.picture} alt="User Avatar" width={40} height={40} className="inline-block mr-2 rounded-full" />}
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}


        <div className='bg-zinc-800 mb-2 p-2 rounded-lg flex gap-2 items-center'>
          <Loader2Icon className={`h-6 w-6 text-blue-500 ${loading ? 'animate-spin' : 'hidden'}`} />
          <h2>Generating response...</h2>
        </div>
      </div>
      <div className='flex gap-2 items-end'>
        {userDetail&&<Image src={userDetail?.picture} alt="user" width={30} height={30} className='rounded-full cursor-pointer' onClick={toggleSidebar}/>}
      <div className=" bg-gray-950 p-5 border rounded-xl max-w-2xl w-full mt-3">
        <div className="flex gap-2 ">
          <textarea value={userInput} className="outline-none bg-transparent w-full h-32 max-h-56 resize" placeholder={Lookup.HERO_HEADING}
            onChange={(e) => setUserInput(e.target.value)} />
          {userInput && <ArrowRight onClick={() => onGenerate(userInput)} className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" onClickCapture={() => onGenerate(userInput)} />}
        </div>
        <div>
          <Link className="h-5 w-5"></Link>
        </div>
      </div>
    </div>
    </div>
  );
}