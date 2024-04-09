import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const find_house = await House.find({})
    return NextResponse.json(find_house)
  }
  catch(e){
    console.log(e)
  }
}
