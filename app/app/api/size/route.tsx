import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const value=await House.find({})
    console.log(value)
    return NextResponse.json(value.length)
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
