"use client"
import Image from "next/image";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Header() {
  const { userDetail} = useContext(UserDetailContext);
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/bolt-logo.png"} alt="Logo" width={40} height={40} />
      {!userDetail?.name && <div className="flex gap-5">
        <Button variant="ghost">Sign In</Button>
        <Button className="bg-blue-600 text-white">Get Started</Button>
      </div>}
    </div>
  );
}