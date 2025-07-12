"use client";
import Lookup from "@/app/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import { use, useContext, useState } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api";
import { useQuery } from "convex/react";
export default function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const convexUser = useQuery(api.users.GetUser, {
      email: userDetail?.email || "",
    });
  const onGenerate = async(input) => {
  
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg={ role: "user", content: input }
    setMessages(
      msg
    );
    console.log("userDetail", userDetail);
    console.log("userDetail._id", userDetail?._id);
    const workspaceId = await CreateWorkspace({
      user: convexUser._id,
      message: [msg],
      
    });
    console.log("userDetail in Hero:", userDetail);
    router.push(`/workspace/${workspaceId}`);
  }
  return (
    <div className="flex flex-col items-center mt-56 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="mt-2 text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className=" bg-gray-950 p-5 border rounded-xl max-w-2xl w-full mt-3">
        <div className="flex gap-2 ">
          <textarea className="outline-none bg-transparent w-full h-32 max-h-56 resize" placeholder={Lookup.HERO_HEADING}
            onChange={(e) => setUserInput(e.target.value)} />
          {userInput && <ArrowRight onClick={() => onGenerate(userInput)} className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" onClickCapture={() => onGenerate(userInput)} />}
        </div>
        <div>
          <Link className="h-5 w-5"></Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
        {Lookup.SUGGESTIONS.map((suggestion, index) => (
          <button
            variant="ghost"
            key={index}
            className="border border-gray-900 bg-transparent text-gray-400 px-4 py-1 rounded-md m-1 hover:bg-gray-900 hover:border-blue-500 transition-all duration-300"
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(false)}></SignInDialog>
    </div>
  );
}