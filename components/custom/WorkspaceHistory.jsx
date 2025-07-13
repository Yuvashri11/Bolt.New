"use client";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import Header from "@/components/custom/Header";    
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
export default function WorkspaceHistory() {
    const {userDetail} = useContext(UserDetailContext);
    const convex = useConvex();
    const [workspaceList, setWorkspaceList] = useState();
    const {toggleSidebar} = useSidebar()
    useEffect(() => {
        if (userDetail) {
            GetAllWorkspace();
        }
    }, [userDetail]);   
    const GetAllWorkspace=async ()=>{
        const res=await convex.query(api.workspace.GetAllWorkspaces, { userId: userDetail?._id });
        setWorkspaceList(res);
        console.log(res);
        
    }
    return (
    <div>
        <h1 className="font-medium text-lg">Your Chats</h1>
        <div>
            {workspaceList?.map((workspace) => (
                <Link
                    href={`/workspace/${workspace._id}`}
                    className="text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white"
                    key={workspace._id}
                >
                    <div>
                        <h2 onClick={toggleSidebar} className="mb-1 text-white">{workspace.name}</h2>
                        <p>{workspace.message[0].content}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
}