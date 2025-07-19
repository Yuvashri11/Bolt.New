"use client"
import AppSideBar from "@/components/custom/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import Header from "@/components/custom/Header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { User } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { api } from "@/convex/_generated/api";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
function Provider({ children }) {
    const [messages, setMessages] = useState();
    const [userDetail,setUserDetail] = useState()
    const [action,setAction] = useState();
    const convex=useConvex()
    const router = useRouter();
    useEffect(() => {
        isAuthenticated();
    }, []);
    const isAuthenticated = async() => {
        if (typeof window !== 'undefined') { 
            const user = JSON.parse(localStorage.getItem("user"));
            if(!user) {
                router.push('/');  
                return;
            }
            const res=await convex.query(api.users.GetUser, { email:user?.email }  );
            console.log(res)
            if (user) {
                setUserDetail(res);
                
            }
        }  
    } 
    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
                <MessagesContext.Provider value={{ messages, setMessages }}>
                    <ActionContext.Provider value={{action, setAction}}>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header></Header>
                        <SidebarProvider defaultOpen={true}>
                            <AppSideBar />
                            {children}
                        </SidebarProvider>
                        
                    </NextThemesProvider>
                    </ActionContext.Provider>
                </MessagesContext.Provider>
            </UserDetailContext.Provider>
            </GoogleOAuthProvider>
        </div>
    );
}
export default Provider;