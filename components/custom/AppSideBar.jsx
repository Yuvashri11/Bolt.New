import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { MessageCircleCode } from "lucide-react";
import Image from "next/image";
import WorkspaceHistory from "./WorkspaceHistory";
import { Button } from "@/components/ui/button";
import SideBarFooter from "./SideBarFooter";
export default function AppSideBar() {
    return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={"/bolt-logo.png"} alt="Logo" width={30} height={30} />

      </SidebarHeader>
      <SidebarContent className="p-5">
        <Button> <MessageCircleCode/> Start New Chat</Button>
        <SidebarGroup />
        <WorkspaceHistory />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  )
}
