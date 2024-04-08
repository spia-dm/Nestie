import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const find_user = await House.find({})
    console.log(find_user)
    return NextResponse.json(find_user)
  }
  catch(e){
    console.log(e)
  }
}
