import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const user_data=new User(body)
    const tfa_value=await User.findOne(body)
    console.log("ochindiiiiiiiiiiiiiiiiiiiii")
    return NextResponse.json(tfa_value)
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
