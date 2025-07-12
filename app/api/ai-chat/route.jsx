import { chatSession } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";
export async function POST(request) {
    const {prompt}= await request.json();
    try{
        const res=await chatSession.sendMessage(prompt)
        const resp=res.response.text()
        return NextResponse.json({
            response: resp})
    }catch(error){
        console.error("Error in AI chat route:", error);
        return new Response(JSON.stringify({error: "Failed to process request"}), {status: 500});
    }
}