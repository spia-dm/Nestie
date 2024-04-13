import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const house = await House.findOne({id:body.id})
    return NextResponse.json({comments:house.comments});
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
