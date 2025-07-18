"use client"
import Image from "next/image";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ActionContext } from "@/context/ActionContext";
import { Download, Rocket } from "lucide-react"; 
export default function Header() {
  const { userDetail} = useContext(UserDetailContext);

  const {action,setAction} = useContext(ActionContext);

  const onActionClick = (action) => {
    setAction({
      actionType: action,
      timestamp: Date.now(),
    });
  }
  return (
     <div className="p-4 flex justify-between items-center bg-[#0f0f0f] text-white">
      <Image src={"/bolt-logo.png"} alt="Logo" width={40} height={40} />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button className="bg-blue-600 text-white">Get Started</Button>
        </div>
      )}
      {userDetail?.name && (
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            onClick={() => onActionClick("export")}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={() => onActionClick("deploy")}
          >
            <Rocket size={16} />
            Deploy
          </Button>
          <Image
            src={userDetail.picture}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
            onClick={() => setAction("toggleSidebar")}
          />
        </div>
      )}
    </div>
  );
}