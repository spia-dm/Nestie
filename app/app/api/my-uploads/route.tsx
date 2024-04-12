import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextResponse,res:NextRequest) {
  try {
    await dbConnect();
    const body = await req.json()
    const find_uploads = await House.find(body)
    console.log(find_uploads)
    return NextResponse.json(find_uploads)
  }
  catch(e){
    console.log(e)
  }
}
