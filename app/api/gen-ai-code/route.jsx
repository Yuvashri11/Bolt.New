import { GenAiCode } from "@/app/configs/AiModel"
import { NextResponse } from "next/server"


export async function POST(req){
    const {prompt}=await req.json()
    try{
        const result=await GenAiCode.sendMessage(prompt)
        const resp=JSON.parse(result.response.text())
        return NextResponse.json(resp)

    }catch(e){
        return NextResponse.json({error:e})
    }
}